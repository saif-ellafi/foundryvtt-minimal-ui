### 0.8.2
* Localization: Gracias a @lozalojo por Minimal UI en Español!!!
* Localization: Fixed english missing texts
* Bugfix: Errors on the logo images will be ignored if logo is hidden

### 0.8.1
* Enhancement: New setting allows providing custom logo image
* Bugfix: Fixed a bug causing the Minimized bar to appear when changing scenes
* Bugfix: Fixed a bug causing the Minimized bar to disappear when changing scenes after scene preview
* Bugfix: Fixed a wrong error message on some circumstances with libWrapper

### 0.8.0
* Core: Rewritten a large part of Minimal UI to fulfil better coding practices and modularity
* Core: Added support for translations
* Core: Minimal UI components are now more independent of each other
* Core: Internal components now utilize appropriate Foundry's vocabulary and naming
* Enhancement: Significantly improved Organized Minimized mode behaviour
* Enhancement: Organized Minimized Bar now hides automatically when there's nothing minimized
* Enhancement: New Organized Minimized mode: Top with Bar, allows for significant more space gains
* Enhancement: Minimized windows in Organized Minimized mode are now snappier with X to close
* Compatibility: Fixed compatibility between Minimized Mode and Custom Sheets (i.e. Monster Blocks)
* Bugfix: Several bugfixes resolved as part of the overhaul of code
* Other: Added a ko-fi page in my Readme in case someone wants to appreciate my work :)

### 0.7.0
* Enhancement: Renewed "Organized Minimize" mode now makes intelligent use of horizontal space for minimized windows
* Enhancement: "Organized Minimize" now includes a "Bar" mode that displays minimized taskbar area
* Enhancement: Work around a Foundry Bug causing collapsed tabs not to be maximized when re-clicked
* Compatibility: Integration with libWrapper for better library compatibility support
* Compatibility: colorsettings lib now a dependency and no longer included

### 0.6.1
* Bugfix: Added missing hotbar configurations (Default and Manual). Thanks GambetTV
* Bugfix: Fixed wrong default value (Right sidebar should default to shown, not collapsed)

### 0.6.0
* Enhancement: NEW (Optional) Dynamic Minimal UI mode. After 60 seconds of inactivity,
  UI will dynamically auto-hide until used or when switching Scenes. Check it out! (Experimental)
* Enhancement: Vertical positioning of Sidebar and Horizontal position of Macro now globally adjusted based on
  actual canvas size. Users on different screens should have similar experiences.
* Compatibility: Fixed bug in Foundry that didn't show the chat when clicked if sidebar was collapsed

### 0.5.7
* Compatibility: Works around a bug in Foundry that prevents opening windows when sidebar is collapsed

### 0.5.6
* Enhancement: It is now possible to collapse right panel by default
* Compatibility: Minor fixes with DND-UI
* Bugfix: Fixed wrong border color in collapsed right panel (Thanks SalieriC)

### 0.5.5
* Bugfix: Fixed broken player list on always-visible mode (sorry!)

### 0.5.4
* Bugfix: Player List should use now the same color as the left side bar
* Bugfix: Player List alignment slightly improved to stay on the left
* Compatibility: Raise My Hand module, should show the hand even on player list hover module

### 0.5.3
* Bugfix: Border colors on right side buttons should use chosen colors (Thanks SalieriC)

### 0.5.2
* Enhancement: New Experimental feature fixes the Axis of minimized windows to bottom or top
* Bugfix: Adjusted space between left side controls and its sub menu
* Bugfix: Adjusted shadow of Macro hotbar when not in auto-hide mode

### 0.5.1
* Enhancement: New setting to hide player cameras (Fan service for MarceloCortezz :))
* Bugfix: Added slightly more space between left bar columns in small size

### 0.5.0
* Enhancement: Macro Hotbar has 3 sizes: 3-6-10 Slots!
* Enhancement: Macro Hotbar collapse button in auto-hide mode removed

### 0.4.7
* Bugfix: Removed color pickers from players view settings.
  It was never intended. Please do share feedback if you think
  Minimal-UI should be configurable by players. The original 
  intention is that the GM sets the desired viewport.
  (Thank you, Fox Reinhold for the bug report)

### 0.4.6
* Bugfix: When there is no scene, controls hidden altogether (avoids some reported confusion on hidden controls)
* Bugfix: Reduced the margins on the controls and macro hotbar
* Bugfix: Slightly increased top shadow in Hotbar when auto-hidden
* Bugfix: Fixed missing borders on right side buttons (Should look more like vanilla Foundry on that side)
* Bugfix: Removed unnecessary color settings configuration

### 0.4.5
* Enhancement: Foundry Logo can be optionally shown in small, standard size or hidden!
* Enhancement: Foundry Logo can be used to Toggle the UI - Including or not the Chat! (Thanks QuantumFunks)
* Enhancement: The Scene Navigation should adjust to optimize available space based on the Foundry Logo configuration (Thanks SalieriC)

### 0.4.4
* Compatibility: DnD-UI Module is now tested and supported
* Bugfix: Effectively this time thumbnail preview is only valid for GMs (Thanks CasualTerror)

### 0.4.3
* Compatibility: SWADE Bennies should always show on visible players list (Thanks SalieriC)
* Bugfix: Scene thumbnail preview is now only valid for GMs (Thanks CasualTerror)
* Bugfix: Players List auto-hide mode is now centered and properly spaced
* Bugfix: Fixed "glitchy" players list hover animation
* Bugfix: Fixed colors not applying on launch (Thanks SalieriC)
* Bugfix: Fixed colors wrong default values

