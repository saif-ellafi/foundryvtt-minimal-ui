import MinimalUIControls from '../component/controls.js'

export default class MinimalUIDynamic {

    static lastHoverTime;

    static initSettings() {

        game.settings.register('minimal-ui', 'dynamicMinimalUi', {
            name: game.i18n.localize("MinimalUI.DynamicUIName"),
            hint: game.i18n.localize("MinimalUI.DynamicUIHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "enabled": game.i18n.localize("MinimalUI.Enabled"),
                "disabled": game.i18n.localize("MinimalUI.Disabled")
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
                if (game.time.serverTime - MinimalUIDynamic.lastHoverTime > 60000) {
                    ui.sidebar.collapse();
                    if (game.settings.get('minimal-ui', 'controlsBehaviour') === 'autohide' && MinimalUIControls.controlsLocked) {
                        MinimalUIControls.lockControls(true);
                    }
                    MinimalUIDynamic.lastHoverTime = game.time.serverTime;
                }
            }
        });

        Hooks.on('canvasInit', function() {
            if (game.settings.get('minimal-ui', 'dynamicMinimalUi') === 'enabled' && MinimalUIDynamic.lastHoverTime) {
                ui.sidebar.collapse();
                if (game.settings.get('minimal-ui', 'controlsBehaviour') === 'autohide' && MinimalUIControls.controlsLocked) {
                    MinimalUIControls.lockControls(true);
                }
            }
        });

        Hooks.on('renderChatMessage', function() {
            if (game.settings.get('minimal-ui', 'dynamicMinimalUi') === 'enabled') {
                MinimalUIDynamic.lastHoverTime = game.time.serverTime;
                ui.sidebar.activateTab('chat');
                ui.sidebar.expand();
            }
        });

        Hooks.on('sidebarCollapse', function(_, collapsed) {
            if (game.settings.get('minimal-ui', 'dynamicMinimalUi') === 'enabled' && !collapsed) {
                MinimalUIDynamic.lastHoverTime = game.time.serverTime;
            }
        })

    }

}