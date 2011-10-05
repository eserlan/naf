Ext.define('NAF.model.Location', {
    extend: 'Ext.data.Model',
    fields: ['_id', 'latitude', 'longitude', 'name'],
    belongsTo: 'NAF.model.Activity'
});

