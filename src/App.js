import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import ProductList from './components/Product/ProductList'
import Product from './components/Product/Product'
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={ProductList} />
          <Route path="/products/:id" component={Product} />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
