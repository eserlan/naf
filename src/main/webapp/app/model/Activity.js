Ext.define('NAF.model.Activity', {
    extend: 'Ext.data.Model',
    idProperty: '_id',
    fields: [
        {name: '_id', persist: false},
        'attendee',
        'traffic_safety',
        'category_id',
        'contact',
        'contact_name',
        'contact_email',
        'contact_phone',
        'description',
        {name: 'dtstart', type: 'date', dateFormat: 'c'},
        {name: 'dtstart-time', type: 'date', dateFormat: 'c', persist: false},
        {name: 'dtend', type: 'date', dateFormat: 'c'},
        {name: 'dtend-time', type: 'date', dateFormat: 'c', persist: false},
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
        {name: 'photo_medium_url', persist: false},
        {name: 'photo_large_url', persist: false},
        {name: 'photo_thumb_url', persist: false},
        'location_id',
        {name: 'location', convert: function (v) {
            'use strict';
            var res = "må settes";
            if (v.latitude != null) {
                res = v.name;
            } else if (v != null){
                res = v;
            }
            return res;
        }, persist: false},
        'organizer_id',
        {name: 'organizer', mapping: 'organizer.name', persist: false},
        'address',
        'active',
        {name: 'region', persist: false},
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
