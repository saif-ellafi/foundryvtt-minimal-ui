export default class MinimalUIDynamic {

    static lastHoverTime;

    static initSettings() {

        game.settings.register('minimal-ui', 'dynamicMinimalUi', {
            name: "MINIMAL UI Dynamic Mode",
            hint: "Auto hides UI elements after 60 seconds of chat inactivity when controlling tokens or changing scenes (Experimental).",
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "enabled": "Enabled",
                "disabled": "Disabled"
            },
            default: "disabled",
            onChange: _ => {
                window.location.reload()
            }
        });

    }

    static initHooks() {

        Hooks.on('hoverToken', function() {
            if (game.settings.get('minimal-ui', 'dynamicMinimalUi') === 'enabled') {
                if (game.time.serverTime - MinimalUI.lastHoverTime > 60000) {
                    ui.sidebar.collapse();
                    if (game.settings.get('minimal-ui', 'sidePanel') === 'autohide' && MinimalUI.controlsLocked) {
                        MinimalUI.lockControls(true);
                    }
                    MinimalUI.lastHoverTime = game.time.serverTime;
                }
            }
        });

        Hooks.on('canvasInit', function() {
            if (game.settings.get('minimal-ui', 'dynamicMinimalUi') === 'enabled' && MinimalUI.lastHoverTime) {
                ui.sidebar.collapse();
                if (game.settings.get('minimal-ui', 'sidePanel') === 'autohide' && MinimalUI.controlsLocked) {
                    MinimalUI.lockControls(true);
                }
            }
        });

        Hooks.on('renderChatMessage', function() {
            if (game.settings.get('minimal-ui', 'dynamicMinimalUi') === 'enabled') {
                MinimalUI.lastHoverTime = game.time.serverTime;
                ui.sidebar.activateTab('chat');
                ui.sidebar.expand();
            }
        });

        Hooks.on('sidebarCollapse', function(_, collapsed) {
            if (game.settings.get('minimal-ui', 'dynamicMinimalUi') === 'enabled' && !collapsed) {
                MinimalUI.lastHoverTime = game.time.serverTime;
            }
        })

    }

}