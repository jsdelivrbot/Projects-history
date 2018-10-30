import {Component, PropTypes, Children, addons} from 'react/addons';
import {default as _}                           from 'lodash';
import {Store, PubSub}                          from '../../Services/Utils/pubsub.jsx';

class TabsController extends Store {

  tabs = []
  panels = []

  selectedTab (v) {
    if (v && (v != this._selectedTab) && (v <= this.tabs.length) && (v >= 1)) {
      this._selectedTab = v
      this.Publish()
    }
    return this._selectedTab || 1
  }

}

export function tabr (options = {}) {

  let tabsController:TabsController = new TabsController()

  return {

    Tab: class Tab extends Component {

      id = ''

      constructor () {
        super()
        this.id = tabsController.tabs.push(null)
      }

      componentWillMount () {
        this.unsubscribe = tabsController.Subscriber(() => {
          this.setState({ '': '' })
        })
      }

      componentWillUnmount () {
        PubSub.unsubscribe(this.unsubscribe)
      }

      renderChildren () {
        return Children.map(this.props.children, (child) => {
          return addons.cloneWithProps(child, {
            className: (
              (tabsController.selectedTab() == this.id)
                ? options.activeClassName || ' active '
                : ''
            ),
            tabr: {
              activeTab: tabsController.selectedTab(),
              tabId: this.id
            }
          })
        })
      }

      handleClick () {
        if (!options.clickDisabled) {
          tabsController.selectedTab(this.id)
        }
      }

      render () {
        return (
          <div onClick={() => this.handleClick()}>
               {this.renderChildren()}
          </div>
        )
      }

    },

    Panel: class Panel extends Component {

      id = ''

      constructor () {
        super()
        this.id = tabsController.panels.push(null)
      }

      componentWillMount () {
        this.unsubscribe = tabsController.Subscriber(() => {
          this.setState({ '': '' })
        })
      }

      componentWillUnmount () {
        PubSub.unsubscribe(this.unsubscribe)
      }

      renderChildren () {
        return Children.map(this.props.children, (child) => {
          return addons.cloneWithProps(child, {
            tabr: {
              activeTab: tabsController.selectedTab(),
              panelId: this.id
            }
          })
        })
      }

      render () {
        return (
          <div>
            {
              (tabsController.selectedTab() != this.id)
                ? null
                : this.renderChildren()
            }
          </div>
        )
      }

    },

    controller: tabsController

  }

}
