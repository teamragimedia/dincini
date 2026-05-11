(function ($) {
    "use strict";

    // ==========================================
    //      Start Document Ready function
    // ==========================================
    $(document).ready(function () {
        // ============== Mobile Nav Menu Dropdown Js Start =======================
        function toggleSubMenu() {
            if ($(window).width() <= 1200) {
                $(".has-submenu")
                    .off("click")
                    .on("click", function () {
                        $(this)
                            .toggleClass("active")
                            .siblings(".has-submenu")
                            .removeClass("active")
                            .find(".nav-submenu")
                            .slideUp(300);
                        $(this).find(".nav-submenu").stop(true, true).slideToggle(300);
                    });
            } else {
                $(".has-submenu").off("click");
            }
        }
        toggleSubMenu();
        $(window).resize(toggleSubMenu);
        // ============== Mobile Nav Menu Dropdown Js End =======================

        // ===================== Scroll Back to Top Js Start ======================
        var progressPath = document.querySelector(".progress-wrap path");
        var pathLength = progressPath.getTotalLength();
        progressPath.style.transition = progressPath.style.WebkitTransition =
            "none";
        progressPath.style.strokeDasharray = pathLength + " " + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition =
            "stroke-dashoffset 10ms linear";
        var updateProgress = function () {
            var scroll = $(window).scrollTop();
            var height = $(document).height() - $(window).height();
            var progress = pathLength - (scroll * pathLength) / height;
            progressPath.style.strokeDashoffset = progress;
        };
        updateProgress();
        $(window).scroll(updateProgress);
        var offset = 50;
        var duration = 550;
        jQuery(window).on("scroll", function () {
            if (jQuery(this).scrollTop() > offset) {
                jQuery(".progress-wrap").addClass("active-progress");
            } else {
                jQuery(".progress-wrap").removeClass("active-progress");
            }
        });
        jQuery(".progress-wrap").on("click", function (event) {
            event.preventDefault();
            jQuery("html, body").animate({
                scrollTop: 0
            }, duration);
            return false;
        });
        // ===================== Scroll Back to Top Js End ======================

        // ========================== add active class to navbar menu current page Js Start =====================
        function dynamicActiveMenuClass(selector) {
            let FileName = window.location.pathname.split("/").reverse()[0];

            // If we are at the root path ("/" or no file name), keep the activePage class on the Home item
            if (FileName === "" || FileName === "index.html") {
                // Keep the activePage class on the Home link
                selector
                    .find("li.nav-menu__item.has-submenu")
                    .eq(0)
                    .addClass("activePage");
            } else {
                // Remove activePage class from all items first
                selector.find("li").removeClass("activePage");

                // Add activePage class to the correct li based on the current URL
                selector.find("li").each(function () {
                    let anchor = $(this).find("a");
                    if ($(anchor).attr("href") == FileName) {
                        $(this).addClass("activePage");
                    }
                });

                // If any li has activePage element, add class to its parent li
                selector.children("li").each(function () {
                    if ($(this).find(".activePage").length) {
                        $(this).addClass("activePage");
                    }
                });
            }
        }

        if ($("ul").length) {
            dynamicActiveMenuClass($("ul"));
        }
        // ========================== add active class to navbar menu current page Js End =====================

        // ========================== Settings Panel Js Start =====================
        $(".settings-button").on("click", function () {
            $(".settings-panel").toggleClass("active");
            $(this).toggleClass("active");
        });

        $(document).on(
            "click",
            ".settings-panel__buttons .settings-panel__button",
            function () {
                $(this).siblings().removeClass("active");
                $(this).addClass("active");
            }
        );

        // Cursor start
        $(".cursor-animate").on("click", function () {
            $("body").removeClass("remove-animate-cursor");
        });

        $(".cursor-default").on("click", function () {
            $("body").addClass("remove-animate-cursor");
        });
        // Cursor end

        // Direction start
        $(".direction-ltr").on("click", function () {
            $("html").attr("dir", "ltr");
        });

        $(".direction-rtl").on("click", function () {
            $("html").attr("dir", "rtl");
        });
        // Direction end
        // ========================== Settings Panel Js End =====================

        // ********************* Toast Notification Js start *********************
        function toastMessage(messageType, messageTitle, messageText, messageIcon) {
            let $toastContainer = $("#toast-container");

            let $toast = $("<div>", {
                class: `toast-message ${messageType}`,
                html: `
                    <div class="toast-message__content">
                        <span class="toast-message__icon">
                        <i class="${messageIcon}"></i>
                        </span>
                        <div class="flex-grow-1">
                        <div class="d-flex align-items-start justify-content-between mb-1">
                            <h6 class="toast-message__title">${messageTitle}</h6>
                            <button type="button" class="toast-message__close">
                            <i class="ph-bold ph-x"></i>
                            </button>
                        </div>
                        <span class="toast-message__text">${messageText}</span>
                        </div>
                    </div>
                    <div class="progress__bar"></div>
                    `,
            });

            $toastContainer.append($toast);

            setTimeout(() => {
                $toast.addClass("active");
            }, 50);

            let totalDuration = 3500;
            let startTime = Date.now();
            let remainingTime = totalDuration;
            let toastTimeout = setTimeout(hideToast, remainingTime);

            function hideToast() {
                $toast.removeClass("active");
                setTimeout(() => {
                    $toast.remove();
                }, 500);
            }

            // Remove Toast on Close Button Click
            $toast.find(".toast-message__close").on("click", function () {
                $toast.removeClass("active");
                setTimeout(() => {
                    $toast.remove();
                }, 500);
            });

            // Pause Timeout on Hover
            $toast.on("mouseenter", function () {
                remainingTime -= Date.now() - startTime;
                clearTimeout(toastTimeout);
            });

            // Resume Timeout on Mouse Leave
            $toast.on("mouseleave", function () {
                startTime = Date.now();
                toastTimeout = setTimeout(hideToast, remainingTime);
            });
        }
        // ********************* Toast Notification Js End *********************




        // ========================= Delete Item Js start ===================
        $(document).on("click", ".delete-button", function () {
            $(this).closest(".delete-item").addClass("d-none");

            toastMessage(
                "danger",
                "Deleted",
                "You deleted successfully!",
                "ph-bold ph-trash"
            );
        });
        // ========================= Delete Item Js End ===================

        // ========================= Form Submit Js Start ===================
        $(document).on("submit", ".form-submit", function (e) {
            e.preventDefault();

            $("input").val("");

            $("textarea").val("");

            toastMessage(
                "success",
                "Success",
                "Form submitted successfully!",
                "ph-fill ph-check-circle"
            );
        });
        // ========================= Form Submit Js End ===================

        // ================== Password Show Hide Js Start ==========
        $(".toggle-password").on("click", function () {
            $(this).toggleClass("active");
            var input = $($(this).attr("id"));
            if (input.attr("type") == "password") {
                input.attr("type", "text");
                $(this).removeClass("ph-bold ph-eye-closed");
                $(this).addClass("ph-bold ph-eye");
            } else {
                input.attr("type", "password");
                $(this).addClass("ph-bold ph-eye-closed");
            }
        });
        // ========================= Password Show Hide Js End ===========================

        // ========================= AOS Js Start ===========================
        AOS.init({
            once: true,
        });
        // ========================= AOS Js End ===========================

    });


    // ==========================================
    //      End Document Ready function
    // ==========================================


    // ========================= magnific Popup Js Start =====================
    $('.open-popup').magnificPopup({
        type: 'iframe',
        removalDelay: 300,
        mainClass: 'mfp-fade',
    });
    // ========================= magnific Popup Js End =====================



    // ========================== Add Attribute For Bg Image Js Start ====================
    $(".bg-img").css('background', function () {
        var bg = ('url(' + $(this).data("background-image") + ')');
        return bg;
    });
    // ========================== Add Attribute For Bg Image Js End =====================  



    // about scroll rotate Js
    let reloadClassName = document.getElementById("reload");
    if (reloadClassName !== null) {
        window.onscroll = function () {
            scrollRotate();
        };

        function scrollRotate() {
            reloadClassName.style.transform = "rotate(" + window.pageYOffset / 6 + "deg)";
        }
    }


    // odometer  Js
    if ($(".odometer").length > 0) {
        $(".odometer").waypoint(
            function () {
                var odo = $(".odometer");
                odo.each(function () {
                    var countNumber = $(this).attr("data-count");
                    $(this).html(countNumber);
                });
            }, {
            offset: "80%",
            triggerOnce: true,
        }
        );
    }



    // =========================  Search Bar 9 Js Start ==============
    $(".open-search").on("click", function () {
        $(".search_popup").addClass("search-opened");
        $(".search-popup-overlay").addClass("search-popup-overlay-open");
    });
    $(".search_close_btn").on("click", function () {
        $(".search_popup").removeClass("search-opened");
        $(".search-popup-overlay").removeClass("search-popup-overlay-open");
    });
    $(".search-popup-overlay").on("click", function () {
        $(".search_popup").removeClass("search-opened");
        $(this).removeClass("search-popup-overlay-open");
    });
    // =========================  Search Bar 9 Js End ==============




    // ========================= Preloader Js Start =====================
    const svg = document.getElementById("preloaderSvg");
    const preTl = gsap.timeline({
        onComplete: startAnimationAfterPreloader,
    });
    const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
    const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";
    preTl.to(".preloader-heading .load-text , .preloader-heading .cont", {
        delay: 1.5,
        y: -100,
        opacity: 0,
    });
    preTl
        .to(svg, {
            duration: 0.5,
            attr: {
                d: curve
            },
            ease: "power2.easeIn",
        })
        .to(svg, {
            duration: 0.5,
            attr: {
                d: flat
            },
            ease: "power2.easeOut",
        });
    preTl.to(".preloader", {
        delay: 1.5,
        y: -1500,
    });
    preTl.to(".preloader", {
        zIndex: -1,
        display: "none",
    });
    let svgText = document.querySelector("svg text");
    function startAnimationAfterPreloader() {
        if (svgText) {
            // Add a class or directly apply styles to trigger the stroke animation
            svgText.classList.add("animate-stroke");
        }
    }
    // ========================= Preloader Js End=====================



    // ========================= Header Sticky Js Start ==============
    $(window).on("scroll", function () {
        if ($(window).scrollTop() >= 260) {
            $(".header").addClass("fixed-header");
        } else {
            $(".header").removeClass("fixed-header");
        }
    });
    // ========================= Header Sticky Js Js End ==============


    // ========================= Offcanvas Sidebar Js Start ==============
    $(".tw-menu-bar").on("click", function () {
        $(".twoffcanvas").addClass("opened");
        $(".body-overlay").addClass("apply");
    });
    $(".close-btn").on("click", function () {
        $(".twoffcanvas").removeClass("opened");
        $(".body-overlay").removeClass("apply");
    });
    $(".body-overlay").on("click", function () {
        $(".twoffcanvas").removeClass("opened");
        $(".body-overlay").removeClass("apply");
    });
    // ========================= Offcanvas Sidebar Js End===================



    // ================================ Floating Progress js start =================================
    const progressContainers = document.querySelectorAll('.progress-container');
    function setPercentage(progressContainer) {
        const percentage = progressContainer.getAttribute('data-percentage') + '%';
        const progressEl = progressContainer.querySelector('.progress');
        const percentageEl = progressContainer.querySelector('.percentage');
        progressEl.style.width = percentage;
        percentageEl.innerText = percentage;
        percentageEl.style.insetInlineStart = percentage;
    }
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressContainer = entry.target;
                setPercentage(progressContainer);
                progressContainer.querySelector('.progress').classList.remove('active');
                progressContainer.querySelector('.percentage').classList.remove('active');
                observer.unobserve(progressContainer);
            }
        });
    }, {
        threshold: 0.5
    });
    progressContainers.forEach(progressContainer => {
        observer.observe(progressContainer);
    });
    // ================================ Floating Progress js End =================================




    // =========================  knob progress Js start ==============
    if (typeof ($.fn.knob) !== 'undefined') {
        $('.knob').each(function () {
            var $this = $(this);
            var knobVal = $this.attr('data-rel');

            $this.knob({
                'draw': function () {
                    $(this.i).val(this.cv + '%');
                }
            });

            // Use GSAP ScrollTrigger
            gsap.fromTo($({
                val: 0
            }), {
                val: 0
            }, {
                val: knobVal,
                duration: 2,
                ease: "power1.out",
                scrollTrigger: {
                    trigger: $this,
                    start: "top 80%", // when element top is 80% from top of viewport
                    once: true, // trigger only once
                },
                onUpdate: function () {
                    $this.val(Math.ceil(this.targets()[0].val)).trigger('change');
                }
            });
        });
    }

    // =========================  knob progress Js end ==============



    // =========================  cart Js Start ==============
    // === Sidebar toggle ===
    const cartBtn = document.getElementById("cartButton");
    const cartSidebar = document.getElementById("cartSidebar");
    const cartOverlay = document.getElementById("cartOverlay");
    const closeCart = document.getElementById("closeCart");

    const toggleCart = (open) => {
        if (open) {
            cartSidebar.classList.add("active");
            cartOverlay.classList.add("show");
        } else {
            cartSidebar.classList.remove("active");
            cartOverlay.classList.remove("show");
        }
    };

    if (cartBtn && closeCart && cartOverlay) {
        cartBtn.addEventListener("click", () => toggleCart(true));
        closeCart.addEventListener("click", () => toggleCart(false));
        cartOverlay.addEventListener("click", () => toggleCart(false));
    }

    // =========== Quantity controls ==============
    const qtyPlusButtons = document.querySelectorAll(".qty-plus");
    const qtyMinusButtons = document.querySelectorAll(".qty-minus");
    const qtyInputs = document.querySelectorAll(".qty");
    const cartItems = document.querySelectorAll(".cart-item");
    const cartTotalEl = document.getElementById("cartTotal");

    // ========================= Ticket Price Calculation Js start ===================
    // const ticketPrice = document.querySelector(".ticket-price");
    // const totalTicketPrice = document.querySelector(".total-price");
    // const totalTicketQuantity = document.querySelector(".total-qty");
    const ticketPriceWrapper = document.querySelectorAll(".event-ticket-quantity-wrapper");


    // initialize total on page load
    const initialTotal = () => {
        let total = 0;
        cartItems.forEach((item) => {
            const price = parseFloat(item.querySelector(".item-price").textContent);
            const qty = parseInt(item.querySelector(".qty").value);
            total += price * qty;
        });
        cartTotalEl.textContent = total.toFixed(2);
    };
    if (cartItems && cartTotalEl) {
        initialTotal();
    }

    const updateTotal = () => {
        let total = 0;
        cartItems.forEach((item) => {
            const price = parseFloat(item.querySelector(".item-price").textContent);
            const qty = parseInt(item.querySelector(".qty").value);
            total += price * qty;
        });
        cartTotalEl.textContent = total.toFixed(2);
    };

    qtyInputs.forEach((input) => {
        input.addEventListener("change", () => {
            if (cartItems && cartTotalEl) {
                updateTotal();
            }
        });
    });

    qtyPlusButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const qtyEl = btn.closest(".qty-control").querySelector(".qty");
            qtyEl.value = parseInt(qtyEl.value) + 1;
            if (cartItems && cartTotalEl) {
                updateTotal();
            }
            if (ticketPriceWrapper) {
                const wrapper = btn.closest(".event-ticket-quantity-wrapper");
                calculateTicketPrice(wrapper);
            }
        });
    });

    qtyMinusButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const qtyEl = btn.closest(".qty-control").querySelector(".qty");
            const current = parseInt(qtyEl.value);
            if (current > 1) qtyEl.value = current - 1;
            if (cartItems && cartTotalEl) {
                updateTotal();
            }
            if (ticketPriceWrapper) {
                const wrapper = btn.closest(".event-ticket-quantity-wrapper");
                calculateTicketPrice(wrapper);
            }
        });
    });

    // =========================  cart Js end ==============

    // ========================= Ticket Price Calculation Js start ===================
    function calculateTicketPrice(wrapper) {

        // find elements inside this ticket block
        const priceEl = wrapper.querySelector(".ticket-price");
        const qtyEl = wrapper.querySelector(".qty");
        const totalQtyEl = wrapper.querySelector(".total-qty");
        const totalPriceEl = wrapper.querySelector(".total-price");

        // extract values
        const price = parseFloat(priceEl.textContent.replace(/[^0-9.]/g, ""));
        const qty = parseInt(qtyEl.value);

        // update UI
        totalQtyEl.textContent = qty;
        totalPriceEl.textContent = (price * qty).toFixed(2);
    }

})(jQuery);