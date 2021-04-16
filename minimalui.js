class MinimalUI {
  
  static hiddenInterface = false;
  static fakeDisabled = false;
  
  static hotbarLocked = false;
  static controlsLocked = false;
  static cssControlsLastPos = '0px';
  
  static cssLeftBarStartVisible = '0px';
  static cssLeftBarHiddenPositionSmall = '-62px';
  static cssLeftBarHiddenPositionStandard = '-72px';
  
  static cssLeftBarSubMenuSmall = '55px';
  static cssLeftBarSubMenuStandard = '65px';
  static cssLeftBarSubMenuDndUi = '65px';

  static cssLeftBarPaddingDefault = '7px';
  static cssLeftBarPaddingSmall = '26px';
  static cssLeftBarPaddingStandard = '20px';

  static cssLeftBarSmallWidth = '25px';
  static cssLeftBarSmallHeight = '28px';
  static cssLeftBarSmallLineHeight = '30px';
  static cssLeftBarSmallFontSize = '15px';

  static cssLeftBarVerticalPositionTop = '8vmin';
  static cssLeftBarVerticalPositionCenter = '20vmin';
  static cssLeftBarVerticalPositionLower = '30vmin';
  static cssLeftBarVerticalPositionBottom = '40vmin';

  static cssHotbarHidden = '-48px';
  static cssHotbarReveal = '1px';
  static cssHotbarShown = '10px';

  static cssHotbarLeftControlsLineHeight = '24px';
  static cssHotbarRightControlsLineHeight = '12px';
  static cssHotbarRightControlsLineHeightDnDUi = '10px';
  static cssHotbarControlsAutoHideHeight = '100%';
  static cssHotbarAutoHideHeight = '1px';
  static cssHotbarAutoHideShadow = '-1px';
  static cssHotbarControlsMargin = '0px';

  static cssSceneNavNoLogoStart = '5px';
  static cssSceneNavSmallLogoStart = '75px';
  static cssSceneNavStandardLogoStart = '125px';
  static cssSceneNavBullseyeStart = '125px';

  static cssMinimumMacroBarX = 170;

  static cssPlayersDefaultFontSize = '12px';
  static cssPlayersDefaultWidth = '150px';
  static cssPlayersDefaultWidthDnDUi = '200px';

  static htmlHotbarLockButton =
    `
    <a id="bar-lock">
      <i class="fas fa-lock-open"></i>
    </a>
    `

  static collapseById(toggleId) {
    let target = document.getElementById(toggleId);
    if (target) {
      target.click();
    }
  }

  static fixMinimizedRule(rule, measure) {
      var stylesheet = document.querySelector('link[href*=minimalui]');

      if( stylesheet ){
          stylesheet = stylesheet.sheet;
          stylesheet.insertRule('.minimized' + '{ ' + rule + ': ' + measure + ' !important }', stylesheet.cssRules.length);
      }
  }

  static hideAll(alsoChat) {
    $('#logo').click(_ => {
    if (!MinimalUI.hiddenInterface) {
      if (alsoChat) {
        $('#sidebar').hide();
      };
      $('#navigation').hide();
      $('#controls').hide();
      $('#players').hide();
      $('#hotbar').hide();
      MinimalUI.hiddenInterface = true;
    } else {
      if (alsoChat) {
        $('#sidebar').show();
      };
      $('#navigation').show();
      $('#controls').show();
      $('#players').show();
      $('#hotbar').show();
      MinimalUI.hiddenInterface = false;
    }
    });
  }

  static lockControls(unlock) {
    let rootStyle = document.querySelector(':root').style;
    if (!MinimalUI.controlsLocked) {
      MinimalUI.controlsLocked = true;
      MinimalUI.cssControlsLastPos = rootStyle.getPropertyValue('--leftbarxpos');
      rootStyle.setProperty('--leftbarxpos', MinimalUI.cssLeftBarStartVisible);
      rootStyle.setProperty('--leftbarpad', MinimalUI.cssLeftBarPaddingDefault);
      if (game.settings.get('minimal-ui', 'sidePanelSize') == 'small') {
        rootStyle.setProperty('--leftbarsubstart', MinimalUI.cssLeftBarSubMenuSmall);
      } else {
        rootStyle.setProperty('--leftbarsubstart', MinimalUI.cssLeftBarSubMenuStandard);
      }
      // Special compatibility DnD-UI
      if (game.modules.get('dnd-ui') && game.modules.get('dnd-ui').active) {
        rootStyle.setProperty('--leftbarsubstart', MinimalUI.cssLeftBarSubMenuDndUi);
        rootStyle.setProperty('--leftbarsubhover', MinimalUI.cssLeftBarSubMenuDndUi);
      };
      // ---
      $("#sidebar-lock > i").removeClass("fa-lock-open");
      $("#sidebar-lock > i").addClass("fa-lock");
    } else if (unlock) {
      MinimalUI.controlsLocked = false;
      $("#sidebar-lock > i").removeClass("fa-lock");
      $("#sidebar-lock > i").addClass("fa-lock-open");
      rootStyle.setProperty('--leftbarxpos', MinimalUI.cssControlsLastPos);
      if (game.settings.get('minimal-ui', 'sidePanelSize') == 'small') {
        rootStyle.setProperty('--leftbarsubstart', MinimalUI.cssLeftBarHiddenPositionSmall);
      } else {
        rootStyle.setProperty('--leftbarsubstart', MinimalUI.cssLeftBarHiddenPositionStandard);
      }
      rootStyle.setProperty('--leftbarpad', MinimalUI.cssLeftBarPaddingSmall);
    }
  }

  static lockHotbar(unlock) {
    let rootStyle = document.querySelector(':root').style;
    if (MinimalUI.hotbarLocked && unlock) {
      rootStyle.setProperty('--macrobarypos', MinimalUI.cssHotbarHidden);
      $("#bar-lock > i").removeClass("fa-lock");
      $("#bar-lock > i").addClass("fa-lock-open");
      MinimalUI.hotbarLocked = false;
    } else {
      rootStyle.setProperty('--macrobarypos', MinimalUI.cssHotbarReveal);
      $("#bar-lock > i").removeClass("fa-lock-open");
      $("#bar-lock > i").addClass("fa-lock");
      MinimalUI.hotbarLocked = true;
    }
  }

  static addLockButton() {
    let locked = MinimalUI.controlsLocked ? 'fa-lock' : 'fa-lock-open';
    let htmlSidebarLockButton =
      `
      <li id="sidebar-lock" class="scene-control" title="Pin Sidebar" onclick="MinimalUI.lockControls(true)">
      <i class="fas ${locked}" style="color: red"></i>
      </li>
      `
    if (game.settings.get('minimal-ui', 'sidePanel') == 'autohide') {
      $("#controls").append(htmlSidebarLockButton);
    }
  }

}

