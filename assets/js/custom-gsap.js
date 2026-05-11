/* **************************************************************************** 
                          Custom GSAP js start 
****************************************************************************  */

var tl = gsap.timeline();
gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);
let mm = gsap.matchMedia();


// =================================== Smooth Scroller Js Start =====================================
// const smoother = ScrollSmoother.create({
//     content: "#scrollSmoother-container",
//     smooth: 1,
//     effects: true,
//     smoothTouch: 0.1,
//     ease: 'power4.out',
// });



// **************************** Section title Js Start ****************************
if ($(window).width() > 768 && $(".tw-char-animation").length > 0) {
    let char_come = gsap.utils.toArray(".tw-char-animation");
    char_come.forEach(splitTextLine => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: splitTextLine,
                start: "top 90%",
                end: "bottom 60%",
                scrub: false,
                markers: false,
                toggleActions: "play none none none",
            },
        });
        const itemSplitted = new SplitText(splitTextLine, {
            type: "chars, words",
        });
        gsap.set(splitTextLine, {
            perspective: 300
        });
        itemSplitted.split({
            type: "chars, words"
        });
        tl.from(itemSplitted.chars, {
            duration: 1,
            delay: 0.5,
            x: 100,
            autoAlpha: 0,
            stagger: 0.05,
        });
    });
}
// **************************** Section title Js End ****************************



// **************************** Mobile Menu js Start ****************************
var mmm = gsap.matchMedia();
var mtl = gsap.timeline({
    paused: true
});
const toggleMobileMenu = document.querySelector(".toggle-mobileMenu");
const closeButton = document.querySelector(".close-button");
const mobileSideOverlay = document.querySelector(".side-overlay");
mmm.add("(max-width: 1199px)", () => {
    mtl.to(".side-overlay", {
        opacity: 1,
        visibility: "visible",
        duration: 0.15,
    });

    mtl.to(".mobile-menu", {
        x: 0,
        delay: 0.2,
        duration: 0.2,
    });

    mtl.from(".nav-menu__item", {
        opacity: 0,
        duration: 0.2,
        y: -60,
        stagger: 0.08,
    });

    toggleMobileMenu.addEventListener("click", function () {
        mtl.play();
        document.body.style.overflow = "hidden";
    });

    closeButton.addEventListener("click", function () {
        mtl.reverse();
        document.body.style.overflow = "";
    });

    mobileSideOverlay.addEventListener("click", function () {
        mtl.reverse();
        document.body.style.overflow = "";
    });
});
// **************************** Mobile Menu js End ****************************



// **************************** Position Aware button hover js start ****************************
class Button {
    constructor(buttonElement) {
        this.block = buttonElement;
        this.init();
        this.initEvents();
    }
    init() {
        const el = gsap.utils.selector(this.block);
        this.DOM = {
            button: this.block,
            flair: el(".button__flair"),
        };
        this.xSet = gsap.quickSetter(this.DOM.flair, "xPercent");
        this.ySet = gsap.quickSetter(this.DOM.flair, "yPercent");
    }
    getXY(e) {
        const {
            left,
            top,
            width,
            height
        } =
            this.DOM.button.getBoundingClientRect();
        const xTransformer = gsap.utils.pipe(
            gsap.utils.mapRange(0, width, 0, 100),
            gsap.utils.clamp(0, 100)
        );
        const yTransformer = gsap.utils.pipe(
            gsap.utils.mapRange(0, height, 0, 100),
            gsap.utils.clamp(0, 100)
        );
        return {
            x: xTransformer(e.clientX - left),
            y: yTransformer(e.clientY - top),
        };
    }
    initEvents() {
        this.DOM.button.addEventListener("mouseenter", (e) => {
            const {
                x,
                y
            } = this.getXY(e);
            this.xSet(x);
            this.ySet(y);
            gsap.to(this.DOM.flair, {
                scale: 1,
                duration: 0.9,
                ease: "power2.out",
            });
        });
        this.DOM.button.addEventListener("mouseleave", (e) => {
            const {
                x,
                y
            } = this.getXY(e);
            gsap.killTweensOf(this.DOM.flair);
            gsap.to(this.DOM.flair, {
                xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
                yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
                scale: 0,
                duration: 0.9,
                ease: "power2.out",
            });
        });
        this.DOM.button.addEventListener("mousemove", (e) => {
            const {
                x,
                y
            } = this.getXY(e);
            gsap.to(this.DOM.flair, {
                xPercent: x,
                yPercent: y,
                duration: 0.9,
                ease: "power2",
            });
        });
    }
}
const buttonElements = document.querySelectorAll('[data-block="button"]');
buttonElements.forEach((buttonElement) => {
    new Button(buttonElement);
});
// **************************** Position Aware button hover js End ****************************


// button hover animation Js
// hover button circle dot position
$('.tw-hover-btn').on('mouseenter', function (e) {
    var x = e.pageX - $(this).offset().left;
    var y = e.pageY - $(this).offset().top;
    $(this).find('.tw-btn-circle-dot').css({
        top: y,
        left: x
    });
});
$('.tw-hover-btn').on('mouseout', function (e) {
    var x = e.pageX - $(this).offset().left;
    var y = e.pageY - $(this).offset().top;
    $(this).find('.tw-btn-circle-dot').css({
        top: y,
        left: x
    });
});

