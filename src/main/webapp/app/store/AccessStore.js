Ext.define('NAF.store.AccessStore', {
    extend: 'Ext.data.Store',
    model: 'NAF.model.Access',
    storeId: 'accessStore',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url : 'data/access.json',
        reader: {
            type: 'json'
        }
    }


});