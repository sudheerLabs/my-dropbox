import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {FileUploadPage} from './FileUploadPage';
import  { FileDisplay }  from './FileDisplay';
import  { StarFileDisplay }  from './StarFileDisplay';
import { fileActions } from '../actions';
import { userActions } from '../actions';
import '../styles/stylesheet.css';
import { history } from '../helpers';

class ShowDeletedPage extends Component{

	constructor(props) {
        console.log( " in constructor" + JSON.stringify(props));
        super(props);

        this.state = {
            showDeleted: false,
        };
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
        //this.setState({ submitted: true });
        //const { username, password } = this.state;
        //const { dispatch } = this.props;
        this.props.signout();
    };

	render(){
		const {user, fileList} = this.props;
		console.log(this.props);

		return (<div>
			<div className="col-md-2 sidenav hidden-xs sidebar">
					<div style={{'height': '100vh'}} >
						<ul className="nav nav-list"> 
						  <li className="nav-header">Home</li>        
						  <li><a href="index"> My Files</a></li>
				          <li><a href="#"> File Requests</a></li>
				          <li><a href="#"> Sharing</a></li>
				          <li><a href="#"> Deleted Files</a></li>	
						</ul>
					</div>
				</div>
				<div className="col-md-8">

				<header className="maestro-header page-header__shadow">
					<div className="page-header">
						<div className="page-header__title" tabIndex="0">
							<h1 className="page-header__heading">Dropbox</h1>
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
			<span className="home-recents-section">
			

			{fileList &&
                fileList.map((file,index) => {
                        return(
                            <FileDisplay
                                key={index}
                                file={file}
                                //addItem={this.props.addItem}
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
						  <li><FileUploadPage /></li>
						 <li><table><tr><td><svg width="32" height="32" viewBox="0 0 32 32" className="mc-icon-template-actionable"><title>action-new-shared-folder</title><g fill="none" fillRule="evenodd"><path fill="none" d="M0 0h32v32H0z"></path><path d="M24 11.491c0-.823-.668-1.491-1.505-1.491H16l-2-2H9.499C8.67 8 8 8.664 8 9.493v12.5C8 22.549 8.445 23 9 23h14a1 1 0 0 0 1-.999v-10.51zM22 21H10v-9h12v9zm-11 0h10v2H11v-2z" fill="#0070E0" fillRule="nonzero"></path><path d="M16 23h-3.309c-.545 0-.809-.41-.575-.916l.334-.724c.347-.753 1.301-1.36 2.133-1.36h2.834c.832 0 1.786.607 2.133 1.36l.334.724c.234.506-.03.916-.575.916H16zm0-4a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fill="#0070E0"></path></g></svg></td>
						 	<td><a href="#">New shared folder</a></td></tr></table></li>
				          <li><a href="#">New folder</a></li>
						  <li className="active"><Link to="/home" className="btn btn-link"><span class="glyphicon glyphicon-eye" style={{'color':'blue'}}></span>	 Hide deleted files</Link></li>
				          <li className="active">
				          
				          </li>
						  
						</ul>
				</div>
		</div>);
	}
}


function mapStateToProps(state) {
    console.log("map state to props : " + JSON.stringify(state));
    console.log(state);
    const { fileList } = state.files;
    const { user } = state.authentication;
  return {user, fileList};
}
function mapDispatchToProps(dispatch) {
  console.log("Iam in maptoDispatch");
   return {
       getAllFiles : () => dispatch(fileActions.getAllFiles()),
       signout : () => dispatch(userActions.signout())
    };
}	

const connectedShowDeletedPage = connect(mapStateToProps, mapDispatchToProps)(ShowDeletedPage);

export  {connectedShowDeletedPage as ShowDeletedPage};