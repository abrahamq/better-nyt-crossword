// Better NYT Crossword - Content Script
// Hides specific header elements

(function () {
  "use strict";

  function hideElements() {
    // Check if hiding is enabled
    chrome.storage.sync.get(["hideHeaders"], function (result) {
      const shouldHide = result.hideHeaders !== false; // default true

      console.log("shouldHide:", shouldHide);
      if (shouldHide) {
        console.log("Hiding elements");
        const selector = "#banner-portal";

        const element = document.querySelector(selector);
        if (element) {
          element.remove();
        }
        const navBarSelector = "#js-global-nav";

        const navBarElement = document.querySelector(navBarSelector);
        if (navBarElement) {
          navBarElement.remove();
        }
      }
    });
  }

  // Run immediately
  document.addEventListener("DOMContentLoaded", () => {
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.addedNodes.length > 0) {
          hideElements();
        }
      });
    });

    observer.observe(document.querySelector("#banner-portal"), {
      childList: true,
      subtree: true,
    });
  });

  // Re-apply on page changes (for SPA navigation)
  let currentUrl = location.href;
  setInterval(() => {
    if (location.href !== currentUrl) {
      currentUrl = location.href;
      setTimeout(hideElements, 500);
    }
  }, 1000);
})();
