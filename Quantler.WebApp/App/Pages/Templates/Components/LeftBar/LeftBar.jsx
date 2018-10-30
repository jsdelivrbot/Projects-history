import {Component}        from 'react'
import {TemplateLoader}   from '../../../../Services/API/Template/Loader.jsx'
import {Collapsr}         from '../../../../Components/Collapsr/Main.jsx'
import {Template}         from '../../../../Services/API/Models.jsx'
import {connect}          from '../../../../State.jsx'
import {SideBar}          from '../SideBar/Main.jsx'
import * as TemplatesEditor from '../../Functions/Editor.jsx'
import * as TemplatesUI     from '../../Functions/UI.jsx'
import _                    from 'lodash'

function mapChildren (template, templateType) {
  return _.extend(TemplateLoader.templateItem(template),
    {
      template: template,
      id: template.ID,
      name: template.Name,
      icon: <i className="fa fa-chain-broken"/>,
      parent: templateType,
      children: (template.CodeFiles.length == 0 ? null
          : _.sortBy(template.CodeFiles
          .reduce((files, codeFile) => {
              return files.concat(
                {
                  icon: <i className="fa fa-file-code-o"/>,
                  title: codeFile.Name,
                  codeFile: true,
                  style: { paddingLeft: 36 },
                  parent: {
                    name: template.Name,
                    id: template.ID
                  }
                })
            }
            , []), 'title')
      )
    })
}

function mapTemplates (templates, templateType) {
  return {
    title: templateType,
    id: templateType,
    icon: TemplateLoader.iconElement(templateType),
    children: _(templates)
      .map(template => mapChildren(template, templateType))
      .sortBy('name')
      .value()
  }
}

function formatTemplates (templates) {
  return _(templates)
    .filter((template:Template) => template.Type !== 'Indicator')
    .groupBy((template) => template.Type)
    .map(mapTemplates)
    .sortBy('title')
    .value()
}

// Used for sidebar attributes
let IconElement = ({ className }) => <i className={"fa " + className}/>

// hack for setting collapsr state from outside of it
export let setCollapsrState = () => {}
function collapsrRegisterControl (collapsrToggleFunc) {
  setCollapsrState = collapsrToggleFunc
}

@connect(state => ({
  templates: state.Templates.Editor.templates,
  activeFileName: state.Templates.Editor.activeFileName,
  activeTemplateId: state.Templates.Editor.activeTemplateId,
  date: Date.now()
}))
class TemplatesCollapsr extends Component {
  render () {
    let { templates, activeFileName, activeTemplateId } = this.props
    let formattedTemplates = _.extend([], formatTemplates(templates))

    let options = {
      renderLevel: 3,
      activePredicates: {
        item: item =>
        item.title == activeFileName
        && item.template == activeTemplateId
      },
      onClickFunc (item)
      {
        if (item.codeFile) {
          TemplatesEditor.openFile({
            templateId: item.parent.id,
            fileName: item.title
          })
        }
        else if (!!item.parent) {
          TemplatesEditor.setActiveTemplate({
            templateId: item.template.ID
          })
        }
      }
    }

    return <Collapsr options={ options }
                     data={ formattedTemplates }
                     registerControl={ _ => collapsrRegisterControl(_) }/>
  }
}

export class LeftBar extends Component {
  render () {
    let { UI } = this.props
    let { leftSidebarWidth } = UI
    let SideBarAttributes = {
      width: leftSidebarWidth,
      side: 'left',
      title: "Templates",
      optionItems: [
        {
          element: <IconElement className="fa-minus"/>,
          props: {
            onClick: () => TemplatesUI.leftSidebarWidth(0)
          }
        }
      ],
      holderClass: "box-content",
      className: "col-sm-2 box-lrmenu box-left unselectable-all",
      holderStyle: {
        padding: 0
      }
    }

    return (
      <SideBar { ...SideBarAttributes }>
        <TemplatesCollapsr />
      </SideBar>
    )
  }
}
