function authToken(){
  try{
    return FORM_AUTH_TOKEN;
  }catch(e){
    return ''
  }
}

Ext.define('NAF.controller.Activities', {
    extend: 'Ext.app.Controller',

    stores: ['Accesses','Categories','Locations','Activities','ActivitiesSearch','Vehicles'],
    models: ['Access', 'Category', 'Activity', 'Location', 'Vehicle'],

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
            ref: 'deleteBtn',
            selector: '#removeButton'
        },
        {
            ref: 'saveBtn',
            selector: '#saveButton'
        },
        {
            ref: 'toggleActiveBtn',
            selector: '#toggleActiveButton'
        },
        {
            ref: 'vehicleCombo',
            selector: '#vehicleCombo'
        },
        {
            ref: 'organizerCombo',
            selector: '#organizerCombo'
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
            ref: 'activityImage',
            selector: '#activityImage'
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
            'button[action=save]':{
                click: this.saveActivities
            },
            'button[action=copy]':{
                click: this.copyActivity
            },
            'button[action=delete]':{
                click: this.confirmDeleteActivity
            },
            'button[action=create]':{
                click: this.createActivity
            },
            'activitydetail #uploadBtn':{
                click: this.uploadPhoto
            },
            '#toggleActiveButton':{
                toggle: this.toggleActiveButton
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
                select: this.selectOrganizer,
                expand: this.filterOrganizersByAccess,
                collapse: this.clearLocationsFilter
            },
            'activitylist #activitiesSearchCombo':{
                select: this.selectActivity,
                keyup : this.updateList
            },
            'activitydetail #activitiesSearchComboSummary':{
                blur: this.setSummaryOnBlur
            },
            'activitydetail #vehicleCombo':{
                select: this.selectVehicle
            }
        });
    },

    toggleActiveButton: function(btn) {
        var ad = this.getActivityDetail();
        var form = ad.getForm();
        var activity = form.getRecord();
        var active = activity.get('active');
        btn.toggle(!active, true);
        if (!active) {
            btn.setText('Aktiv');
        } else {
            btn.setText('Inaktiv');
        }
        activity.set('active', !active);
        this.getActivitiesStore().update(activity);
        activity.commit();
    },

    setToggleActiveButtonState: function() {
        var ad = this.getActivityDetail();
        var activity = ad.getForm().getRecord();
        var active = activity.get('active');
        var btn = this.getToggleActiveBtn();
        btn.toggle(active, true);
        if (active) {
            btn.setText('Aktiv');
        } else {
            btn.setText('Inaktiv');
        }
    },

    clearLocationsFilter: function() {
        var locationsStore = this.getLocationsStore();
        locationsStore.clearFilter();
    },

    filterOrganizersByAccess: function () {
        var as = this.getAccessesStore();
        var ls = this.getLocationsStore();
        var accessIds = as.collect('access_id');
        ls.filterBy(function (record, id) {
            if (accessIds.indexOf(id) > -1) return true;
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



    setSummaryOnBlur: function(field) {
        var summary = field.getRawValue();
        var ad = this.getActivityDetail();
        var activeActivity = ad.getForm().getRecord();
        activeActivity.set('summary', summary);
        var values = ad.getForm().getValues();
        values['summary'] = summary;
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
       var win = button.up('activitydetail');
        var form = win.getForm();
        var hasUpload = form.hasUpload();
        var fu = this.getFileUpload();
        var v = fu.getValue();
        var that = this;
        //var form = this.up('form').getForm();
        if(form.isValid()){
            form.submit({
                params: {
                  authenticity_token: authToken()
                },
                url: 'rest/activities/file_upload',
                waitMsg: 'Vent mens bilde lastes opp...',
                success: function(fp, o) {
                    var photo_id = o.result.file._id;
                    var url = o.result.file.photo.medium.url;
                    that.getActivityImage().setSrc(url);
                    form.findField('photo_id').setValue(photo_id);
                    //Ext.Msg.alert('Success', 'Your photo "' + o.result.file + '" has been uploaded.');
                }
            });
        }

    },

    saveActivities: function () {
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


        this.getActivitiesStore().update(activity);
//        this.getActivitiesStore().sync();

        activity.commit();

        Ext.Msg.alert('Lagret', activity.get('summary') + ' er lagret.');
    },

    confirmDeleteActivity: function(button) {
        Ext.Msg.confirm('Bekreft sletting', this.getDeleteConfirmationText(), this.deleteActivity, this);
    },


    getDeleteConfirmationText: function() {
        var ad = this.getActivityDetail();
        var form = ad.getForm();
        var activity = form.getRecord();
        var summary = activity.get('summary');
        return 'Er du sikker på at du ønsker å slette ' + summary + ' for godt?';
    },


    deleteActivity: function (button) {
        if (button === 'yes') {
            var ad = this.getActivityDetail();
            var form = ad.getForm();
            var activity = form.getRecord();
            this.getActivitiesStore().remove(activity);
            var proxy = this.getActivitiesStore().getProxy();
            activity.setProxy(proxy);
            activity.destroy();
            activity.commit();
        }
    },

    copyActivity: function (button) {
        var ad = this.getActivityDetail();
        var form = ad.getForm();
        var originalActivity = form.getRecord();
//        var values = form.getValues();
//        record.set(values);

        var index = this.getActivitiesStore().indexOf(originalActivity);

        var copiedActivity = originalActivity.copy();
//         var id = 'random' + Math.floor(Math.random()*1111111);
        var id = Ext.data.Model.id(copiedActivity);
        copiedActivity.set('_id', id);
        copiedActivity.set('id', id);
        copiedActivity.set('summary', 'Kopi av ' + originalActivity.get('summary'));

        this.getActivitiesStore().insert(index + 1, copiedActivity);
        copiedActivity.commit();
        copiedActivity.setProxy(this.getActivitiesStore().getProxy());
        copiedActivity.save();


//        this.getActivitiesStore().sync();
        this.changeDetail(null, copiedActivity)
    },

    changeDetail: function(grid, record) {
        var ad = this.getActivityDetail();
        var as = this.getAccessesStore();
        var orgIdIdx = as.find('access_id', record.get('organizer_id'))
        var disabled = true;
        if (orgIdIdx >= 0 || as.find('access_id', 'super') > -1) {
            disabled = false;
        }
        ad.setDisabled(disabled);
        this.getDeleteBtn().setDisabled(disabled);
        this.getSaveBtn().setDisabled(disabled);

        var summary = record.get('summary');
        var summaryCmp = this.getSummary();
        summaryCmp.setRawValue(summary);

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

        ad.loadRecord(record);


        var width = 200 + Math.floor(Math.random() * 41);
        var heigth = 100 + Math.floor(Math.random() * 41);
        var src1 = 'http://placehold.it/' + width + 'x' + heigth;

        this.getActivityImage().setSrc(src1);


        var cat = ad.getComponent('categoryCombo');
        cat.setValue(record.get('category_id'));
        var loc = ad.getComponent('locationCombo');
        loc.setValue(record.get('location_id'));
        var v = this.getVehicleCombo();
        v.setValue(record.get('vehicle'));
        var o = this.getOrganizerCombo();
        o.setValue(record.get('organizer_id'));
        this.setToggleActiveButtonState();
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
            this.clearLocationsFilter();
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