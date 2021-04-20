import {rootStyle} from '../util.js';
import '../../styles/feature/minimize.css';

export default class MinimalUIMinimize {

    static minimizedWindows = {};
    static cssTopBarWidthDiff = 380;
    static cssBottomBarWidthDiff = 600;

    static fixMinimizedRule(rule, measure) {
        let stylesheet = document.querySelector('link[href*=minimalui]');

        if( stylesheet ){
            stylesheet = stylesheet.sheet;
            stylesheet.insertRule('.minimized' + '{ ' + rule + ': ' + measure + ' !important }', stylesheet.cssRules.length);
        }
    }

    static positionMinimizeBar() {
        const availableWidth = parseInt($("#board").css('width'));
        switch (game.settings.get('minimal-ui', 'organizedMinimize')) {
            case 'topBar': {
                rootStyle.setProperty('--minimw', availableWidth - MinimalUIMinimize.cssTopBarWidthDiff + 'px');
                break;
            }
            case 'bottomBar': {
                rootStyle.setProperty('--minimw', availableWidth - MinimalUIMinimize.cssBottomBarWidthDiff + 'px');
                break;
            }
        }
        if ($(".minimized").length === 0) {
            MinimalUIMinimize.minimizedWindows = {};
            $("#minimized-bar").hide();
        }
    }

    static cleanupMinimizeBar() {
        console.log("CLEANUP: " + $(".minimized").length);
        if ($(".minimized").length <= 1) {
            MinimalUIMinimize.minimizedWindows = {};
            $("#minimized-bar").hide();
        }
    }

    static initSettings() {
        game.settings.register('minimal-ui', 'organizedMinimize', {
            name: game.i18n.localize("MinimalUI.OrganizedMinimizeName"),
            hint: game.i18n.localize("MinimalUI.OrganizedMinimizeHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "bottom": game.i18n.localize("MinimalUI.OrganizedMinimizeBottom"),
                "bottomBar": game.i18n.localize("MinimalUI.OrganizedMinimizeBottomBar"),
                "top": game.i18n.localize("MinimalUI.OrganizedMinimizeTop"),
                "topBar": game.i18n.localize("MinimalUI.OrganizedMinimizeTopBar"),
                "disabled": game.i18n.localize("MinimalUI.Disabled")
            },
            default: "disabled",
            onChange: _ => {
                window.location.reload()
            }
        });
    }

    static initHooks() {

        Hooks.once('ready', async function() {
            if (game.settings.get('minimal-ui', 'organizedMinimize') !== 'disabled') {

                libWrapper.register('minimal-ui', 'Application.prototype.minimize', async function (wrapped, ...args) {
                    const minimizedSetting = game.settings.get('minimal-ui', 'organizedMinimize');
                    const minGap = ['top', 'topBar'].includes(minimizedSetting) ? 50 : 200;
                    const sidebarGap = 700;
                    const jumpGap = 210;
                    const boardSize = parseInt($("#board").css('width'));
                    const maxGap = boardSize - sidebarGap;
                    console.log('MinimalUI: Application.prototype.minimize was called');
                    const targetHtml = $(`[data-appid='${this.appId}']`);
                    targetHtml.hide();
                    let targetPos;
                    for (let i = minGap; i < maxGap + jumpGap; i = i + jumpGap) {
                        if (MinimalUIMinimize.minimizedWindows[i]?.appId === this.appId) {
                            targetPos = i;
                        } else if (!targetPos && !MinimalUIMinimize.minimizedWindows[i]?.rendered) {
                            MinimalUIMinimize.minimizedWindows[i] = this;
                            targetPos = i;
                        }
                    }
                    this.position.left = targetPos ?? this.position.left;
                    const result = wrapped(...args);
                    this.render();
                    await new Promise(waitABit => setTimeout(waitABit, 200));
                    if (['bottomBar', 'topBar'].includes(minimizedSetting)) {
                        $("#minimized-bar").show();
                    }
                    targetHtml.show();
                    return result;
                }, 'WRAPPER');

                libWrapper.register('minimal-ui', 'Application.prototype.maximize', async function (wrapped, ...args) {
                    console.log('MinimalUI: Application.prototype.maximize was called');
                    let targetHtml = $(`[data-appid='${this.appId}']`);
                    targetHtml.hide();
                    let result = wrapped(...args);
                    await new Promise(waitABit => setTimeout(waitABit, 200));
                    const minimizedSetting = game.settings.get('minimal-ui', 'organizedMinimize');
                    if (['bottomBar', 'topBar'].includes(minimizedSetting))
                        MinimalUIMinimize.cleanupMinimizeBar();
                    targetHtml.show();
                    return result;
                }, 'WRAPPER');

                switch (game.settings.get('minimal-ui', 'organizedMinimize')) {
                    case 'top': {
                        MinimalUIMinimize.fixMinimizedRule('top', '70px');
                        break;
                    }
                    case 'topBar': {
                        rootStyle.setProperty('--minimbot', 'unset');
                        rootStyle.setProperty('--minimtop', '65px');
                        rootStyle.setProperty('--minileft', '40px');
                        const minimizedBar = $(`<div id="minimized-bar" class="app"></div>`);
                        minimizedBar.appendTo('body');
                        MinimalUIMinimize.positionMinimizeBar();
                        MinimalUIMinimize.fixMinimizedRule('top', '70px');
                        break;
                    }
                    case 'bottom': {
                        MinimalUIMinimize.fixMinimizedRule('top', 'unset');
                        MinimalUIMinimize.fixMinimizedRule('bottom', '75px');
                        break;
                    }
                    case 'bottomBar': {
                        rootStyle.setProperty('--minimbot', '70px');
                        rootStyle.setProperty('--minimtop', 'unset');
                        rootStyle.setProperty('--minileft', '180px');
                        const minimizedBar = $(`<div id="minimized-bar" class="app"></div>`).hide();
                        minimizedBar.appendTo('body');
                        MinimalUIMinimize.positionMinimizeBar();
                        MinimalUIMinimize.fixMinimizedRule('top', 'unset');
                        MinimalUIMinimize.fixMinimizedRule('bottom', '75px');
                        break;
                    }
                }

            }

        });

        Hooks.on('canvasPan', function() {
            MinimalUIMinimize.positionMinimizeBar();
        });

        Hooks.on('closeSidebarTab', function() {
            MinimalUIMinimize.cleanupMinimizeBar();
        });

        Hooks.on('closeApplication', function() {
            MinimalUIMinimize.cleanupMinimizeBar();
        });

        Hooks.on('closeItemSheet', function() {
            MinimalUIMinimize.cleanupMinimizeBar();
        });
        Hooks.
        on('closeActorSheet', function() {
            MinimalUIMinimize.cleanupMinimizeBar();
        });

    }

}