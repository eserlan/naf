Ext.define('NAF.view.activity.Detail', {
    extend: 'Ext.form.Panel',
    bodyPadding: 5,  // Don't want content to crunch against the borders
    alias: 'widget.activitydetail',
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
            id: 'activityDetailSaveButton',
            text:'Lagre',
//            disabled:true,
            action: 'save'
        }
    ],

    initComponent: function () {

//        var fs = this.getComponent('fieldStore');
//
        var fs = Ext.data.StoreManager.lookup('Fields');

        console.log(fs);

        var d = fs.data;


        console.log(d);

//        var btn = Ext.create('Ext.button.Split');
//        btn.setText('valgene er: '
//        );

//        var btn = Ext.widget('button');

        console.log(d.items.length);



//        this.add(btn);



        this.callParent();


    },

    items: [
        {
            name: 'dtstart',
            dataIndex: 'dtstart',
            xtype: 'datefield',
            format: 'c',

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
//        {
//            name: 'category',
//            dataIndex: 'category',
//            fieldLabel: 'Kategori'
//        },
        {
            name: 'description',
            xtype: 'textareafield',
            grow: 'true',
            dataIndex: 'description',
            fieldLabel: 'Beskrivelse'
        }
        ,
//        {
//            name: 'location',
//            dataIndex: 'location',
//            fieldLabel: 'Sted'
//        }
//        ,
        {
            name: 'location2',
            id: 'locationCombo',
            xtype: 'combo',
            width: 350,
            valueField: '_id',
            dataIndex: 'location',
            store: 'Locations',
            displayField: 'name',
            typeAhead: true,
            fieldLabel: 'Sted'
        }
        ,
        {
            xtype: 'splitbutton',
            id: 'addBtn',
            text: 'Legg til',
            scope: this,
            menu : [{
                text: 'aaa',
                handler: function(){console.log('abc')}
            }]
        }

    ]


});