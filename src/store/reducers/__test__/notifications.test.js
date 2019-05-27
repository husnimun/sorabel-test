import * as reducers from '../notifications'
import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from '../../actions/actionList'

describe('test suite for redux reducers', () => {
  test('notifications reducer: should get default state', () => {
    const expected = []
    expect(reducers.notifications(undefined, {})).toEqual(expected)
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
