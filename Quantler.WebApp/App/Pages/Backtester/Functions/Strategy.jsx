import {getTemplates}    from '../../../Functions/Networking/API/Templates.jsx'
import {BacktesterState} from './BacktesterState.jsx'
import {State}           from '../../../State.jsx'
import * as Utils          from './Utils.jsx'
import * as Notification   from '../../../Functions/UI/Notification.jsx'
import moment              from 'moment'
import _                   from 'lodash'

//                                                      Strategy

export function addToStrategy ({ templateId, templateType }) {
  let { strategy, templates, templatesOriginal } = BacktesterState()
  let { templateIds, templateTypes }             = strategy
  let typeProperties = templateTypes[templateType]

  // template is already in strategy
  if (_.includes(templateIds, templateId) ||
    typeProperties.current >= typeProperties.max) {
    return false
  }

  // clear any modifications done to
  // template if it was already in strategy
  // e.g: code was edited and user wishes to reset it
  let updatedTemplates = templates.map(template => {
    if (template.ID == templateId) {
      template.CodeFiles = _.find(templatesOriginal, { ID: templateId }).CodeFiles
    }

    return template
  })

  let addQuantity = _.includes(strategy.templateIdsCurrentTest, templateId) ? 0 : 1

  BacktesterState({
    templates: updatedTemplates,
    strategy: {
      templateTypes: {
        [templateType]: {
          current: typeProperties.current + addQuantity
        }
      },
      templateIds: templateIds.concat(templateId)
    }
  })
}

export function removeFromStrategy ({ templateId, templateType }) {
  let { activeTemplateId, strategy } = BacktesterState()
  let {
    templateIds,
    templateTypes,
    templateIdsCurrentTest
  } = strategy

  // templateId is not in current strategy
  if (!_.includes(templateIds, templateId)
    && !_.includes(templateIdsCurrentTest, templateId)) {
    return false
  }

  // eg: Entry : { current, max }
  let typeProperties = templateTypes[templateType]

  // if templateId is the activeTemplateId,
  // set activeTemplateId to null
  let updatedActiveTemplateId =
    templateId == activeTemplateId
      ? null
      : activeTemplateId

  BacktesterState(
    {
      activeTemplateId: updatedActiveTemplateId,

      strategy: {
        templateTypes: {
          [templateType]: {
            current: typeProperties.current - 1
          }
        },

        templateIds: templateIds.filter(
          _templateId => _templateId != templateId),

        templateIdsCurrentTest: templateIdsCurrentTest.filter(
          _templateId => _templateId != templateId)
      }
    })
}

export function setStrategy ({ strategy, templateIds, globalSettings }) {
  let updatedStrategy = strategy ? strategy : { templateIds }

  if (globalSettings) {
    updatedStrategy['globalSettings'] = globalSettings
  }

  BacktesterState({
    activeTemplateId: null,
    activeCodeFileName: null,
    strategy: updatedStrategy
  })
}

//                                                     Templates

export function openTemplateSettings ({ templateId }) {
  BacktesterState({
    activeTemplateId: templateId,
    ui: {
      rightSidebarView: 'templateSettings'
    }
  })
}

export function closeTemplateSettings () {
  BacktesterState({
    rightSidebarView: 'globalSettings'
  })
}

export function updateTemplate ({ templateId, content }) {
  let { templates, strategy }  = BacktesterState()
  let { templatesCurrentTest } = strategy

  if (_.includes(strategy.templateIds, templateId)) {
    let updatedTemplates = templates.map(template => {
      if (template.ID == templateId) {
        return Object.deepExtend(template, content)
      } else {
        return template
      }
    })

    BacktesterState({ templates: updatedTemplates })
  }
  else if (_.find(templatesCurrentTest, { ID: templateId })) {
    let updatedTemplates = templatesCurrentTest.map(template => {
      if (template.ID == templateId) {
        return Object.deepExtend(template, content)
      } else {
        return template
      }
    })

    BacktesterState({
      strategy: {
        templatesCurrentTest: updatedTemplates
      }
    })
  }
}

//                                                    Code Files

export function openCodeFile ({ templateId, fileName }) {
  BacktesterState({
    activeTemplateId: templateId,
    activeCodeFileName: fileName
  })
}

export function updateFile ({ templateId, fileName, content }) {
  let { templates, strategy } = BacktesterState()

  let template = _.find(templates, { ID: templateId })
  let templateInStrategy = _.includes(strategy.templateIds, templateId)

  if (!template || !templateInStrategy) {
    template = _.find(strategy.templatesCurrentTest, { ID: templateId })
  }

  if (template) {
    updateTemplate({
      templateId,
      content: {
        CodeFiles: template.CodeFiles.map(codeFile => {
          if (codeFile.Name == fileName) {
            return Object.deepExtend(codeFile, content)
          } else {
            return codeFile
          }
        })
      }
    })
  }
}

export function updateActiveFileCode ({ code }) {
  let { activeTemplateId, activeCodeFileName } = BacktesterState()

  updateFile({
    templateId: activeTemplateId,
    fileName: activeCodeFileName,
    content: { Code: code }
  })
}

export function updateParameter ({ fileName, parameterName, value }) {
  let activeTemplate = Utils.activeTemplate()
  let codeFile = _.find(activeTemplate.CodeFiles, { Name: fileName })

  if (!codeFile) return false

  let updatedParameters = codeFile.Parameters.map(parameter => {
    if (parameter.Name == parameterName) {
      return Object.deepExtend(parameter, { Value: Number(value) })
    } else {
      return parameter
    }
  })

  updateFile({
    templateId: activeTemplate.ID,
    fileName: fileName,
    content: {
      Parameters: updatedParameters
    }
  })
}

//                                               Global Settings

export function updateGlobalSettings ({ setting, content }) {
  BacktesterState({
    startLiveTrading: {
      showButton: false
    },
    strategy: {
      globalSettings: {
        [setting]: content
      }
    }
  })
}

export function setAssetType ({ type }) {
  updateGlobalSettings({
    setting: 'AssetType',
    content: type
  })
}

export function setSymbol ({ symbolId }) {
  let { symbols } = BacktesterState()
  let Symbol = _.find(symbols, { ID: symbolId })

  if (Symbol) {
    updateGlobalSettings({
      setting: 'Samples',
      content: { Symbol }
    })
  }
}

export function setSample ({ sampleId }) {
  let { samples } = BacktesterState()
  let Sample = _.find(samples, { ID: sampleId })

  if (Sample) {
    updateGlobalSettings({
      setting: 'Samples',
      content: Sample
    })
  }
}

export function setTimeframe ({ value }) {
  updateGlobalSettings({
    setting: 'Settings',
    content: {
      DefaultTimeframe: value
    }
  })
}

export function setAdvancedSettings (settings) {
  updateGlobalSettings({
    setting: 'Settings',
    content: settings
  })
}
