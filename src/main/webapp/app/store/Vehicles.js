Ext.define('NAF.store.Vehicles', {
    extend: 'Ext.data.Store',
    model: 'NAF.model.Vehicle',
    storeId: 'vehicleStore',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url : 'data/vehicles.json',
        reader: {
            type: 'json'
        }
    }


});