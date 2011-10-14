Ext.define('NAF.model.Activity', {
    extend: 'Ext.data.Model',
    idProperty: '_id',
    fields: ['_id', 'attendee', 'category_id', 'contact', 'description', 'dtstart', 'dtend',
        'location_id', 'own_vehicle', 'price', 'responsibility', 'summary', 'supervisor_included', 'tags',
        'url', 'vehicle', 'video', {name: 'location', mapping: 'location.name'}, 'active', 'region', 'age_from',
        'age_to', 'political_contact', 'response_result', 'volunteers_involved_count','volunteers_used_count',
        'competence_needs','participants_count','result','potential_improvements','media_title','media_outlet','media_url' ]

});