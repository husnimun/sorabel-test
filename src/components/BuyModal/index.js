import React from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { closeBuyModal } from '../../store/actions'
import styled, { css } from 'styled-components'
import {
  getAvailableColor,
  getAvailableSize,
  filterVariantsByColorAndSize,
} from '../../helpers/product-helpers'

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

const SummaryDivider = styled.div`
  padding: 16px 16px;
  border-bottom: 1px solid #e8e8e8;
`
const Flex = styled.div`
  display: flex;
`
const FlexItem = styled.div`
  ${props =>
    props.flexSize &&
    css`
      flex: ${props.flexSize};
    `}
  ${props =>
    props.alignCenter &&
    css`
      margin-top: auto;
      margin-bottom: auto;
    `}
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

  renderColorVariant = () => {
    const { product } = this.props
    const availableColor = getAvailableColor(product.variants)
    const { selectedSize, selectedColor } = this.state
    const filteredVariants = filterVariantsByColorAndSize(
      product.variants,
      selectedColor,
      selectedSize
    )
    let availabilityOfFilteredVariants = filteredVariants.reduce(
      (acc, variant) => {
        if (variant.quantity > 0) {
          acc[variant.color] = true
        }
        return acc
      },
      {}
    )
    console.log(filteredVariants)
    return availableColor.map((color, index) => (
      <VariantButton
        disabled={!availabilityOfFilteredVariants[color]}
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
    let availabilityOfFilteredVariants = filteredVariants.reduce(
      (acc, variant) => {
        if (variant.quantity > 0) {
          acc[variant.size] = true
        }
        return acc
      },
      {}
    )
    return availableSize.map((size, index) => (
      <VariantButton
        selected={size === this.state.selectedSize}
        disabled={!availabilityOfFilteredVariants[size]}
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
          <SummaryDivider>{this.renderSummary()}</SummaryDivider>
          <SummaryDivider>
            <div>
              <p>Pilih warna yang tersedia</p>
              {this.renderColorVariant()}
            </div>
            <div>
              <p>Pilih ukuran yang tersedia</p>
              {this.renderSizeVariant()}
            </div>
          </SummaryDivider>
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyModal)
