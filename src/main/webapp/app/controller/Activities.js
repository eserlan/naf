Ext.define('NAF.controller.Activities', {
    extend: 'Ext.app.Controller',

    stores: ['Activities'],
    models: ['Activity'],

    views: [
        'activity.List',
        'activity.Edit',
        'activity.Detail'
    ],

    refs: [
        {
            ref: 'activityDetail',
            selector: 'activitydetail'
        }
    ],
    init: function() {
        console.log('Initialized Activities! This happens before the Application launch function is called');
        this.control({
            'viewport > activitylist': {
                itemdblclick: this.editActivity,
                select: this.changeDetail
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
    },

    changeDetail: function(grid, record) {
        var title = record.get('navn');
        var ad = this.getActivityDetail();
        var di = ad.getDockedItems();
        var tbar = di[0];
        var tbInfo = tbar.getComponent('tbInfo');
        tbInfo.setText('Mer informasjon om ' + title);
        console.log(tbInfo);

        ad.loadRecord(record);


    }

});