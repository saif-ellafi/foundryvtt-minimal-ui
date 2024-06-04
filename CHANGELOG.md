### 1.7.0
* Compatibility: Support Foundry V12

### 1.6.11
* Bugfix: Fixed scene navigation moving with players list

### 1.6.10
* Compatibility: Starfinder system navi fix

### 1.6.9
* Bugfix: Fixed navigation scenes overlapping under chat
* Bugfix: Issues with logo size on some systems

### 1.6.8
* Compatibility: Monk's Hotbar Extension

### 1.6.7
* Enhancement: Improved setting change detection
* Bugfix: Fixed broken hotbar and navigation custom positioning (Thanks @GambetTV)

### 1.6.6
* Bugfix: Fixed several issues with Minimal UI when using Camera views
* Compatibility: Fixed player list overlapping with other mods in general 

### 1.6.4
* Bugfix: Fixed an issue in Foundry that top buttons shadows are cut-off
* Bugfix: Fixed alternating colors when locking hotbar macros
* Compatibility: Window Controls positioning of player and hotbar menues

### 1.6.3
* Bugfix: Adjusted hotbar (again) and Window Controls support

### 1.6.2
* Bugfix: Adjusted hotbar positioning and starfinder support

### 1.6.1
* Bugfix: Fixed auto-hide sliding in V11 (thanks @andy-jones)

### 1.6.0
* Compatibility: Foundry V11 (thank you @paranoicsan)
* Compatibility: User Latency (thank you @Shuggaloaf) 

### 1.5.6
* Bugfix: FPS indicator position
* Bugfix: Packed ui elements to the left correctly
* Compatibility: Starfinder was wonky with Minimal UI settings

### 1.5.5
* Bugfix: Adjust broken player box position after foundry update
* Bugfix: Fixed warning about dependencies. Thank you @tom-bell

### 1.5.4
* Bugfix: More camera, hotbar and playerlist issues fixed

### 1.5.3
* Bugfix: Fixed issue of misplacement of players list relative to hotbar with camera
* Bugfix: Fixed hotbar location based on camera enabled or not
* Bugfix: Fixed hiding players list when camera dock is on or not
* Bugfix: Better behavior of players list when Camera dock is present

### 1.5.2
* Bugfix: Warning of deprecation removed
* Bugfix: Logo with camera dock enabled fixed

### 1.5.1
* Bugfix: Disabled player features when camera dock is enabled
* Enhancement: Camera docks can be thinne (smaller) - Thanks @brunocalado and CaosFR

### 1.5.0
* Support: Foundry V10 (feedback welcome)

### 1.4.24
* Bugfix: Fixed Camera settings for Foundry 9.268

### 1.4.23
Not my fault :) I hope Foundry stops renaming CSS class names across minor builds. But well.
* Bugfix: Support Foundry 9.268

### 1.4.22
* Bugfix: Support Foundry 9.255+ Patch 4 Support (Fixed colors)

### 1.4.21
* Compatibility: Foundry 9.251+ Patch 3 Support

### 1.4.20
* Bugfix: Logo image setting has now a filepicker to choose logo easily
* Bugfix: Fixed a WebRTC error where rtc client might have not yet loaded

### 1.4.19
* Bugfix: Switching Camera Behavior modes no longer requires a full refresh
* Bugfix: Removed ghost window when a player disables camera while another has it in floating mode (Thanks G.O.D. for reporting)
* Bugfix: Toggle camera mode in Camera Reduced mode will now immediately hide the widget for the player doing it
* Bugfix: Floating camera mode does not follow the normal patterns and will always display as per Foundry defaults

### 1.4.18
* Feature: New Camera Panel settings allow to reduce or hide Camera boxes for players with camera disabled

### 1.4.17
* Bugfix: Minimized sidebar tabs should now maximize if right-clicked
* Compatibility: Updated compatibility with raise my hand module

### 1.4.16
* Bugfix: Autohide-plus controls now sets toggle controls styles correctly on startup

