import { combineReducers } from 'redux'
import {
  ADD_PRODUCTS,
  SET_PRODUCT,
  CLEAR_PRODUCT,
  CLEAR_PRODUCTS,
  OPEN_BUY_MODAL,
  CLOSE_BUY_MODAL,
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION,
} from './actions'

export function products(state = [], action) {
  switch (action.type) {
    case ADD_PRODUCTS:
      return [...state, ...action.products]
    case CLEAR_PRODUCTS:
      return []
    default:
      return state
  }
}

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

const reducers = combineReducers({
  products,
  product,
  isBuyModalOpen,
  notifications,
})

export default reducers
