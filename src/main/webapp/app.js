Ext.application({
    name: 'NAF',
    controllers: [
        'Activities'
    ],

    autoCreateViewport: true,

    onLaunch: function() {
        Ext.tip.QuickTipManager.init();
        Ext.tip.QuickTipManager.register({
            target: 'tagsHelpImage',
            title: 'My Tooltip',
            text: 'This tooltip was added in code',
            width: 100,
            dismissDelay: 10000 // Hide after 10 seconds hover
        });
    }

});