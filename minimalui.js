function collapse(toggleId) {
  let target = document.getElementById(toggleId);
  if (target) {
    target.click();
  }
}

Hooks.on('init', () => {
  game.settings.register('minimal-ui', 'sceneNavigation', {
    name: "Scene Navigation",
    hint: "Customize scene navigation UI. Consider 'DF Scene Enhancement' module when this option is set to hidden",
    scope: 'world',
    config: true,
    type: String,
    choices: {
      "shown": "Show Normally",
      "collapsed": "Start Collapsed by Default",
      "hidden": "Hide Completely"
    },
    default: "collapsed",
    onChange: value => {
      window.location.reload()
    }
  });

  game.settings.register('minimal-ui', 'macroBar', {
    name: "Macro Bar",
    hint: "Customize Macro Bar UI",
    scope: 'world',
    config: true,
    type: String,
    choices: {
      "shown": "Show Normally",
      "collapsed": "Start Collapsed by Default",
      "hidden": "Hide Completely"
    },
    default: "collapsed",
    onChange: value => {
      window.location.reload()
    }
  });

  game.settings.register('minimal-ui', 'playerList', {
    name: "Player List",
    hint: "Customize Player List UI",
    scope: 'world',
    config: true,
    type: String,
    choices: {
      "shown": "Show Normally",
      "hidden": "Hide Completely"
    },
    default: "shown",
    onChange: value => {
      window.location.reload()
    }
  });

  game.settings.register('minimal-ui', 'sidePanelPosition', {
    name: "Left panel button position",
    hint: "Choose favorite side panel position",
    scope: 'world',
    config: true,
    type: String,
    choices: {
      "top": "Top Left",
      "center": "Center Left",
      "bottom": "Bottom Left"
    },
    default: "center",
    onChange: value => {
      window.location.reload()
    }
  });

  game.settings.register('minimal-ui', 'sidePanelMenuStyle', {
    name: "Left panel menu style",
    hint: "Choose whether to expand to the right or keep a single column of buttons",
    scope: 'world',
    config: true,
    type: String,
    choices: {
      "default": "Controls to the right",
      "column": "Keep a single column"
    },
    default: "column",
    onChange: value => {
      window.location.reload()
    }
  });

});

Hooks.on('ready', async function() {

  let rootStyle = document.querySelector(':root').style;

  switch(game.settings.get('minimal-ui', 'sceneNavigation')) {
    case 'collapsed': {
      rootStyle.setProperty('--visinav', 'visible');
      collapse("nav-toggle");
      break;
    }
    case 'shown': {
      rootStyle.setProperty('--visinav', 'visible');
      break;
    }
  }

  switch(game.settings.get('minimal-ui', 'macroBar')) {
    case 'collapsed': {
      rootStyle.setProperty('--visihotbar', 'visible');
      collapse("bar-toggle");
      break;
    }
    case 'shown': {
      rootStyle.setProperty('--visihotbar', 'visible');
      break;
    }
  }

  switch(game.settings.get('minimal-ui', 'playerList')) {
    case 'shown': {
      rootStyle.setProperty('--visiplay', 'visible');
      break;
    }
  }
});

Hooks.on('renderSceneControls', async function() {

  let rootStyle = document.querySelector(':root').style;

  switch(game.settings.get('minimal-ui', 'sidePanelPosition')) {
    case 'top': {
      rootStyle.setProperty('--leftbarpos', '-8px');
      break;
    }
    case 'center': {
      rootStyle.setProperty('--leftbarpos', '250px');
      break;
    }
    case 'bottom': {
      rootStyle.setProperty('--leftbarpos', '500px');
      break;
    }
  }

  switch(game.settings.get('minimal-ui', 'sidePanelMenuStyle')) {
    case 'default': {
      rootStyle.setProperty('--submenustyle', 'block');
      break;
    }
    case 'column': {
      rootStyle.setProperty('--submenustyle', 'contents');
      break;
    }
  }

})

