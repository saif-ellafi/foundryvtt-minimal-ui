![GitHub all releases](https://img.shields.io/github/downloads/saif-ellafi/foundryvtt-minimal-ui/total?logo=GitHub) ![GitHub release (latest by date)](https://img.shields.io/github/downloads/saif-ellafi/foundryvtt-minimal-ui/latest/total) ![GitHub release (latest by date)](https://img.shields.io/github/v/release/saif-ellafi/foundryvtt-minimal-ui) ![GitHub issues](https://img.shields.io/github/issues-raw/saif-ellafi/foundryvtt-minimal-ui) ![GitHub](https://img.shields.io/github/license/saif-ellafi/foundryvtt-minimal-ui)

# JV's Minimal UI for FoundryVTT

Extremely Configurable UI module, allows the user to hide, collapse or auto-hide components separately.

This includes hiding Foundry's Logo, Players List, Scene Navigation and Macro Bar.

### _Created by: JeansenVaars_ - If you like this, [invite me a Coffee](#by-jeansenvaars) :)
#### [This module was made for free, with joy, hard work, to be shared with a wonderful community, and tons of Coffee :D!](https://ko-fi.com/jeansenvaars)
[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/V7V14D3AH)

(Minimal UI + Window Controls)
![img.png](example22.png)

## Compatibility issues?

I work on this module based on my personal preferences, and of course share it with others because I love doing so!

Having said that, I only use a small limited subset of modules myself, and making modules work with others out there takes work,
which I am usually honestly not motivated to do. Do consider inviting me a Coffee and let me know which one doesn't work for you, I'll be more inspired afterwards :)

Do track the issue however, it is good that it is not forgotten, or of course feel welcome to submit a pull request that makes it work and I'll happily accept it and give credits.

If you are a Module developer, do consider being Minimal UI Friendly. In terms of colors, this snippet may help you when sharing the colors that Minimal UI settings apply:
```
if (game.modules.get('minimal-ui')?.active) {
  const rootStyle = document.querySelector(':root').style;
  rootStyle.setProperty('--any1-color-property', game.settings.get('minimal-ui', 'shadowColor'));
  rootStyle.setProperty('--any2-color-property', game.settings.get('minimal-ui', 'borderColor'));
}
```

# Appreciations
* Thanks to colorsettings by ardittristan: Minimal UI has a color picker!
* Thanks to vance in the FoundryVTT Discord: Minimal UI is better written!
* Thanks to the FoundryVTT Discord community for the amazing issue reports and feedback.
* Thanks to Merudo for being the first code contributor to Minimal UI as an open source module!
* Thanks to Greayhead for German Translations
* Thanks to BrotherSharper for the wonderful Japanese Translations

## Special Minimal UI Module Companions

### Window Controls
* Let your windows have Minimize, Maximize, Close and Pin Buttons to finally find that character among the many windows open you have
* Organize both minimized and open windows in a lean (invisible when not used) window bar
[Check it out](https://foundryvtt.com/packages/window-controls)

### Scene Preview
* Take a quick look at your inactive scenes by moving your mouse over the navigation panel
[Check it out](https://foundryvtt.com/packages/scene-preview)

### Sidebar and Chat Resizer
* Resize everything to your liking
[Check it out](https://github.com/saif-ellafi/foundryvtt-sidebar-resizer)

## Minimal UI Features

## Foundry Logo
* Custom logo image can be provided
* Foundry Logo may be hidden or resized
* Can be made clickable to toggle show/hide HUD (Including chat or not)
  
## Player List
* Players list may be hidden completely, shown on mouse over or shown normally
* Small or standard sizes available

## Right Side Panel
* May be collapsed by default
* Improves User Experience Workflow when using floating windows
  
## Scene Navigation
* Allows Completely Hiding or having the scene navigation collapsed by default

## Macro Hotbar
* Macro Bar may be hidden, collapsed, auto-hidden (default) or shown
* Macro Bar may be repositioned along the X-Axis

## Left Side Control Buttons
* May be shown normally, Auto-Hide or Auto-Hide-Plus
* Left controls buttons may be standard or small size

## Camera Panel
* May be reduced or hidden when players don't have cameras turned on
  
## Customization
* Default settings target a balance between gaining space and functionality
* Colors of borders and shadows and their strength customizable across all Foundry VTT
* Define Transparency when moving the mouse over components!
* Check the settings to customize your experience!

## Patches to Foundry
These are bugs in FoundryVTT that are not currently addressed but are more obvious when using Minimal UI
* When clicking on a sidebar menu that was opened but then closed, clicking on it will open it again instead of doing nothing
* If a window is minimized, when reopened, it would be maximized instead of doing nothing
* If a window is open, but behind other windows, it would be brought to the front when reopened, instead doing of nothing

## By JeansenVaars
![JVLogo](logo-small-black.png)

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/V7V14D3AH)

## Check out my other modules!
* Window Controls (Recommended combination!)
* Scene Preview (Recommended combination!)
* Super Select

# Support with Systems and Modules
MinimalUI is made as agnostic as possible. Yet, it is impossible to ensure maximum compatibility.
I invite you to share any systems or modules that conflict with MinimalUI or do not look correctly.
Also do share systems and modules Minimal UI already works with too!

# Build from Source
Plugins: `rollup`, `rollup-plugin-css-porter`, `npm-build-zip`
Build Script: `npm run build`

# License
[MIT License](./LICENSE.md)

# Powered By
[![JetBrains](./jetbrains.svg)](https://www.jetbrains.com)

Thanks to JetBrains I can work on this project using **WebStorm**.
