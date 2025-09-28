// Better NYT Crossword - Content Script
// Hides banner and improves crossword experience

(function () {
  "use strict";

  // Configuration
  const config = {
    hideBanner: true,
    hideAds: true,
    improveLayout: true,
  };

  // Load user preferences
  chrome.storage.sync.get(
    ["hideBanner", "hideAds", "improveLayout"],
    function (result) {
      config.hideBanner = result.hideBanner !== false; // default true
      config.hideAds = result.hideAds !== false; // default true
      config.improveLayout = result.improveLayout !== false; // default true

      applyImprovements();
    }
  );

  function applyImprovements() {
    // Hide banner elements
    if (config.hideBanner) {
      hideBannerElements();
    }

    // Hide ads
    if (config.hideAds) {
      hideAds();
    }

    // Improve layout
    if (config.improveLayout) {
      improveLayout();
    }
  }

  function hideBannerElements() {
    const selectors = [
      "#banner-portal", // Common banner class
      ".pz-header",
      ".pz-hide-loading",
      ".pz-game-header",
    ];

    document.onload(() => {
      selectors.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        console.log(elements);
        elements.forEach((element) => {
          element.style.visibility = "hidden !important";
        });
      });
    });
  }

  function hideAds() {
    const adSelectors = [
      ".ad",
      ".advertisement",
      ".pz-ad",
      '[class*="ad-"]',
      '[id*="ad-"]',
      ".dfp-ad",
      ".google-ad",
    ];

    adSelectors.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        element.style.display = "none !important";
      });
    });
  }

  function improveLayout() {
    // Maximize crossword area
    const gameContainer = document.querySelector(".pz-game-screen");
    if (gameContainer) {
      gameContainer.style.maxWidth = "none";
      gameContainer.style.width = "100%";
    }

    // Improve toolbar spacing
    const toolbar = document.querySelector(".pz-toolbar");
    if (toolbar) {
      toolbar.style.padding = "10px";
      toolbar.style.justifyContent = "center";
    }
  }

  // Observer for dynamically loaded content
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.addedNodes.length > 0) {
        // Re-apply improvements when new content is loaded
        setTimeout(applyImprovements, 100);
      }
    });
  });

  // Start observing
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Initial application
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyImprovements);
  } else {
    applyImprovements();
  }

  // Re-apply on page changes (for SPA navigation)
  let currentUrl = location.href;
  setInterval(() => {
    if (location.href !== currentUrl) {
      currentUrl = location.href;
      setTimeout(applyImprovements, 500);
    }
  }, 1000);
})();
