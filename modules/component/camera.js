import {debouncedReload} from '../util.js';

export default class MinimalUICamera {
    static initSettings() {
        game.settings.register("minimal-ui", "hidePlayerCameras", {
            name: game.i18n.localize("MinimalUI.HidePlayerCameraName"),
            hint: game.i18n.localize("MinimalUI.HidePlayerCameraHint"),
            scope: "world",
            config: true,
            default: "default",
            type: String,
            choices: {
                "default": game.i18n.localize("MinimalUI.SettingsDefault"),
                "hidden": game.i18n.localize("MinimalUI.HidePlayerCameraSetting")
            },
            onChange: debouncedReload
        });
    }

    static initHooks() {
        Hooks.on('renderCameraViews', async function() {
            switch(game.settings.get('minimal-ui', 'hidePlayerCameras')) {
                case 'hidden': {
                    $("#camera-views > div").each(function(i, box) {
                        if (!game.users.get($(box).attr("data-user")).isGM) {
                            $(box).remove();
                        }
                    });
                }
            }
        });
    }
}