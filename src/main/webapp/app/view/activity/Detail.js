Ext.define('NAF.view.activity.Detail', {
    extend: 'Ext.form.Panel',
    bodyPadding: 5,  // Don't want content to crunch against the borders
    alias: 'widget.activitydetail',
    preventHeader: true,
    autoScroll: true,

    videoTpl: [
        '{video}'

    ],

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
//                maxHeight: 400,
                width: 400,
                minHeight: 200,
                autoScroll: true

            }
        },
        {
            xtype: 'button',
            id: 'removeButton',
            text:'Slett',
            tooltip: 'Sletter valgt aktivitet',
            action: 'remove'
        },
        {
            xtype: 'button',
            id: 'createButton',
            text:'Kopier',
            tooltip: 'Kopier valgte aktivitet',
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
        }
        ,

        {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            items: [
                {
                    xtype: 'checkboxfield',
                    fieldLabel  : 'Aktiv',
                    name      : 'active',
                    dataIndex : 'active',
                    inputValue: 'true',
                    uncheckedValue : 'false',
                    id        : 'active'
                },
                {
                    xtype: 'splitter'
                },
                {
                    xtype: 'label',
                    text: 'Alder fra'
                }
                ,
                {
                    xtype: 'splitter'
                }
                ,
                {
                    id: 'ageFrom',
                    xtype: 'numberfield',
                    valueField: 'ageFrom',
                    minValue:0,
                    maxValue:100,
                    value:18,
                    width: 50
                }
                ,
                {
                    xtype: 'splitter'
                }
                ,
                {
                    xtype: 'label',
                    text: 'til'
                }
                ,
                {
                    xtype: 'splitter'
                }
                ,
                {
                    id: 'ageTo',
                    xtype: 'numberfield',
                    valueField: 'ageTo',
                    minValue:0,
                    maxValue:100,
                    value:67,
                    width: 50
                }
            ]
        }
        ,

        {
            name: 'category2',
            id: 'categoryCombo',
            xtype: 'combo',
            valueField: '_id',
            store: 'Categories',
            displayField: 'name',
            typeAhead: true,
            width: 350,
            fieldLabel: 'Kategori'
        }
        ,
        {
            name: 'description',
            xtype: 'textareafield',
            grow: 'true',
            width: 350,
            dataIndex: 'description',
            fieldLabel: 'Beskrivelse'
        }
        ,
        {
            name: 'contact',
            xtype: 'textareafield',
            grow: 'true',
            width: 350,
            dataIndex: 'contact',
            fieldLabel: 'Kontakt informasjon'
        }
        ,
        {
            name: 'attendee',
            xtype: 'textfield',
            width: 350,
            dataIndex: 'attendee',
            fieldLabel: 'Påmeldingslink'
        }
        ,
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
            id: 'regionCombo',
            xtype: 'combo',
            width: 350,
            valueField: 'name',
            store: 'Regions',
            displayField: 'name',
            typeAhead: false,

            fieldLabel: 'Region',

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
            name: 'url',
            xtype: 'textfield',
            width: 350,
            dataIndex: 'url',
            fieldLabel: 'Link til aktiviteten'

        }
        ,
        {
            name: 'video',
            xtype: 'textfield',
            width: 350,
            dataIndex: 'video',
            fieldLabel: 'Link til video'

        }
// TODO: Finn ut av!
//        ,
//        {
//            xtype: 'displayfield',
//            value: 'video',
//            tpl: new Ext.XTemplate(this.videoTpl)
//        }


        ,
        {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            items: [
                {
                    xtype: 'filefield',
                    name: 'photo',
                    id: 'fileUpload',
                    fieldLabel: 'Finn bilde',
                    tooltip: 'får vi noe her?',
                    msgTarget: 'side',
                    width: 350,
                    allowBlank: false,
                    buttonText: 'Velg foto...'
                },
                {
                    xtype: 'splitter'
                }
                ,
                {
                    xtype: 'button',
                    id: 'uploadBtn',
                    text : 'Last opp',
                    action: 'upload'
                }
            ]
        }
        ,
        {
            xtype: 'splitter',
            height: 40
        }
        ,
        {
            xtype: 'splitbutton',
            id: 'addBtn',
            text: 'Legg til',
            scope: this,
            margin: '0 0 0 50' ,
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