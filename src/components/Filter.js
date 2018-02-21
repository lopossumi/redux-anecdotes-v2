import React from 'react'
import { setFilter } from './../reducers/filterReducer'

class Filter extends React.Component {
  handleChange = (event) => {
    this.props.store.dispatch(setFilter(event.target.value))
  }
  render() {
    const store = this.props.store
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input value={store.getState().filter} onChange={this.handleChange} />
      </div>
    )
  }
}

export default Filter