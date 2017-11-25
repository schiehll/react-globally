class GlobalState {
  constructor (initialState) {
    this.currentState = initialState
    this.listners = []
  }

  getState = () => this.currentState

  setState = state => {
    this.currentState = state
    this.listners.forEach(listener => listener(this.currentState))
  }

  subscribe = listener => {
    this.listners.push(listener)
  }

  unsubscribe = listener => {
    this.listners = this.listners.filter(item => item !== listener)
  }
}

export default GlobalState
