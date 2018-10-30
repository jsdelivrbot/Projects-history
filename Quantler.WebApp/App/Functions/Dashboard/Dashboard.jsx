import * as API from '../Networking/API/API.jsx'
import _ from 'lodash'
import Utils from '../Utils/Utils.jsx'
import {TemplateTooltip} from '../../Components/Template/TemplateTooltip.jsx'

let dashboard = dashboard => ({ state: { dashboard } })

export let Dashboard =
{
  load ()
  {
    return {
      ...dashboard({
        index: {
          loading: false
        }
      }),
      ajax: [
        [[
          [API.Templates.getPublicTemplates,
            { page: 1, pageSize: 6 }],
          [API.Templates.getTemplates, {}],
          [API.Templates.templatesNeedUpdate, {}]
        ],
          Dashboard._latestTemplates
        ],
        [API.Algorithms.getHistory,
          { page: 1, pageSize: 5 },
          Dashboard._latestAlgorithms
        ],
        [API.Community.loadPosts,
          { page: 1, pageSize: 5 },
          Dashboard._communityPosts
        ],
      ]
    }
  },

  unLoad ()
  {
    return {
      ...dashboard({
        index: {
          loading: true,
          latestAlgorithms: { loading: true },
          latestTemplates: { loading: true },
          communityPosts: { loading: true }
        }
      })
    }
  },

  _latestTemplates (props)
  {
    let [ publicTemplates, userTemplates, needsUpdate ] = props

    if (!publicTemplates) return {}

    let latestTemplates = publicTemplates.Content.map(template => {
      let { ID, Owner } = template

      template.imported = !!_.find(userTemplates,
        { ID, Owner: { UserID: Owner.UserID } })

      template.needsUpdate = !!_.find(needsUpdate,
        { ID, Owner: { UserID: Owner.UserID } })

      return template
    })

    return {
      ...dashboard({
        index: {
          latestTemplates: {
            loading: false,
            value: latestTemplates
          }
        }
      })
    }
  },

  _latestAlgorithms ({ Content })
  {
    Content.forEach((algorithm) => {
      algorithm.TemplateItems = algorithm.Templates.map((template) =>
        <a
          href={ '#/templates/' + template.ID }
          style={{ marginRight: 10 }}
          key={ algorithm.ID + ':' + template.ID }
        >
          <TemplateTooltip
            noMargin={ true }
            type={ template.Type }
            name={ template.Name }
            hoverMessage={ Utils.templateTooltipText(template) }/>
        </a>)
      algorithm.SharpeRatio = Utils.algorithmSharpeRatio(algorithm)
    })

    return {
      ...dashboard({
        index: {
          latestAlgorithms: {
            loading: false,
            value: Content
          }
        }
      })
    }
  },

  _communityPosts ({ Content })
  {
    return {
      ...dashboard({
        index: {
          communityPosts: {
            loading: false,
            value: Content
          }
        }
      })
    }
  },
}
