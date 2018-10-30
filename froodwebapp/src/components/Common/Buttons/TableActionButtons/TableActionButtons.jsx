import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'components';
import {
  editBtn,
  saveBtn,
  deactivateBtn,
  activateBtn,
  deleteBtn,
  confirmButton,
  confirmedButton,
  customBtn
} from './TableActionButtons.scss';

const TableActionButtons = ({
  record,
  editButtonVisible = true,
  saveButtonVisible = false,
  updateButtonVisible = false,
  deleteButtonVisible = false,
  activateButtonVisible = false,
  confirmButtonVisible = false,
  confirmedButtonVisible = false,
  customButtonVisible = false,
  handleEdit,
  handleSave,
  handleUpdate,
  handleActivate,
  handleDeactivate,
  handleConfirm,
  handleCustomClick,
  customButtonText
}) => (
  <div>
    { editButtonVisible &&
      <Button
        id={ record.id }
        onClick={ handleEdit }
        className={ editBtn }
      >
        Edit
      </Button>
    }
    { saveButtonVisible &&
      <Button
        id={ record.id }
        onClick={ handleSave }
        className={ saveBtn }
      >
        Save
      </Button>
    }
    { updateButtonVisible &&
      <Button
        id={ record.id }
        onClick={ handleUpdate }
        className={ saveBtn }
      >
        Update
      </Button>
    }
    { activateButtonVisible && record.isActive &&
      <Button
        id={ record.id }
        onClick={ handleDeactivate }
        className={ deactivateBtn }
      >
        Deactivate
      </Button>
    }
    { activateButtonVisible && !record.isActive &&
      <Button
        id={ record.id }
        onClick={ handleActivate }
        className={ activateBtn }
      >
        Activate
      </Button>
    }
    { deleteButtonVisible &&
      <Button
        id={ record.id }
        onClick={ handleDeactivate }
        className={ deleteBtn }
      >
        Delete
      </Button>
    }
    { confirmButtonVisible &&
      <Button
        id={ record.id }
        className={ confirmButton }
        onClick={ handleConfirm }
      >
        Confirm
      </Button>
    }
    { confirmedButtonVisible &&
      <Button
        id={ record.id }
        className={ confirmedButton }
      >
        Confirmed
      </Button>
    }
    { customButtonVisible &&
      <Button
        id={ record.id }
        onClick={ handleCustomClick }
        className={ customBtn }
      >
        { customButtonText }
      </Button>
    }
  </div>
);

TableActionButtons.propTypes = {
  record: PropTypes.object.isRequired,
  editButtonVisible: PropTypes.bool,
  saveButtonVisible: PropTypes.bool,
  updateButtonVisible: PropTypes.bool,
  deleteButtonVisible: PropTypes.bool,
  activateButtonVisible: PropTypes.bool,
  confirmButtonVisible: PropTypes.bool,
  confirmedButtonVisible: PropTypes.bool,
  customButtonVisible: PropTypes.bool,
  handleEdit: PropTypes.func,
  handleSave: PropTypes.func,
  handleUpdate: PropTypes.func,
  handleActivate: PropTypes.func,
  handleDeactivate: PropTypes.func,
  handleConfirm: PropTypes.func,
  handleCustomClick: PropTypes.func,
  customButtonText: PropTypes.string
};

export default TableActionButtons;
