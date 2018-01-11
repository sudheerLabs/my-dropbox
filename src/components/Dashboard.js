import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {FileUploadPage} from './FileUploadPage';
import  { FileDisplay }  from './FileDisplay';
import  { StarFileDisplay }  from './StarFileDisplay';
import { fileActions } from '../actions';
import { userActions } from '../actions';
import '../styles/stylesheet.css';
import { history } from '../helpers';

class Dashboard extends Component{

	constructor(props) {
	    super(props);

	    this.toggle = this.toggle.bind(this);
	    this.state = {
	      dropdownOpen: false
	    };
	}

	componentWillMount(){
		console.log("component will mount");
		//console.log(this.props.user);
		//console.log(this.props.pwd);

		this.props.getAllFiles(this.props.pwd  + this.props.user.username + ",");
	}


	toggle() {
		this.setState({
		dropdownOpen: !this.state.dropdownOpen
		});
	}

	handleClick = (event) => {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    };

    signout = (event) => {
        event.preventDefault();      
        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        this.props.signout();
    };

	render(){
		const {user, fileList} = this.props;
		console.log(this.props);
		return(
			<div>
				<div className="col-md-2 sidenav hidden-xs sidebar">
					<div style={{'height': '100vh'}} >
						<ul className="nav nav-list"> 
						  <li className="nav-header"><img className="maestro-nav__logo" aria-label="Home" alt="Dropbox" src="https://cfl.dropboxstatic.com/static/images/index/rebrand/logos/glyphs/glyph_blue.svg" role="img" width="32px" height="32px" /></li>        
						  <li><Link to="/dashboard" className="btn btn-link">Home</Link></li>
				          <li><Link to="/home" className="btn btn-link">Files</Link></li>
				          <li><Link to="#" className="btn btn-link">Pages</Link></li>
						</ul>
					</div>
				</div>
				<div className="col-md-8">

				<header className="maestro-header page-header__shadow">
						<div className="page-header">
							<div className="page-header__title" tabindex="0">
								<h1 className="page-header__heading">Home</h1>
							</div>
							<div className="top-menu-container ">
								<div className="top-menu-container--search-bar-empty-space"></div>
							</div>
						</div>
					</header>

				<main className="maestro-app">
	<div className="maestro-app-content" tabIndex="5">
	<div className="home">
	<main className="home-access" role="main">
	<ul className="home-access-sections">
		<li className="home-access-section">
		</li>
		<li className="home-access-section">
			<div className="starred">
			<h2 className="home-access-section__header">
			<div className="home-access-section__title">
			<div className="home-access-section__title-text">
			<div className="ue-effect-container">Starred</div>
			</div>
			</div>
			</h2>
				<ul className="starred-list">
				<div className="starred--empty">
				<div className="mc-tip-card">
				<p className="mc-tip-card-description">
					When you star items, they’ll show up here for easy access.
					<a href="/help/desktop-web/star-doc-file-folder" target="_blank" rel="noopener noreferrer">Learn more</a>
				</p>
				</div>
				{fileList &&
                    fileList.filter((file) => {return file.deleted !== "Y" && file.starred === "Y" && file.type==="file";}).map((file,index) => {
                            return(
                                <StarFileDisplay
                                    key={index}
                                    file={file}
                                />
                            );
                        })
                 }
				</div>
				</ul>
			</div>
		</li>
		<li className="home-access-section">
			<span className="home-recents-section">
			<h2 className="home-access-section__header">
			<div className="home-access-section__title">
			<div className="home-access-section__title-text">
			<div className="ue-effect-container">Recent</div>
			</div>
			</div>
			<div className="home-section-header__button">
			<button className="button-as-link">Hide</button>
			</div>
			</h2>

			{fileList &&
                    fileList.filter((file) => {return file.deleted !== "Y" && file.type === "file";}).map((file,index) => {
                            return(
                                <FileDisplay
                                    key={index}
                                    file={file}
                                />
                            );
                        })
                 }
			</span></li>
		</ul></main></div></div></main>
				</div>

				

				<div className="col-md-2">
					 
						<ul className="nav nav-list"> 
						  <li className="nav-header">
						  	<button name="signout" onClick={this.signout} type="button" className="btn button-secondary">Sign out</button>
						  </li>       
						  <li><FileUploadPage pwd= {this.props.pwd} /></li>
						 <li><table><tr><td><svg width="32" height="32" viewBox="0 0 32 32" className="mc-icon-template-actionable"><title>action-new-shared-folder</title><g fill="none" fillRule="evenodd"><path fill="none" d="M0 0h32v32H0z"></path><path d="M24 11.491c0-.823-.668-1.491-1.505-1.491H16l-2-2H9.499C8.67 8 8 8.664 8 9.493v12.5C8 22.549 8.445 23 9 23h14a1 1 0 0 0 1-.999v-10.51zM22 21H10v-9h12v9zm-11 0h10v2H11v-2z" fill="#0070E0" fillRule="nonzero"></path><path d="M16 23h-3.309c-.545 0-.809-.41-.575-.916l.334-.724c.347-.753 1.301-1.36 2.133-1.36h2.834c.832 0 1.786.607 2.133 1.36l.334.724c.234.506-.03.916-.575.916H16zm0-4a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fill="#0070E0"></path></g></svg></td>
						 	<td><a href="#">New shared folder</a></td></tr></table></li>
						 	<li><table><tr><td>
						 	<svg width="32" height="32" viewBox="0 0 32 32" className="mc-icon-template-actionable"><title>action-new-folder</title><g fill="none" fill-rule="evenodd"><path fill="none" d="M0 0h32v32H0z"></path><path d="M24 11.491c0-.823-.668-1.491-1.505-1.491H16l-2-2H9.499C8.67 8 8 8.664 8 9.493v12.014C8 22.332 8.667 23 9.505 23h12.99c.831 0 1.505-.663 1.505-1.491V11.49zM22 21H10v-9h12v9z" fill-rule="nonzero" fill="#0070E0"></path></g></svg></td>
						 	<td><a href="#">New folder</a></td></tr></table></li>
				          
						 	<li><table><tr><td>
				          	<svg width="32" height="32" viewBox="0 0 32 32" class="mc-icon-template-actionable"><title>action-show-deleted-files</title><g fill="none" fill-rule="evenodd"><g><path fill="none" d="M0 0h32v32H0z"></path><circle fill="#99C6F3" cx="15.5" cy="16" r="2"></circle><path d="M15.5 22c-4.875 0-8.235-5.19-8.235-5.19-.335-.444-.332-1.167-.01-1.607 0 0 3.37-5.203 8.245-5.203 4.875 0 8.235 5.19 8.235 5.19.335.444.332 1.167.01 1.607 0 0-3.37 5.203-8.245 5.203zm.014-2c3.59 0 6.5-4 6.5-4s-2.91-4-6.5-4-6.5 4-6.5 4 2.91 4 6.5 4z" fill="#0070E0"></path></g></g></svg></td>
						 	<td><Link to="/showDeleted">Show deleted files</Link></td></tr></table></li>      
						</ul>
				</div>
			</div>
		);
	}
}


function mapStateToProps(state) {
    console.log("map state to props : " + JSON.stringify(state));
    console.log(state);
    const { fileList, pwd } = state.files;
    let { user } = state.authentication;
    if(!user){
    	user = state.signup.user; 
 	}
  return {user, fileList, pwd};
}
function mapDispatchToProps(dispatch) {
  console.log("Iam in maptoDispatch");
   return {
       getAllFiles : (dir) => dispatch(fileActions.getAllFiles(dir)),
       signout : () => dispatch(userActions.signout())
    };
}

const connectedDashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboard);    // Learn 'Currying' in functional programming

export  {connectedDashboard as Dashboard};