import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import {
  Row,
  Col,
  Modal,
  Tabs,
  Tab,
  Button,
} from 'react-bootstrap';
import { Form } from 'react-final-form';
import setFieldData from 'final-form-set-field-data';
import Icon from 'react-icons-kit';
import { ic_info_outline } from 'react-icons-kit/md/ic_info_outline';
import { ic_close } from 'react-icons-kit/md/ic_close';
import diff from 'object-diff';
import
  ToastrContainer, {
  Toast,
  ToastDanger,
} from 'react-toastr-basic';
import _ from 'lodash';

import Spinner from '../../../sharedComponents/Spinner/index';
import DomaDatePicker from '../../../sharedComponents/DomaDatePicker/index';
import DomaTimePicker from '../../../sharedComponents/DomaTimePicker/index';
import {
  TaskEdit,
  TaskEditEnd,
  loadAvailableServices,
  loadTaskTypes,
  deleteService,
  addService,
  updateService,
} from '../TimelineCalendar/actions';
import {
  editTaskStatusSelector,
  isTaskLoadingSelector,
  AvailableServicesSelector,
  TaskTypesSelector,
  TemplateRepetitionsSelector,
  SpecialHolidaysSelector,
} from './selectors';
import styles from '../TimelineCalendar/DomaBooking-styles.scss';
import ProductsTab from './Tabs/ProductsTab/index';
import RepetitionTab from './Tabs/RepetitionTab/index';
import GeneralTab from './Tabs/GeneralTab/index';
import { getformatedTimeDuration } from '../../../utils/dateUtil';

const shortid = require('shortid');

String.prototype.replaceAt = function (index, replacement) {
  return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

Array.prototype.remove = function () {
  var what, a = arguments, L = a.length, ax;
  while (L && this.length) {
    what = a[--L];
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1);
    }
  }
  return this;
};

const onSubmit = async values => {

};

