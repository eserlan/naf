Ext.define('NAF.view.activity.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.activitylist',
    store: 'Activities',

    title : 'Alle aktiviteter',

    initComponent: function() {


        this.columns = [
            {header: 'Navn',  dataIndex: 'navn',  flex: 1},
            {header: 'Kategori', dataIndex: 'kategori', flex: 1}
        ];

        this.callParent(arguments);
    }
});