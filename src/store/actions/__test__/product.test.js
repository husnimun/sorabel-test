import * as actionList from '../actionList'
import * as actions from '../product'

describe('test suite for redux actions', () => {
  it('should create action to set product', () => {
    const product = {}
    const expectedAction = {
      type: actionList.SET_PRODUCT,
      product,
    }

    expect(actions.setProduct(product)).toEqual(expectedAction)
  })

  it('should create action to clear products', () => {
    const expectedAction = {
      type: actionList.CLEAR_PRODUCT,
    }

    expect(actions.clearProduct()).toEqual(expectedAction)
  })
})
