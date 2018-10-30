import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'components';
import styles from './Controls.scss';

const Controls = ({
  saveButtonVisible = false,
  cancelButtonVisible = true,
  submitButtonVisible = false,
  updateButtonVisible = false,
  submitButtonText = 'Save',
  saveButtonText = 'Save',
  updateButtonText = 'Update',
  cancelButtonText = 'Cancel',
  onCancelButtonClick,
  onSaveButtonClick,
  onUpdateButtonClick
}) => (
  <div className={ styles.buttons }>
    { cancelButtonVisible &&
      <Button
        className={ styles.cancelButton }
        onClick={ onCancelButtonClick }
      >
        { cancelButtonText }
      </Button>
    }
    { updateButtonVisible &&
      <Button
        onClick={ onUpdateButtonClick }
        className={ styles.updateButton }
      >
        { updateButtonText }
      </Button>
    }
    { saveButtonVisible &&
      <Button
        className={ styles.saveButton }
        onClick={ onSaveButtonClick }
      >
        { saveButtonText }
      </Button>
    }
    { submitButtonVisible &&
      <Button
        type="submit"
        className={ styles.saveButton }
      >
        { submitButtonText }
      </Button>
    }
  </div>
);

Controls.propTypes = {
  saveButtonVisible: PropTypes.bool,
  saveButtonText: PropTypes.string,
  onSaveButtonClick: PropTypes.func,
  submitButtonVisible: PropTypes.bool,
  submitButtonText: PropTypes.string,
  updateButtonVisible: PropTypes.bool,
  updateButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string,
  onUpdateButtonClick: PropTypes.func,
  cancelButtonVisible: PropTypes.bool,
  onCancelButtonClick: PropTypes.func
};

export default Controls;
