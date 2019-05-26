import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchProducts, clearProducts, openBuyModal } from '../../store/actions'
import styled, { css } from 'styled-components'
import { getAvailableSize } from '../../helpers/product-helpers'

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

const ProductDetail = styled.div`
  background-color: #fff;
  padding: 8px 16px;
`

const ProductImageContainer = styled.div`
  max-width: 480px;
  max-height: 480px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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

const StyledTitle = styled.h2`
  color: rgb(82, 82, 82);
  font-size: 16px;
  font-weight: normal;
  margin-top: 0;
  margin-bottom: 8px;
`

const StyledPrice = styled.div`
  color: rgb(82, 82, 82);
  font-size: 18px;
  font-weight: bold;
`

const StyledSizeLabel = styled.span`
  display: inline-block;
  color: rgb(128, 128, 128);
  background-color: rgb(232, 232, 232);
  font-size: 12px;
  padding: 4px 8px;
  margin-bottom: 8px;
`

class ProductList extends React.Component {
  state = {
    isBuyModalOpen: false,
  }

  componentDidMount() {
    const { fetchProducts } = this.props
    fetchProducts()
  }

  componentWillUnmount() {
    const { clearProducts } = this.props
    clearProducts()
  }

  render() {
    const { products } = this.props
    return products.map(product => (
      <div key={product.id}>
        <Link to={`products/${product.id}`}>
          <ProductImageContainer>
            <img src={product.images[0].fullUrl} alt={product.title} />
          </ProductImageContainer>
        </Link>
        <ProductDetail>
          <Flex>
            <FlexItem flexSize={3}>
              <StyledTitle>{product.title}</StyledTitle>
              <StyledSizeLabel>
                {getAvailableSize(product.variants).join(', ')}
              </StyledSizeLabel>
              <StyledPrice>{product.price.amount}</StyledPrice>
            </FlexItem>
            <FlexItem flexSize={1} alignCenter style={{ textAlign: 'right' }}>
              <StyledButton
                onClick={() => {
                  this.props.openBuyModal(product)
                }}
              >
                Beli
              </StyledButton>
            </FlexItem>
          </Flex>
        </ProductDetail>
      </div>
    ))
  }
}

function mapStateToProps(state) {
  return {
    products: state.products,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchProducts() {
      dispatch(fetchProducts())
    },
    clearProducts() {
      dispatch(clearProducts())
    },
    openBuyModal(product) {
      dispatch(openBuyModal(product))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList)
