import {rootStyle} from '../util.js';
import '../../styles/component/navigation.css';

export default class MinimalUINavigation {

    static cssSceneNavNoLogoStart = '5px';
    static cssSceneNavSmallLogoStart = '75px';
    static cssSceneNavBullseyeStart = '125px';

    static collapseNavigation(toggleId) {
        let target = document.getElementById(toggleId);
        if (target) {
            target.click();
        }
    }
    
    static initSettings() {

        game.settings.register('minimal-ui', 'sceneNavigation', {
            name: game.i18n.localize("MinimalUI.NavigationStyleName"),
            hint: game.i18n.localize("MinimalUI.NavigationStyleHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "shown": game.i18n.localize("MinimalUI.SettingsAlwaysVisible"),
                "collapsed": game.i18n.localize("MinimalUI.SettingsCollapsed"),
                "hidden": game.i18n.localize("MinimalUI.SettingsHide")
            },
            default: "shown",
            onChange: _ => {
                window.location.reload()
            }
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
            onChange: _ => {
                window.location.reload()
            }
        });

        game.settings.register('minimal-ui', 'sceneNavigationPreview', {
            name: game.i18n.localize("MinimalUI.NavigationPreviewName"),
            hint:  game.i18n.localize("MinimalUI.NavigationPreviewHint"),
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "disabled": game.i18n.localize("MinimalUI.Disabled"),
                "hover": game.i18n.localize("MinimalUI.NavigationPreviewHover")
            },
            default: "hover",
            onChange: _ => {
                window.location.reload()
            }
        });
        
    }
    
    static initHooks() {

        Hooks.once('ready', async function() {
            switch(game.settings.get('minimal-ui', 'foundryLogoSize')) {
                case 'small': {
                    rootStyle.setProperty('--navixpos', MinimalUINavigation.cssSceneNavSmallLogoStart);
                    break;
                }
            }

            switch(game.settings.get('minimal-ui', 'sceneNavigation')) {
                case 'collapsed': {
                    rootStyle.setProperty('--navivis', 'visible');
                    MinimalUINavigation.collapseNavigation("nav-toggle");
                    break;
                }
                case 'shown': {
                    rootStyle.setProperty('--navivis', 'visible');
                    break;
                }
            }

            // Compatibility Workaround for bullseye module
            if (game.modules.has('bullseye') && game.modules.get('bullseye').active) {
                rootStyle.setProperty('--navixpos', MinimalUINavigation.cssSceneNavBullseyeStart);
            }
        });

        Hooks.once('renderSceneNavigation', async function() {

            switch(game.settings.get('minimal-ui', 'sceneNavigationSize')) {
                case 'standard': {
                    rootStyle.setProperty('--navilh', '32px');
                    rootStyle.setProperty('--navifs', '16px');
                    rootStyle.setProperty('--navibuttonsize', '34px');
                    break;
                }
                case 'big': {
                    rootStyle.setProperty('--navilh', '40px');
                    rootStyle.setProperty('--navifs', '20px');
                    rootStyle.setProperty('--navibuttonsize', '43px');
                    break;
                }
            }

        });
        
        Hooks.on('renderSceneNavigation', async function() {

            switch(game.settings.get('minimal-ui', 'sceneNavigationPreview')) {
                case 'hover': {
                    if (game.user.isGM) {
                        let sceneTabs = $("#scene-list li");
                        rootStyle.setProperty('--navithumbmarg', '10px');
                        sceneTabs.each(function(i, sceneTab) {
                            let sceneId = $(sceneTab).attr('data-scene-id');
                            if (sceneId) {
                                let sceneThumbUrl = game.scenes.get(sceneId).data.thumb;
                                if (sceneThumbUrl) {
                                    new Image().src = sceneThumbUrl;
                                    $(sceneTab).append(
                                        `
                                        <div style="position: fixed;">
                                        <img
                                          id="hover_preview_${i}"
                                          class="navi-preview"
                                          src='${sceneThumbUrl}' alt="Scene Preview">
                                        </div>
                                        `
                                    );
                                    $(sceneTab).hover(
                                        function() {
                                            if (!$(sceneTab).hasClass('view')) {
                                                const minimized = game.settings.get('minimal-ui', 'organizedMinimize');
                                                $(`#hover_preview_${i}`).show(200);
                                                if (['top', 'topBar'].includes(minimized)) {
                                                    $("#minimized-bar")?.hide();
                                                    $(".minimized").hide();
                                                }
                                            }
                                        },
                                        function() {
                                            if (!$(sceneTab).hasClass('view')) {
                                                const minimized = game.settings.get('minimal-ui', 'organizedMinimize');
                                                $(`#hover_preview_${i}`).fadeOut(10);
                                                if (['top', 'topBar'].includes(minimized)) {
                                                    $("#minimized-bar")?.show();
                                                    $(".minimized").show();
                                                }
                                            }
                                        }
                                    );
                                }
                            }
                        });
                    }
                    break;
                }
            }

            switch(game.settings.get('minimal-ui', 'foundryLogoSize')) {
                case 'hidden': {
                    rootStyle.setProperty('--navixpos', MinimalUINavigation.cssSceneNavNoLogoStart);
                    break;
                }
                case 'small': {
                    rootStyle.setProperty('--navixpos', MinimalUINavigation.cssSceneNavSmallLogoStart);
                    break;
                }
            }

            // Compatibility Workaround for bullseye module
            if (game.modules.has('bullseye') && game.modules.get('bullseye').active) {
                rootStyle.setProperty('--navixpos', MinimalUINavigation.cssSceneNavBullseyeStart);
            }

        });
    }
    
}