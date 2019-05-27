import * as actions from '../actions'

describe('test suite for redux actions', () => {
  it('should create action to add products', () => {
    const products = []
    const expectedAction = {
      type: actions.ADD_PRODUCTS,
      products,
    }

    expect(actions.addProducts(products)).toEqual(expectedAction)
  })

  it('should create action to clear products', () => {
    const expectedAction = {
      type: actions.CLEAR_PRODUCTS,
    }

    expect(actions.clearProducts()).toEqual(expectedAction)
  })

  it('should create action to set product', () => {
    const product = {}
    const expectedAction = {
      type: actions.SET_PRODUCT,
      product,
    }

    expect(actions.setProduct(product)).toEqual(expectedAction)
  })

  it('should create action to clear products', () => {
    const expectedAction = {
      type: actions.CLEAR_PRODUCT,
    }

    expect(actions.clearProduct()).toEqual(expectedAction)
  })

  it('should create action to open buy modal', () => {
    const expectedAction = {
      type: actions.OPEN_BUY_MODAL,
    }

    expect(actions.openBuyModal()).toEqual(expectedAction)
  })

  it('should create action to close buy modal', () => {
    const expectedAction = {
      type: actions.CLOSE_BUY_MODAL,
    }

    expect(actions.closeBuyModal()).toEqual(expectedAction)
  })
})
