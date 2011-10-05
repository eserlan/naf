Ext.define('NAF.view.activity.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.activitylist',
    store: 'Activities',
    collapsible: true,

    title : 'Alle aktiviteter',

    initComponent: function() {


        this.columns = [
            {header: 'Dato',  dataIndex: 'dtstart',  flex:1, shrinkToFit:true},
            {header: 'Navn',  dataIndex: 'summary',  flex: 2},
            {header: 'Kategori', dataIndex: 'category', flex: 2}
        ];

        this.callParent(arguments);
    }
});