Hooks.once('init', () => {

  game.settings.register("minimal-ui", "shadowStrength", {
    name: "Shadow Strength",
    hint: "How gloomy and shadow are the borders? Default: 10",
    scope: "world",
    config: true,
    default: "10",
    type: String,
    onChange: lang => {
      window.location.reload()
    }
  });

  game.settings.register('minimal-ui', 'foundryLogoSize', {
    name: "Foundry Logo Size",
    hint: "Foundry logo visibility and size",
    scope: 'world',
    config: true,
    type: String,
    choices: {
      "hidden": "Hide",
      "small": "Small",
      "standard": "Standard"
    },
    default: "hidden",
    onChange: value => {
      window.location.reload()
    }
  });

  game.settings.register('minimal-ui', 'foundryLogoBehaviour', {
    name: "Foundry Logo Behaviour",
    hint: "Use the Foundry Logo to toggle visual elements (when visible, of course).",
    scope: 'world',
    config: true,
    type: String,
    choices: {
      "toggleAll": "Logo toggles Hide ALL UI",
      "toggleButChat": "Logo toggles Hide ALL UI except Chat"
    },
    default: "toggleButChat",
    onChange: value => {
      window.location.reload()
    }
  });

  game.settings.register('minimal-ui', 'organizedMinimize', {
    name: "Foundry Organized Minimize",
    hint: "This option may help you organize those minimized windows (Experimental).",
    scope: 'world',
    config: true,
    type: String,
    choices: {
      "bottom": "Bottom",
      "top": "Top",
      "disabled": "Disabled"
    },
    default: "disabled",
    onChange: value => {
      window.location.reload()
    }
  });

  game.settings.register('minimal-ui', 'rightSidePanel', {
    name: "Right Side Panel Behaviour",
    hint: "Whether the right side panel starts collapsed or not",
    scope: 'world',
    config: true,
    type: String,
    choices: {
      "shown": "Shown",
      "collapsed": "Collapsed"
    },
    default: "shown",
    onChange: value => {
      window.location.reload()
    }
  });

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
    onChange: value => {
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
    onChange: value => {
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
    onChange: value => {
      window.location.reload()
    }
  });

  game.settings.register('minimal-ui', 'sceneNavigationPreviewMargin', {
    name: "Scene Navigation Preview Margin",
    hint: "Increase this value if you use scene preview and have too many maps :) Default 10",
    scope: 'world',
    config: true,
    type: String,
    default: "10",
    onChange: value => {
      window.location.reload()
    }
  });

  game.settings.register('minimal-ui', 'macroBar', {
    name: "Macro Bar",
    hint: "Customize Macro Bar UI. Auto-Hide Ignored when using Custom Hotbar module.",
    scope: 'world',
    config: true,
    type: String,
    choices: {
      "shown": "Show Normally",
      "autohide": "Auto-Hide",
      "collapsed": "Start Collapsed by Default",
      "hidden": "Hide Completely"
    },
    default: "autohide",
    onChange: value => {
      window.location.reload()
    }
  });

  game.settings.register('minimal-ui', 'macroBarSize', {
    name: "Macro Bar Slot Size",
    hint: "Customize Macro Bar slots & size",
    scope: 'world',
    config: true,
    type: String,
    choices: {
      "slots_3": "3 Macro Slots",
      "slots_6": "6 Macro Slots",
      "slots_10": "10 Macro Slots"
    },
    default: "slots_10",
    onChange: value => {
      window.location.reload()
    }
  });

  game.settings.register('minimal-ui', 'macroBarPosition', {
    name: "Macro Bar Position",
    hint: `Reference at 400. Minimum is ${MinimalUI.cssMinimumMacroBarX}. Increase value to move it to right. Reduce to the left.`,
    scope: 'world',
    config: true,
    type: Number,
    default: 400,
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
      "default": "Always Visible",
      "autohide": "Auto-Hide",
      "hidden": "Hide Completely"
    },
    default: "autohide",
    onChange: value => {
      window.location.reload()
    }
  });

  game.settings.register('minimal-ui', 'sidePanel', {
    name: "Left panel behavior",
    hint: "Choose whether left panel is always visible or auto hides",
    scope: 'world',
    config: true,
    type: String,
    choices: {
      "always": "Always Visible",
      "autohide": "Auto-Hide"
    },
    default: "autohide",
    onChange: value => {
      window.location.reload()
    }
  });

  game.settings.register('minimal-ui', 'sidePanelSize', {
    name: "Left panel size",
    hint: "Choose favorite side panel size.",
    scope: 'world',
    config: true,
    type: String,
    choices: {
      "small": "Small",
      "standard": "Standard"
    },
    default: "small",
    onChange: value => {
      window.location.reload()
    }
  });

  game.settings.register('minimal-ui', 'sidePanelPosition', {
    name: "Left panel position",
    hint: "Choose favorite side panel position. Will be ignored if using 'Keep a single column' style.",
    scope: 'world',
    config: true,
    type: String,
    choices: {
      "top": "Top Left",
      "center": "Center Upper Left",
      "lower": "Center Lower Left",
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
    default: "default",
    onChange: value => {
      window.location.reload()
    }
  });

  game.settings.register("minimal-ui", "hidePlayerCameras", {
    name: "Hide Player Cameras",
    hint: "For player camera/audio, whether only to show GMs",
    scope: "world",
    config: true,
    default: "default",
    type: String,
    choices: {
      "default": "No changes",
      "hidden": "Hide camera/audio box of players"
    },
    onChange: lang => {
      window.location.reload()
    }
  });

});

