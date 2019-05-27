import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from '../actions/actionList'

export function notifications(state = [], action) {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return [...state, { id: action.id, text: action.text }]
    case HIDE_NOTIFICATION:
      return state.filter(notification => notification.id !== action.id)
    default:
      return state
  }
}
