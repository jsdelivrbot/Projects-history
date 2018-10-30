import {Store}              from '../../Utils/pubsub.jsx';
import {default as _}       from 'lodash';
import {APIURL}             from '../Main.jsx';
import {AjaxErrorHandler}   from '../../../Functions/Networking/API/Main.jsx';
import {Sample, Symbol}     from '../Models.jsx';
import moment               from 'moment';
import {AjaxHandler}      from '../AjaxHandler.jsx';

class SampleServiceClass extends Store {

  samplesData:Array<Sample> = []

  constructor () {
    super();
  }

  ready () {
    return this.samplesData.length > 0;
  }

  update () {
    AjaxHandler.Get(APIURL + 'sample?Symbol')
      .success((data) => {
        this.samplesData = data;
        this.Publish()
      })
      .fail(AjaxErrorHandler)
  }

  symbols () {
    return _.groupBy(this.samplesData, (sample) => sample.Symbol.Name)
  }

  sample (sampleId):Sample {
    return _.filter(this.samplesData, (sample:Sample) => sample.ID == sampleId)[0]
  }

  samples (symbol:Symbol):Array<Sample> {
    if (symbol) {
      return this.samplesData.filter((sample) => sample.Symbol.ID == symbol.ID)
    }

    return this.samplesData;
  }

  sampledata (sampleID:Number, start, end, timeframe:Number) {
    start = typeof start === 'string' ? moment(start).unix() : start;
    end = typeof end === 'string' ? moment(end).unix() : end;

    return AjaxHandler.Get(
      APIURL
      + `sample/${sampleID}/data`
      + `?StartDTUTC=${start}`
      + `&EndDTUTC=${end}`
      + `&Timeframe=${timeframe}`);
  }

  addSample (sample) {
    let { Name, Type, Order, Symbol, StartDT, EndDT } = sample

    return AjaxHandler.Put(APIURL + 'sample',
      {
        "Symbol": Symbol,
        "Name": Name,
        "Order": Order,
        "Enabled": true,
        "StartDT": moment(StartDT * 1000).format(),
        "EndDT": moment(EndDT * 1000).format(),
        "SampleType": Type,
        "AllowSystemCreation": true
      })
  }
}

export var SampleService:SampleServiceClass = new SampleServiceClass()
