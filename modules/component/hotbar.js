import {rootStyle} from '../util.js';
import '../../styles/component/hotbar.css';

export default class MinimalUIHotbar {

    static hotbarLocked = false;

    static cssHotbarHidden = '-48px';
    static cssHotbarReveal = '1px';
    static cssHotbarShown = '10px';

    static cssHotbarLeftControlsLineHeight = '24px';
    static cssHotbarRightControlsLineHeight = '12px';
    static cssHotbarRightControlsLineHeightDnDUi = '10px';
    static cssHotbarControlsAutoHideHeight = '100%';
    static cssHotbarAutoHideHeight = '1px';
    static cssHotbarAutoHideShadow = '-1px';
    static cssHotbarControlsMargin = '0px';

    static htmlHotbarLockButton =
        `
        <a id="bar-lock">
          <i class="fas fa-lock-open"></i>
        </a>
        `

    static collapseHotbar(toggleId) {
        let target = document.getElementById(toggleId);
        if (target) {
            target.click();
        }
    }

    static lockHotbar(unlock) {
        const barLock = $("#bar-lock > i");
        if (MinimalUIHotbar.hotbarLocked && unlock) {
            rootStyle.setProperty('--macrobarypos', MinimalUIHotbar.cssHotbarHidden);
            barLock.removeClass("fa-lock");
            barLock.addClass("fa-lock-open");
            MinimalUIHotbar.hotbarLocked = false;
        } else {
            rootStyle.setProperty('--macrobarypos', MinimalUIHotbar.cssHotbarReveal);
            barLock.removeClass("fa-lock-open");
            barLock.addClass("fa-lock");
            MinimalUIHotbar.hotbarLocked = true;
        }
    }

    static positionHotbar() {
        let availableWidth = parseInt($("#board").css('width'));
        if (game.settings.get('minimal-ui', 'organizedMinimize') === 'bottomBar') {
            rootStyle.setProperty('--minimw', availableWidth-600+'px');
        }
        switch(game.settings.get('minimal-ui', 'macroBarPosition')) {
            case 'default': {
                rootStyle.setProperty('--macrobarxpos', '220px');
                break;
            }
            case 'left': {
                rootStyle.setProperty('--macrobarxpos', ((availableWidth/2.5)-(availableWidth/9)-(availableWidth/9))+'px');
                break;
            }
            case 'center': {
                rootStyle.setProperty('--macrobarxpos', ((availableWidth/2.5)-(availableWidth/9))+'px');
                break;
            }
            case 'right': {
                rootStyle.setProperty('--macrobarxpos', ((availableWidth/2.5))+'px');
                break;
            }
            case 'manual': {
                rootStyle.setProperty('--macrobarxpos', game.settings.get('minimal-ui', 'macroBarPixelPosition')+'px');
                break;
            }
        }
    }

    static configureHotbar() {
        switch(game.settings.get('minimal-ui', 'macroBar')) {
            case 'collapsed': {
                MinimalUIHotbar.collapseHotbar("bar-toggle");
                if (game.modules.has("custom-hotbar") && game.modules.get('custom-hotbar').active) {
                    MinimalUIHotbar.collapseHotbar("custom-bar-toggle");
                }
                break;
            }
            case 'autohide': {
                if (!(game.modules.has("custom-hotbar") && game.modules.get('custom-hotbar').active)) {
                    rootStyle.setProperty('--macrobarypos', MinimalUIHotbar.cssHotbarHidden);
                    rootStyle.setProperty('--macrobarlh1', MinimalUIHotbar.cssHotbarLeftControlsLineHeight);
                    rootStyle.setProperty('--macrobarlh2', MinimalUIHotbar.cssHotbarRightControlsLineHeight);
                    if (game.modules.get('dnd-ui') && game.modules.get('dnd-ui').active) {
                        rootStyle.setProperty('--macrobarlh2', MinimalUIHotbar.cssHotbarRightControlsLineHeightDnDUi);
                    }
                    rootStyle.setProperty('--macrobarmg', MinimalUIHotbar.cssHotbarControlsMargin);
                    rootStyle.setProperty('--macrobarhh', MinimalUIHotbar.cssHotbarControlsAutoHideHeight);
                    rootStyle.setProperty('--macrobarhv', MinimalUIHotbar.cssHotbarAutoHideHeight);
                    rootStyle.setProperty('--macrobarshp', MinimalUIHotbar.cssHotbarAutoHideShadow);
                    $("#hotbar-directory-controls").append(MinimalUIHotbar.htmlHotbarLockButton);
                    $("#macro-directory").click(function() {MinimalUIHotbar.lockHotbar(false)});
                    $("#bar-lock").click(function() {MinimalUIHotbar.lockHotbar(true)});
                    if (MinimalUIHotbar.hotbarLocked) {
                        MinimalUIHotbar.lockHotbar(false);
                    }
                }
                $("#bar-toggle").remove();
                break;
            }
        }
    }
    
    static initSettings() {

        game.settings.register('minimal-ui', 'macroBar', {
            name: game.i18n.localize("MinimalUI.HotbarStyleName"),
            hint: game.i18n.localize("MinimalUI.HotbarStyleHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "shown": game.i18n.localize("MinimalUI.SettingsAlwaysVisible"),
                "autohide": game.i18n.localize("MinimalUI.SettingsAutoHide"),
                "collapsed": game.i18n.localize("MinimalUI.SettingsCollapsed"),
                "hidden": game.i18n.localize("MinimalUI.SettingsHide")
            },
            default: "autohide",
            onChange: _ => {
                window.location.reload()
            }
        });

        game.settings.register('minimal-ui', 'macroBarSize', {
            name: game.i18n.localize("MinimalUI.HotbarStyleName"),
            hint: game.i18n.localize("MinimalUI.HotbarStyleHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "slots_3": "3 Slots",
                "slots_6": "6 Slots",
                "slots_10": "10 Slots"
            },
            default: "slots_10",
            onChange: _ => {
                window.location.reload()
            }
        });

        game.settings.register('minimal-ui', 'macroBarPosition', {
            name: game.i18n.localize("MinimalUI.HotbarPositionName"),
            hint: game.i18n.localize("MinimalUI.HotbarPositionHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "default": game.i18n.localize("MinimalUI.SettingsDefault"),
                "left": game.i18n.localize("MinimalUI.HotbarPositionCenterLeft"),
                "center": game.i18n.localize("MinimalUI.HotbarPositionCenter"),
                "right": game.i18n.localize("MinimalUI.HotbarPositionCenterRight"),
                "manual": game.i18n.localize("MinimalUI.HotbarPositionManual")
            },
            default: "center",
            onChange: _ => {
                MinimalUIHotbar.positionHotbar();
            }
        });

        game.settings.register('minimal-ui', 'macroBarPixelPosition', {
            name: game.i18n.localize("MinimalUI.HotbarPPositionName"),
            hint: game.i18n.localize("MinimalUI.HotbarPPositionHint"),
            scope: 'world',
            config: true,
            type: String,
            default: "400",
            onChange: _ => {
                MinimalUIHotbar.positionHotbar();
            }
        });
    }

    static initHooks() {
        Hooks.on('canvasPan', function() {
            MinimalUIHotbar.positionHotbar();
        });

        Hooks.once('ready', async function() {

            MinimalUIHotbar.positionHotbar();

            if (game.settings.get('minimal-ui', 'macroBar') !== 'hidden') {
                rootStyle.setProperty('--macrobarvis', 'visible');
            }

        });

        Hooks.on('renderHotbar', async function() {

            MinimalUIHotbar.configureHotbar();

            switch(game.settings.get('minimal-ui', 'macroBarSize')) {
                case "slots_3": {
                    $("#macro-list > li").each(function(i, slot) {
                        if (i > 2) {
                            rootStyle.setProperty('--macrobarwf', '152px');
                            $(slot).remove();
                        }
                    });
                    break;
                }
                case "slots_6": {
                    $("#macro-list > li").each(function(i, slot) {
                        if (i > 5) {
                            rootStyle.setProperty('--macrobarwf', '302px');
                            $(slot).remove();
                        }
                    });
                    break;
                }
            }

        })

    }

}