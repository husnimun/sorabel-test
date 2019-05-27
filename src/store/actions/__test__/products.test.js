import * as actionList from '../actionList'
import * as actions from '../products'

describe('test suite for redux actions', () => {
  it('should create action to add products', () => {
    const products = []
    const expectedAction = {
      type: actionList.ADD_PRODUCTS,
      products,
    }

    expect(actions.addProducts(products)).toEqual(expectedAction)
  })

  it('should create action to clear products', () => {
    const expectedAction = {
      type: actionList.CLEAR_PRODUCTS,
    }

    expect(actions.clearProducts()).toEqual(expectedAction)
  })
})
