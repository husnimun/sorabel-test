import { OPEN_BUY_MODAL, CLOSE_BUY_MODAL } from '../actions/actionList'

export function isBuyModalOpen(state = false, action) {
  switch (action.type) {
    case OPEN_BUY_MODAL:
      return true
    case CLOSE_BUY_MODAL:
      return false
    default:
      return state
  }
}
