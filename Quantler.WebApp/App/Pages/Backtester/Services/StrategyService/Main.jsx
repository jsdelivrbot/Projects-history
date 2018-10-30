import {Store}            from '../../../../Services/Utils/pubsub.jsx';
import {default as _}     from 'lodash';
import {
  Template, Parameter,
  Sample, Symbol
} from '../../../../Services/API/Models.jsx';

export class StrategyTypeProperty {

  name:String
  properties:{ max : Number, current : Number }

  constructor (name:String, max:Number, current:Number) {
    this.name = name;
    this.properties = {
      max: max,
      current: current
    };
  }

}

export class StrategyServiceClass extends Store {

----
  //                                                      Getters & Setters

  // ----
  //                                      Template Settings

  // templateId : Number | null
  // activeSettingsTemplateId :Template.ID
  // Represents the selected template
  // Can be used for any Settings panel
  activeSettingsTemplateId (templateId):Number {

    if (typeof templateId == 'undefined') {
      return this._activeSettingsTemplateId || null;
    }

    this._activeSettingsTemplateId = templateId;

    this.Publish()

  }

  //value : Template | Array<Template>
  currentStrategy (value):Array<Template> {
    if (value) {
      if (Array.isArray(value)) {
        this._currentStrategy = _.cloneDeep(value)

        // Setting amount for each Template Type
        // in this.strategyProperties
        this.strategyProperties()
          .forEach((typeProperty:StrategyTypeProperty) => {
            typeProperty.properties.current = 0;
          })

        // grouping by template type then
        // counting amount of templates
        _(this._currentStrategy)
          .groupBy((template) => template.Type)
          .forEach((templates, type) => {
            this.strategyProperties(type)
              .properties.current = templates.length
          })
          .value()
      }
      else {
        this._currentStrategy.push(_.cloneDeep(value))
      }

      this.Publish()
    }

    return this._currentStrategy || (this._currentStrategy = [])
  }

  strategyProperties (templateType:String = ''):StrategyTypeProperty {
    return (templateType == '') ?
      this._strategyProperties
      : this._strategyProperties
      .filter((typeProperty) =>
      typeProperty.name == templateType)[0];
  }

  // will serve for persisting to browser
  // local storage with loki.js
  storage () {
    return this._storage
  }

  // ----
  //                                        Global Settings

  globalSettings = {}

  assetType (type) {
    if (type) {
      this.globalSettings.assetType = type;
      this.Publish()
    }
    return this.globalSettings.assetType
  }

  symbol (symbol:Symbol):Symbol {
    if (symbol) {
      this.globalSettings.symbol = _.cloneDeep(symbol);
      this.Publish()
    }
    return this.globalSettings.symbol
  }

  sample (sample:Sample):Sample {
    if (sample) {
      this.globalSettings.sample = _.cloneDeep(sample);
      this.Publish()
    }
    return this.globalSettings.sample
  }

  timeframeValue (value) {
    if (value) {
      this.globalSettings.timeframeValue = _.cloneDeep(value);
      this.Publish()
    }
    return this.globalSettings.timeframeValue
  }

  timeframeUnit (unit) {
    if (unit) {
      this.globalSettings.timeframeUnit = _.cloneDeep(unit);
      this.Publish()
    }
    return this.globalSettings.timeframeUnit
  }

----
  //                                                            Constructor

  constructor (storage) {
    super();

    this._storage = storage;

    // To limit the max amount of templates selected
    // for each type. Use this.strategyProperties() getter
    this._strategyProperties = [
      new StrategyTypeProperty('Entry', 3, 0),
      new StrategyTypeProperty('Risk Management', 1, 0),
      new StrategyTypeProperty('Money Management', 1, 0),
      new StrategyTypeProperty('Exit', 3, 0)
    ]
  }

----
  //                                                              Functions

  // ----
  //                                      Template Settings

  // Get a copy of the Template object from API/Template/Loader
  // and insert into this.currentStrategy
  addToStrategy (templateObject:Template) {
    let typeProperties = this.strategyProperties(templateObject.Type)

    // If the max amount of selected templates for the Type has been reached
    if (typeProperties.properties.current < typeProperties.properties.max
      && !_.find(this.currentStrategy(), { ID: templateObject.ID })) {
      // Increment Type selected amount
      typeProperties.properties.current++;

      this.currentStrategy().push(_.cloneDeep(templateObject))

      this.activeSettingsTemplateId(templateObject.ID);
    }
  }

  removeFromStrategy (templateID:Number) {
    let currentStrategy = this.currentStrategy()

    let type = currentStrategy
      .filter((template:Template) => template.ID == templateID)[0].Type;

    this.strategyProperties(type).properties.current--;

    this.currentStrategy(
      _.remove(currentStrategy, (template:Template) => template.ID !== templateID))

    this.activeSettingsTemplateId(null);
  }

  closeTemplateSettings () {
    this.activeSettingsTemplateId(null)
  }

  openTemplateSettings (templateId:Number) {
    // If Template with ID == templateId
    // exists in this.currentStrategy
    if (_.some(this.currentStrategy(), { ID: templateId })) {
      this.activeSettingsTemplateId(templateId);

      return true;
    }

    return false;
  }

  getStrategyTemplate (templateId:Number):Template {
    return this.currentStrategy()
      .filter((template:Template) => template.ID == templateId)[0]
  }

  // Updates the current strategy template's
  // parameter value and Publishes
  updateTemplateSettings (templateId:Number, parameterName:String, value) {
    let template = this.getStrategyTemplate(templateId)

    template.CodeFiles[0].Parameters =
      template.CodeFiles[0].Parameters
        .map((parameter) => {
          if (parameter.Name == parameterName) {
            parameter.Value = _.cloneDeep(value);
          }
          return parameter;
        })

    this.Publish("currentStrategy")
  }

}

export let StrategyService:StrategyServiceClass = new StrategyServiceClass();
