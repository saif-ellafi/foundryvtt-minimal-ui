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
                "default": "No changes",
                "hidden": "Hide camera/audio box of players"
            },
            onChange: _ => {
                window.location.reload()
            }
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