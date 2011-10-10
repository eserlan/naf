Ext.define('NAF.controller.Activities', {
    extend: 'Ext.app.Controller',

    stores: ['Activities', 'Locations', 'Categories', 'Vehicles' ],
    models: ['Activity', 'Location', 'Category', 'Vehicle'],

    views: [
        'activity.List',
        'activity.Detail'
    ],


    refs: [
        {
            ref: 'activityDetail',
            selector: 'activitydetail'
        },
        {
            ref: 'activityDetailSaveButton',
            selector: 'activitydetail button#activityDetailSaveButton'
        }
    ],
    init: function() {

//        var dt = new Date('2011-10-10T09:05:25+00:00');
//        console.log(Ext.Date.format(dt, 'Y-m-d'));                          // 2007-01-10
//        console.log(Ext.Date.format(dt, 'F j, Y, g:i a'));                  // January 10, 2007, 3:05 pm
//        console.log(Ext.Date.format(dt, 'l, \\t\\he jS \\of F Y h:i:s A')); // Wednesday, the 10th of January 2007 03:05:01 PM
//        console.log(Ext.Date.format(dt, 'Y-m-d\\TG:m:sP')); // Wednesday, the 10th of January 2007 03:05:01 PM


        //        console.log('Initialized Activities! This happens before the Application launch function is called');
        this.control({
            'viewport > activitylist': {
                select: this.changeDetail
            },
            'activitydetail button[action=save]':{
                click: this.updateActivity
            },
            'activitydetail combobox#categoryCombo':{
                select: this.selectCategory
            },
//            'activitydetail > fieldcontainer > field':{
//                change : this.updateList
//            },
            'activitydetail textfield':{
                keyup : this.updateList
            },
            'activitydetail combobox#locationCombo':{
                select: this.selectLocation
            }


        });
    },

    updateList: function(field) {
        var id = field.getId();
        var win = field.up('activitydetail');
        var form = win.getForm();
        var record = form.getRecord();
        var values = form.getValues();
        var val = values[id];
        record.set(id, val);
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
        var title = record.get('summary');
        var ad = this.getActivityDetail();
        var di = ad.getDockedItems();
        var tbar = di[0];
        var tbInfo = tbar.getComponent('tbInfo');
        tbInfo.setText('Mer informasjon om ' + title);
        ad.loadRecord(record);
        var cat = ad.getComponent('categoryCombo');
        cat.setValue(record.get('category_id'));
        var loc = ad.getComponent('locationCombo');
        loc.setValue(record.get('location_id'));
    },

    selectCategory: function(combo, selectedRecords) {
        var ad = combo.up();
        if (ad != null) {
            var activity = ad.getRecord();
            var newId = selectedRecords[0].get('_id');
            var newCategory = selectedRecords[0].get('name');
            activity.set('category_id', newId);
            activity.set('category', newCategory);
//            ad.loadRecord(activity);
//            todo
//            this.getActivitiesStore().sync();

        }
    },

    selectLocation: function(combo, selectedRecords) {
        var ad = combo.up();
        if (ad != null) {
            var activity = ad.getRecord();
            var newId = selectedRecords[0].get('_id');
            var newLocationName = selectedRecords[0].get('name');
            activity.set('location_id', newId);
            activity.set('location', newLocationName);
//            ad.loadRecord(activity);
//            todo
//            this.getActivitiesStore().sync();

        }
    }

});