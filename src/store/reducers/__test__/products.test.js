import * as reducers from '../products'
import { ADD_PRODUCTS, CLEAR_PRODUCTS } from '../../actions/actionList'

describe('test suite for redux reducers', () => {
  test('products reducer: should return initial state', () => {
    const defaultState = []
    expect(reducers.products(undefined, {})).toEqual(defaultState)
  })

  test('products reducer: add products', () => {
    const initialState = [
      {
        id: '1',
        title: 'product 1',
      },
    ]
    const products = [
      {
        id: '2',
        title: 'product 2',
      },
      {
        id: '3',
        title: 'product 3',
      },
    ]

    const expected = [
      {
        id: '1',
        title: 'product 1',
      },
      {
        id: '2',
        title: 'product 2',
      },
      {
        id: '3',
        title: 'product 3',
      },
    ]
    const action = {
      type: ADD_PRODUCTS,
      products,
    }
    expect(reducers.products(initialState, action)).toEqual(expected)
  })

  test('products reducer: clear products', () => {
    const initialState = [
      {
        id: '1',
        title: 'product 1',
      },
    ]
    const action = {
      type: CLEAR_PRODUCTS,
    }
    expect(reducers.products(initialState, action)).toEqual([])
  })
})
