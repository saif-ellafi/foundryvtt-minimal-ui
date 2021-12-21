import {rootStyle} from '../util.js';
import '../../styles/component/sidebar.css';

export default class MinimalUISidebar {

    static initSettings() {

        game.settings.register('minimal-ui', 'rightcontrolsBehaviour', {
            name: game.i18n.localize("MinimalUI.SidebarStyleName"),
            hint: game.i18n.localize("MinimalUI.SidebarStyleHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "shown": game.i18n.localize("MinimalUI.SettingsStartVisible"),
                "collapsed": game.i18n.localize("MinimalUI.SettingsCollapsed")
            },
            default: "collapsed"
        });
    }

    static initHooks() {
        Hooks.once('renderChatLog', async function () {
            const sidebarElem = $("#sidebar-tabs");
            const newHeight = parseInt(sidebarElem.css('--sidebar-tab-height')) / 1.25;
            sidebarElem.css('--sidebar-tab-height', newHeight + 'px');
            switch (game.settings.get('minimal-ui', 'rightcontrolsBehaviour')) {
                case 'shown': {
                    rootStyle.setProperty('--fpsvis', 'unset');
                    rootStyle.setProperty('--controlsvis', 'visible');
                    break;
                }
                case 'collapsed': {
                    ui.sidebar.element.hide();
                    ui.sidebar.collapse();
                    // wait for animation to finish
                    await new Promise(waitABit => setTimeout(waitABit, 600));
                    rootStyle.setProperty('--controlsvis', 'visible');
                    ui.sidebar.element.fadeIn('slow');
                    break;
                }
                default: {
                    rootStyle.setProperty('--fpsvis', 'unset');
                    rootStyle.setProperty('--controlsvis', 'visible');
                    break;
                }
            }
        });
        Hooks.on('collapseSidebar', function(_, isCollapsing) {
            if (isCollapsing) {
                rootStyle.setProperty('--fpsposx', '-5px');
                rootStyle.setProperty('--fpsvis', 'unset');
            } else {
                rootStyle.setProperty('--fpsposx', '300px');
                rootStyle.setProperty('--fpsvis', 'unset');
            }
        });
    }
}