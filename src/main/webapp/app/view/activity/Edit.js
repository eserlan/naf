Ext.define('NAF.view.activity.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.activityedit',

    title : 'Editer aktivitet',
    layout: 'fit',
    autoShow: true,

    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                items: [
                    {
                        xtype: 'textfield',
                        name : 'navn',
                        fieldLabel: 'Navn'
                    },
                    {
                        xtype: 'textfield',
                        name : 'kategori',
                        fieldLabel: 'Kategori'
                    }
                ]
            }
        ];

        this.buttons = [
            {
                text: 'Lagre',
                action: 'save'
            },
            {
                text: 'Avbryt',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    }
});