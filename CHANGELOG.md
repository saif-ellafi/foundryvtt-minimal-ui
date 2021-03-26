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
* Compatibility: Macrobar aligned now as default for better compatibility with macro modules
* Bugfix: Fixed incorrect Macrobar positioning in "Show Normally" Mode
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
