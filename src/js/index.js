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
  slidesToShow: 4,
  slidesToScroll: 1,
  dots: true,
  arrows: true,
  infinite: true,
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
      breakpoint: 992,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1
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
  
  // Kliknięcie w input - otwórz modal (tablet+)
jQuery(function($) {
  const $searchInput = $('#search-input');
  const $searchOverlay = $('#search-overlay');

  $searchInput.on('click', function () {
    $searchOverlay.show();
  });

  $(document).on('click', function (e) {
    if (
      !$(e.target).closest('#search-input').length &&
      !$(e.target).closest('#search-overlay').length
    ) {
      $searchOverlay.hide();
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
  $('.has-submenu > a').on('click', function(e) {
    e.preventDefault();
    const $parentLi = $(this).parent();
    $parentLi.toggleClass('open');
  });
});


