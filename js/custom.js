$(function () {
    'use strict';

    var siteName = 'Vtechiee';
    var siteUrl = 'https://visharaminfo.in/';
    var siteTitle = 'Vtechiee: Software Development, Website Design & Cloud Solutions';
    var siteDescription = 'Website development company in Melvisharam, Ranipet and Vellore offering React, PHP, Node, WordPress, eCommerce, SAP B1 support, hosting and cloud solutions.';

    document.title = siteTitle;
    $('meta[name="description"]').attr('content', siteDescription);
    $('meta[name="keywords"]').attr('content', 'website development, web design, software development, SAP B1 support, cloud solutions, hosting, ecommerce website, Melvisharam, Ranipet, Vellore');
    $('meta[name="author"]').attr('content', siteName);
    $('meta[property="og:title"]').attr('content', siteTitle);
    $('meta[property="og:site_name"]').attr('content', siteName);
    $('meta[property="og:url"]').attr('content', siteUrl);
    $('meta[property="og:description"]').attr('content', siteDescription);
    $('meta[name="twitter:title"]').attr('content', siteTitle);
    $('meta[name="twitter:description"]').attr('content', siteDescription);

    $('.header-title').filter(function () {
        return $.trim($(this).text()) === 'SAP B1 Support,Upgradtions';
    }).text('SAP B1 Support & Upgrades');

    // Replace the tiny/poor header image logo with a clean responsive brand lockup.
    var $brandLogo = $('.navbar-brand-logo').first();
    if ($brandLogo.length && !$brandLogo.find('.brand-lockup').length) {
        $brandLogo.attr('aria-label', siteName);
        $brandLogo.html(
            '<span class="brand-lockup">' +
                '<span class="brand-mark">V</span>' +
                '<span class="brand-copy">' +
                    '<span class="brand-name">Vtechiee</span>' +
                    '<span class="brand-tagline">IT Solutions</span>' +
                '</span>' +
            '</span>'
        );
    }

    var responsiveFixCss = `
        html, body {
            max-width: 100%;
            overflow-x: hidden;
            scroll-behavior: smooth;
        }

        img, svg, video, canvas {
            max-width: 100%;
            height: auto;
        }

        a:focus,
        button:focus,
        input:focus,
        textarea:focus {
            outline: 2px solid #003379 !important;
            outline-offset: 3px;
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

        .navbar-brand {
            min-width: 210px;
            margin-right: 18px;
        }

        .navbar-brand-logo,
        .navbar-brand-logo:hover,
        .navbar-brand-logo:focus {
            display: inline-flex;
            align-items: center;
            text-decoration: none;
        }

        .brand-lockup {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            min-width: 190px;
            padding: 6px 0;
        }

        .brand-mark {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 44px;
            height: 44px;
            border-radius: 12px;
            background: #003379;
            color: #fff;
            font-family: Inter, sans-serif;
            font-size: 27px;
            font-weight: 800;
            line-height: 1;
            letter-spacing: -1px;
            box-shadow: 0 8px 18px rgba(0, 51, 121, 0.18);
        }

        .brand-copy {
            display: flex;
            flex-direction: column;
            justify-content: center;
            line-height: 1.05;
        }

        .brand-name {
            color: #003379;
            font-family: Inter, sans-serif;
            font-size: 25px;
            font-weight: 800;
            letter-spacing: -0.8px;
            white-space: nowrap;
        }

        .brand-tagline {
            margin-top: 4px;
            color: #5f6f89;
            font-family: Inter, sans-serif;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 1.4px;
            text-transform: uppercase;
            white-space: nowrap;
        }

        .header-scrolled .brand-lockup {
            gap: 10px;
        }

        .header-scrolled .brand-mark {
            width: 38px;
            height: 38px;
            font-size: 23px;
            border-radius: 10px;
        }

        .header-scrolled .brand-name {
            font-size: 22px;
        }

        .header-scrolled .brand-tagline {
            font-size: 10px;
        }

        .navbar-toggler {
            border: 0;
            padding: 8px 10px;
        }

        .nav-link-menu {
            margin: 0;
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

            .navbar-brand {
                min-width: auto;
                margin-right: 0;
            }

            .brand-lockup {
                min-width: auto;
                gap: 10px;
                padding: 4px 0;
            }

            .brand-mark {
                width: 40px;
                height: 40px;
                font-size: 24px;
                border-radius: 11px;
            }

            .brand-name {
                font-size: 23px;
            }

            .brand-tagline {
                font-size: 10px;
                letter-spacing: 1.1px;
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
                padding-top: 115px;
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
            .navbar {
                min-height: 76px;
            }

            .brand-lockup {
                gap: 8px;
            }

            .brand-mark {
                width: 38px;
                height: 38px;
                font-size: 23px;
                border-radius: 10px;
            }

            .brand-name {
                font-size: 21px;
            }

            .brand-tagline {
                font-size: 9px;
                letter-spacing: 0.9px;
            }

            .ti-layout-grid2 {
                font-size: 28px;
            }

            .header {
                padding-top: 105px;
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
            .brand-mark {
                width: 34px;
                height: 34px;
                font-size: 20px;
            }

            .brand-name {
                font-size: 19px;
            }

            .brand-tagline {
                display: none;
            }

            .header-title {
                font-size: 25px !important;
            }
        }
    `;

    $('#mobile-responsive-hotfix').remove();
    $('<style id="mobile-responsive-hotfix"></style>').text(responsiveFixCss).appendTo('head');

    jQuery('#preloader').delay(500).fadeOut(500);

    $(window).scroll(function () {
        if ($(this).scrollTop() > 20) {
            $('#navbar').addClass('header-scrolled');
        } else {
            $('#navbar').removeClass('header-scrolled');
        }
    });

    if ($.fn.owlCarousel) {
        $('.owl-testimonials-slider').owlCarousel({
            items: 1,
            loop: true,
            nav: true,
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: false,
            responsiveClass: true,
            responsive: {
                0: { items: 1 },
                600: { items: 1 },
                1000: { items: 1 }
            }
        });
    }

    $('.navbar-mobile .nav-item .nav-link').on('click', function () {
        var $navbarCollapse = $('#navbarNav');
        if ($(window).width() <= 991 && $navbarCollapse.hasClass('show')) {
            $('.navbar-toggler').trigger('click');
        }
    });

    $(window).on('resize', function () {
        if ($(window).width() > 991) {
            $('#navbarNav').removeClass('show');
            $('.navbar-toggler').attr('aria-expanded', 'false');
        }
    });

    var $contactForm = $('.contact-form').first();
    if ($contactForm.length) {
        var cleanForm = $contactForm.clone(false)[0];
        $contactForm[0].parentNode.replaceChild(cleanForm, $contactForm[0]);
        $contactForm = $(cleanForm);

        $contactForm.on('submit', function (event) {
            event.preventDefault();

            var name = $.trim($('#name').val() || '');
            var mobile = $.trim($('#mobile').val() || '');
            var email = $.trim($('#email').val() || '');
            var message = $.trim($('#message').val() || '');
            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            var mobilePattern = /^[0-9+\-\s()]{7,20}$/;

            if (!name || !mobile || !email || !message) {
                alert('Please fill in all required details.');
                return;
            }

            if (!emailPattern.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            if (!mobilePattern.test(mobile)) {
                alert('Please enter a valid mobile number.');
                return;
            }

            var $submitButton = $contactForm.find('button[type="submit"], input[type="submit"]').first();
            var originalButtonText = $submitButton.is('input') ? $submitButton.val() : $submitButton.text();

            if ($submitButton.length) {
                $submitButton.prop('disabled', true);
                if ($submitButton.is('input')) {
                    $submitButton.val('Sending...');
                } else {
                    $submitButton.text('Sending...');
                }
            }

            function resetButton() {
                if ($submitButton.length) {
                    $submitButton.prop('disabled', false);
                    if ($submitButton.is('input')) {
                        $submitButton.val(originalButtonText);
                    } else {
                        $submitButton.text(originalButtonText);
                    }
                }
            }

            if (window.emailjs && typeof emailjs.sendForm === 'function') {
                emailjs.sendForm('service_6iixv9p', 'template_pkr57uq', cleanForm)
                    .then(function () {
                        alert('Message sent successfully!');
                        cleanForm.reset();
                        resetButton();
                    }, function (error) {
                        console.log(error);
                        alert('Failed to send message. Please try again.');
                        resetButton();
                    });
            } else {
                $.ajax({
                    type: 'POST',
                    url: 'https://visharaminfo.in/contact.php',
                    data: {
                        name: name,
                        email: email,
                        mobile: mobile,
                        message: message
                    },
                    success: function (resultData) {
                        alert(resultData || 'Message sent successfully!');
                        cleanForm.reset();
                        resetButton();
                    },
                    error: function (err) {
                        console.log(err);
                        alert('Failed to send message. Please try again.');
                        resetButton();
                    }
                });
            }
        });
    }
});
