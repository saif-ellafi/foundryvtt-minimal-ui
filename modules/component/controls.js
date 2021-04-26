import {rootStyle} from '../util.js';
import '../../styles/component/controls.css';

export default class MinimalUIControls {

    static controlsLocked = false;
    static fakeDisabled = false;
    static cssControlsLastPos = '0px';

    static cssControlsStartVisible = '0px';
    static cssControlsHiddenPositionSmall = '-62px';
    static cssControlsHiddenPositionStandard = '-72px';

    static cssControlsSubMenuSmall = '48px';
    static cssControlsSubMenuStandard = '58px';
    static cssControlsSubMenuDndUi = '58px';

    static cssControlsPaddingDefault = '7px';
    static cssControlsPaddingSmall = '26px';

    static cssControlsSmallWidth = '25px';
    static cssControlsSmallHeight = '28px';
    static cssControlsSmallLineHeight = '30px';
    static cssControlsSmallFontSize = '15px';

    static lockControls(unlock) {
        const sidebarLock = $("#sidebar-lock > i");
        if (!MinimalUIControls.controlsLocked) {
            MinimalUIControls.controlsLocked = true;
            MinimalUIControls.cssControlsLastPos = rootStyle.getPropertyValue('--controlsxpos');
            rootStyle.setProperty('--controlsxpos', MinimalUIControls.cssControlsStartVisible);
            rootStyle.setProperty('--controlspad', MinimalUIControls.cssControlsPaddingDefault);
            if (game.settings.get('minimal-ui', 'controlsSize') === 'small') {
                rootStyle.setProperty('--controlssubstart', MinimalUIControls.cssControlsSubMenuSmall);
            } else {
                rootStyle.setProperty('--controlssubstart', MinimalUIControls.cssControlsSubMenuStandard);
            }
            // Special compatibility DnD-UI
            if (game.modules.get('dnd-ui') && game.modules.get('dnd-ui').active) {
                rootStyle.setProperty('--controlssubstart', MinimalUIControls.cssControlsSubMenuDndUi);
                rootStyle.setProperty('--controlssubhover', MinimalUIControls.cssControlsSubMenuDndUi);
            }
            // ---
            sidebarLock.removeClass("fa-lock-open");
            sidebarLock.addClass("fa-lock");
        } else if (unlock) {
            MinimalUIControls.controlsLocked = false;
            sidebarLock.removeClass("fa-lock");
            sidebarLock.addClass("fa-lock-open");
            rootStyle.setProperty('--controlsxpos', MinimalUIControls.cssControlsLastPos);
            if (game.settings.get('minimal-ui', 'controlsSize') === 'small') {
                rootStyle.setProperty('--controlssubstart', MinimalUIControls.cssControlsHiddenPositionSmall);
            } else {
                rootStyle.setProperty('--controlssubstart', MinimalUIControls.cssControlsHiddenPositionStandard);
            }
            rootStyle.setProperty('--controlspad', MinimalUIControls.cssControlsPaddingSmall);
        }
    }

    static positionSidebar() {
        let availableHeight = parseInt($("#board").css('height'));
        switch(true) {
            case (game.settings.get('minimal-ui', 'controlsPosition') === 'top' || game.settings.get('minimal-ui', 'controlsStyle') === 'column'): {
                rootStyle.setProperty('--controlsypos', ((availableHeight/3)-(availableHeight/9)-(availableHeight/9))+'px');
                break;
            }
            case (game.settings.get('minimal-ui', 'controlsPosition') === 'center'): {
                rootStyle.setProperty('--controlsypos', ((availableHeight/3)-(availableHeight/9))+'px');
                break;
            }
            case (game.settings.get('minimal-ui', 'controlsPosition') ===  'lower'): {
                rootStyle.setProperty('--controlsypos', ((availableHeight/3))+'px');
                break;
            }
            case (game.settings.get('minimal-ui', 'controlsPosition') ===  'bottom'): {
                rootStyle.setProperty('--controlsypos', ((availableHeight/3)+(availableHeight/9))+'px');
                break;
            }
        }
    }

    static addLockButton() {
        const locked = MinimalUIControls.controlsLocked ? 'fa-lock' : 'fa-lock-open';
        const SidebarLockButton =
            $(`
            <li id="sidebar-lock" class="scene-control"
            title="${game.i18n.localize("MinimalUI.PinSidebar")}">
            <i class="fas ${locked}" style="color: red"></i>
            </li>
            `)
        if (game.settings.get('minimal-ui', 'controlsBehaviour') === 'autohide') {
            SidebarLockButton
                .click(() => MinimalUIControls.lockControls(true))
                .appendTo("#controls");
        }
    }

    static initSettings() {

        game.settings.register('minimal-ui', 'controlsBehaviour', {
            name: game.i18n.localize("MinimalUI.ControlsBehaviourName"),
            hint: game.i18n.localize("MinimalUI.ControlsBehaviourHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "always": game.i18n.localize("MinimalUI.SettingsAlwaysVisible"),
                "autohide": game.i18n.localize("MinimalUI.SettingsAutoHide")
            },
            default: "autohide",
            onChange: _ => {
                window.location.reload()
            }
        });

        game.settings.register('minimal-ui', 'controlsSize', {
            name: game.i18n.localize("MinimalUI.ControlsSizeName"),
            hint: game.i18n.localize("MinimalUI.ControlsSizeHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "small": game.i18n.localize("MinimalUI.SettingsSmall"),
                "standard": game.i18n.localize("MinimalUI.SettingsStandard")
            },
            default: "small",
            onChange: _ => {
                window.location.reload()
            }
        });

        game.settings.register('minimal-ui', 'controlsStyle', {
            name: game.i18n.localize("MinimalUI.ControlsStyleName"),
            hint: game.i18n.localize("MinimalUI.ControlsStyleHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "default": game.i18n.localize("MinimalUI.ControlsStyleExpandRight"),
                "column": game.i18n.localize("MinimalUI.ControlsStyleSingleColumn")
            },
            default: "default",
            onChange: _ => {
                window.location.reload()
            }
        });

        game.settings.register('minimal-ui', 'controlsPosition', {
            name: game.i18n.localize("MinimalUI.ControlsPositionName"),
            hint: game.i18n.localize("MinimalUI.ControlsPositionHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "top": game.i18n.localize("MinimalUI.ControlsPositionTopLeft"),
                "center": game.i18n.localize("MinimalUI.ControlsPositionUpperLeft"),
                "lower": game.i18n.localize("MinimalUI.ControlsPositionLowerLeft"),
                "bottom": game.i18n.localize("MinimalUI.ControlsPositionBottomLeft")
            },
            default: "center",
            onChange: _ => {
                window.location.reload()
            }
        });

    }

