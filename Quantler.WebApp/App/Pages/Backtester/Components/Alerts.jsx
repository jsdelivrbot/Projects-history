import {State} from '../../../State.jsx'

export let RunBacktestAlert = () => (
  <div className="alert ng-isolate-scope alert-warning" role="alert">
    <div>
      <span className="ng-binding ng-scope">Press the "Run Backtest" button to test your strategy.</span>
    </div>
    <i className="fa fa-warning pull-right"/>
  </div>
)

export let SocialPaymentAlert = ({ time }) => (
  <div className="alert ng-isolate-scope alert-warning" role="alert">
    <div>
            <span className="ng-binding ng-scope">
                Jump the queue by providing us a
                <strong>
                    <a style={{ color: 'rgb(13, 255, 138)' }}
                       data-toggle="modal"
                       data-target={
                         "#" + State.getState()
                           .User.ui.upgradeModalId
                       }
                    > like, tweet or a thumb
                    </a>
                </strong>
                . Time is money, right?
                <br/>
                Current waiting time: { time } seconds
            </span>
    </div>
    <i className="fa fa-warning pull-right"/>
  </div>
)

export let ErrorAlert = () => (
  <div className="alert ng-isolate-scope alert-danger" role="alert">
    <div>
            <span className="ng-binding ng-scope">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, at commodi doloremque explicabo ipsa laborum nihil?
            </span>
    </div>
    <i className="fa fa-close pull-right"/>
  </div>
)

export let SuccessAlert = () => (
  <div className="alert ng-isolate-scope alert-success" role="alert">
    <div>
            <span className="ng-binding ng-scope">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus alias.
            </span>
    </div>
  </div>
)