// hover button parallax effect
var hoverBtns = gsap.utils.toArray(".tw-hover-btn-wrapper");
const hoverBtnItem = gsap.utils.toArray(".tw-hover-btn-item");
hoverBtns.forEach((btn, i) => {
    $(btn).mousemove(function (e) {
        callParallax(e);
    });

    function callParallax(e) {
        parallaxIt(e, hoverBtnItem[i], 60);
    }

    function parallaxIt(e, target, movement) {
        var $this = $(btn);
        var relX = e.pageX - $this.offset().left;
        var relY = e.pageY - $this.offset().top;
        gsap.to(target, 1, {
            x: ((relX - $this.width() / 2) / $this.width()) * movement,
            y: ((relY - $this.height() / 2) / $this.height()) * movement,
            ease: Power2.easeOut,
        });
    }
    $(btn).mouseleave(function (e) {
        gsap.to(hoverBtnItem[i], 1, {
            x: 0,
            y: 0,
            ease: Power2.easeOut,
        });
    });
});

// hover parallax effect
var parallaxWrapper = gsap.utils.toArray(".tw-hover-parallax-wrapper");
const parallaxItem = gsap.utils.toArray(".tw-hover-parallax-item");
parallaxWrapper.forEach((item, i) => {
    $(item).mousemove(function (e) {
        callParallax(e);
    });

    function callParallax(e) {
        parallaxIt(e, parallaxItem[i], 60);
    }

    function parallaxIt(e, target, movement) {
        var $this = $(item);
        var relX = e.pageX - $this.offset().left;
        var relY = e.pageY - $this.offset().top;
        gsap.to(target, 1, {
            x: ((relX - $this.width() / 2) / $this.width()) * movement,
            y: ((relY - $this.height() / 2) / $this.height()) * movement,
            ease: Power2.easeOut,
        });
    }
    $(item).mouseleave(function (e) {
        gsap.to(parallaxItem[i], 1, {
            x: 0,
            y: 0,
            ease: Power2.easeOut,
        });
    });
});

// hover bg spread hover animation Js
$('.hover-bg-spread-effect').on('mouseenter', function (e) {
    var x = e.pageX - $(this).offset().left;
    var y = e.pageY - $(this).offset().top;
    $(this).find('.hover-bg-spread-dot').css({
        top: y,
        left: x
    });
});

$('.hover-bg-spread-effect').on('mouseout', function (e) {
    var x = e.pageX - $(this).offset().left;
    var y = e.pageY - $(this).offset().top;
    $(this).find('.hover-bg-spread-dot').css({
        top: y,
        left: x
    });
});


// Home 2 maquee bg animation 
gsap.utils.toArray('.maquee-bg').forEach(container => {
    const img = container.querySelector('img');
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: container,
            scrub: true,
            pin: false,
        }
    });
    tl.fromTo(img, {
        yPercent: -20,
        ease: 'none'
    }, {
        yPercent: 20,
        ease: 'none'
    });
});


/* title scroll animation */
// Loop through each scroll area
mm.add("(min-width: 768px)", () => {
    gsap.utils.toArray('.tw-title-scroll-area').forEach(area => {
        const rtlEls = area.querySelectorAll('.tw-title-scroll-rtl');
        const ltrEls = area.querySelectorAll('.tw-title-scroll-ltr');

        if (rtlEls.length) {
            gsap.set(rtlEls, { xPercent: 10 });
            gsap.timeline({
                scrollTrigger: {
                    trigger: area,
                    start: 'top 90%',
                    end: 'bottom 20%',
                    scrub: true,
                    invalidateOnRefresh: true,
                }
            }).to(rtlEls, { xPercent: -15 });
        }

        if (ltrEls.length) {
            gsap.set(ltrEls, { xPercent: -10 });
            gsap.timeline({
                scrollTrigger: {
                    trigger: area,
                    start: 'top 100%',
                    end: 'bottom 20%',
                    scrub: true,
                    invalidateOnRefresh: true
                }
            }).to(ltrEls, { xPercent: 10 });
        }
    });

    // cleanup when media query no longer matches
    return () => ScrollTrigger.getAll().forEach(st => st.kill());
});


const hoverItem = document.querySelectorAll(".hover__reveal-item");

function moveImage(e, hoverItem, index) {
    const item = hoverItem.getBoundingClientRect();
    const x = e.clientX - item.x;
    const y = e.clientY - item.y;
    if (hoverItem.children[index]) {
        hoverItem.children[index].style.transform = `translate(${x}px, ${y}px)`;
    }
}
hoverItem.forEach((item, i) => {
    item.addEventListener("mousemove", (e) => {
        moveImage(e, item, 1);
    });
});


/* **************************************************************************** 
                          Custom GSAP js end 
****************************************************************************  */