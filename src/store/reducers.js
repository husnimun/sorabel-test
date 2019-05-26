import { combineReducers } from 'redux'
import {
  ADD_PRODUCTS,
  SET_PRODUCT,
  CLEAR_PRODUCT,
  CLEAR_PRODUCTS,
} from './actions'

function products(state = [], action) {
  switch (action.type) {
    case ADD_PRODUCTS:
      return [...state, ...action.products]
    case CLEAR_PRODUCTS:
      return []
    default:
      return state
  }
}

function product(state = {}, action) {
  switch (action.type) {
    case SET_PRODUCT:
      return action.product
    case CLEAR_PRODUCT:
      return {}
    default:
      return state
  }
}

const reducers = combineReducers({
  products,
  product,
})

export default reducers
