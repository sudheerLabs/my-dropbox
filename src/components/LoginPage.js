import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {userActions} from '../actions';

class LoginPage extends Component{
	constructor(props) {
        super(props);

        // reset login status
        //this.props.dispatch(userActions.logout());

        //the state when the component is loaded
        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        //binding methods to this component
        this.handleChange = this.handleChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
    }

    //whenever a field is changed, update the state of that in the commponent
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
         /* experiment
         why name has to be given in []
        console.log([name] + " " + value);
        console.log(this.state); 
        console.log(e.target);   
        */
    };

    handleSubmit = (e) => {

    	//To prevent the default behavior of form submission
        e.preventDefault();      
        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }

	render(){
		
		const { username, password, submitted } = this.state;

		return(
			<div className="col-md-6 col-md-offset-3">
	            <h2>Login</h2>
	            <form name="form" onSubmit={this.handleSubmit}>
	                <div className='form-group'>
	                    <label >Username</label>
	                    <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
	                </div>
	                <div className='form-group'>
	                    <label>Password</label>
	                    <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
	                </div>
	                <div className="form-group">
	                    <button className="btn btn-primary">Login</button>
	                    <Link to="/signup" className="btn btn-link">Sign Up</Link>
	                </div>
	            </form>
	        </div>
		);
	}
}

function mapStateToProps(state) {
	console.log(JSON.stringify(state));
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 