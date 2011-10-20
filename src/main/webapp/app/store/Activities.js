//grabs auth-token if it exsists
function authToken(){
  try{
    return FORM_AUTH_TOKEN;
  }catch(e){
    return ''
  }
}

Ext.define('NAF.store.Activities', {
    extend: 'Ext.data.Store',
    model: 'NAF.model.Activity',
    storeId: 'activityStore',
    autoLoad: true,
    pageSize: 25,

    proxy: {
        type: 'rest',
        url: '/rest/activities',
        extraParams: {
          authenticity_token: authToken()
        },
        api: {
            read: 'rest/activities',
//            read: 'data/t.json',
            create: 'rest/activities',
            destroy: 'rest/activities',
            update: 'rest/activities'
        },

        reader: {
            type: 'json',
            root: 'activities',
            successProperty: 'success'
        },
        writer: {
            type: 'json',
            root: 'activity',
            successProperty: 'success',
            writeAllFields: false
        }
    }


});