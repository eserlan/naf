Ext.define('NAF.view.activity.Detail', {
    extend: 'Ext.form.Panel',
    bodyPadding: 5,  // Don't want content to crunch against the borders
    alias: 'widget.activitydetail',
    store: ['Activities'],
    preventHeader: true,

    defaultType: 'textfield',

    tbar: [
        {
            xtype    : 'tbtext',
            id       : 'tbInfo',
            text     : 'Mer informasjon om ',
            style    : {'font-weight': 'bold', 'color': '#04408C !important'}
        },
        '->',
        {
            xtype: 'button',
            text:'Lagre',
//            disabled:true,
            action: 'save'
        }
    ],

    items: [
        {
            name: 'dtstart',
            dataIndex: 'dtstart',
            xtype: 'datefield',
            format: 'Y-m-d\\TG:m:sP',

            fieldLabel: 'Dato'
        },
        {
            name: 'summary',
            dataIndex: 'summary',
            fieldLabel: 'Navn'
        }
        ,
         {
            name: 'category2',
            id: 'categoryCombo',
            xtype: 'combo',
            valueField: '_id',
            dataIndex: 'category',
            store: 'Categories',
            displayField: 'name',
            typeAhead: true,
            fieldLabel: 'Kategori'
         }
        ,
        {
            name: 'category',
            dataIndex: 'category',
            fieldLabel: 'Kategori'
        },
        {
            name: 'description',
            xtype: 'textareafield',
            grow: 'true',
            dataIndex: 'description',
            fieldLabel: 'Beskrivelse'
        }
        ,
        {
            name: 'location',
            dataIndex: 'location',
            fieldLabel: 'Sted'
        }
        ,
        {
            name: 'location2',
            xtype: 'combo',
            width: 350,
            valueField: '_id',
            dataIndex: 'location',
            store: 'Locations',
            displayField: 'name',
            typeAhead: true,
            fieldLabel: 'Sted'
        }
    ]


});