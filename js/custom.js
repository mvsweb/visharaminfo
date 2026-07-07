$(function () {
    'use strict';
    document.title = 'Vtechiee: SMB Websites, Business Portals, Cloud Care & SAP B1 Support';
    $('meta[name="description"]').attr('content', 'Vtechiee helps SMBs launch revenue-ready websites, e-commerce stores, business portals, managed cloud support and SAP Business One support.');
    $('meta[property="og:url"]').attr('content', 'https://vtechiee.com/');
    if (!$('link[href="css/growth-base.css"]').length) $('head').append('<link rel="stylesheet" href="css/growth-base.css">');
    if (!$('script[src="js/growth-layer.js"]').length) $.getScript('js/growth-layer.js');
    $('.header-title').filter(function () { return $.trim($(this).text()) === 'SAP B1 Support,Upgradtions'; }).text('SAP B1 Support & Upgrades');
    var $brandLogo = $('.navbar-brand-logo').first();
    if ($brandLogo.length && !$brandLogo.find('.brand-lockup').length) $brandLogo.attr('aria-label','Vtechiee').html('<span class="brand-lockup"><span class="brand-mark">V</span><span class="brand-copy"><span class="brand-name">Vtechiee</span><span class="brand-tagline">IT Solutions</span></span></span>');
    if ($.fn.owlCarousel) $('.owl-testimonials-slider').owlCarousel({items:1,loop:true,nav:true,autoplay:true,autoplayTimeout:5000,autoplayHoverPause:false});
    $('.navbar-mobile .nav-item .nav-link').on('click',function(){var $nav=$('#navbarNav');if($(window).width()<=991&&$nav.hasClass('show'))$('.navbar-toggler').trigger('click');});
    $(window).on('scroll',function(){if($(this).scrollTop()>20)$('#navbar').addClass('header-scrolled');else $('#navbar').removeClass('header-scrolled');});
    jQuery('#preloader').delay(500).fadeOut(500);
});
