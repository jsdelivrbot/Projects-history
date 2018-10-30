import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';

import EveryDay from './RepetitionTemplates/EveryDay';
import EveryWeek from './RepetitionTemplates/EveryWeek';
import EveryNDay from './RepetitionTemplates/EveryNDay';
import EveryMonthWithDayOption from './RepetitionTemplates/EveryMonthWithDayOption';
import RepetitionCalendar from './RepetitionTemplates/RepetitionCalendar';

import { loadRepetitionsView } from '../../../TimelineCalendar/actions';
import { RepetitionViewsSelector } from '../../selectors';

export class Repetition extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      repetition: props.repetition,
      selectValue: this.props.type,
      dates: [],
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.type !== nextProps.type) {
      this.setState({ selectValue: nextProps.type });
    }
    if (this.props.repetitionviews.toJS()[this.props.repetition.id] !== nextProps.repetitionviews.toJS()[this.props.repetition.id]) {
      this.setState({ dates: nextProps.repetitionviews.toJS()[this.props.repetition.id] });
    }
    if (this.props.repetition !== nextProps.repetition) {
      this.setState({ repetition: nextProps.repetition });
    }
  }

  handleChange = (e) => {
    const defaultTypes = {
      EVERY_DAY: {
        repetitionType: 'EVERY_DAY',
        startDate: moment(this.props.formvalues.plannedStartTime).format('YYYY-MM-DDTHH:mm:ss'),
        endDate: moment(this.props.formvalues.plannedEndTime).format('YYYY-MM-DDTHH:mm:ss'),
        option: 'ALLOW_SPECIAL_HOLIDAY',
        comment: 'First Repetitive End Point',
        supressNotifications: false,
        manuallyAdded: true,
      },
      EVERY_NDAY: {
        repetitionType: 'EVERY_NDAY',
        startDate: moment(this.props.formvalues.plannedStartTime).format('YYYY-MM-DDTHH:mm:ss'),
        endDate: moment(this.props.formvalues.plannedEndTime).format('YYYY-MM-DDTHH:mm:ss'),
        option: 'ALLOW_SPECIAL_HOLIDAY',
        nDayNumber: 1,
        comment: 'First Repetitive End Point',
        supressNotifications: false,
        manuallyAdded: true,
      },
      EVERY_MONTH_WITH_DAY_OPTION: {
        repetitionType: 'EVERY_MONTH_WITH_DAY_OPTION',
        startDate: moment(this.props.formvalues.plannedStartTime).format('YYYY-MM-DDTHH:mm:ss'),
        endDate: moment(this.props.formvalues.plannedEndTime).format('YYYY-MM-DDTHH:mm:ss'),
        first: true,
        second: false,
        third: false,
        fourth: false,
        last: false,
        dayOfWeek1: true,
        dayOfWeek2: false,
        dayOfWeek3: false,
        dayOfWeek4: false,
        dayOfWeek5: false,
        dayOfWeek6: false,
        dayOfWeek7: false,
        option: 'ALLOW_SPECIAL_HOLIDAY',
        comment: 'First Repetitive End Point',
        supressNotifications: false,
        manuallyAdded: true,
      },
      EVERY_WEEK: {
        repetitionType: 'EVERY_WEEK',
        startDate: moment(this.props.formvalues.plannedStartTime).format('YYYY-MM-DDTHH:mm:ss'),
        endDate: moment(this.props.formvalues.plannedEndTime).format('YYYY-MM-DDTHH:mm:ss'),
        dayOfWeek1: true,
        dayOfWeek2: false,
        dayOfWeek3: false,
        dayOfWeek4: false,
        dayOfWeek5: false,
        dayOfWeek6: false,
        dayOfWeek7: false,
        option: 'ALLOW_SPECIAL_HOLIDAY',
        comment: 'First Repetitive End Point',
        supressNotifications: false,
        manuallyAdded: true,
      },
    };

    if (defaultTypes[e.target.value]) {
      this.props.changeRepetitonsType(this.props.repetition.id, defaultTypes[e.target.value]);
    } else {
      console.log('unknown type');
    }
  }

  loadRepetitionsView = (id, payload) => {
    this.props.loadrepetitionsview(id, payload);
  }

  renderFields = () => {
    switch (this.state.repetition.repetitionType) {
      case 'EVERY_MONTH_WITH_DAY_OPTION':
        return (
          <EveryMonthWithDayOption
            handlechange={this.handleChange}
            loadrepetitionsview={this.loadRepetitionsView}
            repetition={this.state.repetition}
            formvalues={this.props.formvalues}
          />
        );
      case 'EVERY_NDAY':
        return (
          <EveryNDay
            handlechange={this.handleChange}
            loadrepetitionsview={this.loadRepetitionsView}
            repetition={this.state.repetition}
            formvalues={this.props.formvalues}
          />
        );
      case 'EVERY_DAY':
        return (
          <EveryDay
            handlechange={this.handleChange}
            loadrepetitionsview={this.loadRepetitionsView}
            repetition={this.state.repetition}
            formvalues={this.props.formvalues}
          />
        );
      case 'EVERY_WEEK':
        return (
          <EveryWeek
            handlechange={this.handleChange}
            loadrepetitionsview={this.loadRepetitionsView}
            repetition={this.state.repetition}
            formvalues={this.props.formvalues}
          />
        );
      default:
        return (
          <div>
            <p>Default case</p>
          </div>
        );
    }
  }

  render() {
    return (
      <div>
        {this.renderFields()}
        <RepetitionCalendar dates={this.state.dates} specialholidays={this.props.specialholidays} />
      </div>
    );
  }
}

Repetition.propTypes = {
  changeRepetitonsType: PropTypes.func,
  id: PropTypes.number,
  type: PropTypes.string,
  loadrepetitionsview: PropTypes.func,
  repetitionviews: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  repetition: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  formvalues: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  specialholidays: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
};


const mapStateToProps = createStructuredSelector({
  repetitionviews: RepetitionViewsSelector(),
});

const mapDispatchToProps = dispatch => ({
  loadrepetitionsview: bindActionCreators(loadRepetitionsView, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Repetition);
