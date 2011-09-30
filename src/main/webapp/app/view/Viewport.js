Ext.define('NAF.view.Viewport', {
    extend: 'Ext.container.Viewport',

    requires: ['NAF.view.activity.Detail','NAF.view.activity.List' ],

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