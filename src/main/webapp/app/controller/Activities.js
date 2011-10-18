Ext.define('NAF.controller.Activities', {
    extend: 'Ext.app.Controller',

    stores: ['Categories','Locations','Activities','ActivitiesSearch','Vehicles'],
    models: ['Category', 'Activity', 'Location', 'Vehicle'],

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
        },
        {
            ref: 'dateEnd',
            selector: '#dtend'
        },
        {
            ref: 'fileUpload',
            selector: '#fileUpload'
        }
    ],

    init: function() {
        this.control({
            'activitylist': {
                select: this.changeDetail
            },
            'activitydetail button[action=save]':{
                click: this.saveActivities
            },
            'activitydetail button[action=copy]':{
                click: this.copyActivity
            },
            'activitydetail button[action=delete]':{
                click: this.confirmDeleteActivity
            },
            'activitydetail #uploadBtn':{
                click: this.uploadPhoto
            },
            'activitydetail #dtstart':{
                change: this.changeMinValueForDtend
            },
            'activitydetail #categoryCombo':{
                select: this.selectCategory
            },
            'activitydetail textfield':{
                keyup : this.updateList
            },
            'activitydetail #locationCombo':{
                select: this.selectLocation
            },
            'activitydetail #activitiesSearchCombo':{
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
        var v = this.getVehicleCombo();
        v.setValue(record.get('vehicle'));


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

    uploadPhoto: function(button) {

        console.log('hallo!?');
        var win = button.up('activitydetail');
        var form = win.getForm();
        var hasUpload = form.hasUpload();
        var fu = this.getFileUpload();
        var v = fu.getValue();

        var proxy = new Ext.data.proxy.Rest({
            url: '/aktivitets-admin/rest/file/upload'

        });

//        proxy.

//        form.submit({
//            url: '/aktivitets-admin/rest/file/upload',
//            waitMsg: 'Bildet lastes opp...'
//        });


    },

    saveActivities: function (button) {
        var win = button.up('activitydetail');
        var form = win.getForm();
        var record = form.getRecord();

       // console.log(record.modified);

        var dtstart = record.get('dtstart');
        if (typeof dtstart !== 'undefined' && dtstart !== null)
            console.log(dtstart);

        var values = form.getValues();

        var dtstartForm = values['dtstart'];

        console.log(dtstartForm);


        record.set(values);
        this.getActivitiesStore().sync();
        Ext.Msg.alert('Lagret', record.get('summary') + ' er lagret.');
    },

    confirmDeleteActivity: function(button) {
        Ext.Msg.confirm('Bekreft sletting', 'Bekreft at du ønsker å slette aktiviteten for godt?', this.deleteActivity, this);
    },

    deleteActivity: function (button) {
        if (button === 'yes') {
            var ad = this.getActivityDetail();
            var form = ad.getForm();
            var record = form.getRecord();
            var values = form.getValues();
            record.set(values);
            this.getActivitiesStore().remove(record);
            this.getActivitiesStore().sync();
        }
    },

    copyActivity: function (button) {
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

        this.getActivitiesStore().insert(index + 1, newActivity);
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
        var dtstart = record.get('dtstart');

        if (dtstart != null) {
            var dtstartTime = new Date(dtstart.getTime());
            record.set('dtstart-time', dtstartTime);
            this.getDateEnd().setMinValue(dtstart);
        }

        var dtend = record.get('dtend');

        if (dtend != null) {
            var dtendTime = new Date(dtend.getTime());
            record.set('dtend-time', dtendTime);
        }

        var cat = ad.getComponent('categoryCombo');
        cat.setValue(record.get('category_id'));
        var loc = ad.getComponent('locationCombo');
        loc.setValue(record.get('location_id'));
        var v = this.getVehicleCombo();
        v.setValue(record.get('vehicle'));
    },

    changeMinValueForDtend: function(field, newValue){
        var dtstart = newValue;
        if (dtstart != null) {
            var dtstartTime = new Date(dtstart.getTime());
            this.getDateEnd().setMinValue(dtstart);
        }
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