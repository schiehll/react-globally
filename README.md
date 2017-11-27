# react-globally
> Gives you setGlobalState, so you can set state globally

[![travis build](https://img.shields.io/travis/schiehll/react-globally.svg?style=flat-square)](https://travis-ci.org/schiehll/react-globally)
[![Coveralls branch](https://img.shields.io/coveralls/schiehll/react-globally/master.svg?style=flat-square)](https://coveralls.io/github/schiehll/react-globally?branch=master)
[![version](https://img.shields.io/npm/v/react-globally.svg?style=flat-square)](http://npm.im/react-globally)

## What is this?

This lib gives you two things:

- setGlobalState: A function with the exact same API of `setState` but that sets the state globally
- globalState: The global state that's updated when you call `setGlobalState`

You receive both via props wrapping any component with the `withGlobalState` function.
To use `withGlobalState`, you will have to wrap your app with a `Provider` that receives the initial state.

This way you can use `setState` to manage the local state of a Component and `setGlobalState` to manage the global state with the same API.

## Key benefits

- **No need to learn a new API**: If you know how to use `setState`, you know how to use `setGlobalState`
- **Simplicity**: Just wrap your components with a function and that's it
- **Progressive**: Start with `setState`, if there's the need, change it to `setGlobalState`

## Installation

You can install it via npm:

```bash
npm install --save react-globally
```

## CDN

If you prefer to exclude react-globally from your application and use it globally via window.ReactGlobally, the react-globally package provides single-file distributions via [unpkg](https://unpkg.com):

```html
<!-- development version -->
<script src="https://unpkg.com/react-globally@latest/dist/umd/react-globally.js"></script>

<!-- production version -->
<script src="https://unpkg.com/react-globally@latest/dist/umd/react-globally.min.js"></script>
```

## Usage

First you have to wrap your app with the `Provider` giving it the initial state:

```js
// index.js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-globally'
import CounterControls from './CounterControls'
import CounterInfo from './CounterInfo'

const initialState = {
  counter: 0
}

class App extends Component {
  render () {
    return (
      <div>
        <CounterControls />
        <CounterInfo />
      </div>
    )
  }
}

ReactDOM.render(
  <Provider globalState={initialState}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

Then you wrap the components that should have a global state with `withGlobalState`:

```js
// CounterControls.js
import React, { Component } from 'react'
import { withGlobalState } from 'react-globally'

class CounterControls extends React.Component  {
  increment = () => {
    this.props.setGlobalState(prevGlobalState => ({
      counter: prevGlobalState.counter + 1
    }))
  }

  decrement = () => {
    this.props.setGlobalState(prevGlobalState => ({
      counter: prevGlobalState.counter - 1
    }))
  }

  zero = () => {
    this.props.setGlobalState({
      counter: 0
    })
  }

  render () {
    return (
      <div>
        <button onClick={this.increment}>Increment</button>
        <button onClick={this.decrement}>Decrement</button>
        <button onClick={this.zero}>Set to Zero</button>
      </div>
    )
  }
}

export default withGlobalState(CounterControls)
```

You can access and set the global state anywhere in the tree, and it works with stateless functional components too, since it's just props:

```js
// CounterInfo.js
import React from 'react'
import { withGlobalState } from 'react-globally'

const CounterInfo = (props) => {
  return (
    <div>
      The counter value: {props.globalState.counter}
      <button onClick={() => props.setGlobalState({ counter: 100 })}>Set to 100</button>
    </div>
  )
}

export default withGlobalState(CounterInfo)
```

## Reusing your code

You can extract your `setState` and/or `setGlobalState` calls to pure functions, reusing and testing them in isolation.

See this [tweet](https://twitter.com/dan_abramov/status/824308413559668744) from Dan Abramov.

## Other solutions

- [Redux](https://github.com/reactjs/redux/)
- [MobX](https://github.com/mobxjs/mobx)
