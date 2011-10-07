Ext.define('NAF.store.Activities', {
    extend: 'Ext.data.Store',
    model: 'NAF.model.Activity',
    storeId: 'activityStore',
    autoLoad: true,

    proxy: {
//        type: 'ajax',
        type: 'rest',
        url: 'http://localhost:9090/aktivitets-admin/rest/activities',
        api: {
//            read: 'data/activities3.json',
            read: 'rest/activities'
            ,
//            update: 'http://naf.herokuapp.com/activities.json'
//            ,
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