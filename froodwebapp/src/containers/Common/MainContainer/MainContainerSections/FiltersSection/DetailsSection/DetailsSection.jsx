import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Button } from 'components';
import { Input } from 'antd';
import { prepareFilterValue, getMaxId } from 'utils';
import { map, cloneDeep } from 'lodash';
import FilterRow from './FilterRow/FilterRow';
import {
  searchSection,
  saveFilterButton,
  deleteFilterButton
} from './DetailsSection.scss';

const getDefaultFilterValue = defaultColumnId => ([{
  id: 0,
  logicalOpId: null, // no logical operator for the first row
  relationalOpId: 1, // Is Equal
  columnId: defaultColumnId, // Would be first filter column in array
  value: '', // Would be default components value
}]);

class DetailsSection extends Component {
  constructor(props) {
    super(props);
    if (!props.activeFilter.id) {
      this.state = {
        filterValue: getDefaultFilterValue(props.filterColumns[0].id),
        name: ''
      };
    } else {
      this.state = {
        filterValue: props.activeFilter.value.map((fv, index) => ({ id: index, ...fv })),
        name: props.activeFilter.name
      };
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.activeFilter.id) {
      this.setState({
        filterValue: getDefaultFilterValue(nextProps.filterColumns[0].id),
        name: ''
      });
    } else {
      this.setState({
        filterValue: nextProps.activeFilter.value.map((fv, index) => ({ id: index, ...fv })),
        name: nextProps.activeFilter.name
      });
    }
  }

  handleFilterNameChange = (e) => {
    this.setState({ name: e.target.value });
  }

  // Add/Delete Filter
  handleSaveFilter = () => {
    const {
      activeFilter
    } = this.props;

    const {
      filterValue,
      name
    } = this.state;

    if (!activeFilter.userDefined) {
      this.props.saveFilterRequest({
        payload: {
          name,
          value: prepareFilterValue(filterValue)
        }
      });
    } else {
      this.props.updateFilterRequest({
        payload: {
          id: activeFilter.id,
          name,
          value: prepareFilterValue(filterValue)
        }
      });
    }
  }

  handleDeleteFilter = () => {
    const { activeFilter } = this.props;

    this.props.deleteFilterRequest({ id: activeFilter.id });
  }

  // Add/Delete Filter Row
  handleAddFilterRow = () => {
    const { filterColumns } = this.props;

    const filterValue = map(this.state.filterValue, cloneDeep);
    const maxIndex = getMaxId(filterValue);

    filterValue.push({
      id: maxIndex + 1,
      relationalOpId: 1, // Is Equal
      columnId: filterColumns[0].id,
      logicalOpId: 7, // AND
      value: ''
    });

    if (filterValue.length > 10) filterValue.length = 10; // Max 10 Filter Rows

    this.setState({
      filterValue
    });
  }

  handleDeleteFilterRow = (e) => {
    const filterValue = map(this.state.filterValue, cloneDeep);
    const elementIndex = filterValue.findIndex(row => row.id === Number(e.target.id));
    filterValue.splice(elementIndex, 1);

    this.setState({
      filterValue
    });
  }

  // Filter Manipulation Logic
  handleChangeColumn = (id, columnId) => {
    const filterValue = map(this.state.filterValue, cloneDeep);

    filterValue[id].columnId = columnId;
    filterValue[id].relationalOpId = 1; // Is Equal To
    filterValue[id].value = ''; // reset value if column changed

    this.setState({
      filterValue
    });
  }

  handleChangeColumnAvailableValue = (id, value) => {
    this.handleFilterChange(id, value, 'value');
  }

  handleChangeLogicalOperator = (id, logicalOpId) => {
    this.handleFilterChange(id, logicalOpId, 'logicalOpId');
  }

  handleChangeRelationalOperator = (id, relationalOpId) => {
    this.handleFilterChange(id, relationalOpId, 'relationalOpId');
  }

  handleFilterChange = (id, value, prop) => {
    const filterValue = map(this.state.filterValue, cloneDeep);
    filterValue[id][prop] = value;

    this.setState({
      filterValue
    });
  }

  handleFilterInputChange = (e) => {
    const filterValue = map(this.state.filterValue, cloneDeep);
    filterValue[e.target.id].value = e.target.value;

    this.setState({
      filterValue
    });
  }

  handleDatePickerChange = (date, id) => {
    const filterValue = map(this.state.filterValue, cloneDeep);
    filterValue[id].value = date;

    this.setState({
      filterValue
    });
  }

  render() {
    const {
      activeFilter: {
        userDefined
      },
      filterColumns
    } = this.props;

    const {
      filterValue,
      name
    } = this.state;

    return (
      <div className={ searchSection }>
        <Row>
          <Col xs={ 2 } sm={ 1 } md={ 1 } lg={ 1 } />
          <Col xs={ 3 } sm={ 3 } md={ 3 } lg={ 2 }>
            <Input
              placeholder="Filter name.."
              size="default"
              value={ name }
              onChange={ this.handleFilterNameChange }
            />
          </Col>
          <Col xs md sm lg>
            <Button
              size="default"
              className={ saveFilterButton }
              onClick={ this.handleSaveFilter }
            >
              Save
            </Button>
            { userDefined &&
              <Button
                size="default"
                className={ deleteFilterButton }
                onClick={ this.handleDeleteFilter }
              >
                Delete
              </Button>
            }
          </Col>
        </Row>
        { filterValue.map((rowData, index) => (
          <FilterRow
            key={ index }
            rowIndex={ index }
            rowData={ rowData }
            filterColumns={ filterColumns }
            // Filter Dropdown/Input/Datepicker handlers
            handleChangeColumn={ this.handleChangeColumn }
            handleChangeColumnAvailableValue={ this.handleChangeColumnAvailableValue }
            handleChangeLogicalOperator={ this.handleChangeLogicalOperator }
            handleChangeRelationalOperator={ this.handleChangeRelationalOperator }
            handleFilterInputChange={ this.handleFilterInputChange }
            handleDatePickerChange={ this.handleDatePickerChange }
            // Add/Delete Filter Row
            handleAddFilterRow={ this.handleAddFilterRow }
            handleDeleteFilterRow={ this.handleDeleteFilterRow }
          />
        ))}
      </div>
    );
  }
}

DetailsSection.defaultProps = {
  activeFilter: {
    id: null,
    userDefined: false
  }
};

DetailsSection.propTypes = {
  // data
  activeFilter: PropTypes.object,
  filterColumns: PropTypes.array.isRequired,
  // redux-base
  saveFilterRequest: PropTypes.func.isRequired,
  updateFilterRequest: PropTypes.func.isRequired,
  deleteFilterRequest: PropTypes.func.isRequired,
};

export default DetailsSection;
