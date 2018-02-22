import React from 'react'
import Filter from './Filter'
import { voting } from './../reducers/anecdoteReducer'
import { notify, clear } from './../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {

  render() {
    //const anecdotes = this.props.anecdotes
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        {this.props.visibleAnecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => {
                this.props.voting(anecdote.id)
                this.props.notify(`you voted '${anecdote.content}.'`)
                setTimeout(() => { this.props.clear() }, 5000)
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

// {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote => anecdote.content.includes(this.props.filter)

const anecdotesToShow = (anecdotes, filter) => {
  return anecdotes
    .filter(a => a.content.includes(filter))
    .sort((a, b) => b.votes - a.votes)
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state.anecdotes, state.filter),
  }
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  { voting, notify, clear }
)(AnecdoteList)

export default ConnectedAnecdoteList
