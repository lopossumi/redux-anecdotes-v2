import React from 'react'
import { anecdoteCreation } from './../reducers/anecdoteReducer'
import { notify, clear } from './../reducers/notificationReducer'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'

class AnecdoteForm extends React.Component {

  handleSubmit = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    if (content) {
      e.target.anecdote.value = ''
      const newAnecdote = await anecdoteService.createNew(content)
      this.props.anecdoteCreation(newAnecdote)
      this.props.notify(`new anecdote created: '${content}'`)
      setTimeout(() => { this.props.clear() }, 5000)
    }
  }

  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote' /></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

const ConnectedAnecdoteForm = connect(
  null,
  { anecdoteCreation, notify, clear }
)(AnecdoteForm)

export default ConnectedAnecdoteForm
