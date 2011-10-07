Ext.define('NAF.model.Category', {
    extend: 'Ext.data.Model',
    idProperty: '_id',
    fields: ['_id', 'name'],
    belongsTo: 'NAF.model.Activity'
});

