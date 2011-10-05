Ext.define('NAF.store.Categories', {
    extend: 'Ext.data.Store',
    model: 'NAF.model.Category',
    storeId: 'categoriesStore',
    autoLoad: true,

    proxy: {
//        type: 'ajax',
        type: 'jsonp',
        api: {
            read: 'http://naf.herokuapp.com/categories.json',
//            read: 'data/locations.json',
            update: 'data/updateLocation.json'
        },
        reader: {
            type: 'json',
            root: 'categories',
            successProperty: 'success'
        }
    }

});