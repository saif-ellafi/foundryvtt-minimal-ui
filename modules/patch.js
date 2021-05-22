export default class MinimalUIPatch {

    static initSettings() {

    }

    static initHooks() {
        Hooks.on('changeSidebarTab', function(app) {
            const target = Object.values(ui.windows).find(a => a.tabName === app.tabName);
            if (target && target._minimized) target.maximize();
        });

        Hooks.once('ready', async function() {
            $("#sidebar-tabs > a:nth-child(n)").click(function(eve) {
                if (eve.currentTarget.classList.contains('collapse')) return;
                const tabName = jQuery(eve.currentTarget).attr('data-tab');
                if (ui.sidebar._collapsed) {
                    ui.sidebar.activateTab(tabName);
                }
            });
        });
    }

}