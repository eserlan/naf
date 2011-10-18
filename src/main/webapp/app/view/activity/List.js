Ext.define('NAF.view.activity.List', {
    extend: 'Ext.grid.Panel',
    alias : 'widget.activitylist',
    store: 'Activities',
    collapsible: true,

    title : 'Alle aktiviteter',

    dockedItems: [
        {
            xtype: 'pagingtoolbar',
            store: 'Activities',   // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
        }
    ],

    initComponent: function() {
        this.columns = [
            {header: 'Starter',  dataIndex: 'dtstart', xtype: 'datecolumn',  format: 'd.m.Y H.i', width: 110},
            {header: 'Navn',  dataIndex: 'summary',  flex: 1},
            {header: 'Sted',  dataIndex: 'location',  flex: 1},
            {header: 'Kategori', dataIndex: 'category_id', flex: 1, renderer: this.findCategoryName}
        ];

        this.callParent(arguments);
    },

    findCategoryName: function(value) {
        var store = Ext.getStore('Categories');
        var category = store.getById(value);
        return category.get('name');
    }
});