import $ from 'jquery';

export function loadCartItems() {
  $.ajax({
    url: './products.json', // ścieżka do JSONa
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      const $cartBody = $('.cart-body');
      $cartBody.empty(); // wyczyść zawartość

      data.forEach(product => {
        const productHTML = `
          <div class="cart-item">
            <img src="${product.img}" alt="${product.name}">
            <div class="cart-item-info">
              <h5>${product.name}</h5>
              <span>${product.price}</span>
            </div>
          </div>
        `;
        $cartBody.append(productHTML);
      });
    },
    error: function () {
      $('.cart-body').html('<p>Błąd ładowania danych.</p>');
    }
  });
}
