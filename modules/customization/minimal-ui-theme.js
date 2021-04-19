import {rootStyle} from '../minimal-ui-util.js';

export default class MinimalUITheme {

    static initSettings() {
        new window.Ardittristan.ColorSetting("minimal-ui", "borderColor", {
            name: "Border Colors",
            hint: "Default: #ff4900bd",
            label: "Color Picker",
            scope: "world",
            defaultColor: "#ff4900bd",
            onChange: _ => {
                rootStyle.setProperty('--bordercolor', game.settings.get('minimal-ui', 'borderColor'));
            }
        });

        new window.Ardittristan.ColorSetting("minimal-ui", "shadowColor", {
            name: "Shadow Colors",
            hint: "Default: #ff4900bd",
            label: "Color Picker",
            scope: "world",
            defaultColor: "#ff4900bd",
            type: String,
            onChange: _ => {
                rootStyle.setProperty('--shadowcolor', game.settings.get('minimal-ui', 'shadowColor'));
            }
        });

        game.settings.register("minimal-ui", "shadowStrength", {
            name: "Shadow Strength",
            hint: "How gloomy and shadow are the borders? Default: 10",
            scope: "world",
            config: true,
            default: "10",
            type: String,
            onChange: _ => {
                rootStyle.setProperty('--shadowstrength', game.settings.get('minimal-ui', 'shadowStrength') + 'px');
            }
        });
    }

    static initHooks() {
        Hooks.once('renderSceneControls', async function () {
            rootStyle.setProperty('--bordercolor', game.settings.get('minimal-ui', 'borderColor'));
            rootStyle.setProperty('--shadowcolor', game.settings.get('minimal-ui', 'shadowColor'));
            rootStyle.setProperty('--shadowstrength', game.settings.get('minimal-ui', 'shadowStrength') + 'px');
        })
    }
}
