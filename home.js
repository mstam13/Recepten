// Home page interactions: recipe search, tag filters, and a
// random-recipe shortcut for "what shall we cook tonight?".
(function () {
  var cards = Array.prototype.slice.call(document.querySelectorAll('.recipe-card'));
  var searchInput = document.getElementById('recipe-search');
  var tagButtons = Array.prototype.slice.call(document.querySelectorAll('[data-filter-tag]'));
  var resetButton = document.querySelector('[data-filter-reset]');
  var noResults = document.getElementById('no-results-message');
  var randomButton = document.querySelector('[data-random-recipe]');
  var activeTags = [];

  function matches(card) {
    var term = ((searchInput && searchInput.value) || '').trim().toLowerCase();
    var text = (card.dataset.search || '').toLowerCase();
    var tags = (card.dataset.tags || '').split(/\s+/).filter(Boolean);

    var searchOk = !term || text.indexOf(term) !== -1;
    var tagsOk = activeTags.every(function (tag) {
      return tags.indexOf(tag) !== -1;
    });
    return searchOk && tagsOk;
  }

  function applyFilters() {
    var visibleCount = 0;
    cards.forEach(function (card) {
      var visible = matches(card);
      card.hidden = !visible;
      if (visible) {
        visibleCount += 1;
      }
    });

    document.querySelectorAll('.category').forEach(function (section) {
      var hasVisibleCard = section.querySelectorAll('.recipe-card:not([hidden])').length > 0;
      section.hidden = !hasVisibleCard;
    });

    if (noResults) {
      noResults.hidden = visibleCount !== 0;
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  tagButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var tag = button.dataset.filterTag;
      var alreadyActive = button.getAttribute('aria-pressed') === 'true';
      button.setAttribute('aria-pressed', String(!alreadyActive));
      if (alreadyActive) {
        activeTags = activeTags.filter(function (t) { return t !== tag; });
      } else {
        activeTags.push(tag);
      }
      applyFilters();
    });
  });

  if (resetButton) {
    resetButton.addEventListener('click', function () {
      if (searchInput) {
        searchInput.value = '';
      }
      activeTags = [];
      tagButtons.forEach(function (button) {
        button.setAttribute('aria-pressed', 'false');
      });
      applyFilters();
    });
  }

  if (randomButton) {
    randomButton.addEventListener('click', function () {
      var links = cards
        .map(function (card) { return card.querySelector('a'); })
        .filter(Boolean);
      if (!links.length) {
        return;
      }
      var choice = links[Math.floor(Math.random() * links.length)];
      window.location.href = choice.getAttribute('href');
    });
  }
})();
