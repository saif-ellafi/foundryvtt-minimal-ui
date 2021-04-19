import {rootStyle} from '../minimal-ui-util.js';

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
            name: "Scene Navigation Style",
            hint: "Customize scene navigation behaviour. Consider 'DF Scene Enhancement' when hidden.",
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "shown": "Show Normally",
                "collapsed": "Start Collapsed by Default",
                "hidden": "Hide Completely"
            },
            default: "shown",
            onChange: _ => {
                window.location.reload()
            }
        });

        game.settings.register('minimal-ui', 'sceneNavigationSize', {
            name: "Scene Navigation Size",
            hint: "Customize scene navigation Size, when visible.",
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "small": "Small",
                "standard": "Standard",
                "big": "Big"
            },
            default: "small",
            onChange: _ => {
                window.location.reload()
            }
        });

        game.settings.register('minimal-ui', 'sceneNavigationPreview', {
            name: "Scene Navigation Preview",
            hint: "Choose whether to show an image preview on the navigation top bar. Experimental feature.",
            scope: 'world',
            config: true,
            type: String,
            choices: {
                "never": "Never",
                "hover": "On Mouse Over"
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

            // Compatibility Workaround for bullseye module
            if (game.modules.has('bullseye') && game.modules.get('bullseye').active) {
                rootStyle.setProperty('--navixpos', MinimalUINavigation.cssSceneNavBullseyeStart);
            } 
        });

        Hooks.once('renderSceneNavigation', async function() {

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
                                                $(`#hover_preview_${i}`).show(200);
                                            }
                                        },
                                        function() {
                                            if (!$(sceneTab).hasClass('view')) {
                                                $(`#hover_preview_${i}`).fadeOut(50);
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