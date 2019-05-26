import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchProducts, clearProducts } from '../../store/actions'
import styled from 'styled-components'

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

function Title({ className, title }) {
  return <h2 className={className}>{title}</h2>
}

const StyledTitle = styled(Title)`
  color: rgb(82, 82, 82);
  font-size: 16px;
  font-weight: normal;
  margin-top: 0;
  margin-bottom: 8px;
`

function Price({ className, amount }) {
  return <div className={className}>{amount}</div>
}

const StyledPrice = styled(Price)`
  color: rgb(82, 82, 82);
  font-size: 18px;
  font-weight: bold;
`

function getAvailableSize(variants) {
  let sizeMap = {}
  return variants.reduce((acc, variant) => {
    if (variant.quantity > 0 && !sizeMap[variant.size]) {
      sizeMap[variant.size] = true
      acc.push(variant.size)
    }
    return acc
  }, [])
}

function SizeLabel({ className, variants }) {
  return (
    <div className={className}>{getAvailableSize(variants).join(', ')}</div>
  )
}

const StyledSizeLabel = styled(SizeLabel)`
  display: inline-block;
  color: rgb(128, 128, 128);
  background-color: rgb(232, 232, 232);
  font-size: 12px;
  padding: 4px 8px;
  margin-bottom: 8px;
`

class ProductList extends React.Component {
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
          <StyledTitle title={product.title} />
          <StyledSizeLabel variants={product.variants} />
          <StyledPrice amount={product.price.amount} />
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList)
