import {debouncedReload, rootStyle} from '../util.js';
import '../../styles/component/navigation.css';

export default class MinimalUINavigation {

    static cssSceneNavNoLogoStart = 0;
    static cssSceneNavLogoStart = 110;

    static async collapseNavigation() {
        await ui.nav.collapse();
    }

    static positionNav() {
        let navixpos = game.settings.get('minimal-ui', 'foundryLogoSize') === 'hidden' ? MinimalUINavigation.cssSceneNavNoLogoStart : MinimalUINavigation.cssSceneNavLogoStart;
        if (game.webrtc.mode > 0 && !ui.webrtc.element.hasClass('hidden'))
            if (game.webrtc.settings.client.dockPosition === 'left')
                navixpos += ui.webrtc.position.width;
        rootStyle.setProperty('--navixpos', navixpos + 'px');
    }

    static initSettings() {

        game.settings.register('minimal-ui', 'sceneNavigation', {
            name: game.i18n.localize("MinimalUI.NavigationStyleName"),
            hint: game.i18n.localize("MinimalUI.NavigationStyleHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "shown": game.i18n.localize("MinimalUI.SettingsStartVisible"),
                "collapsed": game.i18n.localize("MinimalUI.SettingsCollapsed"),
                "hidden": game.i18n.localize("MinimalUI.SettingsHide")
            },
            default: "collapsed",
            onChange: MinimalUINavigation.positionNav
        });

        game.settings.register('minimal-ui', 'sceneNavigationSize', {
            name: game.i18n.localize("MinimalUI.NavigationSizeName"),
            hint: game.i18n.localize("MinimalUI.NavigationSizeHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "small": game.i18n.localize("MinimalUI.SettingsSmall"),
                "standard": game.i18n.localize("MinimalUI.SettingsStandard"),
                "big": game.i18n.localize("MinimalUI.SettingsBig")
            },
            default: "small",
            onChange: debouncedReload
        });

        if (game.system.id === 'sfrpg')
            rootStyle.setProperty('--navileft', '-1px');
            rootStyle.setProperty('--naviright', '5px');

    }

    static initHooks() {

        Hooks.once('renderSceneNavigation', async function () {

            switch (game.settings.get('minimal-ui', 'foundryLogoSize')) {
                case 'small': {
                    rootStyle.setProperty('--navixmg', '25px');
                    break;
                }
                case 'hidden': {
                    rootStyle.setProperty('--navixmg', '10px');
                    break;
                }
            }

            switch (game.settings.get('minimal-ui', 'sceneNavigation')) {
                case 'collapsed': {
                    MinimalUINavigation.collapseNavigation();
                    rootStyle.setProperty('--navivis', 'visible');
                    break;
                }
                case 'shown': {
                    rootStyle.setProperty('--navivis', 'visible');
                    break;
                }
            }

            switch (game.settings.get('minimal-ui', 'sceneNavigationSize')) {
                case 'standard': {
                    rootStyle.setProperty('--navilh', '32px');
                    rootStyle.setProperty('--navifs', '16px');
                    rootStyle.setProperty('--navilisttop', '24px');
                    rootStyle.setProperty('--navibuttonsize', '34px');
                    break;
                }
                case 'big': {
                    rootStyle.setProperty('--navilh', '40px');
                    rootStyle.setProperty('--navifs', '20px');
                    rootStyle.setProperty('--navilisttop', '30px');
                    rootStyle.setProperty('--navibuttonsize', '43px');
                    break;
                }
            }

        });

        Hooks.on('renderSceneNavigation', async function () {
            MinimalUINavigation.positionNav();
        });

        Hooks.on('rtcSettingsChanged', function () {
            MinimalUINavigation.positionNav();
        });

    }

}