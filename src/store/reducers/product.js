import {
  SET_PRODUCT,
  CLEAR_PRODUCT,
  OPEN_BUY_MODAL,
} from '../actions/actionList'

export function product(state = {}, action) {
  switch (action.type) {
    case SET_PRODUCT:
      return action.product
    case CLEAR_PRODUCT:
      return {}
    case OPEN_BUY_MODAL:
      return action.product
    default:
      return state
  }
}
