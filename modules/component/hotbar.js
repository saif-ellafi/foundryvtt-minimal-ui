import {debouncedReload, rootStyle} from '../util.js';
import '../../styles/component/hotbar.css';
import MinimalUIPlayers from "./players";

export default class MinimalUIHotbar {

    static hotbarLocked = false;

    static cssHotbarHidden = '-50px';
    static cssHotbarAutoHideHeight = '-5px';
    static cssHotbarAutoHideHeightWinTop = '1px';

    static cssHotbarLeftControlsLineHeight = '24px';
    static cssHotbarRightControlsLineHeight = '12px';
    static cssHotbarRightControlsLineHeightDnDUi = '10px';
    static cssHotbarControlsAutoHideHeight = '100%';
    static cssHotbarAutoHideShadow = '-1px';
    static cssHotbarControlsMargin = '0px';
    static cssHotbarCustomHotbarCompatHover = '10px';

    static htmlHotbarLockButton =
        `
        <a class="minui-lock" id="bar-lock">
          <i class="fas fa-lock-open"></i>
        </a>
        `

    static lockHotbar(unlock) {
        if ((game.modules.get("custom-hotbar")?.active) || (game.modules.get('monks-hotbar-expansion')?.active) || (game.webrtc.mode > 0 && game.webrtc.settings.client.dockPosition === 'bottom'))
            return;
        const barLock = $("#bar-lock > i");
        if (MinimalUIHotbar.hotbarLocked && unlock) {
            rootStyle.setProperty('--hotbarypos', MinimalUIHotbar.cssHotbarHidden);
            barLock.removeClass("fa-lock");
            barLock.addClass("fa-lock-open");
            MinimalUIHotbar.hotbarLocked = false;
        } else if (game.settings.get('minimal-ui', 'hotbar') === 'autohide') {
            rootStyle.setProperty('--hotbarypos', MinimalUIHotbar.cssHotbarAutoHideHeight);
            barLock.removeClass("fa-lock-open");
            barLock.addClass("fa-lock");
            MinimalUIHotbar.hotbarLocked = true;
        }
    }

    static positionHotbar() {
        let availableWidth = canvas.app?.screen.width;
        if (!availableWidth)
            return;
        let webrtcAdjust = 0;
        let webrtcVAdjust = 0;

        if (game.webrtc.mode > 0 && !ui.webrtc.element.hasClass('hidden')) {
            if (game.webrtc.settings.client.dockPosition === 'left')
                webrtcAdjust = (ui.webrtc.hidden ? 0 : ui.webrtc.position.width)
            if (game.webrtc.settings.client.dockPosition === 'bottom') {
                webrtcVAdjust = 187;
            }
        }

        const autoHideOrLock = !game.settings.get('minimal-ui', 'hotbar') === 'autohide' || ((game.webrtc.mode > 0 && game.webrtc.settings.client.dockPosition === 'bottom') ||
            (game.modules.get('window-controls')?.active &&
                game.settings.get('window-controls', 'organizedMinimize') === 'persistentBottom'));

        if (game.modules.get('window-controls')?.active && autoHideOrLock)
            if (game.settings.get('window-controls', 'organizedMinimize') === 'persistentBottom')
                rootStyle.setProperty('--hotbarypos', webrtcVAdjust + 40 + 'px');
            else if (game.settings.get('window-controls', 'organizedMinimize') === 'persistentTop')
                rootStyle.setProperty('--hotbarypos', webrtcVAdjust + 5 + 'px');
            else
                rootStyle.setProperty('--hotbarypos', webrtcVAdjust + 'px');

        switch (game.settings.get('minimal-ui', 'hotbarPosition')) {
            case 'default': {
                rootStyle.setProperty('--hotbarxpos', (330 + webrtcAdjust)+'px');
                break;
            }
            case 'extremeLeft': {
                if (
                  !(game.modules.get("custom-hotbar")?.active) &&
                  availableWidth >= 1200
                )
                    rootStyle.setProperty('--hotbarxpos', 8 + webrtcAdjust + 'px');
                break;
            }
            case 'left': {
                rootStyle.setProperty('--hotbarxpos', ((availableWidth / 2.5) - (availableWidth / 9) - (availableWidth / 9) + webrtcAdjust) + 'px');
                break;
            }
            case 'center': {
                rootStyle.setProperty('--hotbarxpos', ((availableWidth / 2.5) - (availableWidth / 9) + webrtcAdjust) + 'px');
                break;
            }
            case 'right': {
                rootStyle.setProperty('--hotbarxpos', ((availableWidth / 2.5) + webrtcAdjust) + 'px');
                break;
            }
            case 'manual': {
                rootStyle.setProperty('--hotbarxpos', (parseInt(game.settings.get('minimal-ui', 'hotbarPixelPosition')) + webrtcAdjust) + 'px');
                break;
            }
        }
        MinimalUIPlayers.positionPlayers();
    }

