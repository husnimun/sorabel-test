import { combineReducers } from 'redux'
import { ADD_PRODUCTS } from './actions'

function products(state = [], action) {
  switch (action.type) {
    case ADD_PRODUCTS:
      return [...state, ...action.products]
    default:
      return state
  }
}

const reducers = combineReducers({
  products,
})

export default reducers
