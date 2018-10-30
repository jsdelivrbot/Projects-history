import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { Button } from 'components';
import { Checkbox } from 'antd';
import { channelItem } from 'styles/settings.scss';

const mapDispatchToProps = {
  push
};

export class ChannelItem extends Component {
  handleCheckedChange = (e) => {
    const { checked } = e.target;
    this.props.onChannelUpdate(this.props.channel.id, checked);
  }

  handleRedirectToChannelConfig = () => {
    this.props.push(`/settings/sales/channels/${this.props.channel.id}/${this.props.channel.name}`);
  }

  render() {
    const { channel } = this.props;

    return (
      <div className={ channelItem }>
        <div>
          <Checkbox
            checked={ channel.isActive }
            onChange={ this.handleCheckedChange }
          >
            Enabled
          </Checkbox>
        </div>
        <div>
          { channel.name }
        </div>
        <div>
          <Button
            disabled={ !channel.isActive }
            onClick={ this.handleRedirectToChannelConfig }
          >
            Configure
          </Button>
        </div>
      </div>
    );
  }
}

ChannelItem.propTypes = {
  // data
  channel: PropTypes.object.isRequired,
  // func
  onChannelUpdate: PropTypes.func.isRequired,
  // react router
  push: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(ChannelItem);
