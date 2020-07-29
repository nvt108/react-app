import React, {Component} from 'react';
import axios from 'axios'

class Employee extends Component{
    constructor(props) {
        super(props)
        this.state = {
            selectedEmployee: 1
        }
    }

    componentWillMount(){
        this.getListEmployee();
    }

    getListEmployee(){
        axios.get('./assets/sampledata/list-employee.json').then(res =>{
            this.setState({employees: res})
        });
    }
    render(){
        return  null;
    }

}

export default Employee;