Ext.application({
    name: 'NAF',
    appFolder: 'app',
    controllers: [
        'Activities'
    ],

    launch: function() {
        Ext.create('NAF.view.Viewport');
    }
});