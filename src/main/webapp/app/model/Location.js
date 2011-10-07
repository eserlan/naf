Ext.define('NAF.model.Location', {
    extend: 'Ext.data.Model',
    idProperty: '_id',
    fields: ['_id', 'latitude', 'longitude', 'name'],
    belongsTo: 'NAF.model.Activity'
});

