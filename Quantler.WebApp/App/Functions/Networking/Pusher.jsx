import Pusher   from 'pusher-js'
import * as API from './API/Main.jsx'

let user = null

try {
  user = JSON.parse(localStorage.User)
} catch (e) {
  user = null
}

function newPusher () {
  return new Pusher(API.Tokens.PUSHERKEY, {
    authEndpoint: localStorage.APIURL + 'pusher/auth',
    auth: {
      headers: { 'Authorization': 'Bearer ' + user.id_token }
    }
  })
}

export let pusher = (!user ? null : newPusher())

export function resetPusher () {
  pusher = newPusher()
}

window.Pusher = Pusher
window.pusher = pusher
