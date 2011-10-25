Ext.define('NAF.view.activity.List', {
    extend: 'Ext.grid.Panel',
    alias : 'widget.activitylist',
    store: 'Activities',
    collapsible: true,
    resizable: true,
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
                    queryParam: 'text',
                    emptyText: 'Søk etter aktiviteter...',
                    listConfig: {
                        loadingText: 'Søker...',
                        emptyText: 'Ingen treff.',
                        minHeight: 200,
                        autoScroll: true
                    }
                }

                ,
                '->' ,
                {
                    xtype: 'button',
                    id: 'createBtn',
                    scale: 'medium',
                    cls: 'nafMediumButton',
                    text:'Opprett',
                    tooltip: 'Opprett ny aktivitet',
                    action: 'create'
                },
                {
                    xtype: 'button',
                    id: 'copyButton',
                    scale: 'medium',
                    cls: 'nafMediumButton',
                    text:'Kopier',
                    tooltip: 'Kopier valgt aktivitet',
                    action: 'copy'
                }
            ]
        }
    ],

    initComponent: function() {
        this.columns = [
            {header: 'Starter',  dataIndex: 'dtstart', xtype: 'datecolumn',  format: 'd.m.Y H.i', width: 105},
            {header: 'Slutter',  dataIndex: 'dtend', xtype: 'datecolumn',  format: 'd.m.Y H.i', width: 105},
            {header: 'Navn',  dataIndex: 'summary',  flex: 1},
            {header: 'Arrangør',  dataIndex: 'organizer',  flex: 1},
            {header: 'Sted',  dataIndex: 'location',  flex: 1},
            {header: 'Kategori', dataIndex: 'category_id', flex: 1, renderer: this.findCategoryName},
            {header: 'Traf. sikkerhet',  dataIndex: 'traffic_safety',  width: 82, renderer: this.renderIcon},
            {header: 'Tilgang',  dataIndex: 'organizer_id',  width: 42, renderer: this.renderAccessIcon},
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
        } else {
            return ''
        }
    },

    renderAccessIcon: function (organizer_id) {
        var as = Ext.StoreManager.get('Accesses');
        var accessIds = as.collect('access_id');

        var access = (Ext.Array.indexOf(accessIds, organizer_id) > -1 || as.find('access_id', 'super') > -1);
        if (access) {
            return '<img src="img/icon_true.gif">';
        } else {
            return ''
        }
    }

});