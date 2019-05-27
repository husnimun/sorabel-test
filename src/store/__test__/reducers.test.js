import * as reducers from '../reducers'
import {
  ADD_PRODUCTS,
  CLEAR_PRODUCTS,
  SET_PRODUCT,
  CLEAR_PRODUCT,
  OPEN_BUY_MODAL,
  CLOSE_BUY_MODAL,
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION,
} from '../actions'

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

  test('isBuyModalOpen reducer: should open modal', () => {
    const initialState = false
    const action = {
      type: OPEN_BUY_MODAL,
    }

    expect(reducers.isBuyModalOpen(initialState, action)).toEqual(true)
  })

  test('isBuyModalOpen reducer: should open modal', () => {
    const initialState = true
    const action = {
      type: CLOSE_BUY_MODAL,
    }

    expect(reducers.isBuyModalOpen(initialState, action)).toEqual(false)
  })

  test('notifications reducer: should add notification', () => {
    const initialState = []
    const notifications = [
      {
        text: 'Notification',
        id: 1,
      },
    ]
    const action = {
      type: SHOW_NOTIFICATION,
      ...notifications[0],
    }

    expect(reducers.notifications(initialState, action)).toEqual(notifications)
  })

  test('notifications reducer: should remove notification', () => {
    const initialState = [
      {
        id: 1,
        text: 'Notification',
      },
      {
        id: 2,
        text: 'Notification',
      },
    ]

    const action = {
      type: HIDE_NOTIFICATION,
      id: 1,
    }

    const expected = [
      {
        id: 2,
        text: 'Notification',
      },
    ]

    expect(reducers.notifications(initialState, action)).toEqual(expected)
  })
})
