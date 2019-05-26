import React from 'react'
import { connect } from 'react-redux'
import { fetchProductById, clearProduct } from '../../store/actions'

class Product extends React.Component {
  componentDidMount() {
    const { fetchProductById, match } = this.props
    fetchProductById(match.params.id)
  }

  componentWillUnmount() {
    const { clearProduct } = this.props
    clearProduct()
  }

  render() {
    const { product } = this.props
    return <div>{product.title}</div>
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
      dispatch(fetchProductById(id))
    },
    clearProduct() {
      dispatch(clearProduct())
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product)
