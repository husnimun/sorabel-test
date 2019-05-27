import { CLEAR_PRODUCT, SET_PRODUCT } from './actionList'
import { getProductById } from '../../api/products'

export function setProduct(product) {
  return {
    type: SET_PRODUCT,
    product,
  }
}

export function clearProduct() {
  return {
    type: CLEAR_PRODUCT,
  }
}

export function fetchProductById(id) {
  return async function(dispatch) {
    const product = await getProductById(id)
    dispatch(setProduct(product))
  }
}
