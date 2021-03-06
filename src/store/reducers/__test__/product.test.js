import * as reducers from '../product'
import {
  SET_PRODUCT,
  CLEAR_PRODUCT,
  OPEN_BUY_MODAL,
} from '../../actions/actionList'

describe('test suite for redux reducers', () => {
  test('product reducer: should return initial state', () => {
    const defaultState = {}
    expect(reducers.product(undefined, {})).toEqual(defaultState)
  })

  test('product reducer: should set product', () => {
    const initialState = {
      id: 1,
      title: 'product 1',
    }

    const newProduct = {
      id: 2,
      title: 'product 2',
    }

    const action = {
      type: SET_PRODUCT,
      product: newProduct,
    }

    expect(reducers.product(initialState, action)).toEqual(newProduct)
  })

  test('product reducer: should clear product', () => {
    const initialState = {
      id: 1,
      title: 'product 1',
    }

    const action = {
      type: CLEAR_PRODUCT,
    }

    expect(reducers.product(initialState, action)).toEqual({})
  })

  test('product reducer: should open buy modal', () => {
    const initialState = {}

    const expected = {
      id: 2,
      title: 'product 2',
    }

    const action = {
      type: OPEN_BUY_MODAL,
      product: expected,
    }

    expect(reducers.product(initialState, action)).toEqual(expected)
  })
})
