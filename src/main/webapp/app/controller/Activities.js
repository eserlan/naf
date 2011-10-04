Ext.define('NAF.controller.Activities', {
    extend: 'Ext.app.Controller',

    stores: ['Activities', 'Locations'],
    models: ['Activity', 'Location'],

    views: [
        'activity.List',
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
            'activitydetail button[action=save]':{
                click: this.updateActivity
            }
        });
    },



    updateActivity: function (button) {
        var win = button.up('activitydetail');
        var form = win.getForm();
        var record = form.getRecord();
        var values = form.getValues();

        record.set(values);
        this.getActivitiesStore().sync();
    },

    changeDetail: function(grid, record) {
        var title = record.get('navn');
        var ad = this.getActivityDetail();
        var di = ad.getDockedItems();
        var tbar = di[0];
        var tbInfo = tbar.getComponent('tbInfo');
        tbInfo.setText('Mer informasjon om ' + title);
        ad.loadRecord(record);
    }

});