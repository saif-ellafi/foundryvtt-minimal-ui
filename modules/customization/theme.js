import {rootStyle} from '../util.js';
import '../../styles/customization/theme.css';

export default class MinimalUITheme {

    static initSettings() {
        game.settings.register("minimal-ui", "shadowStrength", {
            name: game.i18n.localize("MinimalUI.ShadowStrengthName"),
            hint: game.i18n.localize("MinimalUI.ShadowStrengthHint"),
            scope: "world",
            config: true,
            default: "5",
            type: String,
            onChange: _ => {
                rootStyle.setProperty('--shadowstrength', game.settings.get('minimal-ui', 'shadowStrength') + 'px');
            }
        });
    }

    static initHooks() {
        Hooks.once('renderSceneControls', async function () {
            new window.Ardittristan.ColorSetting("minimal-ui", "borderColor", {
                name: game.i18n.localize("MinimalUI.BorderColorName"),
                hint: game.i18n.localize("MinimalUI.BorderColorHint"),
                label: game.i18n.localize("MinimalUI.ColorPicker"),
                scope: "world",
                defaultColor: "#ff4900bd",
                onChange: _ => {
                    rootStyle.setProperty('--bordercolor', game.settings.get('minimal-ui', 'borderColor'));
                }
            });

            new window.Ardittristan.ColorSetting("minimal-ui", "shadowColor", {
                name: game.i18n.localize("MinimalUI.ShadowColorName"),
                hint: game.i18n.localize("MinimalUI.ShadowColorHint"),
                label: game.i18n.localize("MinimalUI.ColorPicker"),
                scope: "world",
                defaultColor: "#ff0000bd",
                type: String,
                onChange: _ => {
                    rootStyle.setProperty('--shadowcolor', game.settings.get('minimal-ui', 'shadowColor'));
                }
            });

            rootStyle.setProperty('--bordercolor', game.settings.get('minimal-ui', 'borderColor'));
            rootStyle.setProperty('--shadowcolor', game.settings.get('minimal-ui', 'shadowColor'));
            rootStyle.setProperty('--shadowstrength', game.settings.get('minimal-ui', 'shadowStrength') + 'px');
        })
    }
}
