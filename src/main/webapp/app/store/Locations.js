Ext.define('NAF.store.Locations', {
    extend: 'Ext.data.Store',
    model: 'NAF.model.Location',
    storeId: 'locationStore',
    autoLoad: true,

    proxy: {
//        type: 'ajax',
        type: 'jsonp',
        api: {
            read: 'http://naf.herokuapp.com/locations.json',
//            read: 'data/locations.json',
            update: 'data/updateLocation.json'
        },
        reader: {
            type: 'json',
            root: 'locations',
            successProperty: 'success'
        }
    }

});