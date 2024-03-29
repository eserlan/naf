Ext.define('NAF.view.activity.Detail', {
    extend: 'Ext.form.Panel',
    bodyPadding: 5,
    alias: 'widget.activitydetail',
    preventHeader: true,
    autoScroll: true,
    disabled: true,

    defaultType: 'textfield',

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                '->',
                {
                    xtype: 'button',
                    id: 'removeButton',
                    scale: 'medium',
                    cls: 'nafMediumButton',
                    text:'Slett',
                    disabled: true,
                    tooltip: 'Slett valgt aktivitet',
                    action: 'delete'
                },
                {
                    xtype: 'button',
                    scale: 'medium',
                    cls: 'nafMediumButton',
                    id: 'saveButton',
                    disabled: true,
                    text:'Lagre',
                    action: 'save'
                }
            ]
        }
    ],

    items: [
        {
            xtype: 'button',
            id: 'toggleActiveButton',
            text:'Aktiv',
            enableToggle: true,
            emptyText: 'Aktivitets navn',
            allowBlank: false,
            scale: 'large',
            width: 350,
            cls: 'activeButton',
            tooltip: 'Skru av og på aktiviteten.'
        },
        {
            xtype: 'splitter',
            height: 10
        },

        {
            id: 'summary',
            name: 'summary',
            allowBlank: false,
            blankText: 'Aktivitetsnavnet må være utfylt.',
            emptyText: 'Aktivitetens navn skal være her',
            xtype: 'textfield',
            enableKeyEvents: true,
            fieldStyle: {'font-weight': 'bold', 'height' : 30, 'color' : 'black'},
            width: 350
        },
//        {
//            xtype: 'combo',
//            store: 'ActivitiesSearch',
//            id: 'activitiesSearchComboSummary',
//            displayField: 'summary',
//            typeAhead: false,
//            hideLabel: true,
//            hideTrigger:true,
//            emptyText: 'Aktivitets navn',
//            width: 350,
//            enableKeyEvents: true,
//            queryParam: 'text',
//            allowBlank: false,
//            invalidText: 'Feltet må være utfylt.',
//            fieldStyle: {'font-weight': 'bold', 'height' : 30, 'color' : 'black'},
//            listConfig: {
//                loadingText: 'Søker...',
//                emptyText: 'Finner ikke aktivitet med angitt navn. Tryck "ESC" tast for å gå videre.',
//                width: 400,
//                minHeight: 200,
//                autoScroll: true
//            }
//        },

        {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            items: [
                {
                    name: 'dtstart',
                    id: 'dtstart',
                    width: 95,
                    allowBlank: false,
                    xtype: 'datefield'
                    ,
                    format: 'd.m.Y',
                    altFormats: 'c'
                },
                {
                    xtype: 'timefield',
                    width: 65,
                    allowBlank: false,
                    id: 'dtstart-time',
                    name: 'dtstart-time',
                    margin: '0 0 0 2',
                    minValue: '07.00',
                    increment: 30,
                    format: 'H.i',
                    altFormats: 'c'
                },
                {
                    name: 'dtend',
                    allowBlank: false,
                    id: 'dtend',
                    width: 95,
                    margin: '0 0 0 11',
                    xtype: 'datefield',
                    format: 'd.m.Y',
                    altFormats: 'c'
                },
                {
                    xtype: 'timefield',
                    width: 65,
                    allowBlank: false,
                    margin: '0 0 0 2',
                    minValue: '07.00',
                    id: 'dtend-time',
                    name: 'dtend-time',
                    increment: 30,
                    format: 'H.i',
                    altFormats: 'c'
                }
            ]
        }
        ,
        {
            xtype: 'checkboxfield',
            id : 'traffic_safety',
            name      : 'traffic_safety',
            fieldLabel: 'Trafikksikkerhets-aktivitet',
            uncheckedValue : false,
            inputValue: true
        },

        {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            items: [
                {
                    id: 'ageFrom',
                    xtype: 'numberfield',
                    name : 'age_from',
                    minValue:0,
                    maxValue:100,
                    width: 190,
                    fieldLabel: 'Alder fra'
                }
                ,
                {
                    xtype: 'label',
                    text: 'til',
                    margins: '3 31 0 30'
                }
                ,
                {
                    id: 'ageTo',
                    xtype: 'numberfield',
                    name : 'age_to',
                    minValue:0,
                    maxValue:100,
                    width: 90
                }
            ]
        }
        ,

        {
            id: 'categoryCombo',
            xtype: 'combo',
            allowBlank: false,
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
        },

        {
            name: 'tags',
            fieldLabel: 'Stikkord',
            xtype: 'textareafield',
            grow: true,
            growMin: 25,
            emptyText: 'er kommaseparerte beskrivende ord. Eks: bane, oslo, ungdom',
            width: 350
        },

        {
            xtype: 'fieldset',
            title: 'Kontakt',
            collapsible: true,
            width: 361,
            defaults: {
                labelWidth: 89,
                anchor: '100%',
                layout: {
                    type: 'hbox',
                    defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                }
            },
            items: [
                {
                    name: 'contact_name',
                    xtype: 'textfield',
                    fieldLabel: 'Navn'
                }
                ,
                {
                    name: 'contact_email',
                    xtype: 'textfield',
                    vtype: 'email',
                    fieldLabel: 'Epost'
                }
                ,
                {
                    name: 'contact_phone',
                    xtype: 'textfield',
                    fieldLabel: 'Telefon'
                }
                ,
                {
                    name: 'contact',
                    xtype: 'textareafield',
                    grow: 'true',
//                    width: 340,
                    fieldLabel: 'Ytterligere informasjon'
                }
            ]
        },
        {
            xtype: 'fieldset',
            title: 'Arrangør, sted og adresse',
            collapsible: true,
            width: 361,
            collapsed: false,
            margin: '5 0 10 0 ',
            defaults: {
                labelWidth: 89,
                anchor: '100%',
                layout: {
                    type: 'hbox',
                    defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                }
            },
            items: [
                {
                    id: 'organizerCombo',
                    xtype: 'combo',
                    width: 350,
                    allowBlank: false,
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
                    id: 'locationCombo',
                    xtype: 'combo',
                    width: 350,
                    allowBlank: false,
                    valueField: '_id',
                    store: 'Locations',
                    displayField: 'name',
                    typeAhead: false,
                    fieldLabel: 'Sted',
                    listConfig: {
                        loadingText: 'Leter...'
                    }
                },

                {
                    name: 'address',
                    xtype: 'textareafield',
                    grow: 'true',
                    width: 350,
                    fieldLabel: 'Adresse'
                }
            ]
        },


//        {
//            xtype: 'fieldcontainer',
//            fieldLabel: 'Stikkord',
//            layout: 'hbox',
//            items: [
//                {
//                    name: 'tags',
//                    xtype: 'textfield',
//                    emptyText: 'Stikkord',
//                    width: 245
//                },
//                {
//                    xtype: 'image',
//                    id: 'tagsHelpImage',
//                    margins: '0 0 0 5',
//                    src: 'img/HelpIcon.gif'
//                }
//            ]
//        },

        {
            xtype: 'fieldset',
            title: 'Påmelding og pris',
            collapsible: true,
            width: 361,
            collapsed: false,
            margin: '5 0 10 0 ',
            defaults: {
                labelWidth: 89,
                anchor: '100%',
                layout: {
                    type: 'hbox',
                    defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                }
            },
            items: [
                {
                    name: 'attendee',
                    xtype: 'textfield',
                    width: 350,
                    fieldLabel: 'Påmeldingslink'
                }
                ,
                {
                    name: 'price',
                    fieldLabel: 'Pris',
                    xtype: 'numberfield',
                    id: 'price',
                    emptyText: 'Pris',
                    width: 350
                }

                ,
                {
                    name: 'member_price',
                    fieldLabel: 'Medlemspris',
                    xtype: 'numberfield',
                    emptyText: 'Medlemspris',
                    width: 350
                }
                ,

                {
                    xtype: 'checkboxgroup',
                    fieldLabel: 'Annet',
                    columns: 1,
                    width: 350,
                    vertical: true,
                    items: [
                        { boxLabel: 'Gratis', name: 'free', inputValue: true, uncheckedValue: false },
                        { boxLabel: 'Inkl mva', name: 'mva', inputValue: true, uncheckedValue: false, defaultValue: true },
                        { boxLabel: 'Inkl veileder', name: 'supervisor_included', inputValue: true, uncheckedValue: false }
                    ]
                }
            ]},

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
                    msgTarget: 'side',
                    width: 350,
                    allowBlank: true,
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
        },

        {
            xtype: 'box',
            id: 'actImg',
            autoEl: {tag: 'img', src: ''}

        },


        {
            xtype: 'fieldset',
            title: 'Politisk aktivitet',
            collapsible: true,
            width: 361,
            collapsed: true,
            margin: '5 0 0 0 ',
            defaults: {
                labelWidth: 89,
                anchor: '100%',
                layout: {
                    type: 'hbox',
                    defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                }
            },
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
                    fieldLabel: 'Respons/ Resultat'

                }
            ]
        },

        {
            xtype: 'fieldset',
            title: 'Intern informasjon',
            collapsible: true,
            collapsed: true,
            margin: '5 0 0 0 ',
            width: 361,
            defaults: {
                labelWidth: 89,
                anchor: '100%',
                layout: {
                    type: 'hbox',
                    defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                }
            },
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
                    fieldLabel: 'Kompetanse-behov'

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
            xtype: 'fieldset',
            title: 'Media',
            collapsed: true,
            margin: '5 0 0 0 ',
            collapsible: true,
            width: 361,
            defaults: {
                labelWidth: 89,
                anchor: '100%',
                layout: {
                    type: 'hbox',
                    defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                }
            },
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
        },
        {
            name: 'photo_id',
            xtype: 'hiddenfield'
        }
    ]



});