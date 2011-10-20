Ext.define('NAF.store.Activities', {
    extend: 'Ext.data.Store',
    model: 'NAF.model.Activity',
    storeId: 'activityStore',
    autoLoad: true,
    pageSize: 25,

    proxy: {
        type: 'rest',
        url: '/rest/activities',

        api: {
            read: 'rest/activities',
//            read: 'data/t.json',
            create: 'rest/activities',
            destroy: 'rest/activities',
            update: 'rest/activities'
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