import { getProducts, getProductById } from '../api/products'

export const ADD_PRODUCTS = 'ADD_PRODUCTS'
export const CLEAR_PRODUCTS = 'CLEAR_PRODUCTS'
export const SET_PRODUCT = 'SET_PRODUCT'
export const CLEAR_PRODUCT = 'CLEAR_PRODUCT'
export const OPEN_BUY_MODAL = 'OPEN_BUY_MODAL'
export const CLOSE_BUY_MODAL = 'CLOSE_BUY_MODAL'

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

export function fetchProducts() {
  return async function(dispatch) {
    const products = await getProducts()
    dispatch(addProducts(products))
  }
}

export function fetchProductById(id) {
  return async function(dispatch) {
    const product = await getProductById(id)
    dispatch(setProduct(product))
  }
}

export function openBuyModal(product) {
  return {
    type: OPEN_BUY_MODAL,
    product,
  }
}

export function closeBuyModal() {
  return {
    type: CLOSE_BUY_MODAL,
  }
}
