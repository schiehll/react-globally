import React, { Component } from 'react'
import PropTypes from 'prop-types'

const withGlobalState = WrappedComponent => {
  class WithGlobalState extends Component {
    static displayName = `WithGlobalState(${
      WrappedComponent.displayName || WrappedComponent.name || 'Component'
    })`

    static contextTypes = {
      globalState: PropTypes.object.isRequired,
      createSetGlobalState: PropTypes.func.isRequired
    }

    state = {
      value: null
    }

    syncStateWithGlobalState = value => {
      this.setState({ value })
    }

    componentWillMount () {
      this.setState({
        value: this.context.globalState.getState()
      })
    }

    componentDidMount () {
      this.context.globalState.subscribe(this.syncStateWithGlobalState)
    }

    componentWillUnmount () {
      this.context.globalState.unsubscribe(this.syncStateWithGlobalState)
    }

    render () {
      return (
        <WrappedComponent
          {...this.props}
          globalState={this.state.value}
          setGlobalState={this.context.createSetGlobalState(this.props)}
        />
      )
    }
  }

  return WithGlobalState
}

export default withGlobalState
