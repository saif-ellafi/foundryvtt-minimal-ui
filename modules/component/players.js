import {debouncedReload, rootStyle} from '../util.js';
import '../../styles/component/players.css';

export default class MinimalUIPlayers {

    static cssPlayersHiddenWidth = '32px';
    static cssPlayersSmallFontSize = '12px';
    static cssPlayersSmallWidth = '175px';
    static cssPlayersStandardFontSize = 'inherit';
    static cssPlayersStandardWidth = '200px';

    static initSettings() {
        game.settings.register('minimal-ui', 'playerList', {
            name: game.i18n.localize("MinimalUI.PlayersBehaviourName"),
            hint: game.i18n.localize("MinimalUI.PlayersBehaviourHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "default": game.i18n.localize("MinimalUI.SettingsAlwaysVisible"),
                "autohide": game.i18n.localize("MinimalUI.SettingsAutoHide"),
                "clicktoggle": game.i18n.localize("MinimalUI.SettingsClickToggle"),
                "hidden": game.i18n.localize("MinimalUI.SettingsHide")
            },
            default: "clicktoggle",
            onChange: debouncedReload
        });

        game.settings.register('minimal-ui', 'playerListSize', {
            name: game.i18n.localize("MinimalUI.PlayersSizeName"),
            hint: game.i18n.localize("MinimalUI.PlayersSizeHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "small": game.i18n.localize("MinimalUI.SettingsSmall"),
                "standard": game.i18n.localize("MinimalUI.SettingsStandard")
            },
            default: "standard",
            onChange: debouncedReload
        });

        // Ping Logger compatibility setting
        if (game.modules.get('ping-logger')?.active) {
            game.settings.register('minimal-ui', 'playerShowPing', {
                name: game.i18n.localize("MinimalUI.PlayersShowPingName"),
                hint: game.i18n.localize("MinimalUI.PlayersShowPingHint"),
                scope: 'world',
                config: true,
                type: String,
                choices: {
                    "showPing": game.i18n.localize("MinimalUI.PlayersShowPing"),
                    "hidePing": game.i18n.localize("MinimalUI.PlayersHidePing"),
                },
                default: "hidePing",
                onChange: debouncedReload
            });
        }
    }

