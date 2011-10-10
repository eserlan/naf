Ext.define('NAF.model.Activity', {
    extend: 'Ext.data.Model',
    idProperty: '_id',
    fields: ['_id', 'attendee', 'category_id', 'contact', 'description', 'dtstart', 'dtend',
        'location_id', 'own_vehicle', 'price', 'responsibility', 'summary', 'supervicoer_included', 'tags',
        'url', 'vehicle', 'video', {name: 'location', mapping: 'location.name'}]

});