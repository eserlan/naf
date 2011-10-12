Ext.define('NAF.controller.Activities', {
    extend: 'Ext.app.Controller',

    stores: ['Activities','ActivitiesSearch', 'Locations', 'Categories', 'Vehicles' ],
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
        },
        {
            ref: 'vehicleCombo',
            selector: '#vehicleCombo'
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
            'activitylist': {
                select: this.changeDetail
            },
            'activitydetail button[action=save]':{
                click: this.updateActivity
            },
            'activitydetail button[action=create]':{
                click: this.createActivity
            },
            'activitydetail button[action=remove]':{
                click: this.removeActivity
            },
            'activitydetail combobox#categoryCombo':{
                select: this.selectCategory
            },
            'activitydetail textfield':{
                keyup : this.updateList
            },
            'activitydetail combobox#locationCombo':{
                select: this.selectLocation
            },
            'activitydetail combobox#activitiesSearchCombo':{
                select: this.selectActivity
            },
            'activitydetail #vehicleCombo':{
                select: this.selectVehicle
            }


        });
    },

    selectActivity: function(combo, records) {
        var record = records[0];
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

    removeActivity: function (button) {
        var win = button.up('activitydetail');
        var form = win.getForm();
        var record = form.getRecord();
        var values = form.getValues();
        record.set(values);
        this.getActivitiesStore().remove(record);
        this.getActivitiesStore().sync();
    },

    createActivity: function (button) {
        var ad = this.getActivityDetail();
        var form = ad.getForm();
        var record = form.getRecord();
        var values = form.getValues();
        record.set(values);

        var index = this.getActivitiesStore().indexOf(record);

        var newActivity = record.copy();
//         var id = 'random' + Math.floor(Math.random()*1111111);
        var id = Ext.data.Model.id(newActivity);
        newActivity.set('_id', id);
        newActivity.set('id', id);
        newActivity.set('summary', 'Kopi av ' + record.get('summary'));

        this.getActivitiesStore().insert(index+1,newActivity);
        this.getActivitiesStore().sync();
        this.changeDetail(null, newActivity)
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
        var v = this.getVehicleCombo();
        v.setValue(record.get('vehicle'));
    },

    selectCategory: function(combo, selectedRecords) {
        var ad = combo.up();
        if (ad != null) {
            var activity = ad.getRecord();
            var newId = selectedRecords[0].get('_id');
            var newCategory = selectedRecords[0].get('name');
            activity.set('category_id', newId);
            activity.set('category', newCategory);

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

        }
    },

    selectVehicle: function(combo, selectedRecords) {
        var ad = this.getActivityDetail();
        if (ad != null) {
            var activity = ad.getRecord();
            var vehicle = selectedRecords[0].get('name');
            activity.set('vehicle', vehicle);

        }
    }

});