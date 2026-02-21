$(document).ready(function() {
  $('#cart-button').click(function() {
    $('#cart').toggleClass('active');
  });

  $('.add-to-cart').click(function() {
    var name = $(this).data('name');
    var price = parseFloat($(this).data('price'));
    var itemHtml = `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        ${name} - $<span class="item-price">${price.toFixed(2)}</span>
        <div>
          <button class="btn btn-primary btn-sm quantity-change" data-change="-1">-</button>
          <span class="item-quantity">1</span>
          <button class="btn btn-primary btn-sm quantity-change" data-change="1">+</button>
          <button class="btn btn-warning text-white btn-sm delete-item">Delete</button>
        </div>
      </li>`;
    $('#cart-items').append(itemHtml);
    updateCartCount();
    updateTotal();
  });

  $('#cart-items').on('click', '.quantity-change', function() {
    var $item = $(this).closest('li');
    var $quantitySpan = $item.find('.item-quantity');
    var quantity = parseInt($quantitySpan.text());
    var change = parseInt($(this).data('change'));
    var newQuantity = quantity + change;
    if (newQuantity > 0) {
      $quantitySpan.text(newQuantity);
      updateTotal();
    }
  });

  $('#cart-items').on('click', '.delete-item', function() {
    $(this).closest('li').remove();
    updateCartCount();
    updateTotal();
  });

  function updateCartCount() {
    var itemCount = $('#cart-items').find('li').length;
    $('#cart-count').text(itemCount);
  }

  function updateTotal() {
    var total = 0;
    $('#cart-items').find('li').each(function() {
      var price = parseFloat($(this).find('.item-price').text());
      var quantity = parseInt($(this).find('.item-quantity').text());
      total += price * quantity;
    });
    $('#total').text('Total: $' + total.toFixed(2));
  }
});