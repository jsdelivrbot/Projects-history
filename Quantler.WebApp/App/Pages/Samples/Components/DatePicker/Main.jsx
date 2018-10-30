import {Component, PropTypes} from 'react';
import {default as _}         from 'lodash';
import {}                     from './DatePicker.scss';
import $                      from 'jquery';
import {}                     from 'bootstrap-datepicker';
import moment                 from 'moment'

type
DatePickerProps = {
  defaultValue: String,
  onChange: Function
}

export class QDatePicker extends Component {

  instanceId = _.uniqueId('QDatePicker_')

  props:DatePickerProps

  //                                             Lifecycle Methods

  componentDidMount () {
    $(() => {
      let $instance = $('#' + this.instanceId)

      $instance
        .datepicker({
          orientation: 'top',
          autoclose: true,
          startDate: "07/21/1994",
          endDate: "07/21/2024"
        })
        .on('changeDate', (e) => {
          this.props.onChange(moment(e.date).unix())
        })
    })
  }

  componentWillUnmout () {
    $(() => $('#' + this.instanceId).datepicker('remove'))
  }

  componentDidUpdate () {
    $(() => {
      $('#' + this.instanceId).datepicker('setDate', new Date(this.props.defaultValue))
    })
  }

  shouldComponentUpdate (nextProps:DatePickerProps) {
    return (nextProps.defaultValue != this.props.defaultValue
    || !_.isEqual(_.extend({}, nextProps.onChange), _.extend({}, this.props.onChange)))
  }

  render () {
    let defaultValue = (typeof this.props.defaultValue == 'undefined') ? {}
      : { defaultValue: moment(this.props.defaultValue).format('DD/MM/YYYY') }

    return (
      <div className="QDatePicker">
        <div className="input-group date-container">

                    <span className="input-group-addon">
                        <i className="fa fa-calendar"/>
                    </span>

          <input type="text" id={this.instanceId}
                 name={this.instanceId}
                 className="form-control"
                 placeholder="DD/MM/YYYY"
                 {...defaultValue}/>

        </div>
      </div>
    );
  }
}
