Ext.define('NAF.store.Locations', {
    extend: 'Ext.data.Store',
    model: 'NAF.model.Location',
    storeId: 'locationStore',
    autoLoad: true,

    proxy: {
        type: 'ajax',
        api: {
            read: 'data/locations.json',
            update: 'data/updateLocation.json'
        },
        reader: {
            type: 'json',
            root: 'locations',
            successProperty: 'success'
        }
    }

});