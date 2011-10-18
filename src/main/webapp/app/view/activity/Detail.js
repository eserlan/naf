Ext.define('NAF.view.activity.Detail', {
    extend: 'Ext.form.Panel',
    bodyPadding: 5,
    alias: 'widget.activitydetail',
    preventHeader: true,
    autoScroll: true,

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
            tooltip: 'Slett valgt aktivitet',
            action: 'delete'
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
//            disabled:true,
            action: 'save'
        }
    ],

    items: [

        {
            name: 'summary',
            id: 'summary',
            allowBlank: false,
            invalidText: 'Feltet må være utfylt.',
            emptyText: 'Aktivitets navn',
            height: 30,
            width: 350,
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
                    width: 95,
                    xtype: 'datefield'
                    ,
                    format: 'd.m.Y',
                    altFormats: 'c'
                },
                {
                    xtype: 'splitter'
                },
                {
                    xtype: 'timefield',
                    width: 65,
                    name: 'dtstart-time',
                    increment: 30,
                    format: 'H.i',
                    altFormats: 'c'
                },
                {
                    xtype: 'splitter',
                    width: 20
                },
                {
                    name: 'dtend',
                    id: 'dtend',
                    width: 95,
                    xtype: 'datefield',
                    format: 'd.m.Y',
                    altFormats: 'c'
                }
                ,
                {
                    xtype: 'splitter'
                }
                ,
                {
                    xtype: 'timefield',
                    width: 65,
                    name: 'dtend-time',
                    increment: 30,
                    format: 'H.i',
                    altFormats: 'c'
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
                    name : 'age_from',
                    minValue:0,
                    maxValue:100,
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
                    name : 'age_to',
                    minValue:0,
                    maxValue:100,
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
            fieldLabel: 'Beskrivelse'
        }
        ,
        {
            name: 'contact',
            xtype: 'textareafield',
            grow: 'true',
            width: 350,
            fieldLabel: 'Kontakt informasjon'
        }
        ,
        {
            name: 'attendee',
            xtype: 'textfield',
            width: 350,
            fieldLabel: 'Påmeldingslink'
        }
        ,
        {
            name: 'location',
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
            name: 'organizer',
            id: 'organizerCombo',
            xtype: 'combo',
            width: 350,
            valueField: '_id',
            store: 'Locations',
            displayField: 'name',
            typeAhead: false,

            fieldLabel: 'Arrangør',

            listConfig: {
                loadingText: 'Leter...'
            }
        }
        ,
        {
            name: 'tags',
            fieldLabel: 'Stikkord',
            id: 'tags',
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
            fieldLabel: 'Brukeren har selv ansvar for'
        }
        ,
        {
            name: 'url',
            xtype: 'textfield',
            width: 350,
            fieldLabel: 'Link til aktiviteten'

        }
        ,
        {
            name: 'video',
            xtype: 'textfield',
            width: 350,
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
            xtype: 'form',
            title: 'Politisk aktivitet',
            bodyPadding: 5,
            collapsible: true,
            collapsed: true,
            items: [
                {
                    name: 'political_contact',
                    xtype: 'textareafield',
                    width: 350,
                    fieldLabel: 'Kontakt med'

                },
                {
                    name: 'response_result',
                    xtype: 'textareafield',
                    width: 350,
                    fieldLabel: 'Respons/Resultat'

                }
            ]
        }

        ,
        {
            xtype: 'form',
            title: 'Interninformasjon',
            bodyPadding: 5,
            collapsible: true,
            collapsed: true,

            items: [
                {
                    name: 'volunteers_involved_count',
                    xtype: 'numberfield',
                    width: 350,
                    fieldLabel: 'Antall frivillige involvert'

                },
                {
                    name: 'volunteers_used_count',
                    xtype: 'numberfield',
                    width: 350,
                    fieldLabel: 'Antall frivilligtimer brukt'

                },
                {
                    name: 'competence_needs',
                    xtype: 'textareafield',
                    width: 350,
                    fieldLabel: 'Kompetansebehov'

                },
                {
                    name: 'participants_count',
                    xtype: 'numberfield',
                    width: 350,
                    fieldLabel: 'Antall deltakere'

                },
                {
                    name: 'result',
                    xtype: 'textareafield',
                    width: 350,
                    fieldLabel: 'Dette gikk bra'

                },
                {
                    name: 'potential_improvements',
                    xtype: 'textareafield',
                    width: 350,
                    fieldLabel: 'Enda bedre om'

                }
            ]
        }

        ,
        {
            xtype: 'form',
            title: 'Media',
            bodyPadding: 5,
            collapsible: true,
            collapsed: true,
            items: [
                {
                    name: 'media_title',
                    xtype: 'textfield',
                    width: 350,
                    fieldLabel: 'Tittel på sak'

                },
                {
                    name: 'media_outlet',
                    xtype: 'textfield',
                    width: 350,
                    fieldLabel: 'Medie'

                },
                {
                    name: 'media_url',
                    xtype: 'textfield',
                    width: 350,
                    fieldLabel: 'Link til sak'

                }
            ]
        }

//        ,
//
//        {
//            xtype: 'splitter',
//            height: 40
//        }
//        ,
//        {
//            xtype: 'splitbutton',
//            id: 'addBtn',
//            text: 'Legg til',
//            scope: this,
//            margin: '0 0 0 50' ,
//            menu : [
//                {
//                    text: 'Navn',
//                    handler: function() {
//                        console.log('abc')
//                    }
//                },
//                {
//                    text: 'Sted',
//                    handler: function() {
//                        console.log('abc')
//                    }
//                },
//                {
//                    text: 'Målgruppe',
//                    handler: function() {
//                        console.log('abc')
//                    }
//                },
//                {
//                    text: 'Kategori',
//                    handler: function() {
//                        console.log('abc')
//                    }
//                },
//                {
//                    text: 'Beskrivelse',
//                    handler: function() {
//                        console.log('abc')
//                    }
//                },
//                {
//                    text: 'Kontaktinformasjon',
//                    handler: function() {
//                        console.log('abc')
//                    }
//                },
//                {
//                    text: 'Link til registrering',
//                    handler: function() {
//                        console.log('abc')
//                    }
//                },
//                {
//                    text: 'Link til nettside',
//                    handler: function() {
//                        console.log('abc')
//                    }
//                },
//                {
//                    text: 'Starter',
//                    handler: function() {
//                        console.log('abc')
//                    }
//                },
//                {
//                    text: 'Avslutter',
//                    handler: function() {
//                        console.log('abc')
//                    }
//                },
//                {
//                    text: 'Pris',
//                    handler: function() {
//                        console.log('abc')
//                    }
//                },
//                {
//                    text: 'Link til video (youtupe)',
//                    handler: function() {
//                        console.log('abc')
//                    }
//                },
//                {
//                    text: 'Kjøretøy',
//                    handler: function() {
//                        console.log('abc')
//                    }
//                },
//                {
//                    text: 'Deltager trenger eget kjøretøy',
//                    handler: function() {
//                        console.log('abc')
//                    }
//                },
//                {
//                    text: 'Instruktør på stedet',
//                    handler: function() {
//                        console.log('abc')
//                    }
//                },
//                {
//                    text: 'Tags',
//                    handler: function() {
//                        console.log('abc')
//                    }
//                }
//            ]
//        }

    ]

    ,
    findMinValue: function(value){
        console.log('min value is: ' + value);
    }


});