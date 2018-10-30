import {getFormatedDate} from '../../utils/dateUtil.js';

const list = {
    /* user: {
        state : 'user',
          url : '/user',
         text : 'User Name',
    },*/
    tasks : {
        state : 'tasks',
          url : `/tasks/${getFormatedDate(new Date())}`,
         text : 'Tasks',
    },
  /*    booking : {
        state : 'booking',
           url: '/booking',
          text: 'Booking',
    },
    customers : {
        state : 'customers',
          url : '/customers',
         text : 'Customers',
    },

    wallet : {
       state : 'wallet',
         url : '/wallet',
        text : 'Wallet',
    },

    calendar : {
       state : 'calendar',
         url : '/calendar',
        text : 'Calendar',
    },

     message : {
       state : 'messages',
         url : '/messages',
        text : 'Messages',
    },

    settings : {
       state : 'settings',
         url : '/settings',
        text : 'Settings',
    },*/

     logout : {
      state : 'logout',
        url : '/logout',
       text : 'Logout',
    }
}

export default list;
