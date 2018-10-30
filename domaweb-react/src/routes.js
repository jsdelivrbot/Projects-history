// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('./HomePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/login',
      name: 'login',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('Login/containers/Login/reducer'),
          import('Login/containers/Login/sagas'),
          import('Login/containers/Login/'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('login', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },


    {
      path: '/booking',
      name: 'booking',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('./Booking/reducer'),
          import('./Booking/sagas'),
          import('Booking'),

        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('booking', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },

      childRoutes: [
      {
        path: '/booking/timetab/:timetabId',
        name: 'timetab',
        getComponent(nextState, cb) {
          const importModules = Promise.all([
            import('Booking/containers/TimelineCalendar/reducer'),
            import('Booking/containers/TimelineCalendar/sagas'),
            import('Booking/containers/TimelineCalendar/'),

            // load reducer and saga for DomaBooking sub container
            //import('Booking/containers/TimeTab/DomaBooking/reducer'),
            //import('Booking/containers/TimeTab/DomaBooking/sagas'),
            //import('Booking/containers/TimeTab//DomaBooking'),
          ]);

          const renderRoute = loadModule(cb);

          importModules.then(([reducer, sagas, component]) => {
            injectReducer('TimelinePage', reducer.default);
            //injectReducer('DomaBookingPage', domabookingreducer.default);
            //injectSagas(timelinesagas.default);
            injectSagas(sagas.default);
            renderRoute(component);
            //renderRoute(domabookingcomponent);
          });

          importModules.catch(errorLoading);
        },
      },
    ]
    },


    /*{
      path: '/AuthRequired',
      name: 'AuthRequired',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('AuthRequired/reducer'),
          import('AuthRequired/sagas'),
          import('AuthRequired'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('AuthRequired', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },*/
    {
      path: '/logout',
      name: 'Logout',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('Login/containers/Logout/reducer'),
          import('Login/containers/Logout/sagas'),
          import('Login/containers/Logout/'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('Logout', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('./NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
