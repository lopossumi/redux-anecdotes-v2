const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.message
    case 'CLEAR':
      return ''
    default:
      return state
  }
}

export const notify = (message) => {
  return {
    type: 'SET_NOTIFICATION',
    message
  }
}

export const clear = () => {
  return {
    type: 'CLEAR'
  }
}

export default notificationReducer