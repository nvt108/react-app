import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import './bootstrap.css';
import Employees from './employee/list';
import About from './components/about';
import Blog from './components/blog';

import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import EmployeeDetail from "./employee/detail";
import EmployeeAdd from "./employee/add";

class App extends Component{
    render(){
        return (
            <Router basename={process.env.PUBLIC_URL}>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <span>Welcome to React</span>
                    </header>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/about">About</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/blog">Blog</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <Switch>
                        <Route exact path= "/" render={() => (
                            <Redirect to="/employees"/>
                        )}/>
                        <Route exact path='/employees' component={Employees} />
                        <Route path='/detail/:id' component={EmployeeDetail} />
                        <Route path='/about' component={About} />
                        <Route path='/blog' component={Blog} />
                        <Route path='/add' component={EmployeeAdd} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
