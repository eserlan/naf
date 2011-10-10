Ext.define('NAF.view.Viewport', {
    extend: 'Ext.container.Viewport',

    url: 'aktivitet',


    layout: 'border',
    items: [
        {
            region: 'north',
            xtype: 'activitylist',
            height: 320
        },
        {xtype: 'splitter'},
        {
            region: 'center',
            xtype: 'activitydetail'
        }
    ]




});