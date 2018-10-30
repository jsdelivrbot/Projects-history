import {Store}              from '../../Utils/pubsub.jsx';
import {default as _}       from 'lodash';
import {APIURL}             from '../Main.jsx';
import {AjaxErrorHandler}   from '../../../Functions/Networking/API/Main.jsx';
import {Symbol}             from '../Models.jsx';
import moment               from 'moment';
import {AjaxHandler}        from '../AjaxHandler.jsx';

//                                 Symbol service for retrieving symbol based data
class SymbolServiceClass extends Store {


  //                                     Current Symbols Container
  symbolsData:Array<Symbol> = []

  //                                      Ready & Load All Symbols
  ready () {
    return this.symbolsData.length > 0;
  }

  //                                          Update current store
  update () {
    //Because symbol data is very static, there is no need to Refresh if we already have the Data
    if (this.ready()) {
      return;
    }

    //Get the data from the API
    AjaxHandler.Get(APIURL + 'symbol')
      .success((data) => {
        //Set data object
        this.symbolsData = data;

        //Publish data back to components
        this.Publish();
      })
      .fail(AjaxErrorHandler)
  }

  //                                         Loading Specific Data
  symbol (symbolId):Symbol {
    return _.filter(this.symbolsData, (symbol:Symbol) => symbol.ID == symbolId)[0]
  }

  //                                        Get symbol data (OHLC)
  getData (SymbolID:Number, StartDT:Number, EndDT:Number, Timeframe:Number) {
    return AjaxHandler.Get(
      APIURL
      + `symbol/${SymbolID}/data`
      + `?StartDTUTC=${StartDT}`
      + `&EndDTUTC=${EndDT}`
      + `&Timeframe=${Timeframe}`);
  }
}

export var SymbolService:SymbolServiceClass = new SymbolServiceClass()
