Ext.application({
    name: 'NAF',
//    stores: 'Fields',
    controllers: [
        'Activities'
    ],

    defaultUrl : '/admin',

    autoCreateViewport: true,

    onLaunch: function() {
        Ext.QuickTip.init();
    }

});