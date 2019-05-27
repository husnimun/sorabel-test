import * as actionList from '../actionList'
import * as actions from '../notifications'

describe('test suite for redux actions', () => {
  it('should create action to show notification', () => {
    const expectedAction = {
      type: actionList.SHOW_NOTIFICATION,
      id: 1,
      text: 'notification',
    }

    expect(actions.showNotification(1, 'notification')).toEqual(expectedAction)
  })

  it('should create action to hide notification', () => {
    const expectedAction = {
      type: actionList.HIDE_NOTIFICATION,
      id: 1,
    }

    expect(actions.hideNotification(1)).toEqual(expectedAction)
  })
})
