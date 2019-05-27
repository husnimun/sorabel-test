import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Observer from '@researchgate/react-intersection-observer'
import styled from 'styled-components'
import { getAvailableSize } from '../../helpers/product-helpers'
import { Flex, FlexItem } from '../common/Flex'
import { StyledButton } from '../common/StyledButton'
import { Loader } from '../common/Loader'
import { fetchProducts, clearProducts } from '../../store/actions/products'
import { openBuyModal } from '../../store/actions/buyModal'

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
    page: 1,
    limit: 5,
    shouldLoadNextPage: true,
  }

  componentDidMount() {
    const { fetchProducts } = this.props
    const { page, limit } = this.state
    fetchProducts({ page, limit })
  }

  componentWillUnmount() {
    const { clearProducts } = this.props
    clearProducts()
  }

  handleIntersection = event => {
    if (event.isIntersecting && this.state.shouldLoadNextPage) {
      this.setState(
        state => ({
          page: state.page + 1,
        }),
        () => {
          this.props
            .fetchProducts({
              page: this.state.page,
              limit: this.state.limit,
            })
            .then(({ products }) => {
              if (products.length === 0) {
                this.setState({ shouldLoadNextPage: false })
              }
            })
        }
      )
    }
  }

  renderLoader = () => {
    return this.state.shouldLoadNextPage ? <Loader>Loading...</Loader> : null
  }

  render() {
    const { products } = this.props
    return (
      <div>
        {products.map(product => (
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
                <FlexItem
                  flexSize={1}
                  alignCenter
                  style={{ textAlign: 'right' }}
                >
                  <StyledButton
                    type="button"
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
        ))}
        <Observer onChange={this.handleIntersection}>
          <div>{this.renderLoader()}</div>
        </Observer>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    products: state.products,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchProducts(params) {
      return dispatch(fetchProducts(params))
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
