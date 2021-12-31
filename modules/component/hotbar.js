import {debouncedReload, rootStyle} from '../util.js';
import '../../styles/component/hotbar.css';

export default class MinimalUIHotbar {

    static hotbarLocked = false;

    static cssHotbarHidden = '-43px';
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
        <a class="minui-lock" id="bar-lock">
          <i class="fas fa-lock-open"></i>
        </a>
        `

    static async collapseHotbar(toggleId) {
        await ui.hotbar.collapse();
    }

    static lockHotbar(unlock) {
        const barLock = $("#bar-lock > i");
        if (MinimalUIHotbar.hotbarLocked && unlock) {
            rootStyle.setProperty('--hotbarypos', MinimalUIHotbar.cssHotbarHidden);
            barLock.removeClass("fa-lock");
            barLock.addClass("fa-lock-open");
            MinimalUIHotbar.hotbarLocked = false;
        } else {
            rootStyle.setProperty('--hotbarypos', MinimalUIHotbar.cssHotbarReveal);
            barLock.removeClass("fa-lock-open");
            barLock.addClass("fa-lock");
            MinimalUIHotbar.hotbarLocked = true;
        }
    }

    static positionHotbar() {
        let availableWidth = canvas.app.screen.width;
        switch (game.settings.get('minimal-ui', 'hotbarPosition')) {
            case 'default': {
                rootStyle.setProperty('--hotbarxpos', '220px');
                break;
            }
            case 'left': {
                rootStyle.setProperty('--hotbarxpos', ((availableWidth / 2.5) - (availableWidth / 9) - (availableWidth / 9)) + 'px');
                break;
            }
            case 'center': {
                rootStyle.setProperty('--hotbarxpos', ((availableWidth / 2.5) - (availableWidth / 9)) + 'px');
                break;
            }
            case 'right': {
                rootStyle.setProperty('--hotbarxpos', ((availableWidth / 2.5)) + 'px');
                break;
            }
            case 'manual': {
                rootStyle.setProperty('--hotbarxpos', game.settings.get('minimal-ui', 'hotbarPixelPosition') + 'px');
                break;
            }
        }
    }

    static setHotbarSlots() {
        switch (game.settings.get('minimal-ui', 'hotbarSize')) {
            case "slots_3": {
                $("#macro-list > li").each(function (i, slot) {
                    if (i > 2) {
                        rootStyle.setProperty('--hotbarwf', '152px');
                        $(slot).remove();
                    }
                });
                break;
            }
            case "slots_6": {
                $("#macro-list > li").each(function (i, slot) {
                    if (i > 5) {
                        rootStyle.setProperty('--hotbarwf', '302px');
                        $(slot).remove();
                    }
                });
                break;
            }
        }
    }

    static configureHotbar() {
        switch (game.settings.get('minimal-ui', 'hotbar')) {
            case 'collapsed': {
                MinimalUIHotbar.collapseHotbar("bar-toggle");
                if (game.modules.has("custom-hotbar") && game.modules.get('custom-hotbar').active) {
                    MinimalUIHotbar.collapseHotbar("custom-bar-toggle");
                }
                break;
            }
            case 'autohide': {
                if (!(game.modules.has("custom-hotbar") && game.modules.get('custom-hotbar').active)) {
                    rootStyle.setProperty('--hotbarypos', MinimalUIHotbar.cssHotbarHidden);
                    rootStyle.setProperty('--hotbarlh1', MinimalUIHotbar.cssHotbarLeftControlsLineHeight);
                    rootStyle.setProperty('--hotbarlh2', MinimalUIHotbar.cssHotbarRightControlsLineHeight);
                    if (game.modules.get('dnd-ui') && game.modules.get('dnd-ui').active) {
                        rootStyle.setProperty('--hotbarlh2', MinimalUIHotbar.cssHotbarRightControlsLineHeightDnDUi);
                    }
                    rootStyle.setProperty('--hotbarmg', MinimalUIHotbar.cssHotbarControlsMargin);
                    rootStyle.setProperty('--hotbarhh', MinimalUIHotbar.cssHotbarControlsAutoHideHeight);
                    rootStyle.setProperty('--hotbarhv', MinimalUIHotbar.cssHotbarAutoHideHeight);
                    rootStyle.setProperty('--hotbarshp', MinimalUIHotbar.cssHotbarAutoHideShadow);
                    $("#hotbar-directory-controls").append(MinimalUIHotbar.htmlHotbarLockButton);
                    $("#macro-directory").click(function () {
                        MinimalUIHotbar.lockHotbar(false)
                    });
                    $("#bar-lock").click(function () {
                        MinimalUIHotbar.lockHotbar(true)
                    });
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

        game.settings.register('minimal-ui', 'hotbar', {
            name: game.i18n.localize("MinimalUI.HotbarStyleName"),
            hint: game.i18n.localize("MinimalUI.HotbarStyleHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "shown": game.i18n.localize("MinimalUI.SettingsAlwaysVisible"),
                "autohide": game.i18n.localize("MinimalUI.SettingsAutoHide"),
                "collapsed": game.i18n.localize("MinimalUI.SettingsCollapsed"),
                "onlygm": game.i18n.localize("MinimalUI.SettingsOnlyGM"),
                "hidden": game.i18n.localize("MinimalUI.SettingsHide")
            },
            default: "autohide",
            onChange: debouncedReload
        });

        game.settings.register('minimal-ui', 'hotbarSize', {
            name: game.i18n.localize("MinimalUI.HotbarSizeName"),
            hint: game.i18n.localize("MinimalUI.HotbarSizeHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "slots_3": game.i18n.localize("MinimalUI.HotbarSlots3"),
                "slots_6": game.i18n.localize("MinimalUI.HotbarSlots6"),
                "slots_10": game.i18n.localize("MinimalUI.HotbarSlots10")
            },
            default: "slots_10",
            onChange: debouncedReload
        });

        game.settings.register('minimal-ui', 'hotbarPosition', {
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
            onChange: MinimalUIHotbar.positionHotbar
        });

        game.settings.register('minimal-ui', 'hotbarPixelPosition', {
            name: game.i18n.localize("MinimalUI.HotbarPPositionName"),
            hint: game.i18n.localize("MinimalUI.HotbarPPositionHint"),
            scope: 'world',
            config: true,
            type: String,
            default: "400",
            onChange: MinimalUIHotbar.positionHotbar
        });
    }

    static initHooks() {
        Hooks.on('ready', async function() {
            ui.hotbar.element.hide();
            MinimalUIHotbar.positionHotbar();
            if (game.settings.get('minimal-ui', 'hotbar') !== 'hidden') {
                const gmCondition = game.settings.get('minimal-ui', 'hotbar') === 'onlygm';
                if (gmCondition) {
                    if (game.user.isGM)
                        rootStyle.setProperty('--hotbarvis', 'visible');
                } else
                    rootStyle.setProperty('--hotbarvis', 'visible');
            }
            // Give time to auto-hide initial animations to finish
            if (game.settings.get('minimal-ui', 'playerList') === 'autohide')
                await new Promise(waitABit => setTimeout(waitABit, 50));
            ui.hotbar.element.show();
        });

        // Needs to be .on so changing hotbar pages also applies
        Hooks.on('renderHotbar', function () {
            MinimalUIHotbar.configureHotbar();
            MinimalUIHotbar.setHotbarSlots();
            if (game.modules.get('custom-hotbar')?.active)
                rootStyle.setProperty('--hotbarhv', MinimalUIHotbar.cssHotbarCustomHotbarCompatHover);
        });

        Hooks.once('renderCustomHotbar', function() {
            if (game.modules.get("custom-hotbar")?.active && game.settings.get('minimal-ui', 'hotbar') === 'collapsed') {
                ui.customHotbar?.collapse()
            }
        })

        Hooks.on('collapseSidebar', function() {
            MinimalUIHotbar.positionHotbar();
        });

        Hooks.on('renderCompendium', function(compendium) {
            if (compendium.metadata.type === 'Macro')
                MinimalUIHotbar.lockHotbar(false)
        })
    }

}