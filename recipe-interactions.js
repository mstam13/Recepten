// Small per-recipe-page interactions: print button and the
// servings/yield scaler that recalculates ingredient quantities.
(function () {
  document.querySelectorAll('[data-print-button]').forEach(function (button) {
    button.addEventListener('click', function () {
      window.print();
    });
  });

  var scaler = document.querySelector('[data-servings-control]');
  if (!scaler) {
    return;
  }

  var input = scaler.querySelector('[data-servings-input]');
  var baseServings = parseFloat(scaler.dataset.baseServings) || parseFloat(input.value) || 1;
  var amounts = document.querySelectorAll('[data-amt]');

  function formatAmount(value) {
    var rounded = Math.round(value * 10) / 10;
    return rounded.toString();
  }

  function update() {
    var current = parseFloat(input.value);
    if (!current || current <= 0) {
      return;
    }
    var factor = current / baseServings;
    amounts.forEach(function (el) {
      var base = parseFloat(el.dataset.amt);
      el.textContent = formatAmount(base * factor);
    });
  }

  scaler.querySelectorAll('[data-servings-decrease], [data-servings-increase]').forEach(function (button) {
    button.addEventListener('click', function () {
      var step = button.hasAttribute('data-servings-decrease') ? -1 : 1;
      var next = Math.max(1, (parseInt(input.value, 10) || baseServings) + step);
      input.value = next;
      update();
    });
  });

  input.addEventListener('input', update);
})();