    static initHooks() {
        Hooks.once('renderSceneControls', async function() {
            if (game.settings.get('minimal-ui', 'controlsSize') === 'small') {
                rootStyle.setProperty('--controlssubstart', MinimalUIControls.cssControlsSubMenuSmall);
                rootStyle.setProperty('--controlssubhover', MinimalUIControls.cssControlsSubMenuSmall);
                rootStyle.setProperty('--controlsw', MinimalUIControls.cssControlsSmallWidth);
                rootStyle.setProperty('--controlsh', MinimalUIControls.cssControlsSmallHeight);
                rootStyle.setProperty('--controlslh', MinimalUIControls.cssControlsSmallLineHeight);
                rootStyle.setProperty('--controlsfs', MinimalUIControls.cssControlsSmallFontSize);
            } else {
                rootStyle.setProperty('--controlssubstart', MinimalUIControls.cssControlsSubMenuStandard);
                rootStyle.setProperty('--controlssubhover', MinimalUIControls.cssControlsSubMenuStandard);
            }
            // Special compatibility DnD-UI
            if (game.modules.get('dnd-ui') && game.modules.get('dnd-ui').active) {
                rootStyle.setProperty('--controlssubstart', MinimalUIControls.cssControlsSubMenuDndUi);
                rootStyle.setProperty('--controlssubhover', MinimalUIControls.cssControlsSubMenuDndUi);
            }
            // ---

            MinimalUIControls.positionSidebar();
        })

        Hooks.on('canvasPan', function() {
            MinimalUIControls.positionSidebar();
        });

        Hooks.once('renderSceneControls', async function() {

            switch(game.settings.get('minimal-ui', 'controlsStyle')) {
                case 'default': {
                    rootStyle.setProperty('--controlssubstyle', 'block');
                    break;
                }
                case 'column': {
                    rootStyle.setProperty('--controlssubstyle', 'contents');
                    break;
                }
            }

        })

        Hooks.on('renderSceneControls', async function() {

            const controls = $("#controls");

            // Hide controls altogether when they're disabled
            if (!MinimalUIControls.fakeDisabled && controls.hasClass('disabled')) {
                controls.hide();
            } else {
                controls.show();
            }

            if (game.settings.get('minimal-ui', 'controlsBehaviour') === 'autohide' && !MinimalUIControls.controlsLocked) {
                if (game.settings.get('minimal-ui', 'controlsSize') === 'small') {
                    rootStyle.setProperty('--controlsxpos', MinimalUIControls.cssControlsHiddenPositionSmall);
                    rootStyle.setProperty('--controlssubstart', MinimalUIControls.cssControlsHiddenPositionSmall);
                } else {
                    rootStyle.setProperty('--controlsxpos', MinimalUIControls.cssControlsHiddenPositionStandard);
                    rootStyle.setProperty('--controlssubstart', MinimalUIControls.cssControlsHiddenPositionStandard);
                }
                rootStyle.setProperty('--controlspad', MinimalUIControls.cssControlsPaddingSmall);
            } else {
                rootStyle.setProperty('--controlspad', MinimalUIControls.cssControlsPaddingDefault);
                rootStyle.setProperty('--controlsxpos', MinimalUIControls.cssControlsStartVisible);
            }

            MinimalUIControls.addLockButton();

            // --------------- COMPATIBILITY SECTION ------------------
            // Here we add workarounds for minimal UI to work well with modules that affect UI components

            // Give a little time for other modules to add their controls first, and reapply changes
            await new Promise(waitABit => setTimeout(waitABit, 1));

            $("#controls > li.scene-control").on('click', function() {
                MinimalUIControls.lockControls(false);
                $("#controls > li.scene-control.active > ol > li").on('click', function() {
                    MinimalUIControls.lockControls(false)
                });
            });
            $("#controls > li.scene-control.active > ol > li").on('click', function() {
                MinimalUIControls.lockControls(false);
            });

            // Delete and add lock button if needed, so the lock is always at the bottom
            const controlsList = $("#controls > li");
            const sidebarLock = $("#sidebar-lock");
            if (controlsList.index(sidebarLock) !== controlsList.length) {
                sidebarLock.remove();
                MinimalUIControls.addLockButton();
            }

            // Support for Simple Dice Roller
            if (game.modules.has('simple-dice-roller') && game.modules.get('simple-dice-roller').active) {
                $("#controls > li.scene-control.sdr-scene-control").click(function() {
                    let olControl = $("#controls > li.scene-control.sdr-scene-control.active > ol")[0];
                    if (olControl) {
                        olControl.style.setProperty('display', 'inherit');
                    }
                });
            }

            // ----------------------------------------------------------------------

        })
    }

}