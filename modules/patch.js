export default class MinimalUIPatch {

    static initSettings() {

    }

    static initHooks() {
        Hooks.on('renderSidebarTab', function(app) {
            if (app._minimized) app.maximize();
        });

        Hooks.once('ready', async function() {

            $("#sidebar-tabs > a:nth-child(n)").click(function(eve) {
                const tabName = jQuery(eve.currentTarget).attr('data-tab');
                if (ui.sidebar._collapsed) {
                    if (tabName === 'chat') {
                        ui.sidebar.expand();
                    } else {
                        ui.sidebar.activateTab(tabName);
                    }
                }
            })

        });
    }

}