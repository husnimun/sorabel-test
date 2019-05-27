import * as actionList from '../actionList'
import * as actions from '../buyModal'

describe('test suite for redux actions', () => {
  it('should create action to open buy modal', () => {
    const expectedAction = {
      type: actionList.OPEN_BUY_MODAL,
    }

    expect(actions.openBuyModal()).toEqual(expectedAction)
  })

  it('should create action to close buy modal', () => {
    const expectedAction = {
      type: actionList.CLOSE_BUY_MODAL,
    }

    expect(actions.closeBuyModal()).toEqual(expectedAction)
  })
})
