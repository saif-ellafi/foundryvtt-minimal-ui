import {rootStyle} from '../minimal-ui-util.js';

export default class MinimalUISidebar {

    static initSettings() {

        game.settings.register('minimal-ui', 'rightSidePanel', {
            name: "Right Side Panel Behaviour",
            hint: "Whether the right side panel starts collapsed or not",
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "shown": "Shown",
                "collapsed": "Collapsed"
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