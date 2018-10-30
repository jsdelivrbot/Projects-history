import {getTemplates}    from '../../../Functions/Networking/API/Templates.jsx'
import {BacktesterState} from './BacktesterState.jsx'
import {State}           from '../../../State.jsx'
import * as Notification   from '../../../Functions/UI/Notification.jsx'
import moment              from 'moment'
import _                   from 'lodash'

//                                                         State

export function activeTemplate () {
  let { activeTemplateId, strategy, templates } = BacktesterState()

  let activeTemplate = _.find(templates, { ID: activeTemplateId })
  let templateInStrategy = _.includes(strategy.templateIds, activeTemplateId)

  if (activeTemplate && templateInStrategy) {
    return activeTemplate
  }
  else {
    return _.find(strategy.templatesCurrentTest, { ID: activeTemplateId })
  }
}

export function activeCodeFile () {
  let { activeCodeFileName } = BacktesterState()

  let template = activeTemplate()

  if (!template) {
    return undefined
  } else {
    return _.find(
      template.CodeFiles, { Name: activeCodeFileName })
  }
}

export function previousTest () {
  return _.last(BacktesterState().backtest.previousTests)
}

export function parseTimeframe ({ time }) {
  let parsedTimeframe = moment.duration(time, 'seconds')

  let hours = String(parsedTimeframe.hours())
  let minutes = String(parsedTimeframe.minutes())
  let seconds = String(parsedTimeframe.seconds())

  return (hours.length == 1 ? '0' + hours : hours)
    + ':' + (minutes.length == 1 ? '0' + minutes : minutes)
    + ':' + (seconds.length == 1 ? '0' + seconds : seconds)
}

//                                                          View

// which templates to render, for
// strategy designer and code editor
export function resolveViewTemplates () {
  let { strategy, templates } = BacktesterState()

  let templatesToRender = strategy.templateIds.map(templateId =>
    _.find(templates, { ID: templateId }))

  strategy.templateIdsCurrentTest.forEach(templateId => {
    if (strategy.templateIds.indexOf(templateId) == -1) {
      templatesToRender.push(
        _.find(strategy.templatesCurrentTest, { ID: templateId }))
    }
  })

  return templatesToRender
}

// returns samples equivalent to selected
// symbol. used at global settings
export function resolveViewSamples () {
  let { samples, strategy } = BacktesterState()
  let { Samples }           = strategy.globalSettings
  let { Symbol }            = Samples

  if (Symbol && samples.length > 0) {
    return samples.reduce((samples, sample) => {
        if (sample.Symbol.ID == Symbol.ID) {
          return samples.concat(sample)
        } else {
          return samples
        }
      }
      , [])
  }
  else {
    return []
  }
}

// only symbols that are used by any sample
export function resolveViewSymbols () {
  let { samples } = BacktesterState()

  return _.reduce(
    _.groupBy(samples, 'Symbol.Name'),
    (symbols, samples) => symbols.concat(samples[0].Symbol),
    [])
}