class EditTaskModal extends PureComponent {
  constructor(props) {
    super(props);
    // add availableservices and tasktypeservicesfrom with new active and canChange properties to state
    const availableservices = _.map(props.availableservices, element =>  _.extend({}, element, { active: false, canChange: true }));
    let tasktypeservices = [];

    if (props.tasktypeservices instanceof Array) {
      tasktypeservices = _.map(props.tasktypeservices, element => _.extend({}, element, { active: true, canChange: false }));
    }
    this.state = {
      showDiv: true,
      currentRealizedTime: null,
      currentRealizedDate: null,
      availableservices,
      tasktypeservices,
      exclusionList: [],
      updateList: [],
      postCollection: [],
      deleteList: [],
      enableRepetitionsTab: false,
      showMessageToEnableRepetitions: true,
      activeKey: 1,
      showMessageToDisableRepetitions: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    // show message only for opened modal
    // if taskeditstatus has been changed - patch the task and close the modal
    if ((this.props.taskeditstatus !== nextProps.taskeditstatus) && (this.props.show === true)) {
      if (nextProps.taskeditstatus === 'success') {
        Toast(`Task ID#${this.props.edittaskid} successfully edited`);
      } else if (nextProps.taskeditstatus === 'failed') {
        ToastDanger('Some problem while editing task');
      }
      this.props.onHide();
      this.props.taskeditend();
    }

    // if the availableservices has been changed - add new availableservices to state
    if ((this.props.availableservices !== nextProps.availableservices) && (this.props.show === true)) {
      const availableservices = _.map(nextProps.availableservices, element => _.extend({}, element, {
        active: false,
        canChange: true,
      }));
      this.setState({ availableservices }, () => this.handleNewTaskTypes());
    }
    if ((this.props.taskdetails !== nextProps.taskdetails) && Array.isArray(nextProps.taskdetails)) {
      this.initializeProductUI(nextProps.taskdetails);
      this.setState({
        startDateValue: nextProps.taskdetails[0].plannedStartTime && moment(nextProps.taskdetails[0].plannedStartTime),
        endDateValue: nextProps.taskdetails[0].plannedEndTime && moment(nextProps.taskdetails[0].plannedEndTime),
        startRealizedDate: nextProps.taskdetails[0].realizedStartTime && moment(nextProps.taskdetails[0].realizedStartTime),
        endRealizedDate: nextProps.taskdetails[0].realizedEndTime && moment(nextProps.taskdetails[0].realizedEndTime),
      });
    }
      // if the tasktypeservices has been changed - add new tasktypeservices to state and handle new taskTypes
    if ((this.props.tasktypeservices !== nextProps.tasktypeservices) && (this.props.show === true)) {
      const tasktypeservices = _.map(nextProps.tasktypeservices, element => _.extend({}, element, {
        active: true,
        canChange: false,
      }));

      this.setState({ tasktypeservices }, () => this.handleNewTaskTypes());
    }
  }

  // set collection items as selected with correct canChange property to availableservices
  setServicesToBookingItem = (collection) => {
    const availableservices = _.cloneDeep(this.state.availableservices);

    const services = _.map(collection, element => _.extend({}, element, {
      active: true,
      canChange: false,
    }));

    availableservices.forEach((avService) => {
      const newService = _.cloneDeep(avService);
      services.forEach((taskService) => {
        if (taskService.serviceId === avService.serviceId) {
          newService.canChange = !taskService.typeService;
          newService.active = true;
          const foundIndex = availableservices.findIndex(service => newService.serviceId === service.serviceId);
          availableservices[foundIndex] = newService;
        }
      });
    });
    // return availableservices;
    availableservices.sort((a, b) => (a.active === b.active) ? 0 : a.active ? -1 : 1);

    this.setState({ availableservices });
  }

  initializeProductUI = (taskdetails) => {
    const availableservices = _.cloneDeep(this.state.availableservices);

    const newServices = _.map(taskdetails[0].newServices, element => _.extend({}, element, {
      active: true,
      canChange: true,
    }));

    const newTaskTypes = _.map(this.state.tasktypeservices, element => _.extend({}, element, {
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

    newServices.forEach((newService) => {
      const foundElement = availableservices.find(service => newService.serviceId === service.serviceId);
      const foundIndex = availableservices.findIndex(service => newService.serviceId === service.serviceId);

      if (foundElement && foundElement.active) {
        availableservices[foundIndex].canChange = false;
        availableservices[foundIndex].count = newService.count;
        availableservices[foundIndex].legend = newService.legend;
      } else {
        availableservices[foundIndex] = newService;
      }
    }, this);

    availableservices.sort((a, b) => (a.active === b.active) ? 0 : a.active ? -1 : 1 );

    this.setState({ availableservices });
  }

  // deselect all previously selected taskTypes
  deselectTaskTypes = () => {
    const availableservices = _.cloneDeep(this.state.availableservices);
    availableservices.forEach((availableService) => {
      const foundIndex = availableservices.findIndex(service => availableService.serviceId === service.serviceId);
      if (availableService.active && !availableService.canChange) {
        availableservices[foundIndex].active = false;
        availableservices[foundIndex].canChange = true;
      }
    });
    this.setState({ availableservices }, () => this.setServicesToBookingItem(this.state.tasktypeservices));
  }

  // handle receiving of new task types from dropdown
  handleNewTaskTypes = () => this.deselectTaskTypes();

  handleTaskedit = () => {
    const {
      taskedit,
      edittaskid,
      activelinkid,
      visibletimestart,
      visibletimeend,
      taskdetails,
    } = this.props;

    const newPayload = _.cloneDeep(this.state.formValues);

    newPayload.plannedStartTime = this.state.startDateValue.format('YYYY-MM-DDTHH:mm:ss');
    newPayload.plannedEndTime = this.state.endDateValue.format('YYYY-MM-DDTHH:mm:ss');

    if (this.state.startRealizedDate) {
      newPayload.realizedStartTime = this.state.startRealizedDate.format('YYYY-MM-DDTHH:mm:ss');
    }
    if (this.state.endRealizedDate) {
      newPayload.realizedEndTime = this.state.endRealizedDate.format('YYYY-MM-DDTHH:mm:ss');
    }

    const changedObject = diff(taskdetails[0], newPayload);

    const getPayload = {
      activeLinkId: activelinkid,
      visibleTimeStart: visibletimestart,
      visibleTimeEnd: visibletimeend,
      checkfield: 'test',
    };

    taskedit(edittaskid, changedObject, getPayload);
  }

  handleCustomerDD = (id) => {
    this.props.loadavailableservices(id, false);
  }

  handleTaskTypeDD = (id) => {
    this.props.loadtasktypes(id);
  }

  handleCheckboxValue = (service) => {
    if (service.canChange) {
      const services = _.cloneDeep(this.state.availableservices);
      const foundIndex = services.findIndex(foundService => foundService.serviceId === service.serviceId);

      services[foundIndex].active = !services[foundIndex].active;

      // const newService = _.cloneDeep(service);
      //
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
      // services.splice(activeServices.length, 0, newService);

      this.setState({ availableservices: services });
    }
  }

  handleNumberInput = (event, id) => {
    if (event.target.value < 0) {
      return null;
    }
    if (event.target.value.toString().split('.')[1] && event.target.value.toString().split('.')[1].length > 2) {
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
            if (newService.count === '' || newService.count < 1) {
              newService.count = 0;
            } else {
              newService.count = Math.round((parseFloat(newService.count) - 1) * 100) / 100;
            }
          }
          return newService;
        }
        return serviceInServices;
      });
      this.setState({ availableservices: newServices });
    }
  }

