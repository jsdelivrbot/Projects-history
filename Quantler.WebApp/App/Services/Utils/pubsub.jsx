var PubSub = {};

var messages = {},
  lastUid = -1;

function hasKeys (obj) {
  var key;

  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      return true;
    }
  }
  return false;
}

/**
 *  Returns a function that throws the passed exception, for use as argument for setTimeout
 *  @param { Object } ex An Error object
 */
function throwException (ex) {
  return function reThrowException () {
    console.dir(ex)
    console.error(ex.stack)
  };
}

function callSubscriberWithDelayedExceptions (subscriber, message, data) {
  try {
    subscriber(data, message);
  } catch (ex) {
    setTimeout(throwException(ex), 0);
  }
}

function callSubscriberWithImmediateExceptions (subscriber, message, data) {
  subscriber(data, message);
}

function deliverMessage (originalMessage, matchedMessage, data, immediateExceptions) {
  var subscribers = messages[matchedMessage],
    callSubscriber = immediateExceptions ? callSubscriberWithImmediateExceptions : callSubscriberWithDelayedExceptions,
    s;

  if (!messages.hasOwnProperty(matchedMessage)) {
    return;
  }

  for (s in subscribers) {
    if (subscribers.hasOwnProperty(s)) {
      callSubscriber(subscribers[s], originalMessage, data);
    }
  }
}

function createDeliveryFunction (message, data, immediateExceptions) {
  return function deliverNamespaced () {
    var topic = String(message),
      position = topic.lastIndexOf('.');

    // deliver the message as it is now
    deliverMessage(message, message, data, immediateExceptions);

    // trim the hierarchy and deliver message to each level
    while (position !== -1) {
      topic = topic.substr(0, position);
      position = topic.lastIndexOf('.');
      deliverMessage(message, topic, data, immediateExceptions);
    }
  };
}

function messageHasSubscribers (message) {
  var topic = String(message),
    found = Boolean(messages.hasOwnProperty(topic) && hasKeys(messages[topic])),
    position = topic.lastIndexOf('.');

  while (!found && position !== -1) {
    topic = topic.substr(0, position);
    position = topic.lastIndexOf('.');
    found = Boolean(messages.hasOwnProperty(topic) && hasKeys(messages[topic]));
  }

  return found;
}

function publish (message, data, sync, immediateExceptions) {
  var deliver = createDeliveryFunction(message, data, immediateExceptions),
    hasSubscribers = messageHasSubscribers(message);

  if (!hasSubscribers) {
    return false;
  }

  if (sync === true) {
    deliver();
  } else {
    setTimeout(deliver, 0);
  }
  return true;
}

/**
 *  PubSub.publish( message[, data] ) -> Boolean
 *  - message (String): The message to publish
 *  - data: The data to pass to subscribers
 *  Publishes the the message, passing the data to it's subscribers
 **/
PubSub.publish = function (message, data) {
  return publish(message, data, false, PubSub.immediateExceptions);
};

/**
 *  PubSub.publishSync( message[, data] ) -> Boolean
 *  - message (String): The message to publish
 *  - data: The data to pass to subscribers
 *  Publishes the the message synchronously, passing the data to it's subscribers
 **/
PubSub.publishSync = function (message, data) {
  return publish(message, data, true, PubSub.immediateExceptions);
};

/**
 *  PubSub.subscribe( message, func ) -> String
 *  - message (String): The message to subscribe to
 *  - func (Function): The function to call when a new message is published
 *  Subscribes the passed function to the passed message. Every returned token is unique and should be stored if
 *  you need to unsubscribe
 **/
PubSub.subscribe = function (message, func) {
  if (typeof func !== 'function') {
    return false;
  }

  // message is not registered yet
  if (!messages.hasOwnProperty(message)) {
    messages[message] = {};
  }

  // forcing token as String, to allow for future expansions without breaking usage
  // and allow for easy use as key names for the 'messages' object
  var token = 'uid_' + String(++lastUid);
  messages[message][token] = func;

  // return token for unsubscribing
  return token;
};

/* Public: Clears all subscriptions
 */
PubSub.clearAllSubscriptions = function clearAllSubscriptions () {
  messages = {};
};

/*Public: Clear subscriptions by the topic
 */
PubSub.clearSubscriptions = function clearSubscriptions (topic) {
  var m;
  for (m in messages) {
    if (messages.hasOwnProperty(m) && m.indexOf(topic) === 0) {
      delete messages[m];
    }
  }
};

/* Public: removes subscriptions.
 * When passed a token, removes a specific subscription.
 * When passed a function, removes all subscriptions for that function
 * When passed a topic, removes all subscriptions for that topic (hierarchy)
 *
 * value - A token, function or topic to unsubscribe.
 *
 * Examples
 *
 *		// Example 1 - unsubscribing with a token
 *		var token = PubSub.subscribe('mytopic', myFunc);
 *		PubSub.unsubscribe(token);
 *
 *		// Example 2 - unsubscribing with a function
 *		PubSub.unsubscribe(myFunc);
 *
 *		// Example 3 - unsubscribing a topic
 *		PubSub.unsubscribe('mytopic');
 */
PubSub.unsubscribe = function (value) {
  var isTopic = typeof value === 'string' && messages.hasOwnProperty(value),
    isToken = !isTopic && typeof value === 'string',
    isFunction = typeof value === 'function',
    result = false,
    m, message, t;

  if (isTopic) {
    delete messages[value];
    return;
  }

  for (m in messages) {
    if (messages.hasOwnProperty(m)) {
      message = messages[m];

      if (isToken && message[value]) {
        delete message[value];
        result = value;
        // tokens are unique, so we can just stop here
        break;
      }

      if (isFunction) {
        for (t in message) {
          if (message.hasOwnProperty(t) && message[t] === value) {
            delete message[t];
            result = true;
          }
        }
      }
    }
  }

  return result;
};

var _UID = 0;
var UID = () => 'PubSub' + _UID++;

exports.PubSub = PubSub;

export class Store {
  Publish (data) {
    PubSub.publish(this.id || (this.id = UID()), data || null)
  }

  Subscriber (callback) {
    var eventId = this.id || (this.id = UID())
    return PubSub.subscribe(eventId, callback)
  }

  UnSubscriber () {
    var eventId = this.id || (this.id = UID())

    return function (_Class) {
      var _superCWU = (_Class.prototype.componentWillUnmount)
        ? _Class.prototype.componentWillUnmount
        : function () {}

      _Class.prototype.componentWillUnmount = function () {
        _superCWU.call(this)
        PubSub.unsubscribe(this.unsubscribe)
      }

    }
  }

  Subscribe () {
    var eventId = this.id || (this.id = UID())

    return function (_Class) {

      if (!_Class.prototype.unsubscribes) {
        _Class.prototype.unsubscribes = []
      }

      let _superCWM = (_Class.prototype.componentWillMount)
        ? _Class.prototype.componentWillMount
        : function () {}

      let _superCWU = (_Class.prototype.componentWillUnmount)
        ? _Class.prototype.componentWillUnmount
        : function () {}

      _Class.prototype.componentWillMount = function () {
        _superCWM.call(this);
        _Class.prototype.unsubscribes.push(PubSub.subscribe(
          eventId, () => this.setState({ '_pubsubAction': UID() })
        ))
      }

      _Class.prototype.componentWillUnmount = function () {
        _superCWU.call(this)
        _Class.prototype.unsubscribes.forEach((unsubscribe) => {
          PubSub.unsubscribe(unsubscribe)
        })
      }

    }
  }

}
