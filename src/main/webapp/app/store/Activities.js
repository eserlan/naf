Ext.define('NAF.store.Activities', {
    extend: 'Ext.data.Store',
    model: 'NAF.model.Activity',
    storeId: 'activityStore',
    autoLoad: true,

    proxy: {
        type: 'ajax',
        api: {
            read: 'data/activities3.json',
            update: 'data/updateActivities.json'
        },
        reader: {
            type: 'json',
            root: 'activities',
            successProperty: 'success'
        }
    }

});