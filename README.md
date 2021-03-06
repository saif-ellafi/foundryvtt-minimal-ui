# Minimal UI for FoundryVTT

Configurable UI module, allows the user to hide, collapse or auto-hide components separately.

This includes hiding Foundry's Logo, Players List, Scene Navigation and Macro Bar.

![Example GIF](./examplegif-long3.gif)

## Special Minimal UI Features

### Dynamic Mode (Default: OFF)
* Auto-Hides UI elements after Chat inactivity or when switching scenes.
Note: Since Foundry 0.8.x this feature will be no longer available 

### Organized Minimize (Moved to its own module! Search for module: Window Controls)
* Minimize Windows to a horizontal taskbar, also may include maximize and window pin button.
Note: Since Foundry 0.8.x located on its own module **Window Controls**: https://github.com/saif-ellafi/foundryvtt-window-controls

## Foundry Logo
* Custom logo image can be provided
* Foundry Logo may be hidden or resized
* Can be made clickable to toggle show/hide HUD (Including chat or not)
  
## Player List
* Players list may be hidden completely, shown on mouse over or shown normally
* Small or standard sizes available

## Right Side Panel
* May be collapsed by default
* Use with Dynamic Mode for a pseudo auto-hide experience
* Improves FoundryVTT collapsed sidebar behavior when clicking again already opened apps, that are minimized or active
  
## Scene Navigation
* Allows Hiding or having the scene navigation collapsed by default
* Preview scenes when moving your mouse over the scenes
Note: Since Foundry 0.8.x Scene Navigation Preview is on a separate module, look for **Scene Preview**: https://github.com/saif-ellafi/foundryvtt-scene-preview

## Macro Hotbar
* Macro Bar may be hidden, collapsed, auto-hidden (default) or shown
* Macro Bar may be customized to 3 slots, 6 or default 10
* Macro Bar may be repositioned along the X-Axis

## Left Side Control Buttons
* Left controls may be collapsed into a single column (or not)
* May be shown normally or auto-hide mode on mouse over 
* Left controls may be standard or small size
* Left controls may be repositioned along the Y-Axis

## Camera/Audio Controls
* Allows hiding player camera boxes, showing only GMs
  
## Customization
* Default settings target a balance between gaining space and functionality
* Colors of borders and shadows and their strength customizable across all Foundry VTT
* Check the settings to customize your experience!

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

# Appreciations
* Thanks to colorsettings by ardittristan: Minimal UI has a color picker!
* Thanks to vance in the FoundryVTT Discord: Minimal UI is better written!
* Thanks to the FoundryVTT Discord community for the amazing issue reports and feedback.

![Example Image](./example12.jpg)

# License
[MIT License](./LICENSE.md)

# Powered By
[![JetBrains](./jetbrains.svg)](https://www.jetbrains.com)

Thanks to JetBrains I can work on this project using **WebStorm**.
