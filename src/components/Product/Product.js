import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { fetchProductById, clearProduct } from '../../store/actions'

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
      const { product } = this.props
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
          <SummaryDivider>Warna Ukuran</SummaryDivider>
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product)
