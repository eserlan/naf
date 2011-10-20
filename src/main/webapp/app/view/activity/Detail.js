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
                    text:'Slett',
                    disabled: true,
                    tooltip: 'Slett valgt aktivitet',
                    action: 'delete'
                },
                {
                    xtype: 'button',
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
            xtype: 'combo',
            store: 'ActivitiesSearch',
            id: 'activitiesSearchComboSummary',
            displayField: 'summary',
            typeAhead: false,
            hideLabel: true,
            hideTrigger:true,
            emptyText: 'Aktivitets navn',
            width: 350,
            enableKeyEvents: true,
            queryParam: 'text',
            allowBlank: false,
            invalidText: 'Feltet må være utfylt.',
            fieldStyle: {'font-weight': 'bold', 'height' : 30, 'color' : 'black'},
            listConfig: {
                loadingText: 'Søker...',
                emptyText: 'Finner ikke aktivitet med angitt navn. Tryck "ESC" tast for å gå videre.',
                width: 400,
                minHeight: 200,
                autoScroll: true
            }
        },

        {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            items: [
                {
                    name: 'dtstart',
                    id: 'dtstart',
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
//                    minValue: '06.00',
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
            xtype: 'splitter',
            height: 10
        }
        ,
        {
            name: 'contact_name',
            xtype: 'textfield',
            width: 350,
            fieldLabel: 'Kontakt navn'
        }
        ,
        {
            name: 'contact_email',
            xtype: 'textfield',
            width: 350,
            fieldLabel: 'Kontakt epost'
        }
        ,
        {
            name: 'contact_phone',
            xtype: 'textfield',
            width: 350,
            fieldLabel: 'Kontakt tlf.'
        }
        ,
        {
            name: 'contact',
            xtype: 'textareafield',
            grow: 'true',
            width: 350,
            fieldLabel: 'Ytterligere info.'
        }
        ,
        {
            xtype: 'splitter',
            height: 10
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
            name: 'organizer2',
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
        },

        {
            name: 'address',
            xtype: 'textareafield',
            grow: 'true',
            width: 350,
            fieldLabel: 'Adresse'
        },


        {
            xtype: 'fieldcontainer',
            fieldLabel: 'Stikkord',
            layout: 'hbox',
            items: [
                {
                    name: 'tags',
                    xtype: 'textfield',
                    emptyText: 'Stikkord',
                    width: 245
                },
                {
                    xtype: 'image',
                    html: '<h1>abc</h1>',
                    id: 'tagsHelpImage',
                    margins: '0 0 0 5',
                    src: 'img/HelpIcon.gif'
                }
            ]
        },


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
            name: 'member_price',
            fieldLabel: 'Medlemspris',
            xtype: 'textfield',
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
                { boxLabel: 'Inkl mva', name: 'mva', inputValue: true, uncheckedValue: false },
                { boxLabel: 'Inkl veileder', name: 'supervisor_included', inputValue: true, uncheckedValue: false }
            ]
        },

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
    ]


});