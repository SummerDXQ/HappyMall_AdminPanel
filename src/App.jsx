import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Home from "./page/Home";
import Layout from "./component/Layout";

class App extends Component {
  render() {
    return(
        <Router>
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Redirect from="*" to="/"/>
                </Switch>
            </Layout>
        </Router>
    )
  }
}

export default App;
