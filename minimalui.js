import MinimalUIPatch from "./modules/minimal-ui-patch.js";

console.log('Thank you for using Minimal UI by JeansenVaars');

class MinimalUI {
    static noColorSettings = false;
    static noLibWrapper = false;
}

import MinimalUICamera from './modules/component/minimal-ui-camera.js'
import MinimalUIControls from './modules/component/minimal-ui-controls.js'
import MinimalUIHotbar from './modules/component/minimal-ui-hotbar.js'
import MinimalUILogo from './modules/component/minimal-ui-logo.js'
import MinimalUINavigation from './modules/component/minimal-ui-navigation.js'
import MinimalUIPlayers from './modules/component/minimal-ui-players.js'
import MinimalUISidebar from './modules/component/minimal-ui-sidebar.js'

import MinimalUITheme from './modules/customization/minimal-ui-theme.js'

import MinimalUIDynamic from './modules/feature/minimal-ui-dynamic.js'
import MinimalUIMinimize from './modules/feature/minimal-ui-minimize.js'

Hooks.once('init', () => {
    /** Initialize settings for Special Feature Functionality */
    MinimalUIDynamic.initSettings();
    MinimalUIDynamic.initHooks();
    if (game.modules.get('lib-wrapper')?.active) {
        MinimalUIMinimize.initSettings();
        MinimalUIMinimize.initHooks();
    } else {
        MinimalUI.noColorSettings = true;
    }
    /** ------------------------- */

    /** Initialize settings for Core Component Functionality */
    MinimalUILogo.initSettings();
    MinimalUINavigation.initSettings();
    MinimalUIControls.initSettings();
    MinimalUIHotbar.initSettings();
    MinimalUISidebar.initSettings();
    MinimalUIPlayers.initSettings();
    MinimalUICamera.initSettings();
    /** ------------------------- */

    /** Initialize hooks for Core Component Functionality */
    MinimalUILogo.initHooks();
    MinimalUINavigation.initHooks();
    MinimalUIControls.initHooks();
    MinimalUIHotbar.initHooks();
    MinimalUISidebar.initHooks();
    MinimalUIPlayers.initHooks();
    MinimalUICamera.initHooks();
    /** ------------------------- */

    /** Initialize settings for Theme Functionality */
    if (game.modules.get('colorsettings')?.active) {
        MinimalUITheme.initSettings();
        MinimalUITheme.initHooks();
    } else {
        MinimalUI.noColorSettings = true;
    }
    /** ------------------------- */

    /** Initialize Foundry UI Patches */
    MinimalUIPatch.initSettings();
    MinimalUIPatch.initHooks();
    /** ------------------------- */

});

Hooks.once('ready', () => {

    if (MinimalUI.noColorSettings && game.user.isGM)
        ui.notifications.error("Minimal UI: Disabled color features because 'lib - colorsettings' module is not active.");

    if (MinimalUI.noLibWrapper && game.user.isGM)
        ui.notifications.error("Minimal UI: Disabled Minimize Feature because 'lib-wrapper' module is not active.");

})