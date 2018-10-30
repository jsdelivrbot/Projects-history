import React from 'react';
import PropTypes from 'prop-types';
import messages from './messages';
import {FormattedMessage} from 'react-intl';
import AddNewMedicationPopup from '../../../sharedComponents/AddNewMedicationPopup';
import { MdAddCircleOutline } from 'react-icons/lib/md/';
import { MdHistory } from 'react-icons/lib/md';
import { MdPlaylistAddCheck } from 'react-icons/lib/md';
import CheckLogPopup from '../CheckLogPopup';

const iconStyles = { marginLeft: '10px', float: 'right', cursor: 'pointer', fontSize: '0.7em' };
const iconSize = 30;

const IconButton = ({children, text}) => <span style={iconStyles}>{text}{children}</span>

const IconToolBar = () => {
  return (
    <div>
    <FormattedMessage {...messages.header} />
    <AddNewMedicationPopup>
      <IconButton text={<FormattedMessage {...messages.addNew} />}>
        <MdAddCircleOutline size={iconSize} />
      </IconButton>
    </AddNewMedicationPopup>
    <IconButton text={<FormattedMessage {...messages.history} />}>
      <MdHistory size={iconSize} />
    </IconButton>
    <CheckLogPopup>
      <IconButton text={<FormattedMessage {...messages.checkLog} />}>
        <MdPlaylistAddCheck size={iconSize} />
      </IconButton>
    </CheckLogPopup>
    </div>
  );
}

export default IconToolBar;