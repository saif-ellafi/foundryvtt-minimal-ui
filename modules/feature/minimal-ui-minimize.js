import {rootStyle} from '../minimal-ui-util.js';

export default class MinimalUIMinimize {

    static minimizedWindows = {};

    static fixMinimizedRule(rule, measure) {
        let stylesheet = document.querySelector('link[href*=minimalui]');

        if( stylesheet ){
            stylesheet = stylesheet.sheet;
            stylesheet.insertRule('.minimized' + '{ ' + rule + ': ' + measure + ' !important }', stylesheet.cssRules.length);
        }
    }

    static initSettings() {
        game.settings.register('minimal-ui', 'organizedMinimize', {
            name: "MINIMAL UI Organized Minimize",
            hint: "This option may help you organize those minimized windows by placing them either on a bottom line or top bar(Experimental).",
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "bottom": "Bottom",
                "bottomBar": "Bottom with Bar",
                "top": "Top",
                "disabled": "Disabled"
            },
            default: "disabled",
            onChange: _ => {
                window.location.reload()
            }
        });
    }

    static initHooks() {

        Hooks.once('ready', async function() {
            libWrapper.register('minimal-ui', 'Application.prototype.minimize', async function (wrapped, ...args) {
                const minGap = 200;
                const sidebarGap = 700;
                const jumpGap = 210;
                const boardSize = parseInt($("#board").css('width'));
                const maxGap = boardSize - sidebarGap;
                console.log('MinimalUI: Application.prototype.minimize was called');
                const targetHtml = $(`[data-appid='${this.appId}']`);
                targetHtml.hide();
                let targetPos;
                for (let i=minGap; i<maxGap+jumpGap; i=i+jumpGap) {
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
                targetHtml.show();
                return result;
            }, 'WRAPPER');

            libWrapper.register('minimal-ui', 'Application.prototype.maximize', async function (wrapped, ...args) {
                console.log('MinimalUI: Application.prototype.maximize was called');
                let targetHtml = $(`[data-appid='${this.appId}']`);
                targetHtml.hide();
                let result = wrapped(...args);
                await new Promise(waitABit => setTimeout(waitABit, 200));
                targetHtml.show();
                return result;
            }, 'WRAPPER');

            switch (game.settings.get('minimal-ui', 'organizedMinimize')) {
                case 'top': {
                    MinimalUIMinimize.fixMinimizedRule('top', '70px');
                    break;
                }
                case 'bottom': {
                    MinimalUIMinimize.fixMinimizedRule('top', 'unset');
                    MinimalUIMinimize.fixMinimizedRule('bottom', '70px');
                    break;
                }
                case 'bottomBar': {
                    let availableWidth = parseInt($("#board").css('width'));
                    rootStyle.setProperty('--minimw', availableWidth - 600 + 'px');
                    rootStyle.setProperty('--minimbot', '65px');
                    rootStyle.setProperty('--minimtop', 'unset');
                    $("body").append(`<div id="minimized-bar" class="app"></div>`);
                    MinimalUIMinimize.fixMinimizedRule('top', 'unset');
                    MinimalUIMinimize.fixMinimizedRule('bottom', '70px');
                    break;
                }
            }
        });
    }

}