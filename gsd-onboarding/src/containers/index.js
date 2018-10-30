import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import {
  SideNav,
  NextButton,
  WelcomePage
} from '../components';
import TopNavButtons from './TopNavButtons/TopNavButtons';
import RedirectPage from './RedirectPage/RedirectPage';
import Step1 from './Step1/Step1';
import Step2 from './Step2/Step2';
import Step3 from './Step3/Step3';
import Step4 from './Step4/Step4';
import Step5 from './Step5/Step5';
import Step6 from './Step6/Step6';
import Step7 from './Step7/Step7';
import Complete from './Complete/Complete';
import * as actions from '../reduxBase/actions/actions';

const routes = [
  { path: '/onboarding/',
    exact: true,
    main: () => <RedirectPage />,
  },
  { path: '/onboarding/:userid/step1',
    exact: true,
    main: () => <Step1 />,
  },
  { path: '/onboarding/:userid/step2',
    exact: true,
    main: () => <Step2 />,
  },
  { path: '/onboarding/:userid/step3',
    exact: true,
    main: () => <Step3 />,
  },
  { path: '/onboarding/:userid/step4',
    exact: true,
    main: () => <Step4 />,
  },
  { path: '/onboarding/:userid/step5',
    exact: true,
    main: () => <Step5 />,
  },
  { path: '/onboarding/:userid/step6',
    exact: true,
    main: () => <Step6 />,
  },
  { path: '/onboarding/:userid/step7',
    exact: true,
    main: () => <Step7 />,
  },
  { path: '/onboarding/:userid/complete',
    exact: true,
    main: () => <Complete />,
  },
];

class RootApp extends Component {
  constructor(props) {
    super(props);

    this.startRedirect = this.startRedirect.bind(this);

    this.state = {
      redirect: false,
    }
  }

  componentDidMount() {
    this.props.getUserId();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.userId.length === 0) {
      this.props.createUserId();
    }
  }

  startRedirect() {
    this.setState({ redirect: true });
  }

  render() {
    const { path, userId } = this.props;
    const currentRoute = path[path.length - 1];
    return (
      <Router>
        <MuiThemeProvider>
          <div>
            { !this.state.redirect && <WelcomePage startRedirect={ this.startRedirect } userId={ userId.userId }/> }
            { this.state.redirect && <div className="container-fluid wrapper">
              <div className="row">
                <div className="col-md-2">
                  <SideNav userId={ userId.userId } currentRoute={ currentRoute } />
                </div>
                <div className="col-md-10">
                  <TopNavButtons />
                  <div className="view-container">
                  {
                    routes.map((route, index) => (
                      <Route
                        key={ index }
                        path={ route.path }
                        exact={ route.exact }
                        component={ route.main }
                      />
                    ))
                  }
                  </div>
                  { currentRoute !== `/onboarding/${ userId.userId }/step7` &&
                    currentRoute !== `/onboarding/${ userId.userId }/complete` &&
                    <NextButton currentRoute={ currentRoute } text="Next" />
                  }
                  {currentRoute === `/onboarding/${ userId.userId }/step7` &&
                    <NextButton currentRoute={ currentRoute } text="Finish" />
                  }
                </div>
              </div>
            </div>
            }
          </div>
       </MuiThemeProvider>
      </Router>
  )}
}

RootApp.propTypes = {
  location: PropTypes.object,
  getUserId: PropTypes.func,
  createUserId: PropTypes.func,
  userId: PropTypes.object,
  path: PropTypes.array,
};

export default connect(
  state => ({
     userId: state.userIdReducer,
     path: state.pathToStoreReducer
  }),
  dispatch => bindActionCreators(actions, dispatch))(RootApp);
