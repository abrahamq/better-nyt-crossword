// Better NYT Crossword - Popup Script

document.addEventListener("DOMContentLoaded", function () {
  // Get DOM elements
  const hideBannerCheckbox = document.getElementById("hideBanner");
  const hideAdsCheckbox = document.getElementById("hideAds");
  const improveLayoutCheckbox = document.getElementById("improveLayout");
  const saveButton = document.getElementById("saveSettings");
  const resetButton = document.getElementById("resetSettings");
  const statusMessage = document.getElementById("statusMessage");
  const aboutLink = document.getElementById("aboutLink");
  const supportLink = document.getElementById("supportLink");

  // Load saved settings
  loadSettings();

  // Event listeners
  saveButton.addEventListener("click", saveSettings);
  resetButton.addEventListener("click", resetSettings);
  aboutLink.addEventListener("click", showAbout);
  supportLink.addEventListener("click", showSupport);

  // Auto-save on checkbox change
  [hideBannerCheckbox, hideAdsCheckbox, improveLayoutCheckbox].forEach(
    (checkbox) => {
      checkbox.addEventListener("change", autoSave);
    }
  );

  function loadSettings() {
    chrome.storage.sync.get(
      ["hideBanner", "hideAds", "improveLayout"],
      function (result) {
        hideBannerCheckbox.checked = result.hideBanner !== false; // default true
        hideAdsCheckbox.checked = result.hideAds !== false; // default true
        improveLayoutCheckbox.checked = result.improveLayout !== false; // default true
      }
    );
  }

  function saveSettings() {
    const settings = {
      hideBanner: hideBannerCheckbox.checked,
      hideAds: hideAdsCheckbox.checked,
      improveLayout: improveLayoutCheckbox.checked,
    };

    chrome.storage.sync.set(settings, function () {
      showStatus("Settings saved successfully!", "success");

      // Reload the current tab if it's a NYT crossword page
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const currentTab = tabs[0];
        if (
          currentTab.url &&
          currentTab.url.includes("nytimes.com/crosswords")
        ) {
          chrome.tabs.reload(currentTab.id);
        }
      });
    });
  }

  function autoSave() {
    // Debounce auto-save
    clearTimeout(autoSave.timeout);
    autoSave.timeout = setTimeout(() => {
      saveSettings();
    }, 500);
  }

  function resetSettings() {
    hideBannerCheckbox.checked = true;
    hideAdsCheckbox.checked = true;
    improveLayoutCheckbox.checked = true;

    saveSettings();
    showStatus("Settings reset to default", "info");
  }

  function showStatus(message, type = "info") {
    statusMessage.textContent = message;
    statusMessage.className = `status-message ${type}`;
    statusMessage.classList.remove("hidden");

    // Hide after 3 seconds
    setTimeout(() => {
      statusMessage.classList.add("hidden");
    }, 3000);
  }

  function showAbout(e) {
    e.preventDefault();
    const aboutText = `
Better NYT Crossword v1.0.0

This extension enhances your New York Times crossword experience by:
• Hiding distracting subscription banners
• Removing advertisements
• Improving the layout and focus

Created to help crossword enthusiasts focus on what matters most - solving puzzles!
        `.trim();

    alert(aboutText);
  }

  function showSupport(e) {
    e.preventDefault();
    const supportText = `
Need help or have suggestions?

• Check that you're on a NYT crossword page
• Try refreshing the page after changing settings
• Make sure the extension is enabled
• Report issues on our GitHub repository

Thank you for using Better NYT Crossword!
        `.trim();

    alert(supportText);
  }

  // Check if we're on a NYT crossword page
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTab = tabs[0];
    if (currentTab.url && !currentTab.url.includes("nytimes.com/crosswords")) {
      showStatus(
        "Navigate to a NYT crossword page to see the extension in action",
        "info"
      );
    }
  });
});