Hooks.once('ready', async function() {

  let rootStyle = document.querySelector(':root').style;

  if (game.settings.get('minimal-ui', 'foundryLogoSize') != 'hidden') {
    switch(game.settings.get('minimal-ui', 'foundryLogoBehaviour')) {
      case 'toggleAll': {
        MinimalUI.hideAll(true);
        break;
      }
      case 'toggleButChat': {
        MinimalUI.hideAll(false);
        break;
      }
    }
  }

  switch(game.settings.get('minimal-ui', 'foundryLogoSize')) {
    case 'small': {
      rootStyle.setProperty('--logovis', 'visible');
      rootStyle.setProperty('--navixpos', MinimalUI.cssSceneNavSmallLogoStart);
      rootStyle.setProperty('--logoh', '25px');
      rootStyle.setProperty('--logow', '50px');
      break;
    }
    case 'standard': {
      rootStyle.setProperty('--logovis', 'visible');
      break;
    }
  }

  // Compatibility Workaround for bullseye module
  if (game.modules.has('bullseye') && game.modules.get('bullseye').active) {
    rootStyle.setProperty('--navixpos', MinimalUI.cssSceneNavBullseyeStart);
    rootStyle.setProperty('--logovis', 'visible');
    rootStyle.setProperty('--logoh', '50px');
    rootStyle.setProperty('--logow', '100px');
  }

  switch(game.settings.get('minimal-ui', 'organizedMinimize')) {
    case 'top': {
      MinimalUI.fixMinimizedRule('top', '70px');
      break;
    }
    case 'bottom': {
      MinimalUI.fixMinimizedRule('top', 'unset');
      MinimalUI.fixMinimizedRule('bottom', '70px');
      break;
    }
  }

  // Temporarily work around a bug in Foundry VTT 0.7.9
  $("#sidebar-tabs > a:nth-child(n)").click(function(eve) {
    if (ui.sidebar._collapsed) {
      ui.sidebar.activateTab(jQuery(eve.currentTarget).attr('data-tab'))
    }
  })

});

