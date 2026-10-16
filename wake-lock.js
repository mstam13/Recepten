// Keep the screen awake while a recipe page is open.
// Progressive enhancement: the toggle button stays hidden (see markup)
// unless the Screen Wake Lock API is available in this browser/context.
(function () {
  document.querySelectorAll('[data-wake-lock-toggle]').forEach(function (button) {
    if (!('wakeLock' in navigator)) {
      return;
    }

    button.hidden = false;

    var wakeLock = null;
    var active = false;
    var labelOff = button.textContent.trim();
    var labelOn = button.dataset.labelOn || labelOff;

    function setPressed(pressed) {
      active = pressed;
      button.setAttribute('aria-pressed', String(pressed));
      button.classList.toggle('is-active', pressed);
      button.textContent = pressed ? labelOn : labelOff;
    }

    function requestWakeLock() {
      button.disabled = true;
      navigator.wakeLock.request('screen').then(function (lock) {
        wakeLock = lock;
        wakeLock.addEventListener('release', function () {
          wakeLock = null;
        });
        setPressed(true);
      }).catch(function () {
        setPressed(false);
      }).finally(function () {
        button.disabled = false;
      });
    }

    function releaseWakeLock() {
      setPressed(false);
      if (wakeLock) {
        wakeLock.release();
        wakeLock = null;
      }
    }

    button.addEventListener('click', function () {
      if (active) {
        releaseWakeLock();
      } else {
        requestWakeLock();
      }
    });

    // The OS/browser releases the lock whenever the tab is hidden
    // (e.g. switching apps). Re-acquire it once the page is visible
    // again, as long as the user still wants it on.
    document.addEventListener('visibilitychange', function () {
      if (active && !wakeLock && document.visibilityState === 'visible') {
        requestWakeLock();
      }
    });
  });
})();