    static initHooks() {

        Hooks.on('renderPlayerList', async function () {
            const players = $("#players");

            players[0].val = "";
            const plSize = game.settings.get('minimal-ui', 'playerListSize');
            const plSetting = game.settings.get('minimal-ui', 'playerList');

            switch (plSetting) {
                case 'default': {
                    players.css('transition', 'ease-out 0.5s');
                    if (plSize === 'small') {
                        rootStyle.setProperty('--playerfsize', MinimalUIPlayers.cssPlayersSmallFontSize);
                        rootStyle.setProperty('--players-width', MinimalUIPlayers.cssPlayersSmallWidth);
                        rootStyle.setProperty('--playerwidthhv', MinimalUIPlayers.cssPlayersSmallWidth);
                    } else {
                        rootStyle.setProperty('--playerfsize', MinimalUIPlayers.cssPlayersStandardFontSize);
                        rootStyle.setProperty('--playerfsizehv', MinimalUIPlayers.cssPlayersStandardFontSize);
                        rootStyle.setProperty('--players-width', MinimalUIPlayers.cssPlayersStandardWidth);
                        rootStyle.setProperty('--playerwidthhv', MinimalUIPlayers.cssPlayersStandardWidth);
                    }
                    rootStyle.setProperty('--playervis', 'visible');
                    // DnD UI Special Compatibility
                    if (game.modules.get('dnd-ui') && game.modules.get('dnd-ui').active) {
                        rootStyle.setProperty('--players-width', '200px');
                    }
                    // SWADE Special Compatibility
                    rootStyle.setProperty('--playerbennies', 'inline');
                    // ---
                    break;
                }
                case 'autohide': case 'clicktoggle': {
                    if (plSize === 'small') {
                        rootStyle.setProperty('--playerfsizehv', MinimalUIPlayers.cssPlayersSmallFontSize);
                        rootStyle.setProperty('--playerwidthhv', MinimalUIPlayers.cssPlayersSmallWidth);
                    } else {
                        rootStyle.setProperty('--playerfsizehv', MinimalUIPlayers.cssPlayersStandardFontSize);
                        rootStyle.setProperty('--playerwidthhv', MinimalUIPlayers.cssPlayersStandardWidth);
                    }
                    rootStyle.setProperty('--playervis', 'visible');
                    rootStyle.setProperty('--playerslh', '2px');
                    rootStyle.setProperty('--playerh3w', '0%');
                    // DnD UI Special Compatibility
                    if (game.modules.get('dnd-ui') && game.modules.get('dnd-ui').active) {
                        players.css('border-image', 'none');
                        players.css('border-color', 'black');
                        players.hover(
                            function () {
                                players.css('border-image', '');
                                players.css('border-color', '');
                            },
                            function () {
                                players.css('border-image', 'none');
                                players.css('border-color', 'black');
                            }
                        );
                    }
                    let playerWidthPixel = parseInt(MinimalUIPlayers.cssPlayersHiddenWidth);

                    // Compatibility for Ping Logger module
                    if (game.modules.get('ping-logger')?.active) {
                        if (game.settings.get('minimal-ui', 'playerShowPing') === "showPing") {
                            // Increase width and height to display ping
                            rootStyle.setProperty('--playerpingdisplay', 'initial');
                            rootStyle.setProperty('--playerslh', '20px');
                            playerWidthPixel += 36;
                        } else {
                            // Hide the ping, and only display on hover
                            rootStyle.setProperty('--playerpingdisplay', 'none');
                            players.hover(
                                function () {
                                    $(".pingLogger_pingSpan").show();
                                },
                                function () {
                                    $(".pingLogger_pingSpan").hide();
                                }
                            );
                        }
                    }

                    rootStyle.setProperty('--players-width', `${playerWidthPixel}px`);
                    // SWADE Special Compatibility
                    rootStyle.setProperty('--playerbennies', 'none');
                    if (game.system.data.name === 'swade') {
                        players.hover(
                            function () {
                                $(".bennies-count").show();
                            },
                            function () {
                                $(".bennies-count").hide();
                            }
                        );
                    }
                    // ---
                    if (plSetting === 'autohide') {
                        players.hover(
                          () => {
                              players.css('width', 'var(--playerwidthhv)');
                              players.css('font-size', 'var(--playerfsizehv)');
                              players.css('opacity', '100%');
                              $("#players ol li.player").css('line-height', '20px');
                          },
                          () => {
                              players.css('width', '');
                              players.css('font-size', 'var(--playerfsize)');
                              players.css('opacity', 'var(--opacity)');
                              $("#players ol li.player").css('line-height', '2px');
                          })
                    } else {
                        players.css('transition', 'ease-out 0.5s');
                        let state = 0;
                        $("#player-list").click(() => {
                            if (state === 0) {
                                players.css('transition', '');
                                players.css('width', 'var(--playerwidthhv)');
                                players.css('font-size', 'var(--playerfsizehv)');
                                players.css('opacity', '100%');
                                $("#players ol li.player").css('line-height', '20px');
                                state = 1;
                                setTimeout(() => {if (state === 1 ) players.css('transition', 'ease-out 0.5s')}, 100);
                            } else {
                                players.css('transition', '')
                                players.css('width', '');
                                players.css('font-size', 'var(--playerfsize)');
                                players.css('opacity', 'var(--opacity)');
                                $("#players ol li.player").css('line-height', '2px');
                                state = 0;
                                setTimeout(() => {if (state === 0 ) players.css('transition', 'ease-out 0.5s')}, 100);
                            }
                        });
                        players.hover(
                          () => {
                              players.css('opacity', '100%');
                          },
                          () => {
                              players.css('opacity', 'var(--opacity)');
                          })
                    }
                    break;
                }
            }
            // DnD UI Special Compatibility
            if (game.modules.get('dnd-ui') && game.modules.get('dnd-ui').active) {
                rootStyle.setProperty('--playerwidthhv', MinimalUIPlayers.cssPlayersStandardWidth);
            }
            // ---
        });

    }

}