Hooks.on('renderCameraViews', async function() {
  switch(game.settings.get('minimal-ui', 'hidePlayerCameras')) {
    case 'hidden': {
      $("#camera-views > div").each(function(i, box) {
        if (!game.users.get($(box).attr("data-user")).isGM) {
          $(box).remove();
        }
      });
    }
  }
});

Hooks.on('renderPlayerList', async function() {
  let rootStyle = document.querySelector(':root').style;

  $("#players")[0].val = "";

  switch(game.settings.get('minimal-ui', 'playerList')) {
    case 'default': {
      rootStyle.setProperty('--playerfsize', MinimalUI.cssPlayersDefaultFontSize);
      rootStyle.setProperty('--playerwidth', MinimalUI.cssPlayersDefaultWidth);
      rootStyle.setProperty('--playervis', 'visible');
      // DnD UI Special Compatibility
      if (game.modules.get('dnd-ui') && game.modules.get('dnd-ui').active) {
        rootStyle.setProperty('--playerwidth', '200px');
      }
      // SWADE Special Compatibility
      rootStyle.setProperty('--playerbennies', 'inline');
      // ---
      break;
    }
    case 'autohide': {
      rootStyle.setProperty('--playervis', 'visible');
      rootStyle.setProperty('--playerslh', '2px');
      rootStyle.setProperty('--playerh3w', '0%');
      // DnD UI Special Compatibility
      if (game.modules.get('dnd-ui') && game.modules.get('dnd-ui').active) {
        $("#players").css('border-image', 'none');
        $("#players").css('border-color', 'black');
        $("#players").hover(
          function() {
            $("#players").css('border-image', '');
            $("#players").css('border-color', '');
          },
          function() {
            $("#players").css('border-image', 'none');
            $("#players").css('border-color', 'black');
          }
        );
      }
      // Compatibility for Raise Hand module
      if (game.modules.has('raise-my-hand') && game.modules.get('raise-my-hand').active) {
        rootStyle.setProperty('--playerwidth', '42px');
        rootStyle.setProperty('--playerslh', '20px');
      }
      // SWADE Special Compatibility
      rootStyle.setProperty('--playerbennies', 'none');
      if (game.system.data.name == 'swade') {
        $("#players").hover(
          function() {
            $(".bennies-count").show();
          },
          function() {
            $(".bennies-count").hide();
          }
        );
      };
      // ---
      break;
    }
  }
  // DnD UI Special Compatibility
  if (game.modules.get('dnd-ui') && game.modules.get('dnd-ui').active) {
    rootStyle.setProperty('--playerwidthhv', '200px');
  }
  // ---
});

