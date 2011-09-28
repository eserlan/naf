Ext.define('NAF.view.Viewport', {
    extend: 'Ext.container.Viewport',

    requires: [
        'NAF.view.activity.List'
    ],

    layout: 'fit',

    items: [
        {
            title: 'NAF: 0 - 100',
            xtype: 'activitylist'
        }
    ]





});