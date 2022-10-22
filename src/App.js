import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import Logout from './containers/Auth/logout/Logout'
import { connect } from 'react-redux';
import { authCheckState } from './redux/actions/index'
import asyncComponent from './hoc/lazyLoading/lazyLoad'

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Authenticate')
})

const asyncCheckout = asyncComponent(() => {
  return import('./containers/CheckOut/CheckOut')
})

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders')
})


class App extends Component {
  componentWillMount() {
    this.props.onAutoAuth()
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/order" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>

    );
  }
}
const mapStateToProps = state => {
  return {
    isAuth: state.auth.tokenId !== null
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onAutoAuth: () => dispatch(authCheckState())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
