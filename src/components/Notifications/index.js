import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import NotificationItem from './NotificationItem'

const NotificationsWrapper = styled.div`
  position: fixed;
  text-align: center;
  width: 100%;
  top: 0;
  left: 0;
`

const domNode = document.getElementById('notifications-root')
function Notifications(props) {
  const { notifications } = props
  return ReactDOM.createPortal(
    <NotificationsWrapper>
      <TransitionGroup>
        {notifications.map(notif => (
          <CSSTransition key={notif.id} timeout={500} classNames="notification">
            <NotificationItem>{notif.text}</NotificationItem>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </NotificationsWrapper>,
    domNode
  )
}

function mapStateToProps(state) {
  return {
    notifications: state.notifications,
  }
}

export default connect(mapStateToProps)(Notifications)
