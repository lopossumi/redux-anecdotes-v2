import React from 'react'
import PropTypes from 'prop-types'

class Notification extends React.Component {
  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    const notifications = this.context.store.getState().notifications

    return (
      <div style={style}>
        {notifications}
      </div>
    )
  }
}

Notification.contextTypes = {
  store: PropTypes.object
}

export default Notification
