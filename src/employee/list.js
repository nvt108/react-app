import React, {Component} from 'react';
import axios from 'axios'
import { Link,Route } from 'react-router-dom';
import EmployeeDetail from "./detail";

class Employee extends Component{
    constructor(props) {
        super(props)
        this.state = {
            selectedEmployee: ''
        }
        this.getList = this.getList.bind(this);
        this.removeEmployee = this.removeEmployee.bind(this);
        this.search = this.search.bind(this);
    }
    search(){
        let keyword = this.searchInput.value;
        fetch('/api/getlistemployee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ keyword: keyword }),
        }).then(res => res.json()).then(
            (result) => {
                console.log(result);
                this.setState({employees: result});
            },
            (error) => {
                console.log(error);
            }
        );

    }
    componentWillMount(){
        this.getList();
        // this.getListEmployee(); // get data from json file
    }

    // get from json file
    getListEmployee(){
        axios.get('./assets/sampledata/list-employee.json').then(res =>{
            console.log(res.data);
            this.setState({employees: res.data})
        });
    }

    getList(){
        fetch('/api/getlistemployee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        }).then(res => res.json()).then(
            (result) => {
                console.log(result);
                this.setState({employees: result});
            },
            (error) => {
                console.log(error);
            }
        );
    }

    async removeEmployee(id){
        const list = this.state.employees.filter((item) => item._id !== id);
        console.log(list);
        this.setState({employees: list});
        fetch('/api/deleteEmployee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ _id: id }),
        }).then(res => res.json()).then(
            (result) => {

            },
            (error) => {
                console.log(error);
            }
        );
    }

    render(){
        if (!this.state.employees)
            return (<p>Loading data</p>)
        return (
            <div >
                <div className="col-md-12 list-employee">
                    <h3>Employees</h3>
                    <form className="navbar-search pull-left">
                        <input type="text" ref={(input) => {this.searchInput = input}} name="search" className="search-query" placeholder="Search" onKeyDown={this.search} />
                    </form>
                    <Link to={{pathname: '/add'}} className="btn btn-primary float-right mb-2">Add New</Link>
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
                            this.state.employees.map((employee) =><tr key={employee._id}>
                                    <th scope="row">{employee._id}</th>
                                    <td>
                                        <Link onClick={() => this.setState({selectedEmployee: employee._id})} to={{pathname: `detail/${employee._id}`, query: { id: employee._id, employees: this.state.employees }}}>{employee.name}</Link>
                                    </td>
                                    <td>{employee.email}</td>
                                    <td>{employee.phone}</td>
                                    <td>
                                        <button className="btn btn-danger" type="button" onClick={() => this.removeEmployee(employee._id)}>Remove</button>
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