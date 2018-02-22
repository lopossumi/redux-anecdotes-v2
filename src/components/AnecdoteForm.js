import React from 'react'
import PropTypes from 'prop-types'
import { anecdoteCreation } from './../reducers/anecdoteReducer'
import { notify, clear } from './../reducers/notificationReducer'

class AnecdoteForm extends React.Component {
  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    if (content) {
      this.context.store.dispatch(anecdoteCreation(content))
      this.context.store.dispatch(notify(`new anecdote created: '${content}'`))
      setTimeout(() => { this.context.store.dispatch(clear()) }, 5000)
      e.target.anecdote.value = ''
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

AnecdoteForm.contextTypes = {
  store: PropTypes.object
}

export default AnecdoteForm
