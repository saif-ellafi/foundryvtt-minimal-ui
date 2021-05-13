import MinimalUICamera from './modules/component/camera.js'
import MinimalUIControls from './modules/component/controls.js'
import MinimalUIHotbar from './modules/component/hotbar.js'
import MinimalUILogo from './modules/component/logo.js'
import MinimalUINavigation from './modules/component/navigation.js'
import MinimalUIPlayers from './modules/component/players.js'
import MinimalUISidebar from './modules/component/sidebar.js'

import MinimalUITheme from './modules/customization/theme.js'

import MinimalUIDynamic from './modules/feature/dynamic.js'

import MinimalUIPatch from "./modules/patch.js";

class MinimalUI {
    static noColorSettings = false;
}

Hooks.once('init', () => {

    /** Initialize settings for Theme Functionality */
    if (game.modules.get('colorsettings')?.active) {
        MinimalUITheme.initSettings();
        MinimalUITheme.initHooks();
    } else {
        MinimalUI.noColorSettings = true;
    }
    /** ------------------------- */

    /** Initialize settings for Special Feature Functionality */
    MinimalUIDynamic.initSettings();
    MinimalUIDynamic.initHooks();
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

    /** Initialize Foundry UI Patches */
    MinimalUIPatch.initSettings();
    MinimalUIPatch.initHooks();
    /** ------------------------- */

});

Hooks.once('ready', () => {

    if (MinimalUI.noColorSettings && game.user.isGM)
        ui.notifications.error("Minimal UI: Disabled color features because 'lib - colorsettings' module is not active.");

})