  nullCollections = () => {
    this.setState({
      putCollection: [],
      postCollection: [],
      deleteCollection: [],
      availableservices: [],
      filteredtasktypeservices: [],
      showDiv: true,
      currentRealizedTime: null,
      currentRealizedDate: null,
      exclusionList: [],
      updateList: [],
      deleteList: [],
      enableRepetitionsTab: false,
      showMessageToEnableRepetitions: true,
      activeKey: 1,
    });
  }

  handleClose = () => {
    this.nullCollections();
    this.props.onHide();
  }

  handleSave = () => {
    const availableservices = _.cloneDeep(this.state.availableservices);
    const selectedCollection = availableservices.filter(service => service.active);
    const postCollection = availableservices.filter(service => service.active);
    const exclusionList = [];
    const updateList = [];
    const deleteList = [];
    this.props.taskdetails[0].newServices.forEach((originalService) => {
      const foundElement = selectedCollection.find(service => originalService.serviceId === service.serviceId);
      if (foundElement) {
        selectedCollection.forEach((selectedItem) => {
          if (originalService.serviceId === selectedItem.serviceId) {
            if (originalService.count !== selectedItem.count) {
              updateList.push(selectedItem);
              exclusionList.push(selectedItem);
            } else if ((originalService.count === selectedItem.count) && (originalService.legend !== selectedItem.legend)) {
              updateList.push(selectedItem);
              exclusionList.push(selectedItem);
            } else {
              exclusionList.push(selectedItem);
            }
          }
        });
      } else {
        deleteList.push(originalService);
      }
    });

    exclusionList.forEach((execlutionItem) => {
      const foundElement = postCollection.find(service => execlutionItem.serviceId === service.serviceId);
      if (foundElement) {
        postCollection.remove(execlutionItem);
      }
    });

    this.setState({
      exclusionList,
      updateList,
      postCollection,
      deleteList,
    }, () => {
      this.apiCallsForProducts();
      this.handleTaskedit();
    });
  }

  // update products at api
  apiCallsForProducts = () => {
    if (this.state.updateList.length !== 0) {
      this.state.updateList.forEach((putElement) => {
        this.props.updateservice(this.props.edittaskid, putElement);
      });
    }
    if (this.state.deleteList.length !== 0) {
      this.state.deleteList.forEach((deleteElement) => {
        this.props.deleteservice(this.props.edittaskid, deleteElement.serviceId);
      });
    }
    if (this.state.postCollection.length !== 0) {
      this.props.addservice(this.props.edittaskid, this.state.postCollection);
    }
  }

  handleFormValues = formValues => this.setState({ formValues }, () => this.checkTaskLength());

  enableRepetitionsTab = formValues => this.setState({
    enableRepetitionsTab: true,
    activeKey: 3,
    showMessageToEnableRepetitions: false,
    showMessageToDisableRepetitions: true,
    formValues,
  });

  tabOnSelect = (value, formValues) => this.setState({ formValues, activeKey: value });

  handleDateValues = (startDateValue, endDateValue) => this.setState({ startDateValue, endDateValue });

  handleRealizedDates = (startRealizedDate, endRealizedDate) => this.setState({ startRealizedDate, endRealizedDate });

