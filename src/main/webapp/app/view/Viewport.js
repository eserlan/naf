Ext.define('NAF.view.Viewport', {
    extend: 'Ext.container.Viewport',

    url: 'aktivitet',


    layout: 'border',
    items: [
        {
            region: 'north',
            xtype: 'activitylist',
            height: 220
        },
        {
            region: 'center',
            xtype: 'activitydetail'
        }
    ]




});