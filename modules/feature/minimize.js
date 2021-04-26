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
                    height: 1px !important;
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
        const matchedStash = minimizedStash.find(a => a.app.appId === app?.appId);
        if ((force) || (minimizedApps.length === 0) || (minimizedApps.length === 1 && matchedStash)) {
            MinimalUIMinimize.minimizedStash = {};
            $("#minimized-bar").hide();
        }
    }

    static enrichStyling(app) {
        app.element.find(".close").text('');
        app.element.find(".close").append(`<a class="header-button close"><i class="fas fa-times"></i></a>`);
        if (game.settings.get('minimal-ui', 'enrichedMinimize') === 'enabled') {
            const header = app.element.find(".window-header");
            if (header.hasClass('minimized-was-pinned'))
                header.addClass('minimized-pinned')
            header.on('contextmenu', function () {
                if (header.hasClass('minimized-pinned')) {
                    header.removeClass('minimized-pinned')
                    header.removeClass('minimized-was-pinned')
                }
                else
                    header.addClass('minimized-pinned')
            });
            header.hover(
                function () {
                    header.addClass('minimized-highlight')
                },
                function () {
                    header.removeClass('minimized-highlight')
                }
            )
        }
    }

    static unenrichStyling(app) {
        app.element.find(".close").text('');
        app.element.find(".close").append(`<i class="fas fa-times"></i>Close`);
        if (game.settings.get('minimal-ui', 'enrichedMinimize') === 'enabled') {
            const header = app.element.find(".window-header");
            if (header.hasClass('minimized-pinned'))
                header.addClass('minimized-was-pinned');
            header.removeClass('minimized-pinned');
            header.off();
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
            default: "topBar",
            onChange: _ => {
                window.location.reload()
            }
        });
        game.settings.register('minimal-ui', 'enrichedMinimize', {
            name: game.i18n.localize("MinimalUI.EnrichedMinimizeName"),
            hint: game.i18n.localize("MinimalUI.EnrichedMinimizeHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "enabled": game.i18n.localize("MinimalUI.Enabled"),
                "disabled": game.i18n.localize("MinimalUI.Disabled")
            },
            default: "enabled",
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
                    const targetHtml = $(`[data-appid='${this.appId}']`);
                    targetHtml.hide();
                    let targetPos;
                    for (let i = minGap; i < maxGap + jumpGap; i = i + jumpGap) {
                        if (MinimalUIMinimize.minimizedStash[i]?.app.appId === this.appId) {
                            targetPos = i;
                            break
                        } else if (!targetPos && !MinimalUIMinimize.minimizedStash[i]?.app.rendered) {
                            MinimalUIMinimize.minimizedStash[i] = {app: this, oldLeft: this.position.left};
                            targetPos = i;
                            break;
                        }
                    }
                    this.setPosition({left: targetPos ?? this.position.left});
                    const result = wrapped(...args);
                    MinimalUIMinimize.enrichStyling(this);
                    await new Promise(waitABit => setTimeout(waitABit, 200));
                    if (['bottomBar', 'topBar'].includes(minimizedSetting)) {
                        $("#minimized-bar").show();
                    }
                    targetHtml.show();
                    return result;
                }, 'WRAPPER');

                libWrapper.register('minimal-ui', 'Application.prototype.maximize', async function (wrapped, ...args) {
                    let targetHtml = $(`[data-appid='${this.appId}']`);
                    targetHtml.hide();
                    let result = wrapped(...args);
                    await new Promise(waitABit => setTimeout(waitABit, 200));
                    const minimizedSetting = game.settings.get('minimal-ui', 'organizedMinimize');
                    const minimizedStash = Object.values(MinimalUIMinimize.minimizedStash);
                    const matchedStash = minimizedStash.find(a => a.app.appId === this?.appId);
                    this.setPosition({left: matchedStash.oldLeft ?? this.position.left});
                    if (['bottomBar', 'topBar'].includes(minimizedSetting))
                        MinimalUIMinimize.cleanupMinimizeBar(this);
                    MinimalUIMinimize.unenrichStyling(this);
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