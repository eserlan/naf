Ext.define('NAF.store.Regions', {
    extend: 'Ext.data.Store',
    model: 'NAF.model.Region',
    storeId: 'regionStore',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url : 'data/regions.json',
        reader: {
            type: 'json'
        }
    }


});