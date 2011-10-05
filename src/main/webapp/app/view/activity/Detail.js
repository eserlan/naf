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
            disabled:true,
            action: 'save'
        }
    ],

    items: [
        {
            name: 'dato',
            dataIndex: 'dato',
            xtype: 'datefield',
            format: 'd.m.Y',
            fieldLabel: 'Dato'
        },
        {
            name: 'navn',
            dataIndex: 'navn',
            fieldLabel: 'Navn'
        },
        {
            name: 'kategori',
            dataIndex: 'kategori',
            fieldLabel: 'Kategori'
        },
        {
            name: 'beskrivelse',
            xtype: 'textareafield',
            grow: 'true',
            dataIndex: 'beskrivelse',
            fieldLabel: 'Beskrivelse'
        },
        {
            name: 'sted',
//            matchFieldWidth: false,
            xtype: 'combo',
            width: 350,
            valueField: '_id',
            store: 'Locations',
            displayField: 'name',
            typeAhead: true,
            fieldLabel: 'Sted'
        }
    ]


});