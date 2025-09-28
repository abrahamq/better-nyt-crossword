# Better NYT Crossword

A Chrome extension that enhances your New York Times crossword experience by removing distracting elements and improving the layout.

## Features

- 🚫 **Hide Subscription Banners** - Remove distracting subscription prompts and paywalls
- 📢 **Remove Advertisements** - Clean up ads for a distraction-free experience
- 🎯 **Improve Layout** - Optimize spacing, focus, and overall crossword presentation
- ⚙️ **Customizable Settings** - Toggle features on/off through an easy-to-use popup
- 🎯 **Manual Control** - Banners are hidden only when you click the extension button

## Installation

### From Source (Developer Mode)

1. **Download or Clone** this repository to your local machine
2. **Open Chrome** and navigate to `chrome://extensions/`
3. **Enable Developer Mode** by toggling the switch in the top-right corner
4. **Click "Load unpacked"** and select the folder containing this extension
5. **Create Icons** (optional): Open `create-icons.html` in your browser and save the generated icons to the `icons/` folder as `icon16.png`, `icon32.png`, `icon48.png`, and `icon128.png`

### From Chrome Web Store

_Coming soon - this extension will be published to the Chrome Web Store_

## Usage

1. **Install the extension** following the instructions above
2. **Navigate** to any NYT crossword page (e.g., https://www.nytimes.com/crosswords/game/daily)
3. **Click the extension icon** in your browser toolbar to open settings
4. **Enable "Hide Headers"** checkbox if desired
5. **Click "Save Settings"** or simply toggle the checkbox to hide banners immediately
6. **Banners will be hidden** only after you take action through the popup - they remain visible by default

## Technical Details

### Manifest V3 Compliance

This extension uses the latest **Manifest V3** specifications, including:

- Service worker instead of background pages
- `chrome.action` API instead of `chrome.browserAction`
- Host permissions for enhanced security
- Modern content script injection

### Files Structure

```
better-nyt-crossword/
├── manifest.json          # Extension configuration (Manifest V3)
├── content.js            # Main content script for DOM manipulation
├── content.css           # Styles for hiding/improving elements
├── popup.html            # Extension popup interface
├── popup.js              # Popup functionality and settings
├── popup.css             # Popup styling
├── background.js         # Service worker for extension lifecycle
├── create-icons.html     # Icon generator utility
└── icons/                # Extension icons directory
    ├── icon16.png        # 16x16 toolbar icon
    ├── icon32.png        # 32x32 Windows icon
    ├── icon48.png        # 48x48 management page icon
    └── icon128.png       # 128x128 Chrome Web Store icon
```

## Development

### Prerequisites

- Chrome browser (version 88+)
- Basic knowledge of HTML, CSS, and JavaScript

### Making Changes

1. Edit the relevant files (`content.js`, `popup.js`, etc.)
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card
4. Test your changes on a NYT crossword page

### Contributing

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Privacy

This extension:

- ✅ Only runs on NYT crossword pages
- ✅ Stores settings locally in your browser
- ✅ Does not collect or transmit any personal data
- ✅ Does not track your browsing activity
- ✅ Open source - you can review all code

## Troubleshooting

### Extension Not Working?

1. **Check the URL** - Make sure you're on a NYT crossword page
2. **Click the extension icon** and save settings to hide banners
3. **Check permissions** - Ensure the extension is enabled
4. **Try incognito mode** to test without other extensions

### Settings Not Saving?

1. **Check storage permissions** in `chrome://extensions/`
2. **Try refreshing** the extension in developer mode
3. **Reset settings** using the "Reset to Default" button

### Still Having Issues?

- Check the browser console for error messages
- Disable other extensions temporarily to test for conflicts
- Try reinstalling the extension

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This extension is not affiliated with or endorsed by The New York Times. It's an independent tool created to enhance the user experience for crossword enthusiasts.
