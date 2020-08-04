import React, {Component} from 'react';
import axios from 'axios'
import {post} from "axios/index";

export default class EmployeeDetail extends Component{
    constructor(props) {
        super(props);
        this.state = {};
        this.goBack = this.goBack.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.update = this.update.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
    }
    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0] });
    };
    handleChange (evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }
    async update(){
        const formData = new FormData();
        if(this.state.selectedFile){
            formData.append(
                "file",
                this.state.selectedFile,
                this.state.selectedFile.name
            );
        }
        formData.append("_id",this._idInput.value,);
        formData.append("name",this.nameInput.value);
        formData.append("email",this.emailInput.value);
        formData.append("phone",this.phoneInput.value);
        let response = () => {
            return new Promise(function (resolve, reject) {
                post('http://localhost:5000/api/updateEmployee',formData,{
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    }
                }).then(response => {
                    resolve(response);

                })
            });
        };
        let responseData = await response();
        this.props.history.goBack();
        console.log(responseData.data);
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
                    <div className="form-group">
                        <label htmlFor="inputAddress">Image</label>
                        <input type="file" name="file" onChange={this.onFileChange} />
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