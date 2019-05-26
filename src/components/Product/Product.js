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

const ProductWrapper = styled.div`
  background-color: #fff;
`

const SummaryDivider = styled.div`
  padding: 16px 16px;
  border-bottom: 1px solid #e8e8e8;
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

const StyledButton = styled.button`
  padding: 8px 16px;
  border-color: rgb(172, 20, 90);
  border-width: 1px;
  border-style: solid;
  border-radius: 8px;
  background-color: rgb(172, 20, 90);
  text-align: center;
  text-decoration: none;
  color: rgb(255, 255, 255);
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
  display: inline-block;
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
          <SummaryDivider>
            <ProductTitle>{product.title}</ProductTitle>
            <ProductPrice>{product.price.amount}</ProductPrice>
          </SummaryDivider>
          <SummaryDivider>
            <SummaryTitle>Bahan</SummaryTitle>
            {product.material}
          </SummaryDivider>
          <SummaryDivider>
            <p>Warna: {getAvailableColor(product.variants).join(', ')}</p>
            <p>Ukuran: {getAvailableSize(product.variants).join(', ')}</p>
          </SummaryDivider>
          <SummaryDivider>
            <StyledButton
              style={{ display: 'block', width: '100%' }}
              onClick={() => {
                openBuyModal(product)
              }}
            >
              Beli Sekarang
            </StyledButton>
          </SummaryDivider>
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
