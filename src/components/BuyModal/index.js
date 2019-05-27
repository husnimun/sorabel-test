import React from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'
import {
  getAvailableColor,
  getAvailableSize,
  filterVariantsByColorAndSize,
  getVariantsAvailabilityMapByType,
} from '../../helpers/product-helpers'
import { Flex, FlexItem } from '../common/Flex'
import { Divider } from '../common/Divider'
import { closeBuyModal } from '../../store/actions/buyModal'
import { showNotificationWithTimeout } from '../../store/actions/notifications'

Modal.setAppElement('#root')

const StyledModal = styled(Modal)`
  position: absolute;
  left: 40px;
  right: 40px;
  bottom: 40px;
  background: rgb(255, 255, 255);
  overflow: auto;
  border-radius: 4px;
  outline: none;
  width: 480px;
  height: auto;
  margin: 0 auto;
`

const CloseButton = styled.button`
  background-color: transparent;
  cursor: pointer;
  border: none;
  color: rgb(82, 82, 82);
`

const Price = styled.span`
  font-weight: bold;
`

const VariantButton = styled.button`
  margin-bottom: 8px;
  margin-right: 8px;
  padding: 8px 16px;
  border-color: rgb(196, 196, 196);
  border-width: 1px;
  border-style: solid;
  border-radius: 8px;
  background-color: rgb(255, 255, 255);
  text-align: center;
  cursor: pointer;
  outline: none;
  text-decoration: none;
  display: inline-block;

  ${props =>
    props.selected &&
    css`
      border-color: rgb(172, 20, 90);
      color: rgb(172, 20, 90);
    `}

  &:disabled {
    color: rgb(232, 232, 232);
    border-color: rgb(232, 232, 232);
  }
`

class BuyModal extends React.Component {
  state = {
    selectedSize: null,
    selectedColor: null,
  }

  componentDidUpdate() {
    const { selectedSize, selectedColor } = this.state
    if (selectedSize && selectedColor) {
      this.props.showNotificationWithTimeout(
        'Barang sista berhasil masuk ke keranjang'
      )
      this.props.handleClose()
      this.resetState()
    }
  }

  renderColorVariant = () => {
    const { product } = this.props
    const availableColor = getAvailableColor(product.variants)
    const { selectedSize, selectedColor } = this.state
    const filteredVariants = filterVariantsByColorAndSize(
      product.variants,
      selectedColor,
      selectedSize
    )
    let availabilityOfFilteredVariants = getVariantsAvailabilityMapByType(
      filteredVariants,
      'color'
    )
    return availableColor.map((color, index) => (
      <VariantButton
        type="button"
        disabled={selectedSize && !availabilityOfFilteredVariants[color]}
        selected={color === this.state.selectedColor}
        key={`${product.id}-color-${index}`}
        onClick={() => {
          this.setState({ selectedColor: color })
        }}
      >
        {color}
      </VariantButton>
    ))
  }

  renderSizeVariant = () => {
    const { product } = this.props
    const availableSize = getAvailableSize(product.variants)
    const { selectedSize, selectedColor } = this.state
    const filteredVariants = filterVariantsByColorAndSize(
      product.variants,
      selectedColor,
      selectedSize
    )
    let availabilityOfFilteredVariants = getVariantsAvailabilityMapByType(
      filteredVariants,
      'size'
    )
    return availableSize.map((size, index) => (
      <VariantButton
        selected={size === this.state.selectedSize}
        disabled={selectedColor && !availabilityOfFilteredVariants[size]}
        key={`${product.id}-size-${index}`}
        onClick={() => {
          this.setState({ selectedSize: size })
        }}
      >
        {size}
      </VariantButton>
    ))
  }

  resetState = () => {
    this.setState({
      selectedColor: null,
      selectedSize: null,
    })
  }

  renderSummary = () => {
    const { product, handleClose } = this.props
    return (
      <Flex>
        <FlexItem flexSize={1}>
          <img
            src={product.images[0].fullUrl}
            alt={product.title}
            width="64"
            height="64"
          />
        </FlexItem>
        <FlexItem flexSize={3}>
          <div>
            <p>{product.title}</p>
          </div>
          <Price>{product.price.amount}</Price>
        </FlexItem>
        <FlexItem flexSize={1} style={{ textAlign: 'right' }}>
          <CloseButton
            type="button"
            onClick={() => {
              handleClose()
              this.resetState()
            }}
          >
            X
          </CloseButton>
        </FlexItem>
      </Flex>
    )
  }

  renderContent() {
    if (!this.props.isOpen) {
      return <div />
    } else {
      return (
        <div>
          <Divider>{this.renderSummary()}</Divider>
          <Divider>
            <div>
              <p>Pilih warna yang tersedia</p>
              {this.renderColorVariant()}
            </div>
            <div>
              <p>Pilih ukuran yang tersedia</p>
              {this.renderSizeVariant()}
            </div>
          </Divider>
        </div>
      )
    }
  }
  render() {
    return (
      <StyledModal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.handleClose}
      >
        {this.renderContent()}
      </StyledModal>
    )
  }
}

function mapStateToProps(state) {
  return {
    product: state.product,
    isOpen: state.isBuyModalOpen,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleClose() {
      dispatch(closeBuyModal())
    },
    showNotificationWithTimeout(text) {
      dispatch(showNotificationWithTimeout(text))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyModal)
