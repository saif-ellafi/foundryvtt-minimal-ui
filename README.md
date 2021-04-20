# Minimal UI for FoundryVTT

Configurable UI module, allows the user to hide, collapse or auto-hide components separately.

This includes hiding Foundry's Logo, Players List, Scene Navigation and Macro Bar.

## Special Minimal UI Features

### Dynamic Mode (Default: OFF)
Auto-Hides UI elements after Chat inactivity or when switching scenes.
This allows making up space intelligently for you to save space during actual game
without having to manually hide unwanted elements.

### Organized Minimize (Default: OFF)
Intelligently positions minimized windows in a dedicated horizontal area, and 
allows displaying a taskbar for it. This helps to find minimized windows quickly.

## Foundry Logo
* Foundry Logo may be hidden or resized
* Can be made clickable to toggle show/hide HUD (Including chat or not)
  
## Player List
* Players list may be hidden completely, shown on mouse over or shown normally

## Right Side Panel
* May be collapsed by default
  
## Scene Navigation
* Scene Navigation allows preview the map on mouse over (GM Only)
* Allows Hiding or having the scene navigation collapsed by default

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
* Colors of borders and shadows and their strength customizable
* Position of elements in the UI can be modified

# Support with Systems and Modules
MinimalUI is made as agnostic as possible. Yet, it is impossible to ensure maximum compatibility.
I invite you to share any systems or modules that conflict with MinimalUI or do not look correctly.
Also do share systems and modules Minimal UI already works with too!

# Build from Source
Plugins: `rollup`, `rollup-plugin-css-porter`, `npm-build-zip`
Build Script: `npm run build`

# Appreciations
* Thanks to lib - colorsettings module which is a dependency
* Thanks to libWrapper module Minimal UI can work with better compatibility
* Thanks to the FoundryVTT Discord community for the issue reports and feedback.

![Example GIF](./examplegif-long3.gif)
![Example Image](./example12.jpg)

# Powered By
[![JetBrains](./jetbrains.svg)](https://www.jetbrains.com)