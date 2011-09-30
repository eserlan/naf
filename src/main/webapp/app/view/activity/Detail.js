Ext.define('NAF.view.activity.Detail', {
    extend: 'Ext.panel.Panel',
    bodyPadding: 5,  // Don't want content to crunch against the borders
    collapsible: true,
    alias: 'widget.activitydetail',
    title: 'Mer informasjon om ',


    items: [{
        xtype: 'datefield',
        fieldLabel: 'Start date'
    }, {
        xtype: 'datefield',
        fieldLabel: 'End date'
    }]
});