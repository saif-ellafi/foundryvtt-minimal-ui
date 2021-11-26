import {debouncedReload, rootStyle} from '../util.js';
import '../../styles/component/controls.css';

export default class MinimalUIControls {

    static controlsLocked = false;
    static fakeDisabled = false;
    static cssControlsLastPos = '0px';

    static controlToolsHoverTransition;

    static cssControlsStartVisible = '0px';
    static cssControlsHiddenPositionSmall = '-36px';
    static cssControlsHiddenPositionStandard = '-46px';

    static cssControlsSubMenuSmall = '50px';
    static cssControlsSubMenuStandard = '60px';
    static cssControlsSubMenuDndUi = '65px';

    static cssControlsPaddingDefault = '7px';
    static cssControlsPaddingHidden = '26px';

    static cssControlsStandardWidth = '36px';
    static cssControlsStandardHeight = '30px';
    static cssControlsStandardLineHeight = '30px';
    static cssControlsStandardFontSize = '24px';

    static cssControlsSmallWidth = '25px';
    static cssControlsSmallHeight = '24px';
    static cssControlsSmallLineHeight = '25px';
    static cssControlsSmallFontSize = '15px';

    static revealControls() {
        rootStyle.setProperty('--controlspad', MinimalUIControls.cssControlsPaddingDefault);
        rootStyle.setProperty('--controlsxpos', MinimalUIControls.cssControlsStartVisible);
    }

    static revealControlTools() {
        const controlSettings = game.settings.get('minimal-ui', 'controlsBehaviour');
        if (game.settings.get('minimal-ui', 'controlsSize') === 'small') {
            if (controlSettings === 'partial')
                rootStyle.setProperty('--controlssubleft', MinimalUIControls.cssControlsHiddenPositionSmall);
            else
                rootStyle.setProperty('--controlssubleft', MinimalUIControls.cssControlsSubMenuSmall);
            rootStyle.setProperty('--controlssubsubleft', MinimalUIControls.cssControlsSubMenuSmall);
        } else {
            if (controlSettings === 'partial')
                rootStyle.setProperty('--controlssubleft', MinimalUIControls.cssControlsHiddenPositionStandard);
            else
                rootStyle.setProperty('--controlssubleft', MinimalUIControls.cssControlsSubMenuStandard);
            rootStyle.setProperty('--controlssubsubleft', MinimalUIControls.cssControlsSubMenuStandard);
        }
        // Special compatibility DnD-UI
        if (game.modules.get('dnd-ui') && game.modules.get('dnd-ui').active) {
            rootStyle.setProperty('--controlssubleft', MinimalUIControls.cssControlsSubMenuDndUi);
            rootStyle.setProperty('--controlssubsubleft', MinimalUIControls.cssControlsSubMenuDndUi);
        }
        // ---
    }

    static hideControls() {
        rootStyle.setProperty('--controlspad', MinimalUIControls.cssControlsPaddingHidden);
        if (game.settings.get('minimal-ui', 'controlsSize') === 'small') {
            rootStyle.setProperty('--controlsxpos', MinimalUIControls.cssControlsHiddenPositionSmall);
        } else {
            rootStyle.setProperty('--controlsxpos', MinimalUIControls.cssControlsHiddenPositionStandard);
        }
    }

    static hideControlTools() {
        if (game.settings.get('minimal-ui', 'controlsSize') === 'small') {
            rootStyle.setProperty('--controlssubleft', MinimalUIControls.cssControlsHiddenPositionSmall);
            rootStyle.setProperty('--controlssubsubleft', MinimalUIControls.cssControlsHiddenPositionSmall);
        } else {
            rootStyle.setProperty('--controlssubleft', MinimalUIControls.cssControlsHiddenPositionStandard);
            rootStyle.setProperty('--controlssubsubleft', MinimalUIControls.cssControlsHiddenPositionStandard);
        }
    }

    static lockControls(unlock) {
        const sidebarLock = $("#sidebar-lock > i");
        if (!MinimalUIControls.controlsLocked) {
            MinimalUIControls.controlsLocked = true;
            MinimalUIControls.cssControlsLastPos = rootStyle.getPropertyValue('--controlsxpos');
            MinimalUIControls.revealControls();
            MinimalUIControls.revealControlTools();
            sidebarLock.removeClass("fa-lock-open");
            sidebarLock.addClass("fa-lock");
        } else if (unlock) {
            MinimalUIControls.controlsLocked = false;
            sidebarLock.removeClass("fa-lock");
            sidebarLock.addClass("fa-lock-open");
            MinimalUIControls.hideControls();
            MinimalUIControls.hideControlTools();
        }
    }

