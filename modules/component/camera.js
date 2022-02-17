import {debouncedReload, rootStyle} from "../util";
import '../../styles/component/camera.css';

export default class MinimalUICamera {

  static updateCameraSettings() {
    switch (game.settings.get('minimal-ui', 'cameraBehavior')) {
      case 'reduced': {
        rootStyle.setProperty('--novid', 'inherit');
        rootStyle.setProperty('--noviddis', 'none');
        rootStyle.setProperty('--novidleftflex', 'row');
        rootStyle.setProperty('--novidlefttop', '-50px');
        rootStyle.setProperty('--novidleftleft', '5px');
        break;
      }
      case 'hidden': {
        rootStyle.setProperty('--novid', 'none');
        rootStyle.setProperty('--noviddis', 'inherit');
        rootStyle.setProperty('--novidleftflex', 'inherit');
        rootStyle.setProperty('--novidlefttop', 'inherit');
        rootStyle.setProperty('--novidleftleft', 'inherit');
        break;
      }
    }
  }

  static initSettings() {
    game.settings.register('minimal-ui', 'cameraBehavior', {
      name: game.i18n.localize("MinimalUI.NoCameraBehaviorName"),
      hint: game.i18n.localize("MinimalUI.NoCameraBehaviorHint"),
      scope: 'world',
      config: true,
      type: String,
      choices: {
        "default": game.i18n.localize("MinimalUI.SettingsDefault"),
        "reduced": game.i18n.localize("MinimalUI.NoCameraBehaviorReduced"),
        "hidden": game.i18n.localize("MinimalUI.NoCameraBehaviorHidden")
      },
      default: "default",
      onChange: MinimalUICamera.updateCameraSettings
    });
  }

  static initHooks() {
    Hooks.on('rtcSettingsChanged', function() {
      MinimalUICamera.updateCameraSettings();
    });
  }

}