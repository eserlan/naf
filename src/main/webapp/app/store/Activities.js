Ext.define('NAF.store.Activities', {
    extend: 'Ext.data.Store',
    model: 'NAF.model.Activity',
    storeId: 'activityStore',
    autoLoad: true,
    pageSize: 25,

    proxy: {
        type: 'rest',
        url: '/aktivitets-admin/rest/activities',

        api: {
            read: 'rest/activities',
            create: 'rest/activities',
            update: 'rest/activities' ,
            delete: 'rest/activities'
        },

        reader: {
            type: 'json',
            root: 'activities',
            successProperty: 'success'
        },
        writer: {
            type: 'json',
            root: 'activities',
            successProperty: 'success',
            writeAllFields: false
        }


    }


});