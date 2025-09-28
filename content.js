// Better NYT Crossword - Content Script
// Hides specific header elements only when triggered by popup

(function () {
  "use strict";

  function hideElements() {
    console.log("Hiding elements");
    const selector = "#banner-portal";

    const element = document.querySelector(selector);
    if (element) {
      element.remove();
      console.log("Removed banner portal");
    }
    const navBarSelector = "#js-global-nav";

    const navBarElement = document.querySelector(navBarSelector);
    if (navBarElement) {
      navBarElement.remove();
      console.log("Removed navigation bar");
    }
  }

  // Listen for messages from popup to hide elements
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "hideElements") {
      console.log("Received hideElements message from popup");
      hideElements();
      sendResponse({ success: true });
    }
  });

  console.log(
    "Better NYT Crossword content script loaded - waiting for popup trigger"
  );
})();
