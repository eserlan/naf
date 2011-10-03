Ext.define('NAF.view.activity.Detail', {
    extend: 'Ext.form.Panel',
    bodyPadding: 5,  // Don't want content to crunch against the borders
    alias: 'widget.activitydetail',
    title: 'Mer informasjon om ',
    store: 'Activities',

    defaultType: 'textfield',

    buttons: [
        {text: 'Lagre'}
    ],

    items: [{
        name: 'dato',
        dataIndex: 'dato',
        xtype: 'datefield',
        format: 'd.m.Y',
        fieldLabel: 'Dato'
    }, {
        name: 'navn',
        dataIndex: 'navn',
        fieldLabel: 'Navn'
    }, {
        name: 'kategori',
        dataIndex: 'kategori',
        fieldLabel: 'Kategori'
    },{
        name: 'beskrivelse',
        xtype: 'textareafield',
        grow: 'true',
        dataIndex: 'beskrivelse',
        fieldLabel: 'Beskrivelse'
    } ]


});