    static positionSidebar() {
        let availableHeight = parseInt($("#board").css('height'));
        switch (true) {
            case (game.settings.get('minimal-ui', 'controlsPosition') === 'top' || game.settings.get('minimal-ui', 'controlsStyle') === 'column'): {
                rootStyle.setProperty('--controlsypos', ((availableHeight / 3) - (availableHeight / 9) - (availableHeight / 9)) + 'px');
                break;
            }
            case (game.settings.get('minimal-ui', 'controlsPosition') === 'center'): {
                rootStyle.setProperty('--controlsypos', ((availableHeight / 3) - (availableHeight / 9)) + 'px');
                break;
            }
            case (game.settings.get('minimal-ui', 'controlsPosition') === 'lower'): {
                rootStyle.setProperty('--controlsypos', ((availableHeight / 3)) + 'px');
                break;
            }
            case (game.settings.get('minimal-ui', 'controlsPosition') === 'bottom'): {
                rootStyle.setProperty('--controlsypos', ((availableHeight / 3) + (availableHeight / 9)) + 'px');
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
            <i class="fas ${locked} minui-lock"></i>
            </li>
            `)
        if (game.settings.get('minimal-ui', 'controlsBehaviour') === 'autohide') {
            SidebarLockButton
                .click(() => MinimalUIControls.lockControls(true))
                .appendTo("#controls");
        }
    }

    static sizeControls() {
        if (game.settings.get('minimal-ui', 'controlsSize') === 'small') {
            rootStyle.setProperty('--controlsw', MinimalUIControls.cssControlsSmallWidth);
            rootStyle.setProperty('--controlsh', MinimalUIControls.cssControlsSmallHeight);
            rootStyle.setProperty('--controlslh', MinimalUIControls.cssControlsSmallLineHeight);
            rootStyle.setProperty('--controlsfs', MinimalUIControls.cssControlsSmallFontSize);
        } else {
            rootStyle.setProperty('--controlsw', MinimalUIControls.cssControlsStandardWidth);
            rootStyle.setProperty('--controlsh', MinimalUIControls.cssControlsStandardHeight);
            rootStyle.setProperty('--controlslh', MinimalUIControls.cssControlsStandardLineHeight);
            rootStyle.setProperty('--controlsfs', MinimalUIControls.cssControlsStandardFontSize);
        }
        MinimalUIControls.positionSidebar();
        const controlSettings = game.settings.get('minimal-ui', 'controlsBehaviour');
        if (MinimalUIControls.controlsLocked) {
            MinimalUIControls.revealControls();
            MinimalUIControls.revealControlTools();
        } else if (controlSettings === 'autohide') {
            MinimalUIControls.hideControls();
            MinimalUIControls.hideControlTools();
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
                "partial": game.i18n.localize("MinimalUI.SettingsPartiallyVisible"),
                "autohide": game.i18n.localize("MinimalUI.SettingsAutoHide")
            },
            default: "autohide",
            onChange: debouncedReload
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
            onChange: MinimalUIControls.sizeControls
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
            onChange: debouncedReload
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
            onChange: MinimalUIControls.positionSidebar
        });

    }

    static initHooks() {
        Hooks.once('ready', function () {
            MinimalUIControls.positionSidebar();
        })

        Hooks.once('renderSceneControls', function () {
            MinimalUIControls.sizeControls();

            switch (game.settings.get('minimal-ui', 'controlsStyle')) {
                case 'default': {
                    rootStyle.setProperty('--controlssubstyle', 'block');
                    break;
                }
                case 'column': {
                    rootStyle.setProperty('--controlssubstyle', 'contents');
                    break;
                }
            }

        });

        Hooks.on('renderSceneControls', async function () {

            const controls = $("#controls");
            const controlSettings = game.settings.get('minimal-ui', 'controlsBehaviour');

            // Hide controls altogether when they're disabled
            if (!MinimalUIControls.fakeDisabled && controls.hasClass('disabled')) {
                controls.hide();
            } else {
                controls.show();
            }

            if (controlSettings === 'autohide') {
                controls.hover(
                    function () {
                        if (!MinimalUIControls.controlsLocked) {
                            MinimalUIControls.revealControls();
                            MinimalUIControls.revealControlTools();
                            clearTimeout(MinimalUIControls.controlToolsHoverTransition);
                        }
                    },
                    function () {
                        if (!MinimalUIControls.controlsLocked) {
                            MinimalUIControls.controlToolsHoverTransition = setTimeout(function () {
                                MinimalUIControls.hideControls();
                                MinimalUIControls.hideControlTools();
                            }, 500)
                        }
                    }
                )
            }

            if (controlSettings === 'autohide' && !MinimalUIControls.controlsLocked) {
                MinimalUIControls.hideControls();
                MinimalUIControls.hideControlTools();
            } else {
                MinimalUIControls.revealControls();
                MinimalUIControls.revealControlTools();
            }

            MinimalUIControls.addLockButton();

            // --------------- COMPATIBILITY SECTION ------------------
            // Here we add workarounds for minimal UI to work well with modules that affect UI components

            // Give a little time for other modules to add their controls first, and reapply changes
            await new Promise(waitABit => setTimeout(waitABit, 1));

            $("#controls > li.scene-control").on('click', function () {
                MinimalUIControls.lockControls(false);
                $("#controls > li.scene-control.active > ol > li").on('click', function () {
                    MinimalUIControls.lockControls(false)
                });
            });
            $("#controls > li.scene-control.active > ol > li").on('click', function () {
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
                $("#controls > li.scene-control.sdr-scene-control").click(function () {
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