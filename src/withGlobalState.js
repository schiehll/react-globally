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

    componentWillMount () {
      this.setState({
        value: this.context.globalState.getState()
      })
    }

    componentDidMount () {
      this.unsubscribe = this.context.globalState.subscribe(value => {
        this.setState({ value })
      })
    }

    componentWillUnmount () {
      this.unsubscribe()
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
