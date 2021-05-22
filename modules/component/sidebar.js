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
        Hooks.once('renderSidebarTab', async function() {
            switch(game.settings.get('minimal-ui', 'rightcontrolsBehaviour')) {
                case 'shown': {
                    rootStyle.setProperty('--controlsvis', 'visible');
                    break;
                }
                case 'collapsed': {
                    await new Promise(waitABit => setTimeout(waitABit, 100));
                    await ui.sidebar.collapse();
                    await new Promise(waitABit => setTimeout(waitABit, 400));
                    rootStyle.setProperty('--controlsvis', 'visible');
                    break;
                }
                default: {
                    rootStyle.setProperty('--controlsvis', 'visible');
                    break;
                }
            }
        });

    }
}