import { ADD_PRODUCTS, CLEAR_PRODUCTS } from '../actions/actionList'

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
