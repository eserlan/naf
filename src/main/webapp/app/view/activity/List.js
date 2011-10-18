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
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            disabled: false,
            items: [
                '->',

                {
                    xtype: 'combo',
                    store: 'ActivitiesSearch',
                    id: 'activitiesSearchCombo',
                    displayField: 'summary',
                    typeAhead: false,
                    hideLabel: true,
                    hideTrigger:true,
                    queryParam: 'admin:true&text',
                    emptyText: 'Søk etter aktiviteter...',
//            matchFieldWidth: false,

                    listConfig: {
                        loadingText: 'Søker...',
                        emptyText: 'Ingen treff.',
                        width: 400,
                        minHeight: 200,
                        autoScroll: true

                    }
                },

                {
                    xtype: 'button',
                    id: 'removeButton',
                    text:'Slett',
                    tooltip: 'Slett valgt aktivitet',
                    action: 'delete'
                },
                {
                    xtype: 'button',
                    id: 'createBtn',
                    text:'Opprett',
                    tooltip: 'Opprett ny aktivitet',
                    action: 'create'
                },
                {
                    xtype: 'button',
                    id: 'createButton',
                    text:'Kopier',
                    tooltip: 'Kopier valgt aktivitet',
                    action: 'copy'
                },
                {
                    xtype: 'button',
                    id: 'activityDetailSaveButton',
                    text:'Lagre',
                    action: 'save'
                }
            ]
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
        if (typeof category !== 'undefined' && category  !== null)
            return category.get('name');
        return '';
    }
});