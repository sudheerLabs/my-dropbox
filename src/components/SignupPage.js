import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions';
import '../styles/login.css';

class SignupPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstname: '',
                lastname: '',
                username: '',
                password: ''
            },
            submitted: false
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    };

    handleSubmit = (event) => {

        console.log("hanndle sub");
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.firstname && user.lastname && user.username && user.password) {
            dispatch(userActions.signup(user));
        }
    }

    render() {
        const {username, password, firstname, lastname} = this.state.user;
        const { signingup  } = this.props;
        const { user, submitted } = this.state;
        const alert = this.props.alert;
        return (
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

                    <div className="login-register-header">Create an account</div>
                    <div className="login-register-switch">or <a href="/login" className="login-register-switch-link">Sign in</a></div>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className='form-group'>
                            <input type="text" placeholder="First name" className="form-control" name="firstname" value={firstname} onChange={this.handleChange} />
                        </div>
                        <div className='form-group'>
                            <input type="text" placeholder="Last name" className="form-control" name="lastname" value={lastname} onChange={this.handleChange} />
                        </div>
                        <div className='form-group'>
                            <input type="email" placeholder="Email" className="form-control" name="username" value={username} onChange={this.handleChange} />
                        </div>
                        <div className='form-group'>
                            <input type="password" placeholder="Password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="login-button button-primary" tabIndex="-1">
                            <div className="sign-in-text">Create an account</div>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { signingup } = state.signup;
    const  alert  = state.alert;
    return {
        signingup, alert
    };
}

const connectedSignupPage = connect(mapStateToProps)(SignupPage);
export { connectedSignupPage as SignupPage }; 