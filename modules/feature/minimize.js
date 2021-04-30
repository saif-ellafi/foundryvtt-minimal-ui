import {rootStyle} from '../util.js';
import '../../styles/feature/minimize.css';

export default class MinimalUIMinimize {

    static minimizedStash = {};
    static cssMinimizedSize = 150;
    static cssMinimizedBottomHotbar = 70;
    static cssMinimizedBottomNoHotbar = 5;
    static cssTopBarLeftStart = 120;
    static cssBottomBarLeftStart = 160;

    static positionMinimizeBar() {
        const setting = game.settings.get('minimal-ui', 'organizedMinimize');
        const bar = $('#minimized-bar').hide();
        const barHtml = $(`<div id="minimized-bar" class="app" style="display: none;"></div>`);
        switch (setting) {
            case 'topBar': {
                rootStyle.setProperty('--minibarbot', 'unset');
                rootStyle.setProperty('--minibartop', (MinimalUIMinimize.getTopPosition()-4)+'px');
                rootStyle.setProperty('--minibarleft', MinimalUIMinimize.cssTopBarLeftStart + 'px');
                if (bar.length === 0)
                    barHtml.appendTo('body');
                break;
            }
            case 'bottomBar': {
                const hotbarSetting = game.settings.get('minimal-ui', 'hotbar');
                if (hotbarSetting === 'hidden' || (hotbarSetting === 'onlygm' && !game.user?.isGM))
                    rootStyle.setProperty('--minibarbot', MinimalUIMinimize.cssMinimizedBottomNoHotbar+'px');
                else
                    rootStyle.setProperty('--minibarbot', MinimalUIMinimize.cssMinimizedBottomHotbar+'px');
                rootStyle.setProperty('--minibartop', 'unset');
                rootStyle.setProperty('--minibarleft', MinimalUIMinimize.cssBottomBarLeftStart + 'px');
                if (bar.length === 0)
                    barHtml.appendTo('body');
                break;
            }
        }
    }

    static getTopPosition() {
        const minimizedSetting = game.settings.get('minimal-ui', 'organizedMinimize');
        if (['bottomBar', 'bottom'].includes(minimizedSetting)) {
            const hotbarSetting = game.settings.get('minimal-ui', 'hotbar');
            let availableHeight = parseInt($("#board").css('height'));
            if (hotbarSetting === 'hidden' || (hotbarSetting === 'onlygm' && !game.user?.isGM))
                return availableHeight - MinimalUIMinimize.cssMinimizedBottomNoHotbar - 42;
            else
                return availableHeight - MinimalUIMinimize.cssMinimizedBottomHotbar - 42;
        } else {
            const logoSetting = game.settings.get('minimal-ui', 'foundryLogoSize');
            let offset = document.querySelector("#navigation").offsetHeight + 20;
            // 65px is Rough estimate for standard logo size, to not overlap
            if (logoSetting === 'standard')
                offset = Math.max(65, offset);
            return offset;
        }
    }

    static getLeftPosition(app) {
        const minimizedSetting = game.settings.get('minimal-ui', 'organizedMinimize');
        const minGap = ['top', 'topBar'].includes(minimizedSetting) ? MinimalUIMinimize.cssTopBarLeftStart + 10 : MinimalUIMinimize.cssBottomBarLeftStart + 10;
        const sidebarGap = MinimalUIMinimize.cssMinimizedSize * 4;
        const jumpGap = MinimalUIMinimize.cssMinimizedSize + 10;
        const boardSize = parseInt($("#board").css('width'));
        const maxGap = boardSize - sidebarGap;
        let targetPos;
        for (let i = minGap; i < maxGap + jumpGap; i = i + jumpGap) {
            if (MinimalUIMinimize.minimizedStash[i]?.app.appId === app.appId) {
                MinimalUIMinimize.minimizedStash[i].position = Object.assign({}, app.position);
                targetPos = i;
                break
            } else if (!targetPos && !MinimalUIMinimize.minimizedStash[i]?.app.rendered) {
                MinimalUIMinimize.minimizedStash[i] = {app: app, position: Object.assign({}, app.position)};
                targetPos = i;
                break;
            }
        }
        return targetPos;
    }

    static setMinimizedPosition(app) {
        const leftPos = MinimalUIMinimize.getLeftPosition(app);
        const topPos = MinimalUIMinimize.getTopPosition();
        app.setPosition({
            left: leftPos ?? app.position.left,
            top: topPos ?? app.position.top,
            width: MinimalUIMinimize.cssMinimizedSize
        });
    }

    static setRestoredPosition(app) {
        const minimizedStash = Object.values(MinimalUIMinimize.minimizedStash);
        const matchedStash = minimizedStash.find(a => a.app.appId === app?.appId);
        app.setPosition(matchedStash?.position ?? app.position);
    }

