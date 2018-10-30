import {Component, createClass} from 'react'
import _                        from 'lodash'
import {State}                from '../../../../State.jsx'
import * as API from '../../../../Functions/Networking/API/API.jsx';

function userUpgrade () {
  API.User
    .postSubscription({ Subscriptionorder: 2 })
    .done(data => {
      alert('Upgraded!')
      location.reload()
    })
    .error((error) => alert('bugged! ' + error.text))
}

let gplusCallBack = _.uniqueId("gplus")

// Google+
window[gplusCallBack] = (jsonParam) => {
  console.log(jsonParam)
  if (jsonParam.state == "on") {
    userUpgrade()
  }
}

function checkFb () {
  $(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '424437454397497',
        xfbml: true,
        version: 'v2.5'
      })

      window.FB.Event.subscribe("edge.create", userUpgrade)
    }
  })
}

let hasLoadedSDKs = false

function loadSocialSDKs () {
  if (!hasLoadedSDKs) {
    let networks = [{
      id: 'google-wjs',
      src: 'apis.google.com/js/platform.js'
    }, {
      id: 'facebook-jssdk',
      src: 'connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5'
    }]

    networks.forEach(network => {
      if (!document.getElementById(network.id)) {
        let js = document.createElement('script')
        js.id = network.id
        js.src = ((/^http:/.test(document.location) ? 'http' : 'https')
        + '://' + network.src )

        document.head.appendChild(js)
      }
    })

    hasLoadedSDKs = true

    checkFb()
  }
}

let modalHTML = (id) => `
<div class="modal fade" id="${ id }" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="QModal modal-dialog" role="document" style="width : 700px; min-width : 700px;">
        <div class="modal-content">
            <div ref="modalBody" class="QModal upgrade-modal" style="text-align: center">
                <div class="row">
                    <div class="col-md-12 description">
                        <p><h3 style="font-weight: 300" >Upgrade to frontrunner now!</h3></p>
                        <img src="${ "Art/" + 'Images/frontrunner.png' }" alt="Frontrunner"/>
                        <p style="fontSize:13px">As a Frontrunner, skip waiting times in the backtest queue.<br/>
                            All you have to do is support us and spread the word!</p>
                    </div>
                </div>
                <hr/>
                <div class="row">
                    <div class="col-md-6">
                        <div class="social-btn social-facebook" style="margin: 0 auto">
                            <div>
                                <i class="fa fa-facebook"/>
                                <span>&nbsp;Like on facebook</span>
                            </div>
                            <div style="overflow: hidden; background: #34343F; padding: 0;">
                                <div style="position: relative; top: -27px;" >
                                    <div class="fb-page" data-href="https://www.facebook.com/quantler" data-width="180" data-height="70" data-small-header="true" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="false" data-show-posts="false"><div class="fb-xfbml-parse-ignore"><blockquote cite="https://www.facebook.com/facebook"><a href="https://www.facebook.com/facebook">Facebook</a></blockquote></div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="social-btn social-google" style="margin: 0 auto">
                            <div>
                                <i class="fa fa-google-plus"/>
                                <span>&nbsp;+1 on Google Plus</span>
                            </div>
                            <div>
                                <div class="g-plusone" data-annotation="none" data-callback="${gplusCallBack}" data-href="https://quantler.com"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <div class="modal-footer">
                    <button class="btn btn-danger" data-dismiss="modal">no thanks..</button>
                </div>
            </div>
        </div>
    </div>
</div>
`

export class UpgradeModalBtn extends Component {
  modalId = _.uniqueId('modal')

  constructor (props) {
    super(props)

    State.setState({
      User: {
        ui: {
          upgradeModalId: this.modalId
        }
      }
    })
  }

  componentWillMount () {
    if ($('#' + this.modalId).length == 0) {
      let $modal = $(modalHTML(this.modalId))
      $('body').append($modal)
      loadSocialSDKs()
    }
  }

  shouldComponentUpdate = () => false

  render = () => (
    <a className="success"
       data-toggle="modal"
       data-target={"#" + this.modalId}>
      &nbsp;(Upgrade)
    </a>
  )

}
