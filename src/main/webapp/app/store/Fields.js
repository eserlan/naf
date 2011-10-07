Ext.define('NAF.store.Fields', {
    extend: 'Ext.data.Store',
    model: 'NAF.model.Field',
    storeId: 'fieldStore',
    autoLoad: true,

    proxy: {
//        type: 'ajax',
        type: 'jsonp',
        api: {
            read: 'http://naf.herokuapp.com/activities/fields.json'
//            ,
//            read: 'data/locations.json',
//            update: 'data/updateLocation.json'
        },
        reader: {
            type: 'json',
            successProperty: 'success'
        }
    }

});