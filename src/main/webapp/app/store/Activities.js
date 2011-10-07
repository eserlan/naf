Ext.define('NAF.store.Activities', {
    extend: 'Ext.data.Store',
    model: 'NAF.model.Activity',
    storeId: 'activityStore',
    autoLoad: true,

    proxy: {
//        type: 'ajax',
        type: 'jsonp',
        url: 'http://naf.herokuapp.com/',
//        url: 'http://localhost:9090/aktivits-admin/data/activities3.json',
        api: {
//            read: 'data/activities3.json',
            read: 'http://naf.herokuapp.com/activities.json'
            ,
//            update: 'http://naf.herokuapp.com/activities.json'
//            ,
            update: 'http://naf.herokuapp.com/activities'
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