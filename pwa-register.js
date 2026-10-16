// Registers the service worker for basic offline support. The
// worker's URL is resolved relative to this script's own location,
// so registration works the same from the home page and from a
// page inside recipes/.
(function () {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  var scriptUrl = document.currentScript && document.currentScript.src;
  var swUrl = scriptUrl ? new URL('sw.js', scriptUrl).href : 'sw.js';

  window.addEventListener('load', function () {
    navigator.serviceWorker.register(swUrl).catch(function () {
      // Offline support is a progressive enhancement; ignore failures,
      // e.g. when the site is opened locally via file:// (no secure
      // context) instead of being served over HTTPS.
    });
  });
})();
