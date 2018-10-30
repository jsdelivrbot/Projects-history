import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import {
  Row,
  Col,
  Modal,
  Button,
  Tabs,
  Tab,
} from 'react-bootstrap';
import { Form } from 'react-final-form';
import Icon from 'react-icons-kit';
import { ic_info_outline } from 'react-icons-kit/md/ic_info_outline';
import { ic_close } from 'react-icons-kit/md/ic_close';
import
  ToastrContainer, {
  Toast,
  ToastDanger,
} from 'react-toastr-basic';
import 'rc-time-picker/assets/index.css';
import _ from 'lodash';

import Spinner from '../../../sharedComponents/Spinner/index';
import DomaDatePicker from '../../../sharedComponents/DomaDatePicker/index';
import DomaTimePicker from '../../../sharedComponents/DomaTimePicker/index';
import {
  addService,
  deleteService,
  loadAvailableServices,
  loadTaskTypes,
  taskAdd,
  TaskAddEnd,
  updateService,
  nullServicesAndTasktypes,
  loadSpecialHolidays,
} from '../TimelineCalendar/actions';
import {
  editTaskStatusSelector,
  TaskAddStatusSelector,
  AvailableServicesSelector,
  TaskTypesSelector,
  TypedServicesSelector,
  AddedTaskSelector,
  SpecialHolidaysSelector,
} from './selectors';
import styles from '../TimelineCalendar/DomaBooking-styles.scss';
import ProductsTab from './Tabs/ProductsTab/index';
import RepetitionTab from './Tabs/RepetitionTab/index';
import GeneralTab from './Tabs/GeneralTab/index';
import { getformatedTimeDuration } from '../../../utils/dateUtil';

const shortid = require('shortid');

const onSubmit = async values => {
  console.log(JSON.stringify(values, 0, 2));
};

class AddTaskModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showDiv: true,
      addTaskEndTime: moment(this.props.canvasdatetime, 'HHmm').add(1, 'hours'),
      errors: 0,
      availableservices: [],
      tasktypeservices: [],
      postCollection: [],
      showMessageToEnableRepetitions: true,
      enableRepetitionsTab: false,
      taskTypeValue: '',
      startDateValue: moment(props.canvasdatetime),
      endDateValue: moment(props.canvasdatetime).add('1', 'hours'),
      activeKey: 1,
      customerError: '',
      showMessageToDisableRepetitions: false,
    };
  }
  componentDidMount() {
    this.props.loadspecialholidays();
  }

  componentWillReceiveProps(nextProps) {
    const {
      istaskadded,
      show,
      taskaddend,
      typedservices,
      availableservices,
      addedTask,
      canvasdatetime,
    } = this.props;

    if (show !== nextProps.show && nextProps.show) {
      this.props.nullServicesAndTasktypes();
    }

    // show message only for openned modal
    if (canvasdatetime !== nextProps.canvasdatetime) {
      this.setState({
        startDateValue: moment(nextProps.canvasdatetime),
        endDateValue: moment(nextProps.canvasdatetime).add('1', 'hours'),
      });
    }

    // show message only for openned modal
    if ((istaskadded !== nextProps.istaskadded) && show) {
      if (nextProps.istaskadded === 'success') {
        Toast('New task sucessfully added');
      } else if (nextProps.istaskadded === 'failed') {
        ToastDanger('Some problem while adding new task');
      }
      taskaddend();
    }

    // if the availableservices has been changed - add new availableservices to state
    if ((availableservices !== nextProps.availableservices) && (show === true)) {
      const availableServices = _.map(nextProps.availableservices, element => _.extend({}, element, {
        active: false,
        canChange: true,
      }));
      // delete defaultValue in taskType dropdown
      this.setState({
        availableservices: availableServices,
        tasktypeservices: [],
        taskTypeValue: '',
      });
    }

    // if the tasktypeservices has been changed - add new tasktypeservices to state and handle new taskTypes
    if ((typedservices !== nextProps.typedservices) && (show === true)) {
      const typedServices = _.map(nextProps.typedservices, element => _.extend({}, element, {
        active: true,
        canChange: false,
      }));

      this.setState({ typedservices: typedServices }, () => this.handleNewTypedServices());
    }

    // if the tasktypeservices has been changed - add new tasktypeservices to state and handle new taskTypes
    if ((addedTask !== nextProps.addedTask) && (show === true)) {
      this.setState({ addedTask: nextProps.addedTask }, () => this.handleTaskSave());
    }
  }

  handleDateValues = (startDateValue, endDateValue) => this.setState({ startDateValue, endDateValue });

  handleRealizedDates = (startRealizedDate, endRealizedDate) => this.setState({ startRealizedDate, endRealizedDate });

  handleNewTypedServices = () => {
    const newtasktypes = [];
    this.state.typedservices.forEach((typedService) => {
      newtasktypes.push({
        id: typedService.taskType.id,
        name: typedService.taskType.name,
        color: typedService.taskType.color,
      });
    });
    newtasktypes.sort((a, b) => (a.active === b.active) ? 0 : a.active ? -1 : 1);

    this.setState({ tasktypeservices: newtasktypes });
  }

  // update products at api
  apiCallsForProducts = () => {
    if (this.state.postCollection.length !== 0) {
      this.props.addservice(this.state.addedTask, this.state.postCollection);
    }
    this.handleClose();
  }

  handleTaskSave = () => {
    const availableservices = _.cloneDeep(this.state.availableservices);
    const postCollection = availableservices.filter(service => service.active);
    console.log('ALL SERVICES: ', availableservices);
    this.setState({
      postCollection,
    }, () => {
      this.apiCallsForProducts();
    });
  }

  handleTaskAdd = () => {
    const {
      taskadd,
      activelinkid,
      visibletimestart,
      visibletimeend,
    } = this.props;
    const newPayload = _.cloneDeep(this.state.formValues);
    if (!newPayload.customerId) {
      newPayload.customerId = this.state.customerId;
    }
    if (this.state.startDateValue) {
      newPayload.plannedStartTime = this.state.startDateValue.format('YYYY-MM-DDTHH:mm:ss');
    }
    if (this.state.endDateValue) {
      newPayload.plannedEndTime = this.state.endDateValue.format('YYYY-MM-DDTHH:mm:ss');
    }
    if (this.state.startRealizedDate) {
      newPayload.realizedStartTime = this.state.startRealizedDate.format('YYYY-MM-DDTHH:mm:ss');
    }
    if (this.state.endRealizedDate) {
      newPayload.realizedEndTime = this.state.endRealizedDate.format('YYYY-MM-DDTHH:mm:ss');
    }

    const getPayload = {
      activeLinkId: activelinkid,
      visibleTimeStart: visibletimestart,
      visibleTimeEnd: visibletimeend,
    };
    taskadd(newPayload, getPayload);
  }

  validate = (values, props) => {
    const errors = {};
    if (!values.customerId || values.customerId === '-') {
      errors.customerId = 'Required';
    }
    if (props.type === 'Group' && (!values.taskGroupId || values.taskGroupId === '-')) {
      errors.taskGroupId = 'Required';
    }
    if (props.type === 'Employee' && (!values.employeeId || values.employeeId === '-')) {
      errors.employeeId = 'Required';
    }
    this.setState({ errors: errors.length });

    return errors;
  }

  deselectTaskTypes = (taskTypes) => {
    const availableservices = _.cloneDeep(this.state.availableservices);
    availableservices.forEach((availableService) => {
      const foundIndex = availableservices.findIndex(service => availableService.serviceId === service.serviceId);
      if (availableService.active && !availableService.canChange) {
        availableservices[foundIndex].active = false;
        availableservices[foundIndex].canChange = true;
      }
    });
    this.setState({ availableservices }, () => this.updateAvailableServices(taskTypes));
  }

  updateAvailableServices = (taskTypes) => {
    const availableservices = _.cloneDeep(this.state.availableservices);

    const newTaskTypes = _.map(taskTypes, element => _.extend({}, element, {
      active: true,
      canChange: false,
    }));

    newTaskTypes.forEach((taskType) => {
      const foundElement = availableservices.find(service => taskType.serviceId === service.serviceId);
      const foundIndex = availableservices.findIndex(service => taskType.serviceId === service.serviceId);

      if (foundElement) {
        availableservices[foundIndex] = taskType;
      }
    });
    availableservices.sort((a, b) => (a.active === b.active) ? 0 : a.active ? -1 : 1);

    this.setState({ availableservices });
  }

  handleCustomerDD = (id) => {
    // load availableservices with typedservices
    this.props.loadavailableservices(id, true);
    this.setState({ customerId: id });
  }

  handleTaskTypeDD = (id) => {
    // get taskTypes from typedService by id
    const newTaskTypes = [];
    this.state.typedservices.forEach((typedService) => {
      if (typedService.taskType.id === id) {
        typedService.services.forEach((service) => {
          newTaskTypes.push(service);
        });
      }
    });
    // update availableServices with services from typedServices
    this.deselectTaskTypes(newTaskTypes);
  }

  handleCheckboxValue = (service) => {
    if (service.canChange) {
      const services = _.cloneDeep(this.state.availableservices);
      const foundIndex = services.findIndex(foundService => foundService.serviceId === service.serviceId);

      services[foundIndex].active = !services[foundIndex].active;
      services[foundIndex].isManuallyAdded = services[foundIndex].active;

      // const newService = _.cloneDeep(service);
      // // delete service from previous order of list
      // services.splice(foundIndex, 1);
      //
      // // add changed service with sorting
      // const activeServices = [];
      // services.forEach((activeServiceForPush) => {
      //   if (activeServiceForPush.active) {
      //     activeServices.push(activeServiceForPush);
      //   }
      // });
      // newService.active = !newService.active;
      // newService.isManuallyAdded = newService.active;
      //
      // services.splice(activeServices.length, 0, newService);

      this.setState({ availableservices: services });
    }
  }

  handleNumberInput = (event, id) => {
    if (event.target.value < 0) {
      return null;
    }
    const services = _.cloneDeep(this.state.availableservices);
    const foundIndex = services.findIndex(foundService => foundService.serviceId === id);
    services[foundIndex].count = event.target.value;
    this.setState({ availableservices: services });
    return null;
  }

  handleCount = (type, service, e) => {
    e.stopPropagation();
    const services = _.cloneDeep(this.state.availableservices);
    if (!service.active) {
      // check service
      this.handleCheckboxValue(service);
    } else if (!service.timeService && service.active) {
      // update quantity
      const newServices = services.map((serviceInServices) => {
        const newService = _.cloneDeep(serviceInServices);
        if (service.serviceId === serviceInServices.serviceId) {
          if (type === 'increase') {
            if (newService.count === '') {
              newService.count = 1;
            } else {
              newService.count = parseFloat(newService.count) + 1;
            }
          } else {
            if (newService.count === '' || newService.count <= 0) {
              newService.count = 0;
            } else {
              newService.count = parseFloat(newService.count) - 1;
            }
          }
          return newService;
        }
        return serviceInServices;
      });
      this.setState({ availableservices: newServices });
    }
  }

  checkTaskLength = () => {
    const diffInMins = moment(this.state.endDateValue, 'DD/MM/YYYY HH:mm:ss').diff(this.state.startDateValue, 'minutes');
    if (diffInMins > 1440) {
      // show confirmation window
      this.showConfirm();
    } else {
      this.handleTaskAdd();
    }
  }

  showConfirm = () => {
    const startDateValue = this.state.startDateValue.format('DD/MM/YYYY HH:mm');
    const endDateValue = this.state.endDateValue.format('DD/MM/YYYY HH:mm');
    const duration = getformatedTimeDuration(this.state.startDateValue, this.state.endDateValue);
    const r = confirm(`Confirm: Task start time ${startDateValue}, end time ${endDateValue}, duration ${duration} \n`);

    if (r) {
      this.handleTaskAdd();
    }
  }

  handleFormValues = formValues => this.setState({ formValues }, () => this.checkTaskLength());

  tabOnSelect = formValues => this.setState({ formValues });

  enableRepetitionsTab = (formValues) => {
    if (formValues.customerId && formValues.customerId !== '') {
      this.setState({
        enableRepetitionsTab: true,
        showMessageToEnableRepetitions: false,
        activeKey: 3,
        showMessageToDisableRepetitions: true,
        formValues,
      });
    } else {
      this.setState({ customerError: 'Please select customer.' });
    }
  }

  handleClose = () => {
    this.setState({
      showDiv: true,
      addTaskEndTime: moment(this.props.canvasdatetime, 'HHmm').add(1, 'hours'),
      errors: 0,
      availableservices: [],
      tasktypeservices: [],
      postCollection: [],
      showMessageToEnableRepetitions: true,
      enableRepetitionsTab: false,
      taskTypeValue: '',
      startDateValue: moment(this.props.canvasdatetime),
      endDateValue: moment(this.props.canvasdatetime).add('1', 'hours'),
      activeKey: 1,
      customerError: '',
      showMessageToDisableRepetitions: false,
    });
    this.props.onHide();
  }

  taskTypeOnChange = taskTypeValue => this.setState({ taskTypeValue });

  handleTabSelect = (value, values) => {
    if (values.customerId && values.customerId !== '') {
      this.setState({ activeKey: value, customerError: '' });
    } else {
      this.setState({ customerError: 'Please select customer.' });
    }
  }

  disableRepetitionTab = () => this.setState({
    enableRepetitionsTab: false,
    activeKey: 1,
    showMessageToEnableRepetitions: true,
    showMessageToDisableRepetitions: false,
  })

  render() {
    const {
      showMessageToEnableRepetitions,
      enableRepetitionsTab,
      showMessageToDisableRepetitions,
    } = this.state;
    const itemStatus = ['UNCONFIRMED', 'CONFIRMED', 'FINISHED'];

    // get start day from canvas
    const startDate = moment(this.props.canvasdatetime);
    // add 1 hr to canvas start date
    const endDate = moment(this.props.canvasdatetime).add(1, 'hours');
    let total = 0;
    total = this.state.availableservices.reduce((a, b) => {
      if (b.price) {
        return a + (b.price * b.count);
      }
      return a;
    }, 0);

    const dateInput = props => (
      <DomaDatePicker
        selected={moment(props.input.value)}
        showTimeSelect
        {...props}
        onChange={value => props.input.onChange(value)}
      />
    );

    // TimePicker wrapper for the DomaTimePicker sharedComponent
    const timeInput = props => (
      <DomaTimePicker
        selected={moment(props.input.value)}
        showTimeSelect
        disabled={props.disabled}
        {...props}
        onChange={(value) => {
          const defaultDate = moment(this.state.currentRealizedTime).format('YYYY-DD-MM');
          const mergedDateandDefaultTime = `${defaultDate}${'T'}${value}`;
          props.input.onChange(mergedDateandDefaultTime);
        }}
        format={'HH:mm'}
      />
    );
    const modalProps = { ...this.props };
    delete modalProps.taskadd;
    delete modalProps.taskaddend;
    delete modalProps.loadavailableservices;
    delete modalProps.loadtasktypes;
    delete modalProps.updateservice;
    delete modalProps.addservice;
    delete modalProps.deleteservice;
    delete modalProps.nullServicesAndTasktypes;
    delete modalProps.loadspecialholidays;
    delete modalProps.addedTask;
    delete modalProps.istaskadded;

    return (
      <div>
        <ToastrContainer />
        <Modal
          {...modalProps}
          enforceFocus={false}
          bsSize="large"
          aria-labelledby="contained-modal-title-lg"
          backdrop="static"
          onHide={this.handleClose}
        >
          <Modal.Header closeButton className={styles.modal__header}>
            <Modal.Title>Add new task</Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.modal__content}>
            {this.props.employeesgroup ?
              <Form
                initialValues={{
                  plannedStartTime: moment(this.props.canvasdatetime).format('YYYY-MM-DDTHH:mm:ss'),
                  plannedEndTime: moment(this.props.canvasdatetime).add('hours', 1).format('YYYY-MM-DDTHH:mm:ss'),
                  employeeId: this.props.type === 'Employee' ? this.props.groupid : undefined,
                  taskGroupId: this.props.type === 'Group' ? this.props.groupid : undefined,
                  isCanceled: false,
                  itemState: 'UNCONFIRMED',
                }}
                onSubmit={onSubmit}
                validate={(values => this.validate(values, this.props))}
                render={({
                  handleSubmit,
                  values,
                  pristine,
                  submitting,
                  invalid,
                  errors,
                 }) => (
                   <form onSubmit={handleSubmit}>
                     <Tabs
                       defaultActiveKey={1}
                       id="uncontrolled-tab-example"
                       className={styles.modal__tab}
                       activeKey={this.state.activeKey}
                       onSelect={(value) => { this.tabOnSelect(values); this.handleTabSelect(value, values); }}
                     >
                       <Tab
                         eventKey={1}
                         title="General"
                         className={styles.tab__general}
                       >
                         <div className={styles.modal_tab}>
                           {showMessageToEnableRepetitions ?
                             <Row className={styles.info__tab}>
                               <Col>
                                 <div>
                                   <Icon
                                     size={15}
                                     icon={ic_info_outline}
                                     className={`${styles.sidenav__item__icon} ${styles.add__icon}`}
                                   />
                                   &nbsp;&nbsp; You are now adding new single task. If you want to add all tasks click &nbsp;
                                   <span
                                     className={styles.editModal_higlighted_text}
                                     onClick={() => this.enableRepetitionsTab(values)}
                                   >
                                     <strong>here</strong>
                                   </span>.
                                   <span className={styles.info__close}>
                                     <a onClick={() => this.setState({ showMessageToEnableRepetitions: false })}>
                                       <Icon
                                         size={20}
                                         icon={ic_close}
                                         className={styles.info__close__icon}
                                       />
                                     </a>
                                   </span>
                                 </div>
                               </Col>
                             </Row> :
                             <Row className={styles.info__tab}>
                               <Col>
                                 <div>
                                   <Icon
                                     size={15}
                                     icon={ic_info_outline}
                                     className={`${styles.sidenav__item__icon} ${styles.add__icon}`}
                                   />
                                   &nbsp;&nbsp; You are now adding all tasks. If you want to add only single task click &nbsp;
                                   <span className={styles.editModal_higlighted_text} onClick={this.disableRepetitionTab}>
                                     <strong>here</strong>
                                   </span>.
                                   <span className={styles.info__close}>
                                     <a onClick={() => this.setState({ showMessageToDisableRepetitions: false })}>
                                       <Icon
                                         size={20}
                                         icon={ic_close}
                                         className={styles.info__close__icon}
                                       />
                                     </a>
                                   </span>
                                 </div>
                               </Col>
                             </Row> }
                           <GeneralTab
                             itemstatus={itemStatus}
                             values={values}
                             bookingtypes={this.props.bookingtypes}
                             handletasktypedd={this.handleTaskTypeDD}
                             groupgroups={this.props.groupgroups}
                             employeesgroup={this.props.employeesgroup}
                             edittaskid={this.props.edittaskid}
                             handlecustomerdd={this.handleCustomerDD}
                             customerresources={this.props.customerresources}
                             modaltype="AddModal"
                             canvasdatetime={this.props.canvasdatetime}
                             startdate={startDate}
                             enddate={endDate}
                             errors={errors}
                             groupid={this.props.groupid}
                             tasktypeservices={this.state.tasktypeservices}
                             tasktypeonchange={this.taskTypeOnChange}
                             tasktypevalue={this.state.taskTypeValue}
                             handledatevalues={this.handleDateValues}
                             invalid={invalid}
                             customerError={this.state.customerError}
                             handlerealizeddates={this.handleRealizedDates}
                           />
                         </div>
                       </Tab>
                       <Tab eventKey={2} title="Products">
                         <ProductsTab
                           total={total}
                           handlecount={this.handleCount}
                           handlecheckboxvalue={this.handleCheckboxValue}
                           availableservices={this.state.availableservices}
                           shortid={shortid}
                           handlesave={this.handleSave}
                           edittaskid={this.props.edittaskid}
                           handleclose={this.edittaskid}
                           handlenumberinput={this.handleNumberInput}
                         />
                       </Tab>
                       <Tab
                         eventKey={3}
                         title="Repetition"
                         disabled={!enableRepetitionsTab}
                         className={styles.disabled__tab}
                       >
                         <div className={styles.repetitions__warning}>
                           {showMessageToDisableRepetitions ?
                             <Row className={styles.info__tab}>
                               <Col>
                                 <div>
                                   <Icon
                                     size={15}
                                     icon={ic_info_outline}
                                     className={`${styles.sidenav__item__icon} ${styles.add__icon}`}
                                   />
                                   &nbsp;&nbsp; You are now adding all tasks. If you want to add only single task click &nbsp;
                                   <span className={styles.editModal_higlighted_text} onClick={this.disableRepetitionTab}>
                                     <strong>here</strong>
                                   </span>.
                                   <span className={styles.info__close}>
                                     <a onClick={() => this.setState({ showMessageToDisableRepetitions: false })}>
                                       <Icon
                                         size={20}
                                         icon={ic_close}
                                         className={styles.info__close__icon}
                                       />
                                     </a>
                                   </span>
                                 </div>
                               </Col>
                             </Row> : null}
                         </div>
                         <RepetitionTab
                           formvalues={this.state.formValues}
                           specialholidays={this.props.specialholidays}
                         />
                       </Tab>
                     </Tabs>
                     <Row className={styles.footer}>
                       <div>
                         <Col xsOffset={8} md={2} className={styles.footer__col__buttons}>
                           <button
                             type="submit"
                             onClick={this.handleClose}
                             className={`${styles.modal__btn} btn pull-right`}
                           >
                             Close
                           </button>
                         </Col>
                         <Col md={2} className={styles.footer__col__buttons}>
                           <Button
                             type="submit"
                             onClick={() => this.handleFormValues(values)}
                             className={`${styles.modal__btn} btn pull-left`}
                             disabled={invalid}
                           >
                             Save
                           </Button>
                         </Col>
                       </div>
                     </Row>
                   </form>
                )}
              /> : <Spinner />}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
AddTaskModal.propTypes = {
  employeesgroup: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  customerresources: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  bookingtypes: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  groupgroups: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  istaskadded: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
    PropTypes.string,
  ]),
  taskadd: PropTypes.func,
  onHide: PropTypes.func,
  taskaddend: PropTypes.func,
  activelinkid: PropTypes.string,
  visibletimestart: PropTypes.number,
  visibletimeend: PropTypes.number,
  groupid: PropTypes.number,
  show: PropTypes.bool,
  canvasdatetime: PropTypes.instanceOf(Date),
  type: PropTypes.string,
  typedservices: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  addservice: PropTypes.func,
  nullServicesAndTasktypes: PropTypes.func,
  addedTask: PropTypes.number,
  loadspecialholidays: PropTypes.func,
  loadavailableservices: PropTypes.func,
  specialholidays: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  availableservices: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  edittaskid: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  taskeditstatus: editTaskStatusSelector(),
  istaskadded: TaskAddStatusSelector(),
  availableservices: AvailableServicesSelector(),
  tasktypeservices: TaskTypesSelector(),
  typedservices: TypedServicesSelector(),
  addedTask: AddedTaskSelector(),
  specialholidays: SpecialHolidaysSelector(),
});

const mapDispatchToProps = dispatch => ({
  taskadd: bindActionCreators(taskAdd, dispatch),
  taskaddend: bindActionCreators(TaskAddEnd, dispatch),
  loadavailableservices: bindActionCreators(loadAvailableServices, dispatch),
  loadtasktypes: bindActionCreators(loadTaskTypes, dispatch),
  updateservice: bindActionCreators(updateService, dispatch),
  addservice: bindActionCreators(addService, dispatch),
  deleteservice: bindActionCreators(deleteService, dispatch),
  nullServicesAndTasktypes: bindActionCreators(nullServicesAndTasktypes, dispatch),
  loadspecialholidays: bindActionCreators(loadSpecialHolidays, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskModal);
