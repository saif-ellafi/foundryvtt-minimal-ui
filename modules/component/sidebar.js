import {rootStyle} from '../util.js';
import '../../styles/component/sidebar.css';

export default class MinimalUISidebar {

    static initSettings() {

        game.settings.register('minimal-ui', 'rightSidePanel', {
            name: game.i18n.localize("MinimalUI.SidebarStyleName"),
            hint: game.i18n.localize("MinimalUI.SidebarStyleHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "shown": game.i18n.localize("MinimalUI.SettingsAlwaysVisible"),
                "collapsed": game.i18n.localize("MinimalUI.SettingsCollapsed")
            },
            default: "shown",
            onChange: _ => {
                window.location.reload()
            }
        });
    }

    static initHooks() {
        Hooks.once('renderSidebarTab', async function() {
            switch(game.settings.get('minimal-ui', 'rightSidePanel')) {
                case 'shown': {
                    rootStyle.setProperty('--leftbarvis', 'visible');
                    break;
                }
                case 'collapsed': {
                    await ui.sidebar.collapse();
                    await new Promise(waitABit => setTimeout(waitABit, 500));
                    rootStyle.setProperty('--leftbarvis', 'visible');
                    break;
                }
                default: {
                    rootStyle.setProperty('--leftbarvis', 'visible');
                    break;
                }
            }
        });

    }
}