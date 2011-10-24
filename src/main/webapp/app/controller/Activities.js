function authToken() {
    try {
        return FORM_AUTH_TOKEN;
    } catch(e) {
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
            ref: 'activityList',
            selector: 'activitylist'
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
            selector: '#summary'
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
//                ,
//                beforeselect: this.changeDetailCheck
            },
            'button[action=save]':{
                click: this.saveActivity
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
            'activitydetail timefield':{
                change : this.updateTime
            },
            'activitydetail datefield':{
                change : this.updateDate
            },
            'activitydetail #locationCombo':{
                select: this.selectLocation
            },
            'activitydetail #organizerCombo':{
                select: this.selectOrganizer,
                expand: this.filterOrganizersComboByAccess,
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

    updateTime: function(field, newValue) {
        var id = field.getId();
        var win = field.up('activitydetail');
        var form = win.getForm();
        var record = form.getRecord();
        record.set(id, newValue);

        var dtid = id.replace('-time', '');
        var dt = record.get(dtid);

        if (typeof dt !== 'undefined' && dt !== null) {
            var d = null;
            d = Ext.Date.parse(Ext.Date.format(dt, 'd.m.Y') + ' ' + Ext.Date.format(newValue, 'H.i'), 'd.m.Y H.i');
            record.set(dtid, d);
        }
        record.commit();
    },

   updateDate: function(field, newValue) {
        var id = field.getId();
        var win = field.up('activitydetail');
        var form = win.getForm();
        var record = form.getRecord();
        record.set(id, newValue);

        var dtid = id + '-time';
        var dt = record.get(dtid);

        if (typeof dt !== 'undefined' && dt !== null) {
            var d = null;
            d = Ext.Date.parse(Ext.Date.format(newValue, 'd.m.Y') + ' ' + Ext.Date.format(dt, 'H.i'), 'd.m.Y H.i');
            record.set(id, d);
        }
        record.commit();
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

    filterOrganizersComboByAccess: function () {
        var as = this.getAccessesStore();
        if (as.find('access_id', 'super') == -1) {
            var accessIds = as.collect('access_id');
            var ls = this.getLocationsStore();
            ls.filterBy(function (record, id) {
                if (accessIds.indexOf(id) > -1) return true;
            });
        }
    },

    createActivity: function() {
        var ad = this.getActivityDetail();
        var activity = Ext.create('NAF.model.Activity');
        var as = this.getActivitiesStore();
//        activity.set('summary', 'Aktivitetsnavn må være utfylt.');
        activity.set('dtstart', new Date());
        activity.set('dtend', new Date());
        ad.setDisabled(false);
        activity.commit();
        as.add(activity);
        var al = this.getActivityList();
        al.getSelectionModel().select(activity);
        ad.getForm().loadRecord(activity);
    },



    setSummaryOnBlur: function(field) {
        var summary = field.getRawValue();
        var ad = this.getActivityDetail();
        var activeActivity = ad.getForm().getRecord();
        activeActivity.set('summary', summary);
        var values = ad.getForm().getValues();
        values.summary = summary;
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
        if (form.isValid()) {
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



    saveActivity: function () {
        var ad = this.getActivityDetail();
        var form = ad.getForm();
        var activity = form.getRecord();
        var values = form.getValues();
        activity.set(values);

        var dtstartForm = values['dtstart'];

        var ds = null, de = null;
        if (typeof dtstartForm !== 'undefined' && dtstartForm !== null) {
            var dtstartTimeForm = values['dtstart-time'];
            ds = Ext.Date.parse(dtstartForm + ' ' + dtstartTimeForm, 'd.m.Y H.i');
            ds = Ext.Date.add(ds, Ext.Date.HOUR, -2);
            activity.set('dtstart', ds);
            activity.set('dtstart-time', dtstartTimeForm);
        }

        var dtendForm = values['dtend'];
        if (typeof dtstartForm !== 'undefined' && dtstartForm !== null) {
            var dtendTimeForm = values['dtend-time'];
            de = Ext.Date.parse(dtendForm + ' ' + dtendTimeForm, 'd.m.Y H.i');
            de = Ext.Date.add(de, Ext.Date.HOUR, -2);
            activity.set('dtend', de);
            activity.set('dtend-time', dtendTimeForm);
        }

        var as = this.getActivitiesStore();
        as.sync();

        activity.set('dtstart', Ext.Date.add(ds, Ext.Date.HOUR, 2));
        activity.set('dtend', Ext.Date.add(de, Ext.Date.HOUR, 2));

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
    }
    ,
    getSummaryText: function(activity) {
        return activity.get('summary');
    },


    deleteActivity: function (button) {
        if (button === 'yes') {
            var ad = this.getActivityDetail();
            var form = ad.getForm();
            var activity = form.getRecord();
//            var proxy = this.getActivitiesStore().getProxy();
//            activity.setProxy(proxy);
//            activity.destroy();
            activity.commit();
            var as = this.getActivitiesStore();
            var index = as.indexOf(activity);
            as.remove(activity);
            as.sync();
            if (index > -1) {
                var previousActivity = as.getAt(index - 1);
                var al = this.getActivityList();
                al.getSelectionModel().select(previousActivity);
                this.changeDetail(null, previousActivity);
            }
        }
    },

    copyActivity: function (button) {
        var ad = this.getActivityDetail();
        var form = ad.getForm();
        var originalActivity = form.getRecord();

        var as = this.getActivitiesStore();
        var index = as.indexOf(originalActivity);

        var copiedActivity = originalActivity.copy();
        var id = Ext.data.Model.id(copiedActivity);
        copiedActivity.set('_id', id);
        copiedActivity.set('id', id);
        copiedActivity.set('summary', 'Kopi av ' + originalActivity.get('summary'));

        as.insert(index + 1, copiedActivity);

        var start = copiedActivity.get('dtstart');
        var dtstartPlus2Hours = Ext.Date.add(start, Ext.Date.HOUR, -2);
        copiedActivity.set('dtstart', dtstartPlus2Hours);
        var end = copiedActivity.get('dtend');
        var dtendPluss2Hours = Ext.Date.add(end, Ext.Date.HOUR, -2);
        copiedActivity.set('dtend', dtendPluss2Hours);

        copiedActivity.commit();
        as.sync();

        as.load({
            scope   : this,
            callback: function(records, operation, success) {
                var al = this.getActivityList();
                var a = records[index+1];
                al.getSelectionModel().select(a);
            }
        });
    },

    changeDetailCheck: function(grid, activity) {

        console.log('endret: ' + activity.dirty);


        Ext.Msg.show({
            title:'Lagre endringer?',
            msg: this.getSummaryText(activity) + ' er endret. Lagre før du velger ny aktiviet?',
            callback: this.saveActivityConfirm,
            buttons: Ext.Msg.YESNOCANCEL,
            icon: Ext.Msg.QUESTION
        });

//        return !activity.dirty;

        return true;
    },

    saveActivityConfirm: function(btn) {
        if (btn = 'yes') {
            console.log('da lagrer vi');

            return true;
        }
        return false;
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

        var photoUrl = record.get('photo_medium_url');
//        console.log(photoUrl);
        this.getActivityImage().setSrc(photoUrl);


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
//        var summaryCmp = this.getSummary();
//        summaryCmp.setRawValue(summary);
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
            var loc = activity.get('location');
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