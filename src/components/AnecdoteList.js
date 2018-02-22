import React from 'react'
import Filter from './Filter'
import { voting } from './../reducers/anecdoteReducer'
import { notify, clear } from './../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {

  render() {
    const anecdotes = this.props.anecdotes
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote => anecdote.content.includes(this.props.filter)
          // Filter string exists in content: show anecdote
          ? <div key={anecdote.id}>
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
          // Filter string missing in content: hide anecdote
          : <div></div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  { voting, notify, clear }
)(AnecdoteList)

export default ConnectedAnecdoteList
