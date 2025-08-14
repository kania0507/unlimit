import $ from 'jquery';
import 'bootstrap'; 
import 'slick-carousel';
// import 'slick-carousel/slick/slick.min.js';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../less/main.less';
import { loadCartItems } from './cart.js';

$(document).ready(function () {
  /* gorny slider */
  if (!$('.slider__container').hasClass('slick-initialized')) {
  $('.slider__container').slick({
    arrows: true,
    dots: true,
    lazyLoad: 'ondemand',
    prevArrow: `
    <button type="button" class="slick-prev custom-arrow" aria-label="Poprzedni">
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="35.5" y="35.5" width="35" height="35" rx="17.5" transform="rotate(-180 35.5 35.5)" stroke="white"/>
      <path d="M16.7005 24L17.4354 23.2651L12.01 17.8396L17.4354 12.4141L16.7005 11.6792L10.5401 17.8396L16.7005 24Z" fill="white"/>
      <path d="M26 17.3192L11.2663 17.3192L11.2663 18.3592L26 18.3592L26 17.3192Z" fill="white"/>
      </svg>
    </button>
  `,
  nextArrow: `
  <button type="button" class="slick-next custom-arrow" aria-label="Następny">
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="35" height="35" rx="17.5" stroke="white"/>
    <path d="M19.2995 12L18.5646 12.7349L23.99 18.1604L18.5646 23.5859L19.2995 24.3208L25.4599 18.1604L19.2995 12Z" fill="white"/>
    <path d="M10 18.6808L24.7337 18.6808L24.7337 17.6408L10 17.6408L10 18.6808Z" fill="white"/>
    </svg>
  </button>
  `,
  });
}

/* promo slider */
var $defaultSlider = $('.promotions__slider');
var $clicked = false;
if (!$clicked && !$defaultSlider.hasClass('slick-initialized')) {
// var $defaultSlider = $('.tab-pane.active').find('.slider');
 var $responsiveTab = [
      {
        breakpoint: 1024, // tablet
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 768, // mobile
        settings: {
          slidesToShow: 1.5, // 1,5 slajdu na mobile
          slidesToScroll: 1,
          centerMode: false
        }
      }
    ];
  initSlider($defaultSlider, 5, $responsiveTab);
}

/* sliders & tabs */
// 2. Inicjalizacja pozostałych sliderów przy kliknięciu w zakładkę
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  var target = $(e.target).attr('href'); // np. #tab2
  $clicked == true;
  console.log(target);
  var $slider = $(target).find('.promotions__slider');

  if (!$slider.length) {
    $slider = $(target).find('.bestsellers__slider');
  }

  initSlider($slider);
  var $sliders = $($(e.target).attr('href')).find('.slick-initialized');

  $sliders.each(function () {
    $(this).slick('setPosition');
  });

  // odśwież Bootstrap grid
  setTimeout(function () {
    $(window).trigger('resize');
  }, 100); // opóźnienie dla renderowania
});


/* koszyk modal */
  $('.shopping-cart').on('click', function () {
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

  $('.nav-tabs a').on('shown.bs.tab', function (e) {
    console.log('Zakładka przełączona:', e.target);
  });

  // placeholder w form-control
  const input = document.querySelector('.form-control');
  const originalPlaceholder = input.placeholder;

  input.addEventListener('focus', () => {
    input.placeholder = '';
  });

  input.addEventListener('blur', () => {
    input.placeholder = originalPlaceholder;
  });
});



// Funkcja inicjalizująca slider tylko jeśli jeszcze nie był zainicjalizowany
function initSlider($slider, $slidesToShow = 1, $responsiveTab = [], $slidesToScroll = 1, $dots = true, $arrows = true) {
  console.log('initSlider');
  if ($slider.length && !$slider.hasClass('slick-initialized')) {
    $slider.slick({
      slidesToShow: $slidesToShow, // domyślnie 4 slajdy na desktop
      slidesToScroll: $slidesToScroll,
      infinite: true,
      dots: $dots,
      arrows: $arrows,
      responsive: $responsiveTab
    });
  } else {
    $slider.slick('setPosition'); // przeliczenie pozycji, jeśli już był zainicjowany
  }
}