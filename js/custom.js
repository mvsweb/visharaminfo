$(function () {
    'use strict'; // Start of use strict

    // Responsive hotfix for mobile/tablet layout stability.
    // This safely overrides the existing stylesheet without changing desktop design.
    var responsiveFixCss = `
        html, body {
            max-width: 100%;
            overflow-x: hidden;
        }

        img, svg, video, canvas {
            max-width: 100%;
            height: auto;
        }

        .wrapper {
            overflow-x: hidden;
            overflow-y: visible;
        }

        .navbar {
            z-index: 1030;
        }

        .navbar-container,
        .navbar-collapse,
        .footer-container {
            max-width: 100%;
        }

        .navbar-toggler {
            border: 0;
            padding: 8px 10px;
        }

        .header-title,
        .about-title,
        .pricing-title h2,
        .vertical-slider-title,
        .testimonials-title {
            overflow-wrap: anywhere;
        }

        .learn-more-btn,
        .learn-extra-btn {
            text-align: center;
            white-space: normal;
        }

        .service-box,
        .blog-details,
        .pricing-card,
        .contact-form {
            max-width: 100%;
        }

        @media screen and (max-width: 991px) {
            .navbar {
                margin-top: 0;
                padding-top: 8px;
                padding-bottom: 8px;
                background-color: #fff !important;
                box-shadow: 0 4px 6px 0 rgba(12, 0, 46, .05);
            }

            .navbar-brand img,
            .header-scrolled .navbar-brand img {
                width: 120px;
                margin-left: 0;
            }

            .navbar-collapse {
                width: 100%;
                margin-top: 10px;
                max-height: calc(100vh - 75px);
                overflow-y: auto;
                border-radius: 0 0 12px 12px;
            }

            .navbar-nav {
                align-items: stretch;
            }

            .nav-item {
                margin-left: 0;
                margin-right: 0;
            }

            .nav-item .nav-link {
                text-align: center;
                padding: 10px 12px;
            }

            .header {
                padding-top: 110px;
                padding-bottom: 55px;
                background-size: cover;
                background-position: center top;
            }

            .header-container {
                padding-left: 15px;
                padding-right: 15px;
            }

            .header-title-section {
                margin-top: 24px;
                padding-left: 0;
                padding-right: 0;
            }

            .header-title {
                font-size: 34px;
                line-height: 1.2;
            }

            .header-title-text {
                font-size: 16px;
                line-height: 1.5;
            }

            .about-title,
            .pricing-title h2,
            .vertical-slider-title {
                font-size: 32px;
                line-height: 1.25;
            }

            .footer-subsection,
            .footer-logo {
                padding-left: 15px;
                padding-right: 15px;
            }
        }

        @media screen and (max-width: 575px) {
            .header {
                padding-top: 95px;
                padding-bottom: 45px;
            }

            .header-title {
                font-size: 28px !important;
                line-height: 1.2;
                margin-bottom: 12px;
            }

            .header-title-text {
                font-size: 15px !important;
                line-height: 1.55;
                margin-bottom: 18px;
            }

            .learn-more-btn-section {
                justify-content: center;
                width: 100%;
            }

            .learn-more-btn,
            .learn-extra-btn {
                width: 100%;
                max-width: 290px;
                font-size: 14px !important;
                padding: 10px 14px !important;
                margin-left: auto;
                margin-right: auto;
            }

            .about-title,
            .pricing-title h2,
            .vertical-slider-title {
                font-size: 28px;
            }

            .about-text,
            .vertical-slider-text,
            .testimonials-slider-text,
            .footer-logo p,
            .footer-subsection-text,
            .footer-subsection-list li {
                font-size: 15px;
                line-height: 1.55;
            }

            .service-list .service-box {
                padding: 22px;
            }

            .client-box {
                width: 120px;
                height: 120px;
            }

            form.contact-form {
                padding: 16px;
            }
        }

        @media screen and (max-width: 360px) {
            .header-title {
                font-size: 25px !important;
            }

            .navbar-brand img,
            .header-scrolled .navbar-brand img {
                width: 105px;
            }
        }
    `;

    $('<style id="mobile-responsive-hotfix"></style>').text(responsiveFixCss).appendTo('head');

    //hide preloader after loaded
    jQuery('#preloader').delay(500).fadeOut(500);

    // Fixed Navigation js
    $(window).scroll(function () {
        if ($(this).scrollTop() > 20) {
            $('#navbar').addClass('header-scrolled');
        } else {
            $('#navbar').removeClass('header-scrolled');
        }
    });

    // testimonials Slider
    $(".owl-testimonials-slider").owlCarousel({
        items: 1,
        loop: true,
        nav: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });

    // Mobile navbar close after clicking a menu item.
    $('.navbar-mobile .nav-item .nav-link').on('click', function () {
        var $navbarCollapse = $('#navbarNav');
        if ($(window).width() <= 991 && $navbarCollapse.hasClass('show')) {
            $('.navbar-toggler').trigger('click');
        }
    });

    // Keep mobile menu state correct after screen rotation / browser resize.
    $(window).on('resize', function () {
        if ($(window).width() > 991) {
            $('#navbarNav').removeClass('show');
            $('.navbar-toggler').attr('aria-expanded', 'false');
        }
    });
});
