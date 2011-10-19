Ext.define('NAF.store.Accesses', {
    extend: 'Ext.data.Store',
    model: 'NAF.model.Access',
    storeId: 'accessStore',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url : 'admin/access.json',
        reader: {
            type: 'json'
        }
    }


});