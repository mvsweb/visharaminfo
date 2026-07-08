$(function () {
    'use strict';
    document.title = 'Vtechiee: SMB Websites, Business Portals, Cloud Care & SAP B1 Support';
    $('meta[name="description"]').attr('content', 'Vtechiee helps SMBs launch revenue-ready websites, e-commerce stores, business portals, managed cloud support and SAP Business One support.');
    $('meta[property="og:url"]').attr('content', 'https://vtechiee.com/');
    $('meta[property="og:image"]').attr('content', 'https://vtechiee.com/images/vtechiee-logo.svg');
    $('meta[name="twitter:image"]').attr('content', 'https://vtechiee.com/images/vtechiee-logo.svg');
    $('link[rel="icon"]').attr('href', 'images/vtechiee-favicon.svg').attr('type', 'image/svg+xml');
    if (!$('link[href="css/growth-base.css"]').length) $('head').append('<link rel="stylesheet" href="css/growth-base.css">');
    if (!$('script[src="js/growth-layer.js"]').length) $.getScript('js/growth-layer.js');
    $('.header-title').filter(function () { return $.trim($(this).text()) === 'SAP B1 Support,Upgradtions'; }).text('SAP B1 Support & Upgrades');
    var $brandLogo = $('.navbar-brand-logo').first();
    if ($brandLogo.length) $brandLogo.attr('aria-label','Vtechiee').html('<img src="images/vtechiee-logo.svg" class="vtechiee-main-logo" alt="Vtechiee Cloud SAP Software">');
    $('<style id="vtechiee-logo-style"></style>').text('.vtechiee-main-logo{width:260px;max-width:100%;height:auto;display:block}.navbar-brand{min-width:280px}.navbar{min-height:86px}.header-scrolled .vtechiee-main-logo{width:220px}@media(max-width:991px){.vtechiee-main-logo{width:210px}.navbar-brand{min-width:auto}.navbar{min-height:78px}}@media(max-width:575px){.vtechiee-main-logo{width:180px}.header-scrolled .vtechiee-main-logo{width:165px}.navbar{min-height:72px}}').appendTo('head');
    if ($.fn.owlCarousel) $('.owl-testimonials-slider').owlCarousel({items:1,loop:true,nav:true,autoplay:true,autoplayTimeout:5000,autoplayHoverPause:false});
    $('.navbar-mobile .nav-item .nav-link').on('click',function(){var $nav=$('#navbarNav');if($(window).width()<=991&&$nav.hasClass('show'))$('.navbar-toggler').trigger('click');});
    $(window).on('scroll',function(){if($(this).scrollTop()>20)$('#navbar').addClass('header-scrolled');else $('#navbar').removeClass('header-scrolled');});
    jQuery('#preloader').delay(500).fadeOut(500);
});
