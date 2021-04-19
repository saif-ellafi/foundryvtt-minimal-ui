import {rootStyle} from '../minimal-ui-util.js';

export default class MinimalUIControls {

    static controlsLocked = false;
    static fakeDisabled = false;
    static cssControlsLastPos = '0px';

    static cssLeftBarStartVisible = '0px';
    static cssLeftBarHiddenPositionSmall = '-62px';
    static cssLeftBarHiddenPositionStandard = '-72px';

    static cssLeftBarSubMenuSmall = '55px';
    static cssLeftBarSubMenuStandard = '65px';
    static cssLeftBarSubMenuDndUi = '65px';

    static cssLeftBarPaddingDefault = '7px';
    static cssLeftBarPaddingSmall = '26px';
    static cssLeftBarPaddingStandard = '20px';

    static cssLeftBarSmallWidth = '25px';
    static cssLeftBarSmallHeight = '28px';
    static cssLeftBarSmallLineHeight = '30px';
    static cssLeftBarSmallFontSize = '15px';

    static lockControls(unlock) {
        const sidebarLock = $("#sidebar-lock > i");
        if (!MinimalUIControls.controlsLocked) {
            MinimalUIControls.controlsLocked = true;
            MinimalUIControls.cssControlsLastPos = rootStyle.getPropertyValue('--leftbarxpos');
            rootStyle.setProperty('--leftbarxpos', MinimalUIControls.cssLeftBarStartVisible);
            rootStyle.setProperty('--leftbarpad', MinimalUIControls.cssLeftBarPaddingDefault);
            if (game.settings.get('minimal-ui', 'sidePanelSize') === 'small') {
                rootStyle.setProperty('--leftbarsubstart', MinimalUIControls.cssLeftBarSubMenuSmall);
            } else {
                rootStyle.setProperty('--leftbarsubstart', MinimalUIControls.cssLeftBarSubMenuStandard);
            }
            // Special compatibility DnD-UI
            if (game.modules.get('dnd-ui') && game.modules.get('dnd-ui').active) {
                rootStyle.setProperty('--leftbarsubstart', MinimalUIControls.cssLeftBarSubMenuDndUi);
                rootStyle.setProperty('--leftbarsubhover', MinimalUIControls.cssLeftBarSubMenuDndUi);
            }
            // ---
            sidebarLock.removeClass("fa-lock-open");
            sidebarLock.addClass("fa-lock");
        } else if (unlock) {
            MinimalUIControls.controlsLocked = false;
            sidebarLock.removeClass("fa-lock");
            sidebarLock.addClass("fa-lock-open");
            rootStyle.setProperty('--leftbarxpos', MinimalUIControls.cssControlsLastPos);
            if (game.settings.get('minimal-ui', 'sidePanelSize') === 'small') {
                rootStyle.setProperty('--leftbarsubstart', MinimalUIControls.cssLeftBarHiddenPositionSmall);
            } else {
                rootStyle.setProperty('--leftbarsubstart', MinimalUIControls.cssLeftBarHiddenPositionStandard);
            }
            rootStyle.setProperty('--leftbarpad', MinimalUIControls.cssLeftBarPaddingSmall);
        }
    }

    static positionSidebar() {
        let availableHeight = parseInt($("#board").css('height'));
        switch(true) {
            case (game.settings.get('minimal-ui', 'sidePanelPosition') === 'top' || game.settings.get('minimal-ui', 'sidePanelMenuStyle') === 'column'): {
                rootStyle.setProperty('--leftbarypos', ((availableHeight/3)-(availableHeight/9)-(availableHeight/9))+'px');
                break;
            }
            case (game.settings.get('minimal-ui', 'sidePanelPosition') === 'center'): {
                rootStyle.setProperty('--leftbarypos', ((availableHeight/3)-(availableHeight/9))+'px');
                break;
            }
            case (game.settings.get('minimal-ui', 'sidePanelPosition') ===  'lower'): {
                rootStyle.setProperty('--leftbarypos', ((availableHeight/3))+'px');
                break;
            }
            case (game.settings.get('minimal-ui', 'sidePanelPosition') ===  'bottom'): {
                rootStyle.setProperty('--leftbarypos', ((availableHeight/3)+(availableHeight/9))+'px');
                break;
            }
        }
    }

    static addLockButton() {
        let locked = MinimalUIControls.controlsLocked ? 'fa-lock' : 'fa-lock-open';
        let htmlSidebarLockButton =
            `
      <li id="sidebar-lock" class="scene-control" title="Pin Sidebar" onclick="MinimalUIControls.lockControls(true)">
      <i class="fas ${locked}" style="color: red"></i>
      </li>
      `
        if (game.settings.get('minimal-ui', 'sidePanel') === 'autohide') {
            $("#controls").append(htmlSidebarLockButton);
        }
    }

