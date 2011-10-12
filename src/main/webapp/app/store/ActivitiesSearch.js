Ext.define('NAF.store.ActivitiesSearch', {
    extend: 'Ext.data.Store',
    model: 'NAF.model.Activity',
    storeId: 'activitySearchStore',
    autoLoad: false,
    pageSize: 25,

    proxy: {
        type: 'rest',
        url: 'http://localhost:9090/aktivitets-admin/rest/activities',
        api: {
            read: 'rest/activities/search'
        },
        reader: {
            type: 'json',
            root: 'activities',
            successProperty: 'success'
        }


    }


});