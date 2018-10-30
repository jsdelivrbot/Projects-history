import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { PageHeader } from 'components';
import { Tabs, ConnectedMainTab } from './Tabs';

export class Bundle extends Component {
  constructor(props) {
    super(props);
    const bundleId = props.match.params.id;
    const isNewBundle = bundleId === 'new';

    this.state = {
      bundleId,
      isNewBundle
    };
  }

  componentWillReceiveProps(nextProps) {
    const bundleId = nextProps.match.params.id;
    const isNewBundle = bundleId === 'new';

    this.setState({
      bundleId,
      isNewBundle
    });
  }

  render() {
    const {
      bundleId,
      isNewBundle
    } = this.state;

    return (
      <div>
        { isNewBundle &&
          <PageHeader
            bigText="Item Bundles"
          />
        }
        { isNewBundle &&
          <ConnectedMainTab
            isNewBundle={ isNewBundle }
          />
        }
        { !isNewBundle &&
          <Tabs
            bundleId={ bundleId }
            isNewBundle={ isNewBundle }
          />
        }
      </div>
    );
  }
}

Bundle.propTypes = {
  // router
  match: PropTypes.object.isRequired,
};

export default withRouter(Bundle);
