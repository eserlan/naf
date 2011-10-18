Ext.define('NAF.store.Activities', {
    extend: 'Ext.data.Store',
    model: 'NAF.model.Activity',
    storeId: 'activityStore',
    autoLoad: true,
    pageSize: 25,

//    sorters: [
//        {
//            sorterFn: function(o1, o2) {
//                console.log('sorting');
//                var locationId1 = o1.get('location_id');
//                var locationId2 = o2.get('location_id');
//
//                var findLocationName = function(value) {
//                    var store = Ext.getStore('Locations');
//                    var location = store.getById(value);
//                    return location.get('name');
//                }
//
//                var locName1= findLocationName(locationId1);
//                var locName2= findLocationName(locationId2);
//
//                if (locName1 === locName2) {
//                    return 0;
//                }
//
//                return locName1 < locName2 ? -1 : 1;
//            }
//        }
//    ],

    proxy: {
        type: 'rest',
//        url: '/aktivitets-admin/rest/activities',

        api: {
            read: 'rest/activities',
            create: 'rest/activities',
            update: 'rest/activities',
            delete: 'rest/activities'
        },

        reader: {
            type: 'json',
            root: 'activities',
            successProperty: 'success'
        },
        writer: {
            type: 'json',
            root: 'activities',
            successProperty: 'success',
            writeAllFields: false
        }


    }


});