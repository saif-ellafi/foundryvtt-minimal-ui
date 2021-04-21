import {rootStyle} from '../util.js';
import '../../styles/feature/minimize.css';

export default class MinimalUIMinimize {

    static minimizedStash = {};
    static cssMinimizedSize = 150;
    static cssTopBarWidthDiff = 430;
    static cssTopBarLeftStart = 100;
    static cssBottomBarWidthDiff = 525;

    static fixMinimizedRule(rule, measure) {
        let stylesheet = document.querySelector('link[href*=minimalui]');

        if( stylesheet ){
            stylesheet = stylesheet.sheet;
            stylesheet.insertRule(`
                .minimized { 
                    ${rule}: ${measure} !important;
                    width: ${MinimalUIMinimize.cssMinimizedSize}px !important;
                }
                `, stylesheet.cssRules.length
            );
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
        const minimized = $(".minimized");
        const bar = $("#minimized-bar");
        if (minimized.length === 0) {
            MinimalUIMinimize.minimizedStash = {};
            bar.hide();
        } else {
            minimized.show();
            bar.show();
        }
    }

    static cleanupMinimizeBar(app, force) {
        const minimizedApps = $(".minimized");
        const minimizedStash = Object.values(MinimalUIMinimize.minimizedStash);
        const matchedStash = minimizedStash.find(a => a.appId === app?.appId);
        if ((force) || (minimizedApps.length === 0) || (minimizedApps.length === 1 && matchedStash)) {
            MinimalUIMinimize.minimizedStash = {};
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

        $(document).keydown((event) => {
            // 27 == Escape
            if (event.which === 27) {
                if (Object.keys(MinimalUIMinimize.minimizedStash).length > 0) {
                    MinimalUIMinimize.cleanupMinimizeBar(undefined, true);
                }
            }

        });

        Hooks.once('ready', async function() {
            if (game.settings.get('minimal-ui', 'organizedMinimize') !== 'disabled') {

                libWrapper.register('minimal-ui', 'Application.prototype.minimize', async function (wrapped, ...args) {
                    const minimizedSetting = game.settings.get('minimal-ui', 'organizedMinimize');
                    const minGap = ['top', 'topBar'].includes(minimizedSetting) ? MinimalUIMinimize.cssTopBarLeftStart + 10 : 200;
                    const sidebarGap = MinimalUIMinimize.cssMinimizedSize * 4;
                    const jumpGap = MinimalUIMinimize.cssMinimizedSize + 10;
                    const boardSize = parseInt($("#board").css('width'));
                    const maxGap = boardSize - sidebarGap;
                    console.log('MinimalUI: Application.prototype.minimize was called');
                    const targetHtml = $(`[data-appid='${this.appId}']`);
                    targetHtml.hide();
                    let targetPos;
                    for (let i = minGap; i < maxGap + jumpGap; i = i + jumpGap) {
                        if (MinimalUIMinimize.minimizedStash[i]?.appId === this.appId) {
                            targetPos = i;
                            break;
                        } else if (!targetPos && !MinimalUIMinimize.minimizedStash[i]?.rendered) {
                            MinimalUIMinimize.minimizedStash[i] = this;
                            targetPos = i;
                            break;
                        }
                    }
                    this.setPosition({left: targetPos ?? this.position.left});
                    const result = wrapped(...args);
                    this.element.find(".close").text('');
                    this.element.find(".close").append(`<a class="header-button close"><i class="fas fa-times"></i></a>`);
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
                        MinimalUIMinimize.cleanupMinimizeBar(this);
                    this.element.find(".close").text('');
                    this.element.find(".close").append(`<i class="fas fa-times"></i>Close`);
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
                        rootStyle.setProperty('--minileft', MinimalUIMinimize.cssTopBarLeftStart + 'px');
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

        Hooks.on('closeSidebarTab', function(app) {
            MinimalUIMinimize.cleanupMinimizeBar(app);
        });

        Hooks.on('closeApplication', function(app) {
            MinimalUIMinimize.cleanupMinimizeBar(app);
        });

        Hooks.on('closeItemSheet', function(app) {
            MinimalUIMinimize.cleanupMinimizeBar(app);
        });

        Hooks.on('closeActorSheet', function(app) {
            MinimalUIMinimize.cleanupMinimizeBar(app);
        });

    }

}