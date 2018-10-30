import {Upgrade} from './Brokerage/Upgrade.jsx'
import {NewAccountPremium} from './Brokerage/NewAccountPremium.jsx'
import {NewAccountSponsored} from './Brokerage/NewAccountSponsored.jsx'
import {Login} from './Brokerage/Login.jsx'
import {SignUp} from './Brokerage/SignUp.jsx'

export let Accounts = ({ routeParams }) => {
  let Component = Upgrade

  switch (routeParams.view) {
    case "new-account-premium":
      Component = NewAccountPremium
      break
    case "new-account-sponsored":
      Component = NewAccountSponsored
      break
    case "login":
      Component = Login
      break
    case "signup":
      Component = SignUp
      break
    case "loading":
      Component = () =>
        <div style={{ padding: 100 }}>
          <h1>Loading Accounts...</h1>
        </div>
      break
  }

  return (
    <div>
      <Component/>
    </div>
  )
}