    static refreshMinimizeBar() {
        const minimized = $(".minimized");
        const bar = $("#minimized-bar");
        const stashSize = Object.keys(MinimalUIMinimize.minimizedStash).length;
        if (minimized.length === 0) {
            MinimalUIMinimize.minimizedStash = {};
            bar.hide();
        } else if (stashSize > 0) {
            const maxPosition = Math.max(
                ...Object.entries(MinimalUIMinimize.minimizedStash)
                    .filter(([_, app]) => app.app.rendered && app.app._minimized)
                    .map(([pos, _]) => Number(pos))
                    .concat(0)
            );
            const setting = game.settings.get('minimal-ui', 'organizedMinimize');
            if (setting === 'topBar') {
                rootStyle.setProperty('--minibarw', maxPosition + 40 + 'px');
            } else
                rootStyle.setProperty('--minibarw', maxPosition + 'px');
            minimized.show();
            bar.show();
        }
    }

    static cleanupMinimizeBar(app, force) {
        const minimizedApps = $(".minimized").toArray();
        const matchedStash = minimizedApps.find(a => $(a).attr('data-appid') == app?.appId);
        if (force || (minimizedApps.length === 0) || (minimizedApps.length === 1 && matchedStash)) {
            $("#minimized-bar").hide();
            MinimalUIMinimize.minimizedStash = {};
            MinimalUIMinimize.positionMinimizeBar();
        } else if (matchedStash) {
            MinimalUIMinimize.refreshMinimizeBar();
        }
    }

    static enrichStyling(app) {
        app.element.find(".close").empty();
        app.element.find(".close").append(`<a class="header-button close"><i class="fas fa-times"></i></a>`);
        app.element.find(".minimize").empty();
        app.element.find(".minimize").append(`<i class="far fa-window-restore"></i>`);
        app.element.find(".minimize").show();
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

    static unEnrichStyling(app) {
        app.element.find(".close").empty();
        app.element.find(".close").append(`<i class="fas fa-times"></i>`);
        app.element.find(".minimize").empty();
        app.element.find(".minimize").append(`<i class="far fa-window-minimize"></i>`);
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

        Hooks.once('ready', async function() {
            const setting = game.settings.get('minimal-ui', 'organizedMinimize');
            if (['topBar', 'bottomBar'].includes(setting))
                MinimalUIMinimize.positionMinimizeBar();
            if (setting !== 'disabled') {

                libWrapper.register('minimal-ui', 'KeyboardManager.prototype._onEscape', function (wrapped, ...args) {
                    let [_, up, modifiers] = args;
                    if ( up || modifiers.hasFocus ) return wrapped(...args);
                    else if ( !(ui.context && ui.context.menu.length) ) {
                        if (  Object.keys(MinimalUIMinimize.minimizedStash).length > 0) {
                            MinimalUIMinimize.cleanupMinimizeBar(undefined, true);
                        }
                    }
                    return wrapped(...args);
                }, 'WRAPPER');

                libWrapper.register('minimal-ui', 'Application.prototype.minimize', async function (wrapped, ...args) {
                    const targetHtml = $(`[data-appid='${this.appId}']`);
                    targetHtml.css('visibility', 'hidden');
                    const result = await wrapped(...args);
                    MinimalUIMinimize.setMinimizedPosition(this);
                    MinimalUIMinimize.enrichStyling(this);
                    MinimalUIMinimize.refreshMinimizeBar();
                    targetHtml.css('visibility', '');
                    return result;
                }, 'WRAPPER');

                libWrapper.register('minimal-ui', 'Application.prototype.maximize', async function (wrapped, ...args) {
                    const targetHtml = $(`[data-appid='${this.appId}']`);
                    targetHtml.css('visibility', 'hidden');
                    const result = await wrapped(...args);
                    MinimalUIMinimize.setRestoredPosition(this);
                    MinimalUIMinimize.refreshMinimizeBar();
                    MinimalUIMinimize.unEnrichStyling(this);
                    targetHtml.css('visibility', '');
                    return result;
                }, 'WRAPPER');

                libWrapper.register('minimal-ui', 'Application.prototype._getHeaderButtons', function (wrapped, ...args) {
                    let result = wrapped(...args);
                    const minimizeButton = {
                        label: "",
                        class: "minimize",
                        icon: "far fa-window-minimize",
                        onclick: () => {
                            if (this._minimized)
                                this.maximize();
                            else
                                this.minimize();
                        },
                    };
                    const close = result.find(b => b.class === 'close');
                    close.label = '';
                    return [minimizeButton].concat(result)
                }, 'WRAPPER');

            }

        });

        Hooks.on('canvasPan', function() {
            MinimalUIMinimize.refreshMinimizeBar();
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