Ext.define('NAF.model.Category', {
    extend: 'Ext.data.Model',
    fields: ['_id', 'name'],
    belongsTo: 'NAF.model.Activity'
});

