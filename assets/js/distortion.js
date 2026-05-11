
class DistortionEffect {
    constructor(container, imageSrc) {
        this.container = container;
        this.imageSrc = imageSrc;
        this.mouse = new ogl.Vec2(-1);
        this.velocity = new ogl.Vec2();
        this.aspect = 1;

        this.vertex = `
      attribute vec2 uv;
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0, 1);
      }
    `;

        this.fragment = `
      precision highp float;
      uniform sampler2D tWater;
      uniform sampler2D tFlow;
      varying vec2 vUv;
      uniform vec4 res;
      void main() {
        vec3 flow = texture2D(tFlow, vUv).rgb;
        vec2 myUV = (vUv - 0.5) * res.zw + 0.5;
        myUV -= flow.xy * 0.12; // distortion strength
        vec3 tex = texture2D(tWater, myUV).rgb;
        gl_FragColor = vec4(tex, 1.0);
      }
    `;

        this.init();
    }

    init() {
        // Renderer
        this.renderer = new ogl.Renderer({ dpr: 1, alpha: true });
        this.gl = this.renderer.gl;
        this.container.appendChild(this.gl.canvas);

        const flowmap = new ogl.Flowmap(this.gl);

        // Geometry
        const geometry = new ogl.Geometry(this.gl, {
            position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
            uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
        });

        // Texture
        const texture = new ogl.Texture(this.gl, {
            minFilter: this.gl.LINEAR,
            magFilter: this.gl.LINEAR,
        });

        const img = new Image();
        img.onload = () => {
            texture.image = img;

            // ✅ Set aspect based on actual image size
            this.imgSize = [img.width, img.height];
            this.imageAspect = img.height / img.width;

            // ✅ Create program AFTER image loads
            const program = new ogl.Program(this.gl, {
                vertex: this.vertex,
                fragment: this.fragment,
                uniforms: {
                    tWater: { value: texture },
                    tFlow: flowmap.uniform,
                    res: { value: new ogl.Vec4(1, 1, 1, 1) },
                },
            });

            this.mesh = new ogl.Mesh(this.gl, { geometry, program });
            this.flowmap = flowmap;
            this.program = program;

            // ✅ Do resize AFTER mesh exists
            this.resize();
            this.resizeObserver = new ResizeObserver(() => this.resize());
            this.resizeObserver.observe(this.container);

            this.addEvents();
            requestAnimationFrame(this.update.bind(this));
        };
        img.src = this.imageSrc;
    }

    resize() {
        const rect = this.container.getBoundingClientRect();
        this.renderer.setSize(rect.width, rect.height);
        this.aspect = rect.width / rect.height;

        let a1, a2;
        const imageAspect = this.imageAspect || 1;
        if (rect.height / rect.width < imageAspect) {
            a1 = 1;
            a2 = rect.height / rect.width / imageAspect;
        } else {
            a1 = (rect.width / rect.height) * imageAspect;
            a2 = 1;
        }
        this.a1 = a1;
        this.a2 = a2;

        if (this.mesh) {
            const realWidth = this.gl.drawingBufferWidth;
            const realHeight = this.gl.drawingBufferHeight;
            this.mesh.program.uniforms.res.value = new ogl.Vec4(realWidth, realHeight, a1, a2);
        }
    }

    addEvents() {
        const isTouch = "ontouchstart" in window;
        const updateMouse = (e) => {
            if (e.changedTouches && e.changedTouches.length) e = e.changedTouches[0];
            const rect = this.container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this.mouse.set(x / rect.width, 1.0 - y / rect.height);

            if (!this.lastMouse) this.lastMouse = new ogl.Vec2(x, y);
            const deltaX = x - this.lastMouse.x;
            const deltaY = y - this.lastMouse.y;
            this.lastMouse.set(x, y);

            const now = performance.now();
            const delta = Math.max(10.4, now - (this.lastTime || now));
            this.lastTime = now;

            this.velocity.x = deltaX / delta;
            this.velocity.y = deltaY / delta;
            this.velocity.needsUpdate = true;
        };

        if (isTouch) {
            this.container.addEventListener("touchmove", updateMouse, { passive: false });
        } else {
            this.container.addEventListener("mousemove", updateMouse);
        }
    }

    update() {
        requestAnimationFrame(this.update.bind(this));
        const { flowmap, velocity, mouse, renderer, mesh } = this;

        if (!velocity.needsUpdate) {
            mouse.set(-1);
            velocity.set(0);
        }
        velocity.needsUpdate = false;

        flowmap.mouse.copy(mouse);
        flowmap.velocity.lerp(velocity, velocity.len ? 0.15 : 0.1);
        flowmap.update();

        renderer.render({ scene: mesh });
    }
}


// ======================
// Auto-initialize
// ======================
window.addEventListener("DOMContentLoaded", () => {

    const distortionContainers = document.querySelectorAll(".distortion-container");
    if (distortionContainers) {
        distortionContainers.forEach((container) => {
            const img = container.querySelector(".distortion-img");
            new DistortionEffect(container, img.src);
        });
    }
});