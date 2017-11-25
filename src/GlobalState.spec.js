import GlobalState from './GlobalState'

describe('GlobalState', () => {
  describe('setState', () => {
    it('should set the given value as the new state', () => {
      const initialState = { value: 0 }
      const globalState = new GlobalState(initialState)

      const newState = { value: 1 }
      globalState.setState(newState)
      expect(globalState.getState()).toBe(newState)
    })
  })

  describe('getState', () => {
    it('should return the current state', () => {
      const initialState = { value: 0 }
      const globalState = new GlobalState(initialState)

      expect(globalState.getState()).toBe(initialState)

      const newState = { value: 1 }
      globalState.setState(newState)
      expect(globalState.getState()).toBe(newState)
    })
  })

  describe('subscribe', () => {
    it('should add the given function to the listners array', () => {
      const initialState = { value: 0 }
      const globalState = new GlobalState(initialState)

      const subscriber = jest.fn()
      globalState.subscribe(subscriber)

      const newState = { value: 1 }
      globalState.setState(newState)
      expect(subscriber).toHaveBeenCalledWith(newState)
    })
  })

  describe('unsubscribe', () => {
    it('should remove the given function from the listners array', () => {
      const initialState = { value: 0 }
      const globalState = new GlobalState(initialState)

      const subscriber = jest.fn()
      globalState.subscribe(subscriber)

      const newState = { value: 1 }
      globalState.setState(newState)
      expect(subscriber).toHaveBeenCalledWith(newState)

      subscriber.mockClear()
      globalState.unsubscribe(subscriber)

      globalState.setState({ value: 3 })
      expect(subscriber).not.toHaveBeenCalled()
    })
  })
})
