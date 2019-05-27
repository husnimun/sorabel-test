import { getProducts } from '../../api/products'
import { ADD_PRODUCTS, CLEAR_PRODUCTS } from './actionList'

export function addProducts(products) {
  return {
    type: ADD_PRODUCTS,
    products,
  }
}

export function clearProducts() {
  return {
    type: CLEAR_PRODUCTS,
  }
}

export function fetchProducts(params) {
  return async function(dispatch) {
    const products = await getProducts(params)
    return dispatch(addProducts(products))
  }
}
