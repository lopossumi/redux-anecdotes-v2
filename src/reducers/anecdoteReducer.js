import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (store = [], action) => {
  if (action.type === 'VOTE') {
    const old = store.filter(a => a.id !== action.id)
    const voted = store.find(a => a.id === action.id)

    return [...old, { ...voted, votes: voted.votes + 1 }]
  }
  if (action.type === 'CREATE') {
    return [...store, action.content]
  }
  if (action.type === 'INIT') {
    return action.data
  }
  return store
}

export const initialize = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export const anecdoteCreation = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      content: newAnecdote
    })
  }
}

export const voting = (anecdote) => {
  return async (dispatch) => {
    const voted = await anecdoteService
      .update(
        anecdote.id,
        { ...anecdote, votes: anecdote.votes + 1 }
      )
    dispatch({
      type: 'VOTE',
      id: voted.id
    })
  }
}

export default anecdoteReducer