import React, {Component} from 'react';

export default class EmployeeAdd extends Component{
    constructor(props) {
        super(props);
        this.state = {};
        this.goBack = this.goBack.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.add = this.add.bind(this);
    }
    handleChange (evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }
    add(){
        let data = {
            name: this.nameInput.value,
            email: this.emailInput.value,
            phone: this.phoneInput.value,
        };
        fetch('/api/addEmployee', {
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
        return (
            <div className="col-md-12 employee-detail">
                <form>
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
                    <button type="button" onClick={this.goBack} className="btn btn-secondary mgr-10">Back</button>
                    <button type="button" className="btn btn-primary" onClick={this.add}>Save</button>
                </form>
            </div>
        );
    }
}