function collapse(toggleId) {
  let target = document.getElementById(toggleId);
  target.click();
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

})

