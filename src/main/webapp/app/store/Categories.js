Ext.define('NAF.store.Categories', {
    extend: 'Ext.data.Store',
    model: 'NAF.model.Category',
    storeId: 'categoriesStore',
    autoLoad: true,

    proxy: {
        type: 'rest',
        url: 'http://localhost:9090/aktivitets-admin/rest/categories',
        api: {
            read: 'rest/categories'
        },
        reader: {
            type: 'json',
            root: 'categories',
            successProperty: 'success'
        }
    }

});