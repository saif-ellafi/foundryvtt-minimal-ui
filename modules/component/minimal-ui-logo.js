import {rootStyle} from '../minimal-ui-util.js';

export default class MinimalUILogo {

    static hiddenInterface = false;

    static hideAll(alsoChat) {
        $('#logo').click(_ => {
            if (!MinimalUI.hiddenInterface) {
                if (alsoChat) {
                    $('#sidebar').hide();
                }
                $('#navigation').hide();
                $('#controls').hide();
                $('#players').hide();
                $('#hotbar').hide();
                MinimalUI.hiddenInterface = true;
            } else {
                if (alsoChat) {
                    $('#sidebar').show();
                }
                $('#navigation').show();
                $('#controls').show();
                $('#players').show();
                $('#hotbar').show();
                MinimalUI.hiddenInterface = false;
            }
        });
    }

    static initSettings() {

        game.settings.register('minimal-ui', 'foundryLogoSize', {
            name: "Foundry Logo Size",
            hint: "Foundry logo visibility and size",
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "hidden": "Hide",
                "small": "Small",
                "standard": "Standard"
            },
            default: "hidden",
            onChange: _ => {
                window.location.reload()
            }
        });

        game.settings.register('minimal-ui', 'foundryLogoBehaviour', {
            name: "Foundry Logo Behaviour",
            hint: "Use the Foundry Logo to toggle visual elements (when visible, of course).",
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "toggleAll": "Logo toggles Hide ALL UI",
                "toggleButChat": "Logo toggles Hide ALL UI except Chat"
            },
            default: "toggleButChat",
            onChange: _ => {
                window.location.reload()
            }
        });
    }

    static initHooks() {

        Hooks.once('ready', async function() {

            if (game.settings.get('minimal-ui', 'foundryLogoSize') !== 'hidden') {
                switch (game.settings.get('minimal-ui', 'foundryLogoBehaviour')) {
                    case 'toggleAll': {
                        MinimalUI.hideAll(true);
                        break;
                    }
                    case 'toggleButChat': {
                        MinimalUI.hideAll(false);
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