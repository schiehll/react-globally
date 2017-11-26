import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TestUtils from 'react-dom/test-utils'
import GlobalState from './GlobalState'
import Broadcast from './Broadcast'
import Provider from './Provider'

describe('Provider', () => {
  class Child extends Component {
    static contextTypes = {
      globalState: PropTypes.object.isRequired,
      createSetGlobalState: PropTypes.func.isRequired
    }

    render () {
      return <div />
    }
  }

  it('should wrap the given children with a Broadcast component', () => {
    const initialState = { value: 0 }
    const tree = TestUtils.renderIntoDocument(
      <Provider globalState={initialState}>
        <Child />
      </Provider>
    )

    const broadcast = TestUtils.findRenderedComponentWithType(tree, Broadcast)
    const child = TestUtils.findRenderedComponentWithType(broadcast, Child)

    expect(child).toBeInstanceOf(Child)
  })

  it('should add an GlobalState instance to the given children context', () => {
    const initialState = { value: 0 }
    const tree = TestUtils.renderIntoDocument(
      <Provider globalState={initialState}>
        <Child />
      </Provider>
    )

    const child = TestUtils.findRenderedComponentWithType(tree, Child)
    expect(child.context.globalState).toBeInstanceOf(GlobalState)
  })

  describe('createSetGlobalState', () => {
    it('should return a function that call setState on Provider having the same api as setState', () => {
      const initialState = { value: 0 }
      const tree = TestUtils.renderIntoDocument(
        <Provider globalState={initialState}>
          <Child />
        </Provider>
      )

      const provider = TestUtils.findRenderedComponentWithType(tree, Provider)
      const setGlobalState = provider.createSetGlobalState({ someProp: 0 })
      expect(setGlobalState).toBeInstanceOf(Function)

      const newState = { value: 1 }
      setGlobalState(newState)
      expect(provider.state.value).toBe(newState.value)

      setGlobalState((prevState, ownProps) => {
        expect(ownProps).toHaveProperty('someProp')
        expect(ownProps.someProp).toBe(0)

        return {
          value: prevState.value + 10
        }
      })
      expect(provider.state.value).toBe(newState.value + 10)
    })
  })
})