  checkTaskLength = () => {
    const diffInMins = moment(this.state.endDateValue, 'DD/MM/YYYY HH:mm:ss').diff(this.state.startDateValue, 'minutes');
    if (diffInMins > 1440) {
      // show confirmation window
      this.showConfirm();
    } else {
      this.handleSave();
    }
  }

  showConfirm = () => {
    const startDateValue = this.state.startDateValue.format('DD/MM/YYYY HH:mm');
    const endDateValue = this.state.endDateValue.format('DD/MM/YYYY HH:mm');
    const duration = getformatedTimeDuration(this.state.startDateValue, this.state.endDateValue);
    const r = confirm(`Confirm: Task start time ${startDateValue}, end time ${endDateValue}, duration ${duration} \n`);

    if (r) {
      this.handleSave();
    }
  }

  disableRepetitionTab = () => this.setState({
    enableRepetitionsTab: false,
    activeKey: 1,
    showMessageToEnableRepetitions: true,
    showMessageToDisableRepetitions: false,
  });

  handleSearchButton = (searchWord) => {
    // filter available services by searchWord
    const availableServices = _.cloneDeep(this.state.availableservices);
    const filteredServices = availableServices.filter(service => _.includes(service.name.toLowerCase(), searchWord.toLowerCase()));
    const updateServices = availableServices.map((avService) => {
      const newService = _.cloneDeep(avService);
      const isFiltered = filteredServices.findIndex(filteredService => filteredService.serviceId === avService.serviceId);
      if (isFiltered !== -1) {
        newService.hide = false;
      } else {
        newService.hide = true;
      }
      return newService;
    });
    this.setState({ availableservices: updateServices }, () => { console.log('updateServices: ', this.state.availableservices); });
  }

  render() {
    const { showMessageToEnableRepetitions, showMessageToDisableRepetitions } = this.state;
    // set static itemStatus
    const itemStatus = ['UNCONFIRMED', 'CONFIRMED', 'FINISHED'];

    // DatePiсker wrapper for the DomaDatePicker sharedComponent
    const dateInput = props => (
      <DomaDatePicker
        defaultValue={moment(props.input.value)}
        showTimeSelect
        {...props}
        onChange={(value) => {
          const defaultTime = moment(props.defaultValue).format('HH:mm');
          const mergedDateandDefaultTime = `${value}${'T'}${defaultTime}`;
          // this.setState({ currentRealizedTime: mergedDateandDefaultTime });
          props.input.onChange(mergedDateandDefaultTime);
        }}
        className={styles.custom__datepicker}
      />
    );

    // TimePiсker wrapper for the DomaTimePicker sharedComponent
    const timeInput = props => (
      <DomaTimePicker
        defaultValue={moment(props.input.value)}
        showTimeSelect
        disabled={props.disabled}
        {...props}
        onChange={(value) => {
          props.input.onChange(value);
        }}
        format={'HH:mm'}
      />
    );
    let total = 0;
    total = this.state.availableservices.reduce((a, b) => {
      if (b.price) {
        return a + (b.price * b.count);
      }
      return a;
    }, 0);

    const modalProps = { ...this.props };
    delete modalProps.taskedit;
    delete modalProps.taskeditend;
    delete modalProps.loadavailableservices;
    delete modalProps.loadtasktypes;
    delete modalProps.updateservice;
    delete modalProps.addservice;
    delete modalProps.deleteservice;

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
            <Modal.Title>Edit Task ID:{this.props.edittaskid}</Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.modal__content}>
            {!this.props.taskdetails ? (
              <Tabs
                defaultActiveKey={1}
                id="uncontrolled-tab-example"
                className={styles.modal__tab}
              >
                <Tab
                  eventKey={1}
                  title="General"
                  className={styles.tab__general}
                >
                  <div className={styles.editmodal__loading}>
                    <Spinner />
                  </div>
                </Tab>
                <Tab
                  eventKey={2}
                  disabled
                  title="Products"
                />
                <Tab
                  eventKey={3}
                  disabled
                  title="Repetitions"
                />
              </Tabs>
            ) : (
              <Form
                initialValues={{
                  ...this.props.taskdetails[0],
                  realizedStartTime: this.props.taskdetails[0] && this.props.taskdetails[0].plannedStartTime,
                  realizedEndTime: this.props.taskdetails[0] && this.props.taskdetails[0].plannedEndTime,
                }}
                onSubmit={onSubmit}
                mutators={{ setFieldData }}
                validate={values => ({})}
                render={({
                  handleSubmit,
                  values,
                  errors,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Tabs
                      defaultActiveKey={1}
                      id="uncontrolled-tab-example"
                      className={styles.modal__tab}
                      activeKey={this.state.activeKey}
                      onSelect={value => this.tabOnSelect(value, values)}
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
                                  &nbsp;&nbsp; You are now editing task #{this.props.edittaskid}.
                                  If you want to edit all tasks click
                                  &nbsp;
                                  <span className={styles.editModal_higlighted_text} onClick={() => this.enableRepetitionsTab(values)}>
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
                                  &nbsp;&nbsp; You are now editing all tasks. If you want to edit only single task click &nbsp;
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
                            taskdetails={this.props.taskdetails[0]}
                            bookingtypes={this.props.bookingtypes}
                            handletasktypedd={this.handleTaskTypeDD}
                            groupgroups={this.props.groupgroups}
                            employeesgroup={this.props.employeesgroup}
                            edittaskid={this.props.edittaskid}
                            handleclose={this.handleClose}
                            handlecustomerdd={this.handleCustomerDD}
                            customerresources={this.props.customerresources}
                            modaltype="EditModal"
                            errors={errors}
                            handledatevalues={this.handleDateValues}
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
                          tasktemplateid={this.props.taskdetails[0].taskTemplateId}
                          edittaskid={this.props.edittaskid}
                          handleclose={this.edittaskid}
                          handlenumberinput={this.handleNumberInput}
                          handleSearchButton={this.handleSearchButton}
                        />
                      </Tab>
                      <Tab
                        eventKey={3}
                        title="Repetition"
                        disabled={!this.state.enableRepetitionsTab}
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
                                  &nbsp;&nbsp; You are now editing all tasks. If you want to edit only single task click &nbsp;
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
                          dateinput={dateInput}
                          canvasdatetime={this.props.canvasdatetime}
                          taskdetails={this.props.taskdetails[0]}
                          templaterepetitions={this.props.templaterepetitions}
                          formvalues={this.state.formValues}
                          specialholidays={this.props.specialholidays}
                        />
                      </Tab>
                    </Tabs>
                    <Row className={styles.footer}>
                      <div>
                        <Col md={8} className={styles.footer__col__label}>
                          <p className="pull-left">
                            Template ID: <strong>
                              {this.props.taskdetails[0].taskTemplateId}
                            </strong> / Task ID: <strong>{this.props.edittaskid} </strong>
                          </p>
                        </Col>
                        <Col md={2} className={styles.footer__col__buttons}>
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
                          >
                            Save
                          </Button>
                        </Col>
                      </div>
                    </Row>
                  </form>)}
              />
              )}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

EditTaskModal.propTypes = {
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
  taskdetails: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  taskedit: PropTypes.func,
  onHide: PropTypes.func,
  taskeditend: PropTypes.func,
  activelinkid: PropTypes.string,
  visibletimestart: PropTypes.number,
  visibletimeend: PropTypes.number,
  show: PropTypes.bool,
  edittaskid: PropTypes.number,
  taskeditstatus: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  loadavailableservices: PropTypes.func,
  loadtasktypes: PropTypes.func,
  availableservices: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  tasktypeservices: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  updateservice: PropTypes.func,
  addservice: PropTypes.func,
  deleteservice: PropTypes.func,
  specialholidays: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  templaterepetitions: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  canvasdatetime: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  taskeditstatus: editTaskStatusSelector(),
  availableservices: AvailableServicesSelector(),
  tasktypeservices: TaskTypesSelector(),
  templaterepetitions: TemplateRepetitionsSelector(),
  specialholidays: SpecialHolidaysSelector(),
});

const mapDispatchToProps = dispatch => ({
  taskedit: bindActionCreators(TaskEdit, dispatch),
  taskeditend: bindActionCreators(TaskEditEnd, dispatch),
  loadavailableservices: bindActionCreators(loadAvailableServices, dispatch),
  loadtasktypes: bindActionCreators(loadTaskTypes, dispatch),
  updateservice: bindActionCreators(updateService, dispatch),
  addservice: bindActionCreators(addService, dispatch),
  deleteservice: bindActionCreators(deleteService, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditTaskModal);
