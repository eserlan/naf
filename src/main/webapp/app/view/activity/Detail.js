Ext.define('NAF.view.activity.Detail', {
    extend: 'Ext.form.Panel',
    bodyPadding: 5,  // Don't want content to crunch against the borders
    alias: 'widget.activitydetail',
    title: 'Mer informasjon om ',
    store: 'Activities',

    defaultType: 'textfield',

    items: [{
        name: 'navn',
        dataIndex: 'navn',
        fieldLabel: 'Navn'
    }, {
        name: 'kategori',
        dataIndex: 'kategori',
        fieldLabel: 'Kategori'
    }]
});