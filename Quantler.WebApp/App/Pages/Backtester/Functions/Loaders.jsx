import {getTemplates}    from '../../../Functions/Networking/API/Templates.jsx'
import {BacktesterState} from './BacktesterState.jsx'
import {State}           from '../../../State.jsx'
import * as Notification   from '../../../Functions/UI/Notification.jsx'
import * as SymbolAPI      from '../../../Functions/Networking/API/Symbol.jsx'
import * as SampleAPI      from '../../../Functions/Networking/API/Sample.jsx'
import _                   from 'lodash'

function ajaxFail (notification) {
  return function (...xhrError) {
    Notification.error(notification)
  }
}

export function loadTemplates () {
  getTemplates()
    .done(templates => {
      let { strategy } = BacktesterState()
      let templateIds = templates.map(template => template.ID)

      BacktesterState({
        templates,
        templatesOriginal: templates
      })

      // if a strategy template is no longer available
      // and it's in the strategy, remove it
      let updatedStrategyTempaltes = strategy.templateIds
        .filter(templateId => templateIds.includes(templateId))

      BacktesterState(
        {
          strategy: {
            templateIds: updatedStrategyTempaltes
          }
        })
    })
    .fail((xhr, status, error) => {
      console.log(xhr, status, error)
      ajaxFail({ title: 'Error while loading templates' })
    })
}

export function loadSymbols () {
  SymbolAPI
    .getSymbols()
    .done(symbols => BacktesterState({ symbols }))
    .fail((xhr, status, text) => {
      console.log(xhr, status, text)
      ajaxFail({ title: 'Error while loading symbols' })()
    })
}

export function loadSamples () {
  SampleAPI
    .getSamples()
    .done(samples =>
      BacktesterState({ samples }))
    .fail(ajaxFail({
      title: 'Error while loading samples'
    }))
}