Hooks.once('renderSidebarTab', async function() {
  let rootStyle = document.querySelector(':root').style;
  switch(game.settings.get('minimal-ui', 'rightSidePanel')) {
    case 'shown': {
      rootStyle.setProperty('--leftbarvis', 'visible');
      break;
    }
    case 'collapsed': {
      await ui.sidebar.collapse();
      await new Promise(waitABit => setTimeout(waitABit, 500));
      rootStyle.setProperty('--leftbarvis', 'visible');
      break;
    }
    default: {
      rootStyle.setProperty('--leftbarvis', 'visible');
    }
  }
});

Hooks.on('renderSceneNavigation', async function() {

  let rootStyle = document.querySelector(':root').style;

  switch(game.settings.get('minimal-ui', 'sceneNavigationPreview')) {
    case 'hover': {
      if (game.user.isGM) {
        let sceneTabs = $("#scene-list li");
        let previewMargin = game.settings.get('minimal-ui', 'sceneNavigationPreviewMargin');
        rootStyle.setProperty('--navithumbmarg', previewMargin + 'px');
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
                  src='${sceneThumbUrl}'>
                </img>
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
      };
      break;
    }
  }

  switch(game.settings.get('minimal-ui', 'foundryLogoSize')) {
    case 'hidden': {
      rootStyle.setProperty('--navixpos', MinimalUI.cssSceneNavNoLogoStart);
      break;
    }
    case 'small': {
      rootStyle.setProperty('--navixpos', MinimalUI.cssSceneNavSmallLogoStart);
      break;
    }
  }

  // Compatibility Workaround for bullseye module
  if (game.modules.has('bullseye') && game.modules.get('bullseye').active) {
    rootStyle.setProperty('--navixpos', MinimalUI.cssSceneNavBullseyeStart);
    rootStyle.setProperty('--logovis', 'visible');
    rootStyle.setProperty('--logoh', '50px');
    rootStyle.setProperty('--logow', '100px');
  }

});

