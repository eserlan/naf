Ext.define('NAF.view.activity.List', {
    extend: 'Ext.grid.Panel',
    alias : 'widget.activitylist',
    store: 'Activities',
    collapsible: true,

    title : 'Alle aktiviteter',

    dockedItems: [
        {
            xtype: 'pagingtoolbar',
            store: 'Activities',
            dock: 'bottom',
            displayInfo: true
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'combo',
                    store: 'ActivitiesSearch',
                    id: 'activitiesSearchCombo',
                    displayField: 'summary',
                    typeAhead: false,
                    hideLabel: true,
                    hideTrigger:true,
                    width: 300,
                    queryParam: 'admin:true&text',
                    emptyText: 'Søk etter aktiviteter...',
                    listConfig: {
                        loadingText: 'Søker...',
                        emptyText: 'Ingen treff.',
                        minHeight: 200,
                        autoScroll: true
                    }
                }
            ]
        }
    ],

    initComponent: function() {
        this.columns = [
            {header: 'Starter',  dataIndex: 'dtstart', xtype: 'datecolumn',  format: 'd.m.Y H.i', width: 110},
            {header: 'Navn',  dataIndex: 'summary',  flex: 1},
            {header: 'Arrangør',  dataIndex: 'organizer',  flex: 1},
            {header: 'Sted',  dataIndex: 'location',  flex: 1},
            {header: 'Kategori', dataIndex: 'category_id', flex: 1, renderer: this.findCategoryName},
            {header: 'Aktiv',  dataIndex: 'active',  width: 35, renderer: this.renderIcon}
        ];
        this.callParent(arguments);
    },

    findCategoryName: function(value) {
        var store = Ext.getStore('Categories');
        var category = store.getById(value);
        if (typeof category !== 'undefined' && category !== null)
            return category.get('name');
        return '';
    },

    renderIcon: function (value) {
        if (value) {
            return '<img src="img/icon_true.gif">';
        } else {return ''}
    }

});