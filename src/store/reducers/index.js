/* istanbul ignore file */
import { combineReducers } from 'redux'
import { products } from './products'
import { product } from './product'
import { isBuyModalOpen } from './isBuyModalOpen'
import { notifications } from './notifications'

const reducers = combineReducers({
  products,
  product,
  isBuyModalOpen,
  notifications,
})

export default reducers
