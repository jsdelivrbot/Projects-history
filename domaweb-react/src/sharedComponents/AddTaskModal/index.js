import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import {
  Row,
  Col,
  Modal,
  Button,
  FormGroup,
  ControlLabel,
} from 'react-bootstrap';
import { Form, Field } from 'react-final-form';
import
  ToastrContainer, {
  Toast,
  ToastDanger,
} from 'react-toastr-basic';
import messages from './messages';
import Select from 'react-select'

import Icon from 'react-icons-kit';
import { spinner } from 'react-icons-kit/fa/spinner';
import { cross } from 'react-icons-kit/icomoon/cross';

import { loadCustomers, taskAdd, taskAddCompleted, loadAvailableService,
  loadTaskTypes, lazyLoadCustomers } from './actions';
import { customersListSelector, taskTypesSelector, taskAddStatusSelector,
  taskSaveBtnSelector, availableServiceSelector, isTaskTypeLoadingSelector,
  newTaskTypesSelector, isAvLoadingSelector } from './selectors';

import { getformatedTimeDuration } from '../../utils/dateUtil';
import DomaDatePicker from '../DomaDatePicker/';
import DomaTimePicker from '../DomaTimePicker/';
import HeaderLabel from '../HeaderLabel';
import Spinner from '../Spinner';
import RealTimeFrame from './RealTimeFrame';
import styles from './AddTaskModal-styles.scss';
//import 'react-select/dist/react-select.css';

const onSubmit = async values => {
};


const shortid = require('shortid');

// default variables
const currentStartTime = moment().format('HH:mm');
const currentEndTime = moment().add('hours', 1).format('HH:mm');

// Reusable Error component
const Error = ({ name }) => (
  <Field
    name={name}
    subscription={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) =>
      touched && error
        ?
          <span className={styles.error}>
            {error}<br/><br/>
          </span>
        :
          null
    }
  />
);

// const ReactSelectAdapter = ({ input, ...rest }) => (
//   <Select {...input} {...rest} searchable />
// )

class AddTaskModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(`${this.props.startDate}${'T'}${currentStartTime}`).format('YYYY-MM-DDTHH:mm'),
      endDate: moment(`${this.props.endDate}${'T'}${currentEndTime}`).format('YYYY-MM-DDTHH:mm'),
      customerId: this.props.customerId || null,
      saveBtnStatus: this.props.taskAddBtn,
      employeeId: this.props.employeeId,
      connectionStatus: null
    };
  }

  // loadCustomers once component is mounted
  componentWillMount() {
    if(this.props.customerId) {
      this.props.loadTaskTypes();
    }
    else {
      this.props.loadCustomers();
      this.props.lazyLoadCustomers();
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      taskAddStatus,
      show,
      onClose,
      taskAddBtn,
      customerId,
    } = this.props;

    // check props for taskAddBtn
    if (taskAddBtn !== nextProps.taskAddBtn) {
      this.setState({ saveBtnStatus: nextProps.taskAddBtn })
    }

    // show task toastr (success/error)
    if ((taskAddStatus !== nextProps.taskAddStatus) && show) {
      if (nextProps.taskAddStatus === 'success') {
        Toast(<FormattedMessage {...messages.addtasksuccess} />);
        this.props.taskAddCompleted();
        this.props.addTaskSuccesshandler();
        clearInterval(this.interval);
        onClose();
      } else if (nextProps.taskAddStatus === 'failed') {
        this.props.taskAddCompleted();
        ToastDanger(<FormattedMessage {...messages.addtaskerror}/>);
      }
    }
  }

  // AddTask handler
  handleTaskAdd = (values, errors) => {
    if (errors.itemTypeId || errors.customerId) {
      ToastDanger(<FormattedMessage {...messages.addtaskerror}/>);
    }

    else {
      const plannedStartTime = this.state.startDate;
      const plannedEndTime = this.state.endDate
      const payload = {...values, plannedStartTime, plannedEndTime};
      this.props.taskAdd(payload)
    }
  }

  // get plannedStartTime and plannedEndTime from RealTimeFrame component
  // and make payload ready for handTaskAdd
  dateHandler = (payload) => {
    if (payload) {
      this.setState({startDate: payload.plannedStartTime, endDate: payload.plannedEndTime})
    }
  }

  handleCancel = () => {
    this.props.onClose();
  }

  // get ID of customer from select dropdown and then dispatch action to load
  // availableservices
  customerHandler = (id) => {
    this.props.loadAvailableService(id);
  }


  render() {
    const { customers, tasktypes, availableservices } = this.props;

    //  tasktype select dropdown component
    const TaskTypeSelectWrapper = ({
      name,
      data,
      defaultOptionText,
     }) => (
       <div className={styles.select}>
         <Field name={name} component="select" className={styles.select} >
           <option
            value="-"
            key={shortid.generate()}
          >
            {defaultOptionText}
          </option>
           {data.map(item => (
             <option
               value={item.id}
               key={shortid.generate()}
             >
               {item.firstName ? `${item.lastName} ${item.firstName }` : item.name}
             </option>
           ))}
         </Field>
         <div className={styles.select__arrow} />
       </div>
    )

    return (
      <div>
        <ToastrContainer />
        <Modal show={this.props.show} onHide={this.handleCancel} animation={true}
          bsSize="large" aria-labelledby="contained-modal-title-lg">
          <Modal.Header className={styles.modal__header} >
            <Modal.Title>{<FormattedMessage {...messages.addnewtask}/> }</Modal.Title>
            <Icon size={10} icon={cross} className={styles.cancel__icon} onClick={this.handleCancel}/>
          </Modal.Header>
          <Modal.Body className={styles.modal__content}>
            {customers || tasktypes ?
            <Form
              initialValues={{
                employeeId: this.state.employeeId,
                itemState: 'UNCONFIRMED',
                customerId: this.state.customerId

              }}
              onSubmit={onSubmit}
              validate={values => { // validate customer and tasktype fields
                const errors = {};
                if (this.state.customerId === null && (!values.customerId || values.customerId === '-' )) {
                  errors.customerId = <FormattedMessage {...messages.fieldMandatory}/>;
                }
                if (!values.itemTypeId || values.itemTypeId === '-') {
                  errors.itemTypeId = <FormattedMessage {...messages.fieldMandatory}/>;
                }
                return errors
              }}
              render={({
                handleSubmit,
                values,
                pristine,
                submitting,
                invalid,
                errors,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className={styles.content__section}>
                    <RealTimeFrame
                      startDate={this.props.startDate}
                      endDate={this.props.endDate}
                      dateHandler={this.dateHandler}
                    />

                  <Row className={styles.row_content}>
                    <FormattedMessage {...messages.customerLabel}>
                      {customerLabel => (
                        <HeaderLabel headercolor='#02adf5' labeltext={customerLabel} />
                      )}
                    </FormattedMessage>
                        {this.props.customerId ?
                          <div>
                            <h1 className={styles.customername}>{this.props.customerName}</h1>
                            <h3 className={styles.phonenum}>{this.props.phoneNum}</h3>
                            <h4 className={styles.unitname}>{this.props.unitName}</h4>
                          </div>
                        :
                        <Col xs={12} sm={12} md={4} >
                          <FormGroup controlId="formControlsSelect" className={styles.formGroup}>
                              <Field name="customerId" style={errors.customerId ? 'border-color: 1px solid #35AEEF;;' : null} >
                                  {({input, meta}) => {
                                    const { onChange } = input
                                    const mergedOnChange = e => {
                                      this.customerHandler(e.target.value)
                                      onChange(e);
                                    }
                                    const newInput = { ...input, onChange: mergedOnChange }
                                    return (

                                      <div className={styles.select}>
                                        <select className={styles.select} {...newInput}>
                                          <option
                                            value="-"
                                          >
                                          {<FormattedMessage {...messages.selectcustomers}>
                                            {selectcustomers => (
                                              selectcustomers
                                            )}
                                          </FormattedMessage>}

                                        </option>
                                          {this.props.customers.map(item => (
                                            <option
                                              value={item.id}
                                              key={item.id}
                                            >
                                              {`${item.lastName} ${item.firstName }`}
                                            </option>
                                          ))}
                                        </select>
                                        <div className={styles.select__arrow} />
                                      </div>
                                    )
                                  }}
                              </Field>
                          </FormGroup>
                          <Error name="customerId" />
                        </Col>
                      }
                    </Row>

                    <Row className={styles.row_content}>
                      <FormattedMessage {...messages.tasktypes}>
                        {tasktypes => (
                          <HeaderLabel headercolor='#02adf5' labeltext={tasktypes} />
                        )}
                      </FormattedMessage>
                      <Col xs={12} md={4}>
                        <FormGroup controlId="formControlsSelect" className={styles.formGroup}>
                          <TaskTypeSelectWrapper
                            name="itemTypeId"
                            label="itemTypeId"
                            fieldName="name"
                            defaultOptionText={<FormattedMessage {...messages.selectTasktype}>
                              {selectTasktype => (
                                selectTasktype
                              )}
                            </FormattedMessage>}
                            data={this.props.customerId ? this.props.tasktypes : this.props.newtasktypes }
                          />
                        </FormGroup>
                        <Error name="itemTypeId" />
                      </Col>
                    </Row>

                    <Row className={styles.row_content}>
                      <Col xs={12} md={12}>
                        <FormGroup controlId="formControlsTextarea">
                          <ControlLabel> {<FormattedMessage {...messages.description} />}</ControlLabel>
                          <Field
                            name="info"
                            component="textarea"
                            className="form-control"/>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row className={styles.row_content}>
                      <Col xs={12} md={12}>
                        <Button
                              onClick={this.handleCancel}
                              className={styles.cancel_button}>
                               {<FormattedMessage {...messages.close} />}
                        </Button>
                        <Button
                            type="submit"
                            onClick={() => this.handleTaskAdd(values, errors)}

                            className={styles.addtask_button}>
                            {!this.state.saveBtnStatus ? <FormattedMessage {...messages.addtask}>
                              {addtask => (
                                addtask
                              )}
                            </FormattedMessage>
                              :
                                <span>
                                  Saving
                                  <svg className={styles.animated_logo} viewBox="0 0 512 512">
                                    <circle className={styles.spinner} cx="256" cy="256" r="200"/>
                                    <circle className={styles.background} cx="256" cy="256" r="200"/>
                                  </svg>
                                </span>
                            }
                        </Button>
                      </Col>
                    </Row>

                  </div>
                </form>)
              } />
              :
              <Spinner />
            }
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}


AddTaskModal.propTypes = {
  customers: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  tasktypes: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  newtasktypes: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  taskAddStatus: PropTypes.string,
  defaultOptionText: PropTypes.string,
  handleShow: PropTypes.func,
  onHide: PropTypes.func,
  taskAddBtn: PropTypes.oneOfType([
    PropTypes.boolean,
    PropTypes.object,
  ]),
  show: PropTypes.bool,
  employeeId: PropTypes.number,
  loadCustomers: PropTypes.func,
  name: PropTypes.string,
  onClose: PropTypes.func,
  loadTaskTypes: PropTypes.func,
  taskAdd: PropTypes.func,
  customerId: PropTypes.number,
}


const mapStateToProps = createStructuredSelector({
  customers: customersListSelector(),
  tasktypes: taskTypesSelector(),
  taskAddStatus: taskAddStatusSelector(),
  taskAddBtn: taskSaveBtnSelector(),
  availableservices: availableServiceSelector(),
  istTaskTypeLoading: isTaskTypeLoadingSelector(),
  newtasktypes: newTaskTypesSelector(),
  isAvLoading: isAvLoadingSelector()
});

const mapDispatchToProps = (dispatch) => {
  return {
    loadCustomers: bindActionCreators(loadCustomers, dispatch),
    loadTaskTypes: bindActionCreators(loadTaskTypes, dispatch),
    taskAdd: bindActionCreators(taskAdd, dispatch),
    taskAddCompleted: bindActionCreators(taskAddCompleted, dispatch),
    loadAvailableService: bindActionCreators(loadAvailableService, dispatch),
    lazyLoadCustomers: bindActionCreators(lazyLoadCustomers, dispatch),
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(AddTaskModal);
