import { HIDE_NOTIFICATION, SHOW_NOTIFICATION } from './actionList'

export function showNotification(id, text) {
  return {
    type: SHOW_NOTIFICATION,
    id,
    text,
  }
}

export function hideNotification(id) {
  return {
    type: HIDE_NOTIFICATION,
    id,
  }
}

let nextNotificationId = 0
export function showNotificationWithTimeout(text, timeout = 3000) {
  return function(dispatch) {
    const id = nextNotificationId++
    dispatch(showNotification(id, text))

    setTimeout(() => {
      dispatch(hideNotification(id))
    }, timeout)
  }
}