    static initSettings() {

        game.settings.register('minimal-ui', 'sidePanel', {
            name: "Left panel behavior",
            hint: "Choose whether left panel is always visible or auto hides",
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "always": "Always Visible",
                "autohide": "Auto-Hide"
            },
            default: "autohide",
            onChange: _ => {
                window.location.reload()
            }
        });

        game.settings.register('minimal-ui', 'sidePanelSize', {
            name: "Left panel size",
            hint: "Choose favorite side panel size.",
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "small": "Small",
                "standard": "Standard"
            },
            default: "small",
            onChange: _ => {
                window.location.reload()
            }
        });

        game.settings.register('minimal-ui', 'sidePanelMenuStyle', {
            name: "Left panel menu style",
            hint: "Choose whether to expand to the right or keep a single column of buttons",
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "default": "Controls to the right",
                "column": "Keep a single column"
            },
            default: "default",
            onChange: _ => {
                window.location.reload()
            }
        });

        game.settings.register('minimal-ui', 'sidePanelPosition', {
            name: "Left panel position",
            hint: "Choose favorite side panel position. Will be ignored if using 'Keep a single column' style.",
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "top": "Top Left",
                "center": "Center Upper Left",
                "lower": "Center Lower Left",
                "bottom": "Bottom Left"
            },
            default: "center",
            onChange: _ => {
                window.location.reload()
            }
        });

    }

    static initHooks() {
        Hooks.once('renderSceneControls', async function() {
            if (game.settings.get('minimal-ui', 'sidePanelSize') === 'small') {
                rootStyle.setProperty('--leftbarsubstart', MinimalUIControls.cssLeftBarSubMenuSmall);
                rootStyle.setProperty('--leftbarsubhover', MinimalUIControls.cssLeftBarSubMenuSmall);
                rootStyle.setProperty('--leftbarw', MinimalUIControls.cssLeftBarSmallWidth);
                rootStyle.setProperty('--leftbarh', MinimalUIControls.cssLeftBarSmallHeight);
                rootStyle.setProperty('--leftbarlh', MinimalUIControls.cssLeftBarSmallLineHeight);
                rootStyle.setProperty('--leftbarfs', MinimalUIControls.cssLeftBarSmallFontSize);
            } else {
                rootStyle.setProperty('--leftbarsubstart', MinimalUIControls.cssLeftBarSubMenuStandard);
                rootStyle.setProperty('--leftbarsubhover', MinimalUIControls.cssLeftBarSubMenuStandard);
            }
            // Special compatibility DnD-UI
            if (game.modules.get('dnd-ui') && game.modules.get('dnd-ui').active) {
                rootStyle.setProperty('--leftbarsubstart', MinimalUIControls.cssLeftBarSubMenuDndUi);
                rootStyle.setProperty('--leftbarsubhover', MinimalUIControls.cssLeftBarSubMenuDndUi);
            }
            // ---

            MinimalUIControls.positionSidebar();
        })

        Hooks.on('canvasPan', function() {
            MinimalUIControls.positionSidebar();
        });

        Hooks.once('renderSceneControls', async function() {

            switch(game.settings.get('minimal-ui', 'sidePanelMenuStyle')) {
                case 'default': {
                    rootStyle.setProperty('--leftbarsubstyle', 'block');
                    break;
                }
                case 'column': {
                    rootStyle.setProperty('--leftbarsubstyle', 'contents');
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

            if (game.settings.get('minimal-ui', 'sidePanel') === 'autohide' && !MinimalUIControls.controlsLocked) {
                if (game.settings.get('minimal-ui', 'sidePanelSize') === 'small') {
                    rootStyle.setProperty('--leftbarxpos', MinimalUIControls.cssLeftBarHiddenPositionSmall);
                    rootStyle.setProperty('--leftbarsubstart', MinimalUIControls.cssLeftBarHiddenPositionSmall);
                } else {
                    rootStyle.setProperty('--leftbarxpos', MinimalUIControls.cssLeftBarHiddenPositionStandard);
                    rootStyle.setProperty('--leftbarsubstart', MinimalUIControls.cssLeftBarHiddenPositionStandard);
                }
                rootStyle.setProperty('--leftbarpad', MinimalUIControls.cssLeftBarPaddingSmall);
            } else {
                rootStyle.setProperty('--leftbarpad', MinimalUIControls.cssLeftBarPaddingDefault);
                rootStyle.setProperty('--leftbarxpos', MinimalUIControls.cssLeftBarStartVisible);
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