import React from 'react'
import Filter from './Filter'
import { voting } from './../reducers/anecdoteReducer'
import { notify, clear } from './../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  render() {
    const store = this.props.store
    const anecdotes = store.getState().anecdotes
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter store={this.props.store} />
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote => anecdote.content.includes(store.getState().filter)
          // Filter string exists in content: show anecdote
          ? <div key={anecdote.id}>
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
          // Filter string missing in content: hide anecdote
          : <div></div>
        )}
      </div>
    )
  }
}

export default AnecdoteList
