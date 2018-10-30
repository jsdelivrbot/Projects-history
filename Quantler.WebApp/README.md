# QuantlerWebApp

- [React](#react)
- [Challenges](#challenges)
- [Architecture](#architecture)
- [Interface](#interface)
- [State](#state)
- [Legacy](#legacy)
- [Performance](#performance)
- [Others](#others)

## React

<p align="right">
	<a href="#quantlerwebapp">menu</a>
</p>

React was chosen as the view library for Quantler because it doesn't dictate on how to manage the business logic, it only provides a declarative and simple way to control the view of the application (which is a very important task, cumbersome if done manually). This makes it possible to implement functionalities with any method of managing state, whatever you're most efficient in or whatever the functionality requirements are. You can use the full power of the language without being trapped in the framework's way of doing things.

## Challenges

<p align="right">
	<a href="#quantlerwebapp">menu</a>
</p>

Quantler has challenges that are very different from the majority of web applications. It is like there are many applications in one: code editor and sharing marketplace, community forum, strategy testing and live trading.

There is a lot code, and the requirements are for performance and usability (correct working and expected behavior). The amount of features and requirements create a very complex task of development. Lucky to you the reader, majority of functionalities have already been implemented. The current major tasks are refactoring of code and making the application better in terms of user experience.

## Architecture

<p align="right">
	<a href="#quantlerwebapp">menu</a>
</p>

Quantler's front-end has gone through 3 major architectural styles. Flux-like with [Reflux](https://github.com/reflux/refluxjs), OOP-like with service classes (`App/Services/`) and finally a more functional (in functional programming) style. Redux wasn't widely used in the beginning of the project, and the current functional architecture brings more advantages than Redux, as it provides not only predictable state management (which Redux only does) but also any other process (ajax, timers, delayed functions, e.t.c). Personally, after using React for nearly 2 years, I find component state to be tremendously helpful, and global state should only be used when you need to persist data beyond a component's un-mount. Don't trust the hype, the best architecture is the one that works well with the project's requirements.

> The word "style" is because the architecture is not entirely functional, as in "Haskell" only programming with functions.

There are still some pages which use the old Services style architecture (an advantage of using React, takes care of view rendering while any architecture can be used for the app logic), see [Legacy](#legacy) section below.

The current functional style architecture has two main parts **functions** and **interfaces**.

## Interface

<p align="right">
	<a href="#quantlerwebapp">menu</a>
</p>

Interfaces are inspired by how Haskell deals with side-effects, making it easier to write "pure code". The main objective is a simpler and maybe easier development process. Some advantages are (remembering, simple is different than easy):

- **Understanding:** You'll normally only have to focus on the function scope to understand it's behavior, the having functions that only process and return data, without modifying/mutating external data (that is not in its scope).
- **Testing:** Functions without side-effect make testing simpler, you won't have to worry about binding scope and mocking interfaces (spies, facades). It's just a matter of passing values and checking the function's return.
- **Refactoring:** Because of the loose coupling (not mutating external data) it is less tedious to change the function's behavior or do code maintenance (refactoring).

This is an example of how an interface works: [live](https://jsbin.com/runace/edit?js,console)

```js
let interfaces = {
  run (sideEffects) {
    for (let effect in sideEffects) {
      interfaces[effect](sideEffects[effect])
    }
  },
  console (commands) {
    for (let command in commands) {
      commands[command].forEach(value => console[command](value))
    }
  },
  alert (values) {
    values.forEach(value => alert(value))
  }
}

function showData (data) {
  return {
    console: {
      log: [data]
    },
    alert: [JSON.stringify(data), 'Hello']
  }
}

let result = showData({ name: 'Test' })

interfaces.run(result)
```

Above is a basic example, the implementation can get more features depending on the project requirements (logging, debugging).

#### Quantler

`$interface = "App/Functions/Interface/Interface.jsx"`

Quantler's interface is located at `$interface`. It follows a very similar format to the example above. Each interface has its own way of "doing things" (executing its commands) and you can create new interfaces anytime.

The functions are written to return the commands that will be executed by their interfaces. In the example above the interfaces are `console` and `alert`. For the execution to actually happen the function `handler` (`$interface->Interface.handler(handlerFunction)`) takes in function and returns another function (it wraps the original pure function) which when executed will run the commands. Example:

```js
import Interface from './Functions/Interface/Interface.jsx'
import {State} from './State.jsx'

function updateState (value) {
  return {
    state: { test: value }
  }
}

console.log(State.get().test === undefined)

let wrappedFunction = Interface.handler(updateState)

wrappedFunction(10)

console.log(State.get().test === 10)
```

Then at `App/Functions/Functions.jsx` the function `handler` is used to wrap all functions used in the app:

```js
import {handler} from './Interface/Interface.jsx'

let handlerize = object => (!_.isPlainObject(object))
  ? handler(object)
  : _.reduce(object, (functions, value, key) => ({
  ...functions, [ key ]: handlerize(value)
}), {})

export default handlerize({ ... })
```

Above, `handlerize` checks if the the value is an `Object` (recursively calls itself) or `Function` (wraps the function with `handler` function. So the resulting object from running `handlerize` contains all functions wrapped by `handler` and that when ran, will execute their interfaces, just like the examples above.

## State

<p align="right">
	<a href="#quantlerwebapp">menu</a>
</p>

State objects are at folder `App/State/`, and main state class and connect component file at `App/State.jsx`. This is a simple state container (get state, and update listeners when data is updated), a data object with pubsub functionality, and a `connect` function that wraps a React component.

The connect function can be used as a decorator or normal function, taking a `stateSelector` function and returning another function which takes the component to be wrapped. The result is a component that re-renders whenever the state is updated, and receives the return from `stateSelector` as props.

```js
let selector = (state) => ({
    name: state.User.details.name
})

@connect(selector)
class MyComponent from React.Component {}

let MyComponent = connect(selector)(function (props) {
	return React.DOM.div({}, `Hello ` + props.name)
})
```

## Legacy

<p align="right">
	<a href="#quantlerwebapp">menu</a>
</p>

#### Services

At`App/Services`, these use an OOP-style architecture. Simple service classes that manage their own state. The problem is that there's a lot of object mutation (objects passed by reference)  which makes it more difficult to track changes and understand the code. The biggest wrong  being that it's not true object orientation, and that is my lack of knowledge at the time.

#### Pages

`App/Pages`

Initially every page would have its own `Functions` and `Components`, but with the change to a global state architecture all functions are being moved to `App/Functions/` and components to `App/Components/`.

#### MapStateToProps

In the state's connect function there is a second parameter `mapStateToProps` a function that to mutate state before passing it as props, but's it's completely unnecessary and is there because it hasn't been removed yet... a good initial refactoring task.

## Performance

<p align="right">
	<a href="#quantlerwebapp">menu</a>
</p>

**Algorithmic Performance**
This is the classic, having code that is fast. But always beware of premature optimizations, only enhance when performance is a problem. Reaching performance in an algorithm (functions) is having the least steps possible to access and/or process data. Example:

```js
// slow
items = [{ id: 1 }, { id: 2 }]
_.find(items, { id: 2 })

//fast
items = { 1: {}, 2: {} }
items[2]
```

You'll find a lot of functions using `_.find()` which were used for convenience (the optimizations weren't required). I recommend to use [normalizr](https://github.com/paularmstrong/normalizr) in future refactoring and development. Sometimes an array is fine, maybe you just want to receive the data and render (which you'll normally use the method `.map()`), but when you need the fastest access to data, indexed (key/value) is the fastest way. Other data structures might be needed in the future, but for what we need Array and Object are enough.

There are few data processing functions in Quantler that require an advanced performance optimization. JavaScript is fast enough for you to code in a declarative way and not have to worry so much about performance implications. Majority of the work is sending/receiving data to/from the server and rendering it.

**React & State performance**

React component performance is focused on when to re-render. The state `connect` function handles high-level changes of props in its `shouldComponentUpdate` method:

```js
shouldComponentUpdate (nextProps) {
  let newState = stateSelector(State.getState())
  if (!_.isEqual(this.internalState, newState) || !_.isEqual(this.props, nextProps)) {
    this.internalState = newState
    return true
  }
  else {
    return false
  }
}
```

The `_.isEqual` checks for shallow equality.

```js
obj = { c: 3 }
test = { a: 1, b: obj }
_.isEqual({ a: 1, b: obj }, test) == true

obj.c = 4
_.isEqual({ a: 1, b: obj }, test) == true
```

So beware, if state is changing, but the component isn't rendering, that might be because on the `stateSelector` function passed to `connect()`, the `_.isEqual()` is preventing component re-render:

```js
@connect(state => ({
  highLevel: state.livetrading // might not re-render
}))
class MyComponent extends React.Component{}

@connect(state => ({
  lowLevel: state.livetrading.management.loadingPortfolio // better compared by _.isEqual
}))
class MyComponent extends React.Component{}
```

It might not look explicit at first, by minimizing re-renders and browser painting really increases performance. And at best, use component state for best performance, as the amount of functions ran after the update is minimal (it doesn't run other components that are mounted and listening to global state).

## Others

<p align="right">
	<a href="#quantlerwebapp">menu</a>
</p>

#### WebPack

file: `App/webpack.config.js`
docs:  [http://webpack.github.io/](http://webpack.github.io/)

#### Karma (test runner)

file: `App/karma.conf.js`
docs: [https://karma-runner.github.io/1.0/index.html](https://karma-runner.github.io/1.0/index.html)

#### Jasmine (test framework)

docs: [http://jasmine.github.io/2.4/introduction.html](http://jasmine.github.io/2.4/introduction.html)
