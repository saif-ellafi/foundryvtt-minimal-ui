import {rootStyle} from '../util.js';
import '../../styles/component/logo.css';

export default class MinimalUILogo {

    static hiddenInterface = false;

    static hideAll(alsoChat) {
        $('#logo').click(_ => {
            if (!MinimalUILogo.hiddenInterface) {
                if (alsoChat) {
                    $('#sidebar').hide();
                }
                $('#navigation').hide();
                $('#controls').hide();
                $('#players').hide();
                $('#hotbar').hide();
                MinimalUILogo.hiddenInterface = true;
            } else {
                if (alsoChat) {
                    $('#sidebar').show();
                }
                $('#navigation').show();
                $('#controls').show();
                $('#players').show();
                $('#hotbar').show();
                MinimalUILogo.hiddenInterface = false;
            }
        });
    }

    static updateImageSrc(srcimg) {
        if (game.settings.get('minimal-ui', 'foundryLogoSize') !== 'hidden') {
            $("#logo")
                .attr('src', srcimg)
                .on('error', function () {
                    if (game.user.isGM)
                        ui.notifications.warn(
                            "Minimal UI: Your Logo Image could not be found. Restoring to Default Foundry Logo"
                        );
                    MinimalUILogo.updateImageSrc("icons/fvtt.png")
                });
        }
    }

    static initSettings() {

        game.settings.register('minimal-ui', 'foundryLogoSize', {
            name: game.i18n.localize("MinimalUI.LogoStyleName"),
            hint: game.i18n.localize("MinimalUI.LogoStyleHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "hidden": game.i18n.localize("MinimalUI.SettingsHide"),
                "small": game.i18n.localize("MinimalUI.SettingsSmall"),
                "standard": game.i18n.localize("MinimalUI.SettingsStandard")
            },
            default: "hidden",
            onChange: _ => {
                window.location.reload()
            }
        });

        game.settings.register('minimal-ui', 'foundryLogoBehaviour', {
            name: game.i18n.localize("MinimalUI.LogoBehaviourName"),
            hint:  game.i18n.localize("MinimalUI.LogoBehaviourHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "toggleAll": game.i18n.localize("MinimalUI.LogoBehaviourToggle"),
                "toggleButChat": game.i18n.localize("MinimalUI.LogoBehaviourToggleNoChat")
            },
            default: "toggleButChat",
            onChange: _ => {
                window.location.reload()
            }
        });

        game.settings.register('minimal-ui', 'foundryLogoImage', {
            name: game.i18n.localize("MinimalUI.LogoImageName"),
            hint: game.i18n.localize("MinimalUI.LogoImageHint"),
            scope: 'world',
            config: true,
            type: String,
            default: "icons/fvtt.png",
            onChange: _ => {
                MinimalUILogo.updateImageSrc(game.settings.get('minimal-ui', 'foundryLogoImage'));
            }
        });
    }

    static initHooks() {

        Hooks.once('renderSceneNavigation', async function() {
            MinimalUILogo.updateImageSrc(game.settings.get('minimal-ui', 'foundryLogoImage'));
        });

        Hooks.once('ready', async function() {

            if (game.settings.get('minimal-ui', 'foundryLogoSize') !== 'hidden') {
                switch (game.settings.get('minimal-ui', 'foundryLogoBehaviour')) {
                    case 'toggleAll': {
                        MinimalUILogo.hideAll(true);
                        break;
                    }
                    case 'toggleButChat': {
                        MinimalUILogo.hideAll(false);
                        break;
                    }
                }
            }

            switch (game.settings.get('minimal-ui', 'foundryLogoSize')) {
                case 'small': {
                    rootStyle.setProperty('--logovis', 'visible');
                    rootStyle.setProperty('--logoh', '25px');
                    rootStyle.setProperty('--logow', '50px');
                    break;
                }
                case 'standard': {
                    rootStyle.setProperty('--logovis', 'visible');
                    break;
                }
            }

            // Compatibility Workaround for bullseye module
            if (game.modules.has('bullseye') && game.modules.get('bullseye').active) {
                rootStyle.setProperty('--logovis', 'visible');
                rootStyle.setProperty('--logoh', '50px');
                rootStyle.setProperty('--logow', '100px');
            }

        });

    }

}