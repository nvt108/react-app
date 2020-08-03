import React, {Component} from 'react';
import axios from 'axios'

export default class EmployeeDetail extends Component{
    constructor(props) {
        super(props);
        this.state = {};
        this.goBack = this.goBack.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.update = this.update.bind(this);
    }
    handleChange (evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }
    update(){
        let data = {
            _id: this._idInput.value,
            data: {
                name: this.nameInput.value,
                email: this.emailInput.value,
                phone: this.phoneInput.value,
            }
        };
        console.log(data);
        fetch('/api/updateEmployee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(res => res).then(
            (result) => {
                // console.log(result);
                this.props.history.goBack();
            },
            (error) => {
                console.log(error);
            }
        );
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
        const employee = employees.find(e => e._id == location.query.id);
        return employee ? (
            <div className="col-md-12 employee-detail">
                <form>
                    <div className="form-group">
                        <label htmlFor="inputAddress">Name</label>
                        <input type="text" className="form-control" name="name" onChange={this.handleChange} id="inputAddress" defaultValue={employee.name}
                               ref={(input) => {this.nameInput = input}}  placeholder="John" />
                        <input type="hidden" ref={(input) => {this._idInput = input}} name="_id" defaultValue={employee._id}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress">Email</label>
                        <input type="text" className="form-control" name="email" onChange={this.handleChange} id="inputAddress" defaultValue={employee.email}
                               ref={(input) => {this.emailInput = input}}  placeholder="john@gmail.com" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress">Phone</label>
                        <input type="text" className="form-control" name="phone" onChange={this.handleChange} id="inputAddress" defaultValue={employee.phone}
                               ref={(input) => {this.phoneInput = input}}   placeholder="098 256 689" />
                    </div>
                    <button type="button" onClick={this.goBack} className="btn btn-secondary mgr-10">Back</button>
                    <button type="button" className="btn btn-primary" onClick={this.update}>Save</button>
                </form>
            </div>
        ) : (
            <div>Error: Employee doesn't exits!!</div>
        );
    }
}