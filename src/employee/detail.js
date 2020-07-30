import React, {Component} from 'react';
import axios from 'axios'

export default class EmployeeDetail extends Component{
    constructor(props) {
        super(props);
        this.state = {};
        this.goBack = this.goBack.bind(this);
    }

    update(){

    }

    goBack(){
        this.props.history.goBack();
    }
    render(){
        const { location } = this.props;
        if (!location.query || !location) {
            return (<div>Loading...</div>);
        }
        const employees = location.query.employees;
        const employee = employees.find(e => e.id == location.query.id);
        return employee ? (
            <div className="col-md-12 employee-detail">
                <form>
                    <div className="form-group">
                        <label htmlFor="inputAddress">Name</label>
                        <input type="text" className="form-control" name="name" id="inputAddress" value={employee.name} placeholder="John" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress">Email</label>
                        <input type="text" className="form-control" name="email" id="inputAddress" value={employee.email} placeholder="john@gmail.com" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress">Phone</label>
                        <input type="text" className="form-control" name="phone" id="inputAddress" value={employee.phone} placeholder="098 256 689" />
                    </div>
                    <button type="button" onClick={this.goBack} className="btn btn-secondary mgr-10">Back</button>
                    <button type="submit" className="btn btn-primary">Save</button>
                </form>
            </div>
        ) : (
            <div>Error: Employee doesn't exits!!</div>
        );
    }
}