Ext.define('NAF.controller.Activities', {
    extend: 'Ext.app.Controller',

    stores: ['Activities'],
    models: ['Activity'],

    views: [
        'activity.List',
        'activity.Edit'
    ],
    init: function() {
        console.log('Initialized Activities! This happens before the Application launch function is called');
        this.control({
            'viewport > activitylist': {
                itemdblclick: this.editActivity
            },
            'activityedit button[action=save]':{
                click: this.updateActivity

            }
        });
    },

    editActivity: function (grid, record) {
        console.log('Dblclik: ' + record.get('navn'));
        var view = Ext.widget('activityedit');
        view.down('form').loadRecord(record);
    },

    updateActivity: function (button) {
        console.log('Lagre knapp trykket!');
        var win = button.up('window'),
            form = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();

        record.set(values);
        win.close();
        this.getActivitiesStore().sync();
    }

});