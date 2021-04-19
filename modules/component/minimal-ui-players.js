import {rootStyle} from '../minimal-ui-util.js';

export default class MinimalUIPlayers {

    static cssPlayersDefaultFontSize = '12px';
    static cssPlayersDefaultWidth = '150px';

    static initSettings() {
        game.settings.register('minimal-ui', 'playerList', {
            name: "Player List",
            hint: "Customize Player List UI",
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "default": "Always Visible",
                "autohide": "Auto-Hide",
                "hidden": "Hide Completely"
            },
            default: "autohide",
            onChange: _ => {
                window.location.reload()
            }
        });
    }

    static initHooks() {

        Hooks.on('renderPlayerList', async function() {
            const players = $("#players");

            players[0].val = "";

            switch(game.settings.get('minimal-ui', 'playerList')) {
                case 'default': {
                    rootStyle.setProperty('--playerfsize', MinimalUIPlayers.cssPlayersDefaultFontSize);
                    rootStyle.setProperty('--playerwidth', MinimalUIPlayers.cssPlayersDefaultWidth);
                    rootStyle.setProperty('--playervis', 'visible');
                    // DnD UI Special Compatibility
                    if (game.modules.get('dnd-ui') && game.modules.get('dnd-ui').active) {
                        rootStyle.setProperty('--playerwidth', '200px');
                    }
                    // SWADE Special Compatibility
                    rootStyle.setProperty('--playerbennies', 'inline');
                    // ---
                    break;
                }
                case 'autohide': {
                    rootStyle.setProperty('--playervis', 'visible');
                    rootStyle.setProperty('--playerslh', '2px');
                    rootStyle.setProperty('--playerh3w', '0%');
                    // DnD UI Special Compatibility
                    if (game.modules.get('dnd-ui') && game.modules.get('dnd-ui').active) {
                        players.css('border-image', 'none');
                        players.css('border-color', 'black');
                        players.hover(
                            function() {
                                players.css('border-image', '');
                                players.css('border-color', '');
                            },
                            function() {
                                players.css('border-image', 'none');
                                players.css('border-color', 'black');
                            }
                        );
                    }
                    // Compatibility for Raise Hand module
                    if (game.modules.has('raise-my-hand') && game.modules.get('raise-my-hand').active) {
                        rootStyle.setProperty('--playerwidth', '42px');
                        rootStyle.setProperty('--playerslh', '20px');
                    }
                    // SWADE Special Compatibility
                    rootStyle.setProperty('--playerbennies', 'none');
                    if (game.system.data.name === 'swede') {
                        players.hover(
                            function() {
                                $(".bennies-count").show();
                            },
                            function() {
                                $(".bennies-count").hide();
                            }
                        );
                    }
                    // ---
                    break;
                }
            }
            // DnD UI Special Compatibility
            if (game.modules.get('dnd-ui') && game.modules.get('dnd-ui').active) {
                rootStyle.setProperty('--playerwidthhv', '200px');
            }
            // ---
        });

    }

}