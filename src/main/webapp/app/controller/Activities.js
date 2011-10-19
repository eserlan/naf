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
            ref: 'summary',
            selector: '#activitiesSearchComboSummary'
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
            'activitylist button[action=save]':{
                click: this.saveActivities
            },
            'activitylist button[action=copy]':{
                click: this.copyActivity
            },
            'activitylist button[action=delete]':{
                click: this.confirmDeleteActivity
            },
            'activitylist button[action=create]':{
                click: this.createActivity
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
            'activitydetail #organizerCombo':{
                select: this.selectOrganizer
            },
            'activitylist #activitiesSearchCombo':{
                select: this.selectActivity,
                keyup : this.updateList
            },
            'activitydetail #activitiesSearchComboSummary':{
                blur: this.setSummaryBlur
            },
            'activitydetail #vehicleCombo':{
                select: this.selectVehicle
            }
        });
    },

    createActivity: function() {
        var ad = this.getActivityDetail();
        var activity = Ext.create('NAF.model.Activity');
        var summaryCmp = this.getSummary();
        summaryCmp.setRawValue('');
        ad.getForm().loadRecord(activity);

        ad.setDisabled(false);


        this.getActivitiesStore().add(activity);
    },

    selectActivity: function(combo, records) {
        var record = records[0];
        var summary = record.get('summary');
        var ad = this.getActivityDetail();
        ad.setDisabled(false);
        ad.loadRecord(record);
        var summaryCmp = this.getSummary();
        summaryCmp.setRawValue(summary);
        var cat = ad.getComponent('categoryCombo');
        cat.setValue(record.get('category_id'));
        var loc = ad.getComponent('locationCombo');
        loc.setValue(record.get('location_id'));
        var v = this.getVehicleCombo();
        v.setValue(record.get('vehicle'));


    },

    setSummaryBlur: function(field) {
        var summary = field.getRawValue();
        var ad = this.getActivityDetail();
        var activeActivity = ad.getForm().getRecord();
        activeActivity.set('summary', summary);
        var values = ad.getForm().getValues();
        values.push('summary', summary);
        activeActivity.commit();
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
        var ad = this.getActivityDetail();
        var form = ad.getForm();
        var activity = form.getRecord();
        var values = form.getValues();
        activity.set(values);

        var dtstartForm = values['dtstart'];
//        console.log(dtstartForm);
        if (typeof dtstartForm !== 'undefined' && dtstartForm !== null) {
            var dtstartTimeForm = values['dtstart-time'];
            var d = Ext.Date.parse(dtstartForm + ' ' + dtstartTimeForm, 'd.m.Y H.i');
            activity.set('dtstart', d);
        }

        var dtendForm = values['dtend'];
//        console.log(dtstartForm);
        if (typeof dtstartForm !== 'undefined' && dtstartForm !== null) {
            var dtendTimeForm = values['dtend-time'];
            var d = Ext.Date.parse(dtendForm + ' ' + dtendTimeForm, 'd.m.Y H.i');
            activity.set('dtend', d);
        }


//        this.getActivitiesStore().update(activity);
        this.getActivitiesStore().sync();

        activity.commit();

        Ext.Msg.alert('Lagret', activity.get('summary') + ' er lagret.');
    },

    confirmDeleteActivity: function(button) {
        Ext.Msg.confirm('Bekreft sletting', 'Bekreft at du ønsker å slette aktiviteten for godt?', this.deleteActivity, this);
    },

    deleteActivity: function (button) {
        if (button === 'yes') {
            var ad = this.getActivityDetail();
            var form = ad.getForm();
            var record = form.getRecord();
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
        var summary = record.get('summary');
        var ad = this.getActivityDetail();
        //todo få inn sjekk på om bruker har lov å editere aktivitet
        ad.setDisabled(false);
        var di = ad.getDockedItems();
        var tbar = di[0];
//        var tbInfo = tbar.getComponent('tbInfo');
//        tbInfo.setText('Mer informasjon om ' + summary);

        var summaryCmp = this.getSummary();
        summaryCmp.setRawValue(summary);


        ad.loadRecord(record);
        record.set('summary', summary);

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

    changeMinValueForDtend: function(field, newValue) {
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
    selectOrganizer: function(combo, selectedRecords) {
        var ad = combo.up();
        if (ad != null) {
            var activity = ad.getRecord();
            var newId = selectedRecords[0].get('_id');
            var newLocationName = selectedRecords[0].get('name');
            activity.set('organizer_id', newId);
            activity.set('organizer', newLocationName);

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