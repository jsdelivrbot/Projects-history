import * as Notification from './UI/Notification.jsx'

export let errorTypes =
{
  API: {
    GET: {
      TEMPLATES: () =>
        ({
          type: 'API_GET_TEMPLATES',
          message: {
            title: "Error Loading Templates",
            text: "There was a network error loading the templates, please try again later"
          }
        })
    }
  },
  TEMPLATES: {
    // template (with id) does not exist
    NONEXISTENT_TEMPLATE: (templateId) =>
      ({
        type: 'NONEXISTENT_TEMPLATE',
        message: {
          title: "Error Opening Template",
          text: `Template with id ${templateId} does not exist`
        }
      })
  }
}

export function reportError (errorType, xhrError = {}) {
  Notification.error(errorType.message)
}
