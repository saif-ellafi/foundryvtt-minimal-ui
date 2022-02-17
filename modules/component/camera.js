import {debouncedReload, rootStyle} from "../util";

export default class MinimalUICamera {

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
      onChange: debouncedReload
    });
  }

  static initHooks() {
    Hooks.on('ready', function() {
      switch (game.settings.get('minimal-ui', 'cameraBehavior')) {
        case 'reduced': {
          rootStyle.setProperty('--noviddis', 'none');
          rootStyle.setProperty('--novidleftflex', 'row');
          rootStyle.setProperty('--novidlefttop', '-50px');
          rootStyle.setProperty('--novidleftleft', '5px');
          break;
        }
        case 'hidden': {
          rootStyle.setProperty('--novid', 'none');
          break;
        }
      }
    })
  }

}