Ext.define('NAF.store.Locations', {
    extend: 'Ext.data.Store',
    model: 'NAF.model.Location',
    storeId: 'locationStore',
    autoLoad: true,

    proxy: {
        type: 'rest',
        url: 'http://localhost:9090/aktivitets-admin/rest/locations',
        api: {
            read: 'rest/locations'
        },
        reader: {
            type: 'json',
            root: 'locations',
            successProperty: 'success'
        }
    }

});