### 0.4.2
* Compatibility: Fixed compatibility with libWrapper and colorsettings in Minimal UI

### 0.4.1
* Bugfix: Integrated dependencies as a fallback for missing ColorSettings module

### 0.4.0
* Enhancement: Scene Navigation allows options to hover and preview the scene thumbnail (enabled by default)
* Enhancement: Scene Navigation allows three possible size options (default small)
* Enhancement: Now using Color Settings! Allows picking colors in real time from module settings.
* Compatibility: SWADE hides bennies when using collapsed player list (Thanks SalieriC)
* Bugfix: Fixed sliding macro Hotbar when using collapsed mode
* Bugfix: Toggle button higlight should now use configured colors
* Bugfix: Right sidebar buttons should use configured colors (Thanks SalieriC)

### 0.3.6
* Compatibility: Vertical position for Custom Hotbar now properly respected (Thanks GambetTV)
* Compatibility: hotbar aligned now as default for better compatibility with macro modules
* Bugfix: Fixed incorrect hotbar positioning in "Show Normally" Mode
* Bugfix: Fixed Macro controls positioning when not using Auto-Hide mode to look like default
* Bugfix: Shadow color now also applied to macro hover colors (Thanks SalieriC)

### 0.3.5
* Compatibility: Custom Hotbar patch applied and slightly repositioned higher than default (Thanks SalieriC for feedback)

### 0.3.4
* Enhancement: Shadow Strength borders now configurable (And their colors)
* Enhancement: Visual stability and border spacing improved (Thanks GambitTV for feedback)
* Compatibility: Bullseye module (Thanks Avitale34 for reporting)
* Compatibility: Simple Dice Roller now locks the sidebar
* Bugfix: Reduced amount of bumps in animations, hopefully to zero
* Bugfix: Applied appropriate style and colors to 'Toggle' buttons
* Bugfix: Fixed sliding Hotbar on different X-Axis positions
* Bugfix: Fixed overlapping borders in some buttons
* Bugfix: Fixed setting descriptions (Thanks plutoneId)

### 0.3.3
* Bugfix: Fixed a bug that caused Macro bar to lock itself after adding a new Macro

### 0.3.2
* Bugfix: Added scene buttons border and shadow colors to the customizable theme palette

### 0.3.1
* Enhancement: Customize your border and shadow colors for Minimal UI (Thanks SalieriC for the idea)
* Enhancement: Better and more consistent visuals and shadow colors
* Compatibility: Custom Hotbar
* Compatibility: Module compatibility styles now apply only when the modules are active, not when just installed

### 0.3.0
* Enhancement: added a lock in the macro hotbar when using auto-hide mode to stick it visible. Auto triggers when opening macros (Thanks GitHub: @jbblily)
* Enhancement: Experimental compatibility with modules that add left side controls (Quick Insert, Search Anywhere, etc)
* Enhancement: Experimental compatibility with simple dice roller when in single column mode (Thanks SalieriC)
* Enhancement: lock side panel button should always be the last button regardless of other modules
* Bugfix: removed shakiness from hovering left side controls and exceeding borders in some configuration combinations
* Bugfix: slightly compressed the space between butons in the left side control
* Bugfix: more coherent hotbar transition and shadows behavior in auto-hide mode
* Bugfix: better configuration descriptions and other minor tweaks

### 0.2.4
* Bugfix: Improved click detection of the side panel lock/unlock button
* Bugfix: Single column mode now always stays on top, to work better modules that add many components
* Style: Reduced transparency and added stronger background to left panel parts
* Style: Lowered top position maximum a little bit
* Change: Default side panel style is now expand to right, rather than a single column

### 0.2.3
* Enhancement: Added Player-list default always visible option
* Bugfix: Fixed an undesired padding resize when hovering a locked panel

### 0.2.2
* Bugfix: Fixed a wrong border-width setting causing unwanted shakes (Thanks @SoulCake)
* Bugfix: Left submenu should now appear visible and stay in fixed position
* Bugfix: Fixed hover area not being detected with small icons in some displays (Thanks @Drew for reporting)
* Bugfix: Left side submenu controls don't move when hovering anymore

### 0.2.1
* Bugfix: Clicking on submenus directly now locks the left controls
* Bugfix: Improved compatibility across combinations of settings

### 0.2.0
* Enhancement: Left control bar may now be auto-hidden and shown on mouse over
* Enhancement: Left control bar now supports small or big size
* Bugfix: Ignored some configuration combinations that could lead to offsets

### 0.1.0
* Bugfix: Overlapping scene navigation when side control was on Top Left

### 0.0.9
* Enhancement: Added Macro Auto-Hide mode with animation
* Enhancement: Added some shadow around the Macro Bar
* Enhancement: Macro Bar may be repositioned by settings

### 0.0.8
* Enhancement: Scenes now pushed to the left and reduced based size
* Enhancement: Players List now show color dots and full details on mouse-over
* Bugfix: Adjusted bottom position controls

### 0.0.7
* Enhancement: Left panel controls now expand vertically (configurable)
* Configuration: Left panel controls have 3 possible positions (top, center, bottom)

### 0.0.6
* Bugfix: Removed settings from players
* Bugfix: Players joining no longer causes components to reappear
* Bugfix: Changing settings will now trigger a refresh for consistency

### 0.0.5
* Added configurable settings for showing, hiding or collapsing UI elements
