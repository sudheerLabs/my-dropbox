import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {FileUploadPage} from './FileUploadPage';
import  { FileDisplay }  from './FileDisplay';
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
		console.log(this.props.user);

		this.props.getAllFiles();
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
						  <li><a href="index"> Home</a></li>
				          <li><a href="#"> Files</a></li>
				          <li><a href="#"> Paper</a></li>				          
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
					

					<h1>Displaying files here </h1>

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


					
					<button style={{'background': '#FFF'}} onClick={this.handleClick}>
					<svg  width="32" height="32" viewBox="0 0 32 32" className="mc-icon-star">
						<title>Artboard</title>
						<path d="M20.944 23.717L16 20.949l-4.944 2.768 1.104-5.558L8 14.312l5.627-.667L16 8.5l2.373 5.145 5.627.667-4.16 3.847 1.104 5.558zM17.66 17.45l1.799-1.663-2.433-.289L16 13.275l-1.026 2.224-2.433.289 1.799 1.663-.478 2.403L16 18.657l2.138 1.197-.478-2.403z" fill-rule="nonzero" fill="#0070E0">
						</path>
					</svg>
					</button>
				</div>

				

				<div className="col-md-2">
					 
						<ul className="nav nav-list"> 
						  <li className="nav-header">
						  	<button name="signout" onClick={this.signout} type="button" className="btn button-secondary">Sign out</button>
						  </li>       
						  <li><FileUploadPage /></li>
				          <li><a href="#">New shared folder</a></li>
				          <li><a href="#">New folder</a></li>
						  <li className="active"><a href="#"><i className="icon-user"></i> Show deleted files</a></li>
				          <li className="active">
				          <svg width="32" height="32" viewBox="0 0 32 32" className="mc-icon-template-actionable"><title>action-new-shared-folder</title><g fill="none" fillRule="evenodd"><path fill="none" d="M0 0h32v32H0z"></path><path d="M24 11.491c0-.823-.668-1.491-1.505-1.491H16l-2-2H9.499C8.67 8 8 8.664 8 9.493v12.5C8 22.549 8.445 23 9 23h14a1 1 0 0 0 1-.999v-10.51zM22 21H10v-9h12v9zm-11 0h10v2H11v-2z" fill="#0070E0" fillRule="nonzero"></path><path d="M16 23h-3.309c-.545 0-.809-.41-.575-.916l.334-.724c.347-.753 1.301-1.36 2.133-1.36h2.834c.832 0 1.786.607 2.133 1.36l.334.724c.234.506-.03.916-.575.916H16zm0-4a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fill="#0070E0"></path></g></svg>

				          </li>
						  
						</ul>
				</div>
			</div>
		);
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

const connectedDashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboard);    // Learn 'Currying' in functional programming

export  {connectedDashboard as Dashboard};