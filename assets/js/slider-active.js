/* **************************************************************************** 
                          Swiper slider js start 
****************************************************************************  */


(function ($) {
    "use strict";

    // ========================= Maquee Js Start===================
    var slider = new Swiper('.maquee-active', {
        slidesPerView: "auto",
        spaceBetween: 40,
        loop: true,
        speed: 5000,
        allowTouchMove: false,
        autoplay: {
            delay: 1,
            disableOnInteraction: true,
        },
        breakpoints: {
            320: {
                spaceBetween: 40,
            },
            768: {
                spaceBetween: 40,
            },
            992: {
                spaceBetween: 40,
            },
            1200: {
                spaceBetween: 40,
            },
        },
    });
    // ========================= Maquee Js End===================

    // ========================= Gallery Js Start===================
    var slider = new Swiper('.gallery-swiper-active', {
        slidesPerView: "auto",
        spaceBetween: 24,
        loop: true,
        speed: 5000,
        allowTouchMove: false,
        autoplay: {
            delay: 1,
            disableOnInteraction: true,
        },
    });

    var slider = new Swiper('.gallery-swiper-active-two', {
        slidesPerView: "auto",
        spaceBetween: 24,
        loop: true,
        speed: 5000,
        allowTouchMove: false,
        autoplay: {
            delay: 1,
            disableOnInteraction: true,
            reverseDirection: true,
        },
    });
    // ========================= Gallery Js End===================




    // =========================  testimonial Js Start ==============
    var slider = new Swiper('.testimonial-active', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        speed: 3500,
        autoplay: true,
        // Navigation arrows
        navigation: {
            nextEl: '.slider-next',
            prevEl: '.slider-prev',
        },
    });
    // =========================  testimonial Js End ==============



    // =========================  Building Js Start ==============
    var slider = new Swiper('.testimonial-two-active', {
        slidesPerView: 1,
        loop: true,
        speed: 2500,
        autoplay: true,
        // Navigation arrows
        navigation: {
            nextEl: '.slider-next',
            prevEl: '.slider-prev',
        },
    });
    // =========================  Building Js End ==============


    // ========================= Home 3 testimonial Js Start ==============
    var slider = new Swiper('.testimonial-three-active', {
        slidesPerView: "auto",
        spaceBetween: 24,
        loop: true,
        speed: 2500,
        autoplay: true,
        breakpoints: {
            '1200': {
                slidesPerView: 2,
            },
            '992': {
                slidesPerView: 1.6,
            },
            '768': {
                slidesPerView: 1.1,
            },
            '576': {
                slidesPerView: 1,
            },
            '0': {
                slidesPerView: 1,
            },
        },
    });
    // ========================= Home 3 testimonial Js Start ==============



    // ========================= Home 4 Project Js Start ==============
    var slider = new Swiper('.project-four-active', {
        slidesPerView: "auto",
        spaceBetween: 30,
        loop: true,
        speed: 2500,
        autoplay: true,
        centeredSlides: true,
        breakpoints: {
            '1600': {
                slidesPerView: 3.4,
            },
            '1400': {
                slidesPerView: 2.8,
            },
            '1200': {
                slidesPerView: 1.6,
            },
            '992': {
                slidesPerView: 1.4,
            },
            '768': {
                slidesPerView: 1.1,
            },
            '576': {
                slidesPerView: 1,
            },
            '0': {
                slidesPerView: 1,
            },
        },
    });
    // ========================= Home 4 Project Js End ==============


    // ========================= Home 3 testimonial Js Start ==============
    var slider = new Swiper('.service-five-active', {
        slidesPerView: "auto",
        spaceBetween: 25,
        loop: true,
        speed: 2500,
        autoplay: true,
        centeredSlides: true,
        breakpoints: {
            '1920': {
                slidesPerView: 5,
            },
            '1800': {
                slidesPerView: 4,
            },
            '1600': {
                slidesPerView: 4,
            },
            '1400': {
                slidesPerView: 3.7,
            },
            '1200': {
                slidesPerView: 3.2,
            },
            '992': {
                slidesPerView: 2.7,
            },
            '768': {
                slidesPerView: 2,
            },
            '576': {
                slidesPerView: 1.5,
            },
            '0': {
                slidesPerView: 1.2,
            },
        },
        // pagination
        pagination: {
            el: ".service-five-dot",
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + '<button>' + (index + 1) + '</button>' + "</span>";
            },
        },
    });
    // ========================= Home 3 testimonial Js Start ==============




    // ========================= Maquee Js Start===================
    var slider = new Swiper('.maquee-five-active', {
        slidesPerView: "auto",
        spaceBetween: 30,
        loop: true,
        speed: 5000,
        allowTouchMove: false,
        autoplay: {
            delay: 1,
            disableOnInteraction: true,
        },
        breakpoints: {
            320: {
                spaceBetween: 30,
            },
            768: {
                spaceBetween: 20,
            },
            992: {
                spaceBetween: 20,
            },
            1200: {
                spaceBetween: 30,
            },
        },
    });
    // ========================= Maquee Js End===================

    // ========================= Home 5 testimonial Js Start ==============
    var slider = new Swiper('.testimonial-five-active', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        speed: 3500,
        autoplay: true,
        // Navigation arrows
        navigation: {
            nextEl: '.slider-next',
            prevEl: '.slider-prev',
        },
    });
    // ========================= Home 5 testimonial Js End ==============


    // ========================= Home 6 testimonial Js Start ==============
    var slider = new Swiper('.testimonial-six-active', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        speed: 3500,
        autoplay: true,
        // Navigation arrows
        navigation: {
            nextEl: '.slider-next',
            prevEl: '.slider-prev',
        },
    });
    // ========================= Home 6 testimonial Js End ==============


    // =========================  team Js Start ==============
    var slider = new Swiper('.team-slider-active', {
        slidesPerView: 'auto',
        spaceBetween: 24,
        loop: true,
        speed: 3500,
        autoplay: true,
    });
    // =========================  team Js End ==============


    // =========================  footer gallery Js Start ==============
    var slider = new Swiper('.footer-gallery-active', {
        slidesPerView: 'auto',
        spaceBetween: 24,
        loop: true,
        speed: 3500,
        autoplay: true,
        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next-2',
            prevEl: '.swiper-button-prev-2',
        },
    });
    // =========================  footer gallery Js End ==============


    // =========================  shop Js Start ==============

    var shopSwiper = new Swiper(".shop-slider-active", {
        loop: true,
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
    });
    var shopSwiper2 = new Swiper(".shop-slider-active2", {
        loop: true,
        spaceBetween: 10,
        thumbs: {
            swiper: shopSwiper,
        },
    });
    // =========================  shop Js End ==============



})(jQuery);