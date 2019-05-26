import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchProducts, clearProducts } from '../../store/actions'

function Title({ title }) {
  return <div>{title}</div>
}

function Price({ amount }) {
  return <div>{amount}</div>
}

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

function Size(props) {
  return <div>{getAvailableSize(props.variants).join(', ')}</div>
}

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
          <div>
            <img src={product.images[0].fullUrl} alt={product.title} />
          </div>
        </Link>
        <Title title={product.title} />
        <Price amount={product.price.amount} />
        <Size variants={product.variants} />
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
