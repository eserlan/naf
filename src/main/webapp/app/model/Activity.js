Ext.define('NAF.model.Activity', {
    extend: 'Ext.data.Model',
    idProperty: '_id',
    fields: [
        {name: '_id', persist: false},
        'attendee',
        'category_id',
        'contact',
        'contact_name',
        'contact_email',
        'contact_phone',
        'description',
        {name: 'dtstart', type:'date'},
        {name: 'dtstart-time', type:'date', persist: false},
        {name: 'dtend', type:'date'},
        {name: 'dtend-time', type:'date', persist: false},
        'own_vehicle',
        'price',
        'member_price',
        'free',
        'mva',
        'responsibility',
        'summary',
        'supervisor_included',
        'tags',
        'url',
        'vehicle',
        'video',
        'photo_id',
        'photo_medium_url',
        'photo_large_url',
        'photo_thumb_url',
        'location_id',
        {name: 'location', convert: location, persist: false},
        'address',
        'organizer_id',
        {name: 'organizer', mapping: 'organizer.name', persist: false},
        'active',
        'region',
        'age_from',
        'age_to',
        'political_contact',
        'response_result',
        'volunteers_involved_count',
        'volunteers_used_count',
        'competence_needs',
        'participants_count',
        'result',
        'potential_improvements',
        'media_title',
        'media_outlet',
        'media_url'
    ]

});

function location(v) {
    if (v.latitude != null) {
        return v.name;
    } else {
        return v;
    }

}