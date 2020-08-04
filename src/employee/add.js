import React, {Component} from 'react';
import axios, {post} from 'axios';

export default class EmployeeAdd extends Component{
    constructor(props) {
        super(props);
        this.state = {};
        this.goBack = this.goBack.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.add = this.add.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
    }
    handleChange (evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }
    async add(){
        const formData = new FormData();
        if(this.state.selectedFile !== undefined && this.state.selectedFile.name != ''){
            formData.append(
                "file",
                this.state.selectedFile,
                this.state.selectedFile.name
            );
        }

        formData.append("name",this.nameInput.value);
        formData.append("email",this.emailInput.value);
        formData.append("phone",this.phoneInput.value);
        let response = () => {
            return new Promise(function (resolve, reject) {
                post('http://localhost:5000/api/addEmployee',formData,{
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
    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0] });
    };
    goBack(){
        this.props.history.goBack();
    }
    render(){
        return (
            <div className="col-md-12 employee-detail">
                <form >
                    <div className="form-group">
                        <label htmlFor="inputAddress">Name</label>
                        <input type="text" className="form-control" name="name" onChange={this.handleChange} id="inputAddress"
                               ref={(input) => {this.nameInput = input}}  placeholder="John" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress">Email</label>
                        <input type="text" className="form-control" name="email" onChange={this.handleChange} id="inputAddress"
                               ref={(input) => {this.emailInput = input}}  placeholder="john@gmail.com" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress">Phone</label>
                        <input type="text" className="form-control" name="phone" onChange={this.handleChange} id="inputAddress"
                               ref={(input) => {this.phoneInput = input}}   placeholder="098 256 689" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress">Image</label>
                        <input type="file" name="file" onChange={this.onFileChange} />
                    </div>
                    <button type="button" onClick={this.goBack} className="btn btn-secondary mgr-10">Back</button>
                    <button type="button" className="btn btn-primary" onClick={this.add}>Save</button>
                </form>
            </div>
        );
    }
}