    static configureHotbar() {
        const autoHideBlocked = (game.webrtc.mode > 0 && game.webrtc.settings.client.dockPosition === 'bottom') ||
            (game.modules.get('window-controls')?.active &&
            game.settings.get('window-controls', 'organizedMinimize') === 'persistentBottom');
        if (game.settings.get('minimal-ui', 'hotbar') === 'autohide' && !autoHideBlocked) {
            if (!(game.modules.get("custom-hotbar")?.active || game.modules.get('monks-hotbar-expansion')?.active)) {
                rootStyle.setProperty('--hotbarypos', MinimalUIHotbar.cssHotbarHidden);
                rootStyle.setProperty('--hotbarlh1', MinimalUIHotbar.cssHotbarLeftControlsLineHeight);
                rootStyle.setProperty('--hotbarlh2', MinimalUIHotbar.cssHotbarRightControlsLineHeight);
                if (game.modules.get('dnd-ui')?.active) {
                    rootStyle.setProperty('--hotbarlh2', MinimalUIHotbar.cssHotbarRightControlsLineHeightDnDUi);
                }
                rootStyle.setProperty('--hotbarmg', MinimalUIHotbar.cssHotbarControlsMargin);
                rootStyle.setProperty('--hotbarhh', MinimalUIHotbar.cssHotbarControlsAutoHideHeight);
                if (game.modules.get('window-controls')?.active &&
                    game.settings.get('window-controls', 'organizedMinimize') === 'persistentTop')
                    rootStyle.setProperty('--hotbarhv', MinimalUIHotbar.cssHotbarAutoHideHeightWinTop);
                else
                    rootStyle.setProperty('--hotbarhv', MinimalUIHotbar.cssHotbarAutoHideHeight);
                rootStyle.setProperty('--hotbarshp', MinimalUIHotbar.cssHotbarAutoHideShadow);
                $("#hotbar-directory-controls").append(MinimalUIHotbar.htmlHotbarLockButton);
                $("#macro-directory").click(function () {
                    MinimalUIHotbar.lockHotbar(false)
                });
                $("#bar-lock").click(function () {
                    MinimalUIHotbar.lockHotbar(true)
                });
                $(".page-control").click(function () {
                    MinimalUIHotbar.lockHotbar(false)
                });
                if (MinimalUIHotbar.hotbarLocked) {
                    MinimalUIHotbar.lockHotbar(false);
                }
                $("#bar-toggle").remove();
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
            default: "collapsed",
            onChange: debouncedReload
        });

        game.settings.register('minimal-ui', 'hotbarPosition', {
            name: game.i18n.localize("MinimalUI.HotbarPositionName"),
            hint: game.i18n.localize("MinimalUI.HotbarPositionHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "default": game.i18n.localize("MinimalUI.HotbarPositionMaxLeft"),
                "extremeLeft": game.i18n.localize("MinimalUI.HotbarPositionExtremeLeft"),
                "left": game.i18n.localize("MinimalUI.HotbarPositionCenterLeft"),
                "center": game.i18n.localize("MinimalUI.HotbarPositionCenter"),
                "right": game.i18n.localize("MinimalUI.HotbarPositionCenterRight"),
                "manual": game.i18n.localize("MinimalUI.HotbarPositionManual")
            },
            default: "extremeLeft",
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
            MinimalUIHotbar.positionHotbar();
        });

        // Needs to be .on so changing hotbar pages also applies
        Hooks.on('renderHotbar', function () {
            MinimalUIHotbar.configureHotbar();
            if (game.modules.get('custom-hotbar')?.active) {
                rootStyle.setProperty('--hotbarhv', MinimalUIHotbar.cssHotbarCustomHotbarCompatHover);
                $("#hotbar").css('margin-bottom', '-5px');
            }
            if (game.modules.get('monks-hotbar-expansion')?.active) {
                $("#hotbar").css('position', 'absolute');
            }
        });

        Hooks.on('rtcSettingsChanged', function() {
            MinimalUIHotbar.positionHotbar();
        })

        Hooks.once('renderHotbar', function() {
            const hotbarSetting = game.settings.get('minimal-ui', 'hotbar');
            if (hotbarSetting === 'collapsed')
                ui.hotbar.collapse();
            else if (hotbarSetting === 'onlygm') {
                if (!game.user.isGM)
                    rootStyle.setProperty('--hotbarvis', 'hidden');
            } else if (hotbarSetting === 'hidden')
                rootStyle.setProperty('--hotbarvis', 'hidden');
        });

        Hooks.once('renderCustomHotbar', function() {
            if (game.modules.get("custom-hotbar")?.active && game.settings.get('minimal-ui', 'hotbar') === 'collapsed') {
                ui.customHotbar?.collapse()
            }
        })

        Hooks.on('renderCompendium', function(compendium) {
            if (compendium.metadata.type === 'Macro')
                MinimalUIHotbar.lockHotbar(false)
        })
    }

}