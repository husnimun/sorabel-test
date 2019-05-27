import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {
  fetchProductById,
  clearProduct,
  openBuyModal,
} from '../../store/actions'
import {
  getAvailableColor,
  getAvailableSize,
} from '../../helpers/product-helpers'
import { Divider } from '../common/Divider'
import { StyledButton } from '../common/StyledButton'

const ProductWrapper = styled.div`
  background-color: #fff;
`

const SummaryTitle = styled.span`
  display: block;
  color: #808080;
  font-size: 18px;
  margin-bottom: 8px;
`

const ProductTitle = styled.h1`
  color: #525252;
  font-size: 18px;
  margin-top: 0;
  margin-bottom: 8px;
`

const ProductPrice = styled.div`
  color: #ac145a;
  font-size: 20px;
`

class Product extends React.Component {
  state = {
    isLoading: true,
  }

  async componentDidMount() {
    this.setState({ isLoading: true })
    const { fetchProductById, match } = this.props
    await fetchProductById(match.params.id)
    this.setState({ isLoading: false })
  }

  componentWillUnmount() {
    const { clearProduct } = this.props
    clearProduct()
  }

  renderProduct = () => {
    const { isLoading } = this.state
    if (isLoading) {
      return <div />
    } else {
      const { product, openBuyModal } = this.props
      return (
        <ProductWrapper>
          <img src={product.images[0].fullUrl} alt={product.title} />
          <Divider>
            <ProductTitle>{product.title}</ProductTitle>
            <ProductPrice>{product.price.amount}</ProductPrice>
          </Divider>
          <Divider>
            <SummaryTitle>Bahan</SummaryTitle>
            {product.material}
          </Divider>
          <Divider>
            <p>Warna: {getAvailableColor(product.variants).join(', ')}</p>
            <p>Ukuran: {getAvailableSize(product.variants).join(', ')}</p>
          </Divider>
          <Divider>
            <StyledButton
              type="button"
              style={{ display: 'block', width: '100%' }}
              onClick={() => {
                openBuyModal(product)
              }}
            >
              Beli Sekarang
            </StyledButton>
          </Divider>
        </ProductWrapper>
      )
    }
  }

  render() {
    return this.renderProduct()
  }
}

function mapStateToProps(state) {
  return {
    product: state.product,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchProductById(id) {
      return dispatch(fetchProductById(id))
    },
    clearProduct() {
      dispatch(clearProduct())
    },
    openBuyModal(product) {
      dispatch(openBuyModal(product))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product)