### 1.4.15
* Enhancement: Macro Hotbar now has the same background style as the players list (Foundry's metallic transparent texture)
* Bugfix: When a sidebar app is already open in floating mode, right-click should bring it to front of other windows
* Bugfix: When a sidebar app is already open in floating mode, do not bring it to front if sidebar expanded

### 1.4.14
* Bugfix: Adjusted various margins for better consistency
* Bugfix: Added missing shadow to navigation toggle
* Bugfix: Removed color from autohide lock in Hotbar
* Change: Reduced colors by default to a more innocuous default

### 1.4.13
* Compatibility: Monk's Hotbar Expansion, Macros repositioning now works
* Bugfix: Adjusted height of scene navigation bar to squeeze some pixels on top

### 1.4.12
* Compatibility: Sidebar Macros support improved detecting when it shows the hotbar
* Bugfix: Added border and color to the scene navigation toggle, making it consistent with other elements
* Build: Marked as compatible with any V9

### 1.4.11
* Bugfix: Removed slight hotbar shaking
* Bugfix: Ignore Extreme Left setting if screen width is too thin
* Deprecation: Hotbar position no longer considers sidebar collapse status

### 1.4.10
* Compatibility: Sidebar Macros

### 1.4.9
* Bugfix: Fixed adjustment issues between logo and scene navigation configurations
* Bugfix: Fixed adjustment issues between logo and left controls margins
* Bugfix: Fixed wrong transparency to opacity term
* Defaults: Defaults changed towards a more conservative beginner-friendly first impression

### 1.4.8
* Bugfix: Fixed right-clicking on players list in toggle mode

### 1.4.7
* Enhancement: Controls will be on the very top left corner if navigation and logo are hidden
* Bugfix: Bug where scene navigation wouldn't overflow correctly (thanks smturg)
* Compatibility: Again some more Custom Hotbar support

### 1.4.6
* Bugfix: Transitions of players menu now more consistent
* Bugfix: Hover effects with scene navigation delay corrected
* Default: Sidebar now shown by default, as opposed to previous collapsed

### 1.4.5
* Enhancement: Adjust left controls X position based on logo and navigation settings
* Enhancement: Play nicer with Window Controls module
* Default: Scene Navigation now defaults to hidden (we can survive with Scene from right-side panel)

### 1.4.4
* Translation: Japanese - Thank you SO much @BrotherSharper
* Bugfix: Adjusted players arrow icon margin

### 1.4.3
* Bugfix: Fixed hotbar collapsing on pager switch in collapsed mode setting
* Bugfix: Fixed hotbar shaking on collapsed mode setting

### 1.4.2
* Enhancement: New setting and default for player lists: Click to Toggle

### 1.4.1
* Compatibility: Sidebar Expander
* Bugfix: Put back players panel if switching hotbar position other than to extreme left without need to refresh
* Bugfix: Removed unnecessary deprecated code

### 1.4.0
* Enhancement: Achieve a new level of minimalism with new Minimal UI defaults and settings
* Enhancement: New Hotbar Setting "Extreme Left" (Default) position for Macro, pushes the players list above it
* Enhancement: Hotbar controls now have border radius and color as the rest of minimal ui components
* Bugfix: Fixed an issue with hotbar on changing pages
* Bugfix: Adjusted misaligned components in the players panel
* Default: Hotbar is now by default set to "collapsed" mode
* Default: Left Side Controls now by default set to "Auto-Hide Plus" mode
* Compatibility: Monk Hotbar's Expansion disables hotbar functionality for compatibility's sake

### 1.3.3
* Compatibility: For V9 compatibility with Custom-Hotbar, Raise your Hand 

### 1.3.2
* Bugfix: Fixed transparency not being set on left side controls after refresh (Thank you Brimcon)

### 1.3.1
* Enhancement: New Left Controls Behavior (experimental) - Auto-Hide Plus hides all non-active sub controls
* Bugfix: Fixed FPS Indicator on the wrong position (Thanks GambitTV)
* Bugfix: Fixed Macro Hotbar position when not in auto hide mode

### 1.3.0
* Enhancement: Adjusted all components to be closer to the edge of the screen
* Enhancement: Revised defaults for a refreshing minimal look and feel (See Screenshot)
* Enhancement: Display the Macro Hotbar (if hidden) when opening macro compendiums to be ready for Drag & Drop

### 1.2.0
* Support: Foundry VTT V9 Support (Not backwards Compatible)
* Enhancement: Left Controls new partial-auto-hide setting
* Enhancement: Hotbar Macro positioning now adjusts on right sidebar collapse status
* Enhancement: Overall UI Cleaned by taking advantage of new Foundry styles
* Enhancement: Significantly improved transparency behavior
* Bugfix: Fixed Macro Hotbar not locking when switching between macro pages
* Bugfix: Restored old players background as it can be handled better through transparency
* Deprecations: Left Controls Lock&Unlock, Hotbar slots customization and Camera hiding are no longer available

### 1.1.8
* Enhancement: New Left Controls Behavior - Partially Visible, hides the second column of left side buttons

### 1.1.7
* Bugfix: Fixed Macro Hotbar forgetting position after setting change broken in 1.1.6

### 1.1.6
* Bugfix: Made first time launch transitions smoother and less bumpy
* Bugfix: Minor event order corrections and optimizations

### 1.1.5
* Enhancement: Patched foundry so already opened windows are brought to the front if they are behind other windows when reopened

### 1.1.4
* Bugfix: Default setting for opacity was not correctly set (5am coding is not healthy)

### 1.1.3
* Bugfix: Fixed a mistake in 1.1.2 caused opacity setting to be ignored

### 1.1.2
* Localization: Fixed some typos and corrections in settings
* Bugfix: Switched default opacity from 25% to 75%

### 1.1.1
* Localization: Thank you @Grayhead for adding German language to Window Controls!
* Compatibility: Thanks @ironmonk88 for submitting updates for compatibility with their modules

### 1.1.0
* Enhancement: Added transparency (Configurable) until hover to various elements (Let me know your feedback!)
* Enhancement: Raised auto-hide macro bar slightly enough to make it more convenient
* Bugfix: Reduced distance between first and second left side control columns

### 1.0.10
* Compatibility: Ping Logger now works correctly and can be further customized (thanks @Merudo for contributing!!!)

### 1.0.9
* Compatibility: Savage Worlds will show bennies on hover of auto-hide player list
* Compatibility: Ping Logger will show ping only on hover of auto-hide player list (Thanks Merudo)

### 1.0.8
* Compatibility: Ping Logger player list now works correctly (Thanks Merudo for contributing!)
* Compatibility: Player List now 15% bigger when in small mode

### 1.0.7
* Bugfix: Fixed scene navigation collapsed mode broken in Foundry 0.8.9 (Thanks Merudo)

### 1.0.6
* Bugfix: Chat logs should not expand the sidebar when collapsed by default (Thanks Brimcon)

### 1.0.5
* Compatibility: Foundry 0.8.9

### 1.0.4
* Nothing new. Dummy release to trigger the appropriate latest release for Minimal UI

### 1.0.3
* Compatibility: Changing multiple settings now works fine in 0.8.3+

### 1.0.2
* Compatibility: Foundry 0.8.3+
* Bugfix: Floating chat fixed behaviour on collapsed sidebar
* Bugfix: Removed Dynamic mode feature

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
