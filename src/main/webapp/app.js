Ext.application({
    name: 'NAF',
    controllers: [
        'Activities'
    ],

    autoCreateViewport: true,

    onLaunch: function() {
        Ext.QuickTip.init();
    }

});