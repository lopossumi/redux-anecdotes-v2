import React from 'react'
import { voting } from './../reducers/anecdoteReducer'
import { notify, clear } from './../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  render() {
    const store = this.props.store
    const anecdotes = store.getState().anecdotes
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => {
                store.dispatch(voting(anecdote.id))
                store.dispatch(notify(`you voted '${anecdote.content}.'`))
                setTimeout(() => { store.dispatch(clear()) }, 5000)
              }}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default AnecdoteList
