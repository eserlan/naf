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
            xtype: 'combo',
            store: 'Activities',
            id: 'activitiesSearchCombo',
            displayField: 'summary',
            typeAhead: false,
            hideLabel: true,
            hideTrigger:true,
            anchor: '100%',
            queryParam: 'text',
            emptyText: 'Søk etter aktiviteter...',
//            matchFieldWidth: false,

            listConfig: {
                loadingText: 'Søker...',
                emptyText: 'Ingen treff.',
                width: 400

            },
            pageSize: 10
        },
        {
            xtype: 'button',
            id: 'createButton',
            text:'Opprett',
            tooltip: 'Opprett ny aktivitet basert på den valgte',
//            disabled:true,
            action: 'create'
        },
        {
            xtype: 'button',
            id: 'activityDetailSaveButton',
            text:'Lagre',
//            disabled:true,
            action: 'save'
        }
    ],

    items: [
        {
            name: 'summary',
            id: 'summary',
            dataIndex: 'summary',
            emptyText: 'Aktivitets navn',
            height: 30,
            width: 400,
            enableKeyEvents: true,
            fieldStyle: {'font-weight': 'bold'}
        }
        ,
        {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            items: [
                {
                    name: 'dtstart',
                    dataIndex: 'dtstart',
                    xtype: 'datefield',
                    format: 'c'
                },
                {
                    xtype: 'splitter'
                },
                {
                    xtype: 'timefield',
                    dataIndex: 'dtstart',
                    width: 70,
                    name: 'in',
                    increment: 30,
                    format: 'H:i'
                },
                {
                    xtype: 'splitter'
                },
                {
                    name: 'dtend',
                    dataIndex: 'dtend',
                    xtype: 'datefield',
                    format: 'c'
                },
                {
                    xtype: 'splitter'
                },
                {
                    xtype: 'timefield',
                    dataIndex: 'dtend',
                    width: 70,
                    name: 'out',
                    increment: 30,
                    format: 'H:i'
                }
            ]
        },


        {
            name: 'category2',
            id: 'categoryCombo',
            xtype: 'combo',
            valueField: '_id',
//            dataIndex: 'category',
            store: 'Categories',
            displayField: 'name',
            typeAhead: true,
            width: 350,
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
            width: 350,
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
            store: 'Locations',
            displayField: 'name',
            typeAhead: false,

            fieldLabel: 'Sted',

            listConfig: {
                   loadingText: 'Leter...'
            }
        }
        ,
        {
            name: 'tags',
            fieldLabel: 'Stikkord',
            id: 'tags',
            dataIndex: 'tags',
            emptyText: 'Stikkord',
            width: 350
        },
        {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            items: [
                {
                    name: 'price',
                    fieldLabel: 'Pris',
                    xtype: 'textfield',
                    id: 'price',
                    dataIndex: 'price',
                    emptyText: 'Pris',
                    width: 350
                }
                ,
                {
                    xtype: 'splitter'
                },
                {
                    xtype: 'checkboxfield',
                    boxLabel  : 'Veileder  inkl',
                    name      : 'supervisor_included',
                    dataIndex : 'supervisor_included',
                    inputValue: 'true',
                    uncheckedValue : 'false',
                    id        : 'supervisor_included'
                }
            ]
        }
        ,

        {
            xtype: 'fieldcontainer',
            id: 'fcVechicle',
            layout: 'hbox',
            items: [
                {
                    name: 'vehicle2',
                    id: 'vehicleCombo',
                    xtype: 'combo',
                    width: 350,
                    valueField: 'name',
                    dataIndex: 'vehicle',
                    store: 'Vehicles',
                    displayField: 'name',
                    typeAhead: true,
                    fieldLabel: 'Kjøretøy'
                },
                {
                    xtype: 'splitter'
                },
                {
                    xtype: 'checkboxfield',
                    boxLabel  : 'Eget kjøretøy',
                    name      : 'own_vehicle',
                    dataIndex : 'own_vehicle',
                    uncheckedValue : 'false',
                    inputValue: 'true',
                    id        : 'own_vehicle'
                }
            ]
        }
        ,
        {
            name: 'responsibility',
            xtype: 'textareafield',
            grow: 'true',
            width: 350,
            dataIndex: 'responsibility',
            fieldLabel: 'Brukeren har selv ansvar for'
        }
        ,
        {
            xtype: 'splitbutton',
            id: 'addBtn',
            text: 'Legg til',
            scope: this,
            menu : [
                {
                    text: 'Navn',
                    handler: function() {
                        console.log('abc')
                    }
                },
                {
                    text: 'Sted',
                    handler: function() {
                        console.log('abc')
                    }
                },
                {
                    text: 'Målgruppe',
                    handler: function() {
                        console.log('abc')
                    }
                },
                {
                    text: 'Kategori',
                    handler: function() {
                        console.log('abc')
                    }
                },
                {
                    text: 'Beskrivelse',
                    handler: function() {
                        console.log('abc')
                    }
                },
                {
                    text: 'Kontaktinformasjon',
                    handler: function() {
                        console.log('abc')
                    }
                },
                {
                    text: 'Link til registrering',
                    handler: function() {
                        console.log('abc')
                    }
                },
                {
                    text: 'Link til nettside',
                    handler: function() {
                        console.log('abc')
                    }
                },
                {
                    text: 'Starter',
                    handler: function() {
                        console.log('abc')
                    }
                },
                {
                    text: 'Avslutter',
                    handler: function() {
                        console.log('abc')
                    }
                },
                {
                    text: 'Pris',
                    handler: function() {
                        console.log('abc')
                    }
                },
                {
                    text: 'Link til video (youtupe)',
                    handler: function() {
                        console.log('abc')
                    }
                },
                {
                    text: 'Kjøretøy',
                    handler: function() {
                        console.log('abc')
                    }
                },
                {
                    text: 'Deltager trenger eget kjøretøy',
                    handler: function() {
                        console.log('abc')
                    }
                },
                {
                    text: 'Instruktør på stedet',
                    handler: function() {
                        console.log('abc')
                    }
                },
                {
                    text: 'Tags',
                    handler: function() {
                        console.log('abc')
                    }
                }
            ]
        }

    ]


});