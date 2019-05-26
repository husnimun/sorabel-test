import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import { Provider } from 'react-redux'
import ProductList from './components/ProductList'
import Product from './components/Product/Product'
import BuyModal from './components/BuyModal'
import store from './store'

const AppContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 0 10px;
`

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContainer>
          <Switch>
            <Route exact path="/" component={ProductList} />
            <Route path="/products/:id" component={Product} />
          </Switch>
          <BuyModal />
        </AppContainer>
      </Router>
    </Provider>
  )
}

export default App
