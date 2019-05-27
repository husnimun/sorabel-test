import { CLOSE_BUY_MODAL, OPEN_BUY_MODAL } from './actionList'

export function openBuyModal(product) {
  return {
    type: OPEN_BUY_MODAL,
    product,
  }
}

export function closeBuyModal() {
  return {
    type: CLOSE_BUY_MODAL,
  }
}
