Ext.define('NAF.model.Activity', {
    extend: 'Ext.data.Model',
    fields: ['_id', 'attendee', 'category_id', 'contact', 'description', 'dtstart', 'dtend',
        'location_id', 'own_vehicle', 'price', 'responsibility', 'summary', 'supervicoer_included', 'tags',
        'url', 'vehicle', 'video', {name: 'category', mapping: 'categories[0].name'}, {name: 'location', mapping: 'location.name'}]

});