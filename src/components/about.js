import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';


export default class About extends Component{
    render(){
        return (
            <div className="col-md-12 employee-detail  text-center">
                <h3>Welcome to About page</h3>
            </div>
        );
    }
}
