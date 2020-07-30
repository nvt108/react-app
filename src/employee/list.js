import React, {Component} from 'react';
import axios from 'axios'
import { Link,Route } from 'react-router-dom';

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
            this.setState({employees: res.data})
        });
    }

    async removeEmployee(id){
        const list = this.state.employees.filter((item) => item.id !== id);
        this.setState({employees: list});
        // update json file here

    }

    render(){
        if (!this.state.employees)
            return (<p>Loading data</p>)
        return (
            <div >
                <div className="col-md-12 list-employee">
                    <h3>Employees</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.employees.map((employee) =><tr key={employee.id}>
                                    <th scope="row">{employee.id}</th>
                                    <td>
                                        <Link to={{pathname: `detail/${employee.id}`, query: { id: employee.id, employees: this.state.employees }}}>{employee.name}</Link>
                                    </td>
                                    <td>{employee.email}</td>
                                    <td>{employee.phone}</td>
                                    <td>
                                        <button className="btn btn-danger" type="button" onClick={() => this.removeEmployee(employee.id)}>Remove</button>
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Employee;