import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'
import Provider from './Provider'
import withGlobalState from './withGlobalState'

describe('withGlobalState', () => {
  class Child extends Component {
    render () {
      return <div />
    }
  }

  it('should wrap the component name to indicate that it have a global state', () => {
    // default name
    let ChildWithGlobalState = withGlobalState(Child)
    expect(ChildWithGlobalState.displayName).toBe(`WithGlobalState(Child)`)
    // named component
    const displayName = 'TheChildName'
    Child.displayName = displayName

    ChildWithGlobalState = withGlobalState(Child)
    expect(ChildWithGlobalState.displayName).toBe(`WithGlobalState(${displayName})`)
    // unamed Component
    ChildWithGlobalState = withGlobalState(() => (<div />))
    expect(ChildWithGlobalState.displayName).toBe(`WithGlobalState(Component)`)
  })

  it('should pass setGlobalState function down to the wrapped component as prop', () => {
    const initialState = { value: 0 }
    const ChildWithGlobalState = withGlobalState(Child)
    const tree = TestUtils.renderIntoDocument(
      <Provider globalState={initialState}>
        <ChildWithGlobalState />
      </Provider>
    )

    const child = TestUtils.findRenderedComponentWithType(tree, Child)
    expect(child).toBeInstanceOf(Child)
    expect(child.props.setGlobalState).toBeInstanceOf(Function)
  })

  it('should pass its state down to the wrapped component as globalState prop', () => {
    const initialState = { value: 0 }
    const ChildWithGlobalState = withGlobalState(Child)
    const tree = TestUtils.renderIntoDocument(
      <Provider globalState={initialState}>
        <ChildWithGlobalState />
      </Provider>
    )

    const child = TestUtils.findRenderedComponentWithType(tree, Child)
    expect(child).toBeInstanceOf(Child)
    expect(child.props.globalState.value).toBe(initialState.value)
  })

  it('should update the globalState prop of the child when setGlobalState is called', () => {
    const initialState = { value: 0 }
    const ChildWithGlobalState = withGlobalState(Child)
    const tree = TestUtils.renderIntoDocument(
      <Provider globalState={initialState}>
        <ChildWithGlobalState />
      </Provider>
    )

    const child = TestUtils.findRenderedComponentWithType(tree, Child)
    expect(child).toBeInstanceOf(Child)
    expect(child.props.globalState.value).toBe(initialState.value)

    const newState = { value: 1 }
    child.props.setGlobalState(newState)
    expect(child.props.globalState.value).toBe(newState.value)
  })

  it('should unsubscribe from updates on component unmount', () => {
    const initialState = { value: 0 }
    const ChildWithGlobalState = withGlobalState(Child)

    const div = document.createElement('div')
    const tree = ReactDOM.render(
      <Provider globalState={initialState}>
        <ChildWithGlobalState />
      </Provider>,
      div
    )

    const childWithGlobalState = TestUtils.findRenderedComponentWithType(tree, ChildWithGlobalState)
    childWithGlobalState.context.globalState.unsubscribe = jest.fn()

    ReactDOM.unmountComponentAtNode(div)
    expect(childWithGlobalState.context.globalState.unsubscribe).toHaveBeenCalled()
  })
})
