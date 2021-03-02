function collapse(toggleId) {
  let target = document.getElementById(toggleId);
  target.click();
}

function hideElement(elementId) {
  let target = document.getElementById(elementId);
  target.style.setProperty('visibility', 'hidden');
}

function showElement(elementId) {
  let target = document.getElementById(elementId);
  target.style.setProperty('visibility', 'visible');
}

Hooks.on('init', () => {
  game.settings.register('minimal-ui', 'sceneNavigation', {
    name: "Scene Navigation",
    hint: "Customize scene navigation UI. Consider 'DF Scene Enhancement' module when this option is set to hidden",
    scope: 'client',
    config: true,
    type: String,
    choices: {
      "shown": "Show Normally",
      "collapsed": "Start Collapsed by Default",
      "hidden": "Hide Completely"
    },
    default: "collapsed",
    restricted: true,
    onChange: value => {
      switch(value) {
        case 'shown':
          showElement('navigation');
          break;
        case 'collapsed':
          showElement('navigation');
          break;
        case 'hidden':
          hideElement('navigation');
          break;
      }
    }
  });

  game.settings.register('minimal-ui', 'macroBar', {
    name: "Macro Bar",
    hint: "Customize Macro Bar UI",
    scope: 'client',
    config: true,
    type: String,
    choices: {
      "shown": "Show Normally",
      "collapsed": "Start Collapsed by Default",
      "hidden": "Hide Completely"
    },
    default: "collapsed",
    restricted: true,
    onChange: value => {
      switch(value) {
        case 'shown':
          showElement('hotbar');
          break;
        case 'collapsed':
          showElement('hotbar');
          break;
        case 'hidden':
          hideElement('hotbar');
          break;
      }
    }
  });

  game.settings.register('minimal-ui', 'playerList', {
    name: "Player List",
    hint: "Customize Player List UI",
    scope: 'client',
    config: true,
    type: String,
    choices: {
      "shown": "Show Normally",
      "hidden": "Hide Completely"
    },
    default: "shown",
    restricted: true,
    onChange: value => {
      switch(value) {
        case 'shown':
          showElement('players');
          break;
        case 'hidden':
          hideElement('players');
          break;
      }
    }
  });
});

Hooks.once('ready', async function() {

  switch(game.settings.get('minimal-ui', 'sceneNavigation')) {
    case 'collapsed': {
      collapse("nav-toggle");
      break;
    }
    case 'hidden': {
      hideElement("navigation");
      break;
    }
  }

  switch(game.settings.get('minimal-ui', 'macroBar')) {
    case 'collapsed': {
      collapse("bar-toggle");
      break;
    }
    case 'hidden': {
      hideElement("hotbar");
      break;
    }
  }

  switch(game.settings.get('minimal-ui', 'playerList')) {
    case 'hidden': {
      hideElement("players");
      break;
    }
  }

})

