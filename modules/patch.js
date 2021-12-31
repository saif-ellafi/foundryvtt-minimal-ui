export default class MinimalUIPatch {

    static initSettings() {

    }

    static initHooks() {
        Hooks.on('changeSidebarTab', function (app) {
            const target = Object.values(ui.windows).find(a => a.tabName === app.tabName);
            if (target && target._minimized)
                target.maximize();
            else if (target)
                target.bringToTop();
        });

        Hooks.on('renderSidebarTab', function (app) {
            if (ui.sidebar._collapsed && app)
                app.bringToTop();
        });
    }

}