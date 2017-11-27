import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Broadcast from './Broadcast'

class Provider extends Component {
  static propTypes = {
    globalState: PropTypes.object.isRequired
  }

  state = this.props.globalState

  createSetGlobalState = props => {
    return (updater, callback) => {
      if (updater && updater.constructor && updater.call && updater.apply) {
        this.setState(prevState => updater(prevState, props), () => {
          callback && callback()
        })
      } else {
        this.setState(updater, () => {
          callback && callback()
        })
      }
    }
  }

  render () {
    return (
      <Broadcast globalState={this.state} createSetGlobalState={this.createSetGlobalState}>
        {this.props.children}
      </Broadcast>
    )
  }
}

export default Provider
