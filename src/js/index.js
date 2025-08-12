import $ from 'jquery';
import 'slick-carousel';
import '../less/main.less';
import { loadCartItems } from './cart.js';

$(document).ready(function () {
  /* gorny slider */
  $('.slider__container').slick({
    arrows: true,
    dots: true,
    lazyLoad: 'ondemand',
prevArrow: `<button type="button" class="slick-prev">
    <svg viewBox="0 0 20 20">
      <path d="M13.41 15.41L8.83 10.83L13.41 6.25L12 4.83L6 10.83L12 16.83L13.41 15.41Z" />
    </svg>
  </button>`,
  nextArrow: `<button type="button" class="slick-next">
    <svg viewBox="0 0 20 20">
      <path d="M6.59 15.41L11.17 10.83L6.59 6.25L8 4.83L14 10.83L8 16.83L6.59 15.41Z" />
    </svg>
  </button>`
  });

/* promo slider */
$('.promotions__slider').slick({
  slidesToShow: 4, // domyślnie 4 slajdy na desktop
  slidesToScroll: 1,
  infinite: false,
  arrows: true,
  dots: true,
    lazyLoad: 'ondemand',
  prevArrow: `<button type="button" class="slick-prev">
    <svg viewBox="0 0 20 20">
      <path d="M13.41 15.41L8.83 10.83L13.41 6.25L12 4.83L6 10.83L12 16.83L13.41 15.41Z" />
    </svg>
  </button>`,
  nextArrow: `<button type="button" class="slick-next">
    <svg viewBox="0 0 20 20">
      <path d="M6.59 15.41L11.17 10.83L6.59 6.25L8 4.83L14 10.83L8 16.83L6.59 15.41Z" />
    </svg>
  </button>`,
  responsive: [
    {
      breakpoint: 1024, // tablet
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 768, // mobile
      settings: {
        slidesToShow: 1.5, // 1,5 slajdu na mobile
        slidesToScroll: 1
      }
    }
  ]
});



/* koszyk modal */
  $('.fa-shopping-cart').on('click', function () {
    $('.cart-sidebar').addClass('open');
    // $('.cart-sidebar').toggleClass('open');
    $('.cart-overlay').fadeIn();
    loadCartItems();
  });

  $('.cart-overlay').on('click', function () {
    $('.cart').removeClass('open');
    $('.cart-sidebar').removeClass('open');
    $(this).fadeOut();
  });
  $('.close-cart').on('click', function () {
    $('.cart-sidebar').removeClass('open');
    $('.cart-overlay').fadeOut();
  });
  // search
  /*
  const $searchInput = $('#search-input');
  const $searchModal = $('#search-modal');

  $searchInput.on('click', function () {
    $searchModal.addClass('active');
  });

  $(document).on('click', function (e) {
    if (
      !$searchInput.is(e.target) && // kliknięcie nie jest na input
      $searchInput.has(e.target).length === 0 && // kliknięcie nie jest w dzieci inputa
      !$searchModal.is(e.target) && // kliknięcie nie jest na modal
      $searchModal.has(e.target).length === 0 // kliknięcie nie jest w dzieci modalu
    ) {
      $searchModal.removeClass('active');
    }
  }); */
  
  // Kliknięcie w input - otwórz modal 
jQuery(function($) {
  const $searchInput = $('#search-input');
  const $searchInputMobile = $('#search-input-mobile');
  const $searchOverlay = $('#search-overlay');
  const $searchOverlayMobile = $('#search-overlay-mobile');

  $searchInput.on('click', function () {
    $searchOverlay.show();
    $searchOverlay.toggleClass('active');
  });
  $searchInputMobile.on('click', function () {
    $searchOverlayMobile.show();
    $searchOverlayMobile.toggleClass('active');
  });

  $(document).on('click', function (e) {
    if (
      !$(e.target).closest('#search-input').length &&
      !$(e.target).closest('#search-overlay').length
    ) {
      $searchOverlay.hide();
    }
    if (
      !$(e.target).closest('#search-input-mobile').length &&
      !$(e.target).closest('#search-overlay-mobile').length
    ) {
      $searchOverlayMobile.hide();
    }
  });

  $('#search-form').on('submit', function (e) {
    e.preventDefault();
    const query = $searchInput.val().trim();
    if (query) {
      // Podmień logikę wyszukiwania według potrzeb:
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
    $searchOverlay.hide();
  });
});


  // submenu
$('.submenu-toggle').on('click', function (e) {
  e.preventDefault();

  // zamknij inne otwarte megamenu
  $('.has-submenu').not($(this).parent()).removeClass('open');

  // toggle aktualnego
  $(this).parent().toggleClass('open');
});

$(function () {
  $('.has-submenu > a').on('click', function (e) {
    e.preventDefault();

    const $submenu = $(this).siblings('.megamenu-overlay');

    // Ukryj inne otwarte megamenu
    $('.megamenu-overlay').not($submenu).slideUp(200);

    // Przełącz aktualne megamenu
    $submenu.stop(true, true).slideToggle(250);
  });

  // Opcjonalnie: klik poza menu zamyka megamenu
  $(document).on('click', function (e) {
    if (!$(e.target).closest('.has-submenu').length) {
      $('.megamenu-overlay').slideUp(200);
    }
  });
});


  $('.navbar__toggle').on('click', function () {
    $('.navbar-nav').toggleClass('open');
  });
   $('.mobile-menu').on('click', function () {
    $('.navbar-nav').toggleClass('open');
  });

  // footer
  function initFooterAccordion() {
    if ($(window).width() <= 767) {
      $('.footer__toggle').off('click').on('click', function() {
        const $list = $(this).next('.footer__list');

        // zamknij inne, jeśli chcesz tylko jedno otwarte
        $('.footer__list').not($list).removeClass('open');
        $('.footer__toggle').not(this).removeClass('open');

        $list.toggleClass('open');
        $(this).toggleClass('open');
      });
    } else {
      // na większych ekranach zawsze wszystko otwarte
      $('.footer__list').removeClass('open');
      $('.footer__toggle').removeClass('open').off('click');
    }
  }

  initFooterAccordion();

  $(window).on('resize', function() {
    initFooterAccordion();
  });



});



