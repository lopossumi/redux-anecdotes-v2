const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter
    case 'CLEAR_FILTER':
      return ''
    default:
      return state
  }
}

export const setFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    filter
  }
}

export const clear = () => {
  return {
    type: 'CLEAR_FILTER'
  }
}

export default filterReducer