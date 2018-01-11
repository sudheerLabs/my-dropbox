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
        console.log(this.props.alert.message);
        const alert = this.props.alert;

		return(
            <div>
            <span className="dropbox-2015 dropbox-logo-2015">
            <header className="mast-head">
            <div className="mast-head__container container">
                <nav className="mast-head__nav mast-head-nav">
                <ul className="nav-list">
                <li className="nav-list__item nav-list__item--dfb">
                <a href="/business" id="try-dfb" className="button-tertiary try-dfb">Try Dropbox Business</a>
                </li>
                </ul>
                <ul className="nav-list"></ul>
                </nav>
                <h1 id="dropbox-logo" className="dropbox-logo">
                <a href="/" className="dropbox-logo__link">
                <img src="https://cfl.dropboxstatic.com/static/images/logo_catalog/dropbox_logo_glyph_2015_m1-vfleInWIl.svg" alt="" className="dropbox-logo__glyph" />
                <img src="https://cfl.dropboxstatic.com/static/images/logo_catalog/dropbox_logo_text_2015_m1-vflV-vZRB.svg" alt="" className="dropbox-logo__type" />Dropbox</a>
                </h1>
            </div>
            </header>
            </span>
            <div id="login-or-register-page-content">
    			<div className="col-md-4 col-md-offset-2">
                <img data-js-component-id="component3815808038535169898" src="https://cfl.dropboxstatic.com/static/images/empty_states/rebrand_m1/sign-in-illo-vfl_t3XMB.png" data-hi-res="https://cfl.dropboxstatic.com/static/images/empty_states/rebrand_m1/sign-in-illo@2x-vflh_wJFN.png" alt="" className="login-or-register-img" />
    	         </div>
                 <div className="col-md-3 login-register-container">
                    {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }

                    <div className="login-register-header">Sign in</div>
                    <div className="login-register-switch">or <a href="/signup" className="login-register-switch-link">create an account</a></div>
    	            <form name="form" onSubmit={this.handleSubmit}>
    	                <div className='form-group'>
    	                    <input type="email" placeholder="Email" className="form-control" name="username" value={username} onChange={this.handleChange} />
    	                </div>
    	                <div className='form-group'>
    	                    <input type="password" placeholder="Password" className="form-control" name="password" value={password} onChange={this.handleChange} />
    	                </div>
    	                <div className="form-group">
    	                    <button type="submit" className="login-button button-primary" tabIndex="-1">
                            <div className="sign-in-text">Sign in</div>
                            </button>
    	                </div>
    	            </form>
    	        </div>
            </div>
            </div>		);
	}
}

function mapStateToProps(state) {
	console.log(JSON.stringify(state));
    const { loggingIn } = state.authentication;
    const  alert  = state.alert;
    return {
        loggingIn, alert
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 