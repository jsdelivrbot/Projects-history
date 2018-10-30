import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import {Row, Col} from 'react-bootstrap';
import { findKey, startsWith } from 'lodash';

import SymbolsList from './components/SymbolsList';
import SymbolDetail from './components/SymbolDetail';
import ReportSummary from './components/ReportSummary';
import SummaryModal from './components/SummaryModal';

import Button from '../Button';

import { getSymbolsList } from './selectors';
import { loadSymbols, submitReport } from './actions';
import { getTimeForDatabase } from '../../utils/dateUtil';

class AddReport extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedSymbolList: null, // To store the children of selected symbol from the symbol list
      summary: {}, // To store summary of selected symbols
      showSummaryModal: false,
    };

    // Model handler for smaller screens
    this.handleClose = () => {
      this.setState({ showSummaryModal: false });
    }

    this.handleShow = () => {
      this.setState({ showSummaryModal: true });
    }

    this.selectionForSubmit = {
      customerId: this.props.customerId,
      tasksId: this.props.taskId,
      eventTime: getTimeForDatabase(),
      status: 'finished',
      symbolSelections: [],
    };

    this.selectedSymbol = null; // To know what symbols is selected in symbolList to show in detail view
  }

  componentWillMount() {
    console.log('componentWillMount in Customers running');
    this.props.loadSymbols(); // Load the task list before mounting the component
  }

  // This functions is used to select the children of selected symbol from the symbol JSON
  selectSymbol = (selectedId, selectedSymbol) => {
    this.selectedSymbol = selectedSymbol; // Save the selected symbol on selected symbols variable to track it
    // go through the JSON and select the selected symbol children
    for (let i = 0; i < this.props.symbolList.children.length; i++) {
      /* if the selected symbol ID is same as the id of symbol in current iteration of
       JSON, set the selectedSymbolList to the children of that symbol*/
      if (this.props.symbolList.children[i].id === selectedId) {
        this.setState({
          selectedSymbolList: this.props.symbolList.children[i],
        });
      }
    }
  }

  // This function is use to generate the Summary based on user selection
  summary = (data, selection, textAreaText) => {
    if (selection.id.includes('radio')) {
      const currentKeys = Object.keys(this.state.summary); // Get the keys current state of summary
      let contains = false; // To check if the selection already exist
      let keysAt;// To hold already exsisting selction key.

      //Go though the current keys and find if the selected key already exist
      for (let i = 0; i < currentKeys.length; i++) {
        contains = currentKeys[0].split('*')[0] === selection.id.split('*')[0];
        if (contains) { // If it exist save the index of it and exit
          keysAt = i;
          break;
        }
      }

      if (this.state.summary.hasOwnProperty(selection.id)) { // If the selection already exist in summary, remove it.
        this.removeFromReport(selection.id);
      } else if (contains) {  // If the selection already exist in summary, remove it.
        this.removeFromReport(currentKeys[keysAt]);
      //  this.removeFirstAddReport(currentKeys[keysAt], event.target.id);
      } else {
        this.addToReport(data, selection.id); // Otherwise add the report
      }
    }
    else if (!selection.checked && !selection.id.includes('textField')) { // For checkboxes. If it is checked, add it to report.
      this.addToReport(data, selection.id)
    } else if (selection.id.includes('textField')) { // If it is textfield
      if (this.state.summary[selection.id] !== '') { // If it is not empty add to report
        this.addToReport(data,  selection.id, textAreaText);
      } else {
        this.removeFromReport(selection.id); // If it is empty remove from report
      }
    } else {
      this.removeFromReport(selection.id);
    }
    //this.setState({ summary : event.target.value});
    //this.setState(prevState => { summary : {[event.target.value] : event.target.value}});
    //this.setState({ summary : {selection: event.target.value, firstParent:event.target.firstparent , secondParent:event.target.secondparent} });
  }

  // Function to add to report
  addToReport = (data, id, textAreaText) => {
    const summary = Object.assign({}, this.state.summary);

    /* If the selected symbol is textarea */
    if (textAreaText) {
      data.displayName = textAreaText;
      summary[id] = data.displayName;
      this.setState({ summary });
    } else {
      summary[id] = data.displayName;
      this.setState({ summary });
    }

    /* Add into summary report for submit also*/
    if (!this.removeSelectionForSubmit(this.selectionForSubmit, data)) {
      const preparedData = {
        symbol: data,
      };

      if (textAreaText) {
        preparedData.text = textAreaText;
      }
      this.selectionForSubmit.symbolSelections.push(preparedData);
    }

    console.log(this.selectionForSubmit);
  }

  // Function for removing from report
  removeFromReport = (id) => {
    const summary = Object.assign({}, this.state.summary);
    delete summary[id];
    this.setState({ summary });
  }

  removeSelectionForSubmit = (selectionSummary, data) => {
    selectionSummary.symbolSelections.some((item, index) => {
      if (item.symbol.id === data.id) {
        selectionSummary.symbolSelections.splice(index, 1);
        return true;
      }
      return false;
    });
  }

  removeFirstAddReport = (removeId, addId) => {
    const summary = Object.assign({}, this.state.summary);
    delete summary[removeId];
    this.setState({ summary }, () => this.addToReport(addId));
  }

  submitReport = (customerId, payload) => {
    this.props.submitReport(customerId, payload);
  }

  render() {
  //  const selectedClickHandler = () => this.submitReport(this.selectionForSubmit, this.props.customerId);
    const selectedClickHandler =  window.matchMedia('(max-width: 768px)').matches ? () => this.handleShow() : () => this.submitReport(this.props.customerId, this.selectionForSubmit);
    return (
      <Row>
        <Col sm={12} xs={12}>
          <Row>
            <Col md={3} sm={6} xs={12}>
              <SymbolsList
                symbols={this.props.symbolList}
                selectSymbol={this.selectSymbol}
                selectedSymbol={this.selectedSymbol}
                summaryUpto={this.state.summary}
                summary={this.summary}
                checkedSymbols={this.checkedSymbols}
                selectedSymbolList={this.state.selectedSymbolList}
              />
            </Col>
            <Col md={5} smHidden xsHidden>
              <SymbolDetail
                selectedSymbolList={this.state.selectedSymbolList}
                summaryUpto={this.state.summary}
                summary={this.summary}
                selectedSymbol={this.selectedSymbol}
                checkedSymbols={this.checkedSymbols}
                />
            </Col>
            <Col md={4} sm={6} xsHidden>
              <ReportSummary summary={this.state.summary} />
            </Col>
          </Row>
          <Row>
            <Col sm={6} xs={6}>
              <Button text={'Cancel'} type={'start'} />
            </Col>
            <Col sm={6} xs={6}>
              <Button text={'Finish'} type={'Finish'} clickHandler={selectedClickHandler} />
            </Col>
          </Row>
        </Col>
        <SummaryModal
          summary={this.state.summary}
          show={this.state.showSummaryModal}
          clickHandler={() => this.submitReport(this.props.customerId, this.selectionForSubmit)}
          handleClose={this.handleClose}
          />
      </Row>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  symbolList: getSymbolsList(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadSymbols: bindActionCreators(loadSymbols, dispatch),
    submitReport: bindActionCreators(submitReport, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddReport);

/*
<Row>
  <Col sm={6} xs={6}>
    <Button text={'Cancel'} type={'start'} />
  </Col>
  <Col sm={6} xs={6}>
    <Button text={'Finish'} type={'Finish'} />
  </Col>
</Row>
*/
