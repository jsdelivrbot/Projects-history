import {State} from '../../../State.jsx'
import _         from 'lodash'

export function initialize () {
  let { templatesContentHeight } = State.getState().Templates.UI

  if (templatesContentHeight === null) {
    updateContentHeight()

    let timeout = setTimeout(() => {}, 0)

    $(window).resize(() => {
      clearTimeout(timeout)
      timeout = setTimeout(updateContentHeight, 0)
    })
  }
}

export function updateMaxWidths () {
  let { layoutWidth } = State.get().ui

  let { leftSidebarWidth, rightSidebarWidth } = State.get().Templates.UI

  State.setState({
    Templates: {
      UI: {
        rightMaxWidth: $(window).width() - leftSidebarWidth - layoutWidth,
        leftMaxWidth: $(window).width() - rightSidebarWidth - layoutWidth
      }
    }
  })
}

export function updateContentHeight () {
  templatesContentHeight($(window).height() - 149)
  updateMaxWidths()
}

export function templatesContentHeight (v) {
  if (typeof v !== 'undefined') {
    State.setState({
      Templates: {
        UI: {
          templatesContentHeight: (v < 0) ? 0 : v
        }
      }
    })
  }
}

export function rightSidebarWidth (v) {
  if (typeof v !== 'undefined') {
    let { rightMaxWidth } = State.getState().Templates.UI

    State.setState({
      Templates: {
        UI: {
          rightSidebarWidth: (v < 1) ? 1
            : (v < rightMaxWidth) ? v
            : rightMaxWidth
        }
      }
    })

    updateMaxWidths()
  }
}

export function leftSidebarWidth (v) {
  if (typeof v !== 'undefined') {
    let { leftMaxWidth } = State.getState().Templates.UI

    State.setState({
      Templates: {
        UI: {
          leftSidebarWidth: ((v < 1) ? 1
            : (v < leftMaxWidth) ? v
            : leftMaxWidth)
        }
      }
    })

    updateMaxWidths()
  }
}

export function editorFooterHeight (v) {
  if (typeof v !== 'undefined') {
    let { templatesContentHeight } = State.getState().Templates.UI

    State.setState({
      Templates: {
        UI: {
          editorFooterHeight: (v < 1) ? 1
            : (v < templatesContentHeight) ? v
            : templatesContentHeight
        }
      }
    })
  }
}

export function updateWidth (value:number, side:string) {
  switch (side) {
    case 'left'  :
      return leftSidebarWidth(value)
    case 'right' :
      return rightSidebarWidth(value)
    default      :
      return;
  }
}

// modalState = true/false
export function handleToggleModal (modalName, modalState) {
  return function () {
    let newModalState = ( typeof modalState != 'undefined'
      ? modalState
      : !State.getState().Templates.UI.modals[modalName] )

    State.setState({
      Templates: {
        UI: {
          modals: {
            [ modalName ]: newModalState
          }
        }
      }
    })
  }
}

export function handleFooterSetTab (tabId) {
  State.setState({
    Templates: {
      UI: {
        editor: {
          footer: {
            tab: tabId
          }
        }
      }
    }
  })
}

export function footerIsActiveTab (tabId, classNameReturn = "active") {
  let { tab } = State.getState().Templates.UI.editor.footer
  return (tabId == tab ? classNameReturn : "")
}

export function hideSaveNotification () {
  State.setState({
    Templates: {
      UI: {
        showSaveNotification: false
      }
    }
  })
}


