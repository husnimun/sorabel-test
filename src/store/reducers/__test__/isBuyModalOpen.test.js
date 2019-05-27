import * as reducers from '../isBuyModalOpen'
import { OPEN_BUY_MODAL, CLOSE_BUY_MODAL } from '../../actions/actionList'

describe('test suite for redux reducers', () => {
  test('isBuyModalOpen reducer: should return initial state', () => {
    const expected = false
    expect(reducers.isBuyModalOpen(undefined, {})).toEqual(expected)
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
})
