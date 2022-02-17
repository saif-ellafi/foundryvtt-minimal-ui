export default class MinimalUIPatch {

    static initSettings() {

    }

    static initHooks() {
        Hooks.on('changeSidebarTab', function (app) {
            const target = Object.values(ui.windows).find(a => a.tabName === app.tabName);
            if (ui.sidebar._collapsed && target?._minimized)
                target.maximize();
            else if (ui.sidebar._collapsed && target?.popOut)
                target.bringToTop();
        });

        Hooks.on('renderSidebarTab', function (app) {
            if (app?.popOut)
                app.bringToTop();
        });

        Hooks.on('ready', function(app) {
            // For some reason, the chat pop out does not trigger a changeSidebarTab nor renderSidebarTab. Apply exceptionally.
            const chatTab = ui.sidebar.element.find('[data-tab="chat"]');
            if (chatTab?.length) {
                chatTab.click(() => {
                    if (ui.sidebar._collapsed)
                        ui.chat._popout?.bringToTop();
                });
                chatTab.contextmenu(() => {
                    ui.chat._popout?.bringToTop();
                });
            }
            $("#sidebar-tabs > a").contextmenu((e) => {
                const tab = ui[$(e.currentTarget).attr('data-tab')];
                if (tab?._popout?._minimized)
                    tab._popout.maximize();
            });
        })
    }

}