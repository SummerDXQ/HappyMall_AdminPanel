import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Home from "./page/Home";
import Layout from "./component/Layout";
import Login from "./page/Login";
import Error from "./page/Error";
import UserList from "./page/User";
import ProductRouter from "./page/Product/router";
import OrderList from "./page/Order";
import OrderDetail from "./page/Order/OrderDetail";

class App extends Component {

  render() {
      let layoutRouter = (
          <Layout>
              <Switch>
                  <Route exact path="/" component={Home}/>
                  <Route path="/product" component={ProductRouter}/>
                  <Route path="/product_category" component={ProductRouter}/>
                  <Route path="/order/index" component={OrderList}/>
                  <Route path="/order/detail/:orderNumber" component={OrderDetail}/>
                  <Route path="/user" component={UserList}/>
                  <Redirect exact from='/order' to="/order/index"/>
                  <Route component={Error}/>
              </Switch>
          </Layout>
      );

      return(
            <Router>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/" render = {(props) => (layoutRouter)}/>
                </Switch>
            </Router>
    )
  }
}

export default App;