Hooks.once('renderSceneNavigation', async function() {

  let rootStyle = document.querySelector(':root').style;

  switch(game.settings.get('minimal-ui', 'sceneNavigation')) {
    case 'collapsed': {
      rootStyle.setProperty('--navivis', 'visible');
      MinimalUI.collapseById("nav-toggle");
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

Hooks.on('renderHotbar', async function() {

  let rootStyle = document.querySelector(':root').style;

  let mbPos = game.settings.get('minimal-ui', 'macroBarPosition');
  if (mbPos < MinimalUI.cssMinimumMacroBarX) {
    rootStyle.setProperty('--macrobarxpos', String(MinimalUI.cssMinimumMacroBarX)+'px');
  } else {
    rootStyle.setProperty('--macrobarxpos', String(mbPos)+'px');
  }

  switch(game.settings.get('minimal-ui', 'macroBar')) {
    case 'collapsed': {
      rootStyle.setProperty('--macrobarvis', 'visible');
      MinimalUI.collapseById("bar-toggle");
      if (game.modules.has("custom-hotbar") && game.modules.get('custom-hotbar').active) {
        MinimalUI.collapseById("custom-bar-toggle");
      };
      break;
    }
    case 'autohide': {
      if (!(game.modules.has("custom-hotbar") && game.modules.get('custom-hotbar').active)) {
        rootStyle.setProperty('--macrobarypos', MinimalUI.cssHotbarHidden);
        rootStyle.setProperty('--macrobarlh1', MinimalUI.cssHotbarLeftControlsLineHeight);
        rootStyle.setProperty('--macrobarlh2', MinimalUI.cssHotbarRightControlsLineHeight);
        if (game.modules.get('dnd-ui') && game.modules.get('dnd-ui').active) {
          rootStyle.setProperty('--macrobarlh2', MinimalUI.cssHotbarRightControlsLineHeightDnDUi);
        }
        rootStyle.setProperty('--macrobarmg', MinimalUI.cssHotbarControlsMargin);
        rootStyle.setProperty('--macrobarhh', MinimalUI.cssHotbarControlsAutoHideHeight);
        rootStyle.setProperty('--macrobarhv', MinimalUI.cssHotbarAutoHideHeight);
        rootStyle.setProperty('--macrobarshp', MinimalUI.cssHotbarAutoHideShadow);
        $("#hotbar-directory-controls").append(MinimalUI.htmlHotbarLockButton);
        $("#macro-directory").click(function() {MinimalUI.lockHotbar(false)});
        $("#bar-lock").click(function() {MinimalUI.lockHotbar(true)});
        if (MinimalUI.hotbarLocked) {
          MinimalUI.lockHotbar(false);
        }
      }
      $("#bar-toggle").remove();
      rootStyle.setProperty('--macrobarvis', 'visible');
      break;
    }
    case 'shown': {
      rootStyle.setProperty('--macrobarvis', 'visible');
      break;
    }
  }

  switch(game.settings.get('minimal-ui', 'macroBarSize')) {
    case "slots_3": {
      $("#macro-list > li").each(function(i, slot) {
        if (i > 2) {
          console.log($(slot));
          rootStyle.setProperty('--macrobarwf', '152px');
          $(slot).remove();
        }
      });
      break;
    }
    case "slots_6": {
      $("#macro-list > li").each(function(i, slot) {
        if (i > 5) {
          console.log($(slot));
          rootStyle.setProperty('--macrobarwf', '302px');
          $(slot).remove();
        }
      });
      break;
    }
  }

})

Hooks.once('renderSceneControls', async function() {

  let rootStyle = document.querySelector(':root').style;

  new window.Ardittristan.ColorSetting("minimal-ui", "borderColor", {
    name: "Border Colors",
    hint: "Default: #ff4900bd",
    label: "Color Picker",
    scope: "world",
    defaultColor: "#ff4900bd",
    onChange: lang => {
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
    onChange: lang => {
      rootStyle.setProperty('--shadowcolor', game.settings.get('minimal-ui', 'shadowColor'));
    }
  });

  rootStyle.setProperty('--bordercolor', game.settings.get('minimal-ui', 'borderColor'));
  rootStyle.setProperty('--shadowcolor', game.settings.get('minimal-ui', 'shadowColor'));
  rootStyle.setProperty('--shadowstrength', game.settings.get('minimal-ui', 'shadowStrength') + 'px');

  if (game.settings.get('minimal-ui', 'sidePanelSize') == 'small') {
    rootStyle.setProperty('--leftbarsubstart', MinimalUI.cssLeftBarSubMenuSmall);
    rootStyle.setProperty('--leftbarsubhover', MinimalUI.cssLeftBarSubMenuSmall);
    rootStyle.setProperty('--leftbarw', MinimalUI.cssLeftBarSmallWidth);
    rootStyle.setProperty('--leftbarh', MinimalUI.cssLeftBarSmallHeight);
    rootStyle.setProperty('--leftbarlh', MinimalUI.cssLeftBarSmallLineHeight);
    rootStyle.setProperty('--leftbarfs', MinimalUI.cssLeftBarSmallFontSize);
  } else {
    rootStyle.setProperty('--leftbarsubstart', MinimalUI.cssLeftBarSubMenuStandard);
    rootStyle.setProperty('--leftbarsubhover', MinimalUI.cssLeftBarSubMenuStandard);
  }
  // Special compatibility DnD-UI
  if (game.modules.get('dnd-ui') && game.modules.get('dnd-ui').active) {
    rootStyle.setProperty('--leftbarsubstart', MinimalUI.cssLeftBarSubMenuDndUi);
    rootStyle.setProperty('--leftbarsubhover', MinimalUI.cssLeftBarSubMenuDndUi);
  };
  // ---

  switch(true) {
    case (game.settings.get('minimal-ui', 'sidePanelPosition') == 'top' || game.settings.get('minimal-ui', 'sidePanelMenuStyle') == 'column'): {
      rootStyle.setProperty('--leftbarypos', MinimalUI.cssLeftBarVerticalPositionTop);
      break;
    }
    case (game.settings.get('minimal-ui', 'sidePanelPosition') == 'center'): {
      rootStyle.setProperty('--leftbarypos', MinimalUI.cssLeftBarVerticalPositionCenter);
      break;
    }
    case (game.settings.get('minimal-ui', 'sidePanelPosition') ==  'lower'): {
      rootStyle.setProperty('--leftbarypos', MinimalUI.cssLeftBarVerticalPositionLower);
      break;
    }
    case (game.settings.get('minimal-ui', 'sidePanelPosition') ==  'bottom'): {
      rootStyle.setProperty('--leftbarypos', MinimalUI.cssLeftBarVerticalPositionBottom);
      break;
    }
  }

  switch(game.settings.get('minimal-ui', 'sidePanelMenuStyle')) {
    case 'default': {
      rootStyle.setProperty('--leftbarsubstyle', 'block');
      break;
    }
    case 'column': {
      rootStyle.setProperty('--leftbarsubstyle', 'contents');
      break;
    }
  }
  
})

Hooks.on('renderSceneControls', async function() {
  
  let rootStyle = document.querySelector(':root').style;
  
  // Hide controls altogether when they're disabled
  if (!MinimalUI.fakeDisabled && $("#controls").hasClass('disabled')) {
    $("#controls").hide();
  } else {
    $("#controls").show();
  };
  
  if (game.settings.get('minimal-ui', 'sidePanel') == 'autohide' && !MinimalUI.controlsLocked) {
    if (game.settings.get('minimal-ui', 'sidePanelSize') == 'small') {
      rootStyle.setProperty('--leftbarxpos', MinimalUI.cssLeftBarHiddenPositionSmall);
      rootStyle.setProperty('--leftbarsubstart', MinimalUI.cssLeftBarHiddenPositionSmall);
    } else {
      rootStyle.setProperty('--leftbarxpos', MinimalUI.cssLeftBarHiddenPositionStandard);
      rootStyle.setProperty('--leftbarsubstart', MinimalUI.cssLeftBarHiddenPositionStandard);
    }
    rootStyle.setProperty('--leftbarpad', MinimalUI.cssLeftBarPaddingSmall);
  } else {
    rootStyle.setProperty('--leftbarpad', MinimalUI.cssLeftBarPaddingDefault);
    rootStyle.setProperty('--leftbarxpos', MinimalUI.cssLeftBarStartVisible);
  }
  
  MinimalUI.addLockButton();
  
  // --------------- COMPATIBILITY SECTION ------------------
  // Here we add workarounds for minimal UI to work well with modules that affect UI components
  
  // Give a little time for other modules to add their controls first, and reapply changes
  await new Promise(waitABit => setTimeout(waitABit, 1));
  
  $("#controls > li.scene-control").on('click', function() {
    MinimalUI.lockControls(false);
    $("#controls > li.scene-control.active > ol > li").on('click', function() {MinimalUI.lockControls(false)});
  });
  $("#controls > li.scene-control.active > ol > li").on('click', function() {
    MinimalUI.lockControls(false);
  });
  
  // Delete and add lock button if needed, so the lock is always at the bottom
  if ($("#controls > li").index($("#sidebar-lock")) != $("#controls > li").length) {
    $("#sidebar-lock").remove();
    MinimalUI.addLockButton();
  }
  
  // Support for Simple Dice Roller
  if (game.modules.has('simple-dice-roller') && game.modules.get('simple-dice-roller').active) {
    $("#controls > li.scene-control.sdr-scene-control").click(function() {
      let olControl = $("#controls > li.scene-control.sdr-scene-control.active > ol")[0];
      if (olControl) {
        olControl.style.setProperty('display', 'inherit');
      }
    });
  }
  
  // ----------------------------------------------------------------------
  
})