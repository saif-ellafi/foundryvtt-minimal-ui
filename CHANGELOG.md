### 1.0.1
* Bugfix: Adjusted collapsed sidebar app behavior to Foundry 0.8.4+
* Bugfix: Maximize or open sidebar apps accordingly, even when minimized, closed or already active in 0.8.4

### 1.0.0
* Compatibility: Foundry VTT 0.8.3+
* Core: Organized Minimize features moved into its own module (Window Controls)
* Core: Navigation Preview feature moved into its own module: Scene Preview

### 0.9.7
* Enhancement: New Organized Pinned mode. When pinned, windows may never be closed, but minimized. Useful for not accidentally closing windows!
* Bugfix: Fixed style border overlap in single column mode
* Bugfix: Fixed an issue with Dynamic Mode causing the tab to switch to Chat unintentionally
* Bugfix: Dynamic Mode chat will not expand if "Chat Notifications" module is installed

### 0.9.6
* Compatibility: Default setting values prioritize a smoother first-experience and compatibility with other modules
* Compatibility: Adjusted styles for left control buttons to behave more predictable with external modules that alter them
* Bugfix: Lock button now uses Minimal UI colors
* Bugfix: Some Minimize optional features now disabled by default
* Bugfix: Better explained setting descriptions

### 0.9.5
* Bugfix: Fine-tuning of maximized window size values

### 0.9.4
* Bugfix: Maximize now works fine when sidebar is uncollapsed (moves to left)

### 0.9.3
* Enhancement: New Maximize button available! (Default on, can be disabled)
* Bugfix: Fixed a bug causing some minimized windows to restore incorrectly
* Bugfix: Fixed a bug triggered when closing minimized buttons by pressing escape

### 0.9.2
* Enhancement: Organized Minimize mode removes text from close and minimize buttons
* Bugfix: Improved clean up process should solve certain inconsistencies when minimizing windows in organized mode
* Bugfix: Fixed a bug creating under certain circumstances undesired html elements with minimized bar
* Bugfix: Improved 'escape' button handling with Organized Minimize mode

### 0.9.1
* Compatibility: Fixed compatibility with Polyglot (Thank you Ghostdesu)
* Enhancement: Player List has now an option for "Default Size" with bigger font (Thanks Klaus)
* Bugfix: Fixed 'bottom' mode in Organized Minimize working as 'top' (Thanks JLtheking2)
* Bugfix: Dynamic UI Mode disabled by default
* Bugfix: Sidebar initial visibility should always be effective, with and without Dynamic UI (Thanks Klaus)
* Bugfix: Player List now has the same height as the Hotbar (Thanks Hauke)
* Bugfix: Fixed settings text replacing "Always Visible" with "Start Visible" when according
* Bugfix: Avoid unnecessary hook activations when collapsing or revealing chat sidebar in Dynamic Mode

### 0.9.0
* Enhancement: Organized Minimize 2.0 Re-written for better performance and stability
* Enhancement: Organized Minimize now includes a minimize button for better UX Experience
* Enhancement: Organized Minimize no longer forces windows to stay on that Axis
* Enhancement: Organized Minimize will now remember the original positions of all windows when restoring
* Enhancement: Module defaults revisited for a better first impression (affects new users only)
* Enhancement: Minimized mode now takes available space intelligently based on other settings
* Enhancement: Scene Preview will no longer overlap with multiple scene rows in the navigation
* Compatibility: If module "Minimize Button" is installed, Organized Minimize will be disabled
* Bugfix: Color settings no longer visible for players
* Bugfix: Fixed an issue with CORS blocking style sheets for minimized setting when hosting in the Forge (Thanks Noshei)
* Bugfix: Better styling defaults overall for a cleaner first impression

### 0.8.8
* Enhancement: Minimized mode will use bottom of screen when Macro Hotbar is hidden
* Compatibility: Give MyTab priority over the control of FoundryVTT Logo
* Bugfix: Improved controls auto-hide mode for better responsiveness and spacing
* Bugfix: Fixed styling inaccuracies on some Minimized elements
* Bugfix: Fixed scene preview blinking when hovering through scenes with minimized windows

### 0.8.7
* Bugfix: Fixed styling issues with Minimized bottom bar
* Bugfix: Fixed incorrect shadow direction

### 0.8.6
* Enhancement: Organized Minimized Bar now takes only necessary amount of space
* Enhancement: Better looking minimized windows with Minimal UI colorset
* Enhancement: Better looking Minimized Bar (when enabled) and more transparent
* Enhancement: New Hotbar setting option: Only GM (Hides Macro Hotbar for players)
* Bugfix: Fixed miscalculation with the minimized bar in some circumstances
* Bugfix: Fixed an error in some circumstances causing minimized windows to disappear

### 0.8.5
* Bugfix: Minimize+ colors darkened
* Bugfix: Minimized a window that was pinned now stays pinned 

### 0.8.4
* Enhancement: Minimize+ Setting "Right Click" colours a minimized window to find it quickly later
* Enhancement: Minimize+ Setting Mouse over minimized windows gives them shadow color 
* Bugfix: Organized Minimize returns windows to their original position when restored/maximized
* Bugfix: Organized Minimize removed unwanted movement when moving windows along the axis 
* Bugfix: Sub controls menu adjusted to avoid unwanted shaking animation

### 0.8.3
* Compatibility: Monks Scene Navigation thanks to a contribution from ironmonk88
* Bugfix: Disabled scene preview animation for better compatibility and less strange behaviour
* Bugfix: Adjusted position of active tokens indicators in list navigation based on navigation size
* Bugfix: Adjusted spacing for scene previous based on navigation size

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
