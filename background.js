// Better NYT Crossword - Background Service Worker

// Extension installation/update handler
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    // Set default settings on first install
    chrome.storage.sync.set({
      hideHeaders: true,
    });

    console.log("Better NYT Crossword extension installed");
  } else if (details.reason === "update") {
    console.log("Better NYT Crossword extension updated");
  }
});

// Handle extension icon click (optional - popup handles most functionality)
chrome.action.onClicked.addListener((tab) => {
  // This will only fire if no popup is set
  // Since we have a popup, this is just for completeness
  if (tab.url && tab.url.includes("nytimes.com/crosswords")) {
    console.log("Extension clicked on NYT crossword page");
  }
});

// Listen for tab updates to potentially refresh content script
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "complete" &&
    tab.url &&
    tab.url.includes("nytimes.com/crosswords")
  ) {
    // Content script will automatically run due to manifest configuration
    console.log("NYT crossword page loaded");
  }
});

// Handle messages from content script or popup (if needed in future)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getSettings") {
    chrome.storage.sync.get(["hideHeaders"], (result) => {
      sendResponse(result);
    });
    return true; // Keep message channel open for async response
  }

  if (request.action === "logActivity") {
    console.log("Extension activity:", request.data);
  }
});

// Keep service worker alive (optional, for debugging)
chrome.runtime.onConnect.addListener((port) => {
  console.log("Port connected:", port.name);
});
