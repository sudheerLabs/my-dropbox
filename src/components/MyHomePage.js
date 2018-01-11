import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
//import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {FileUploadPage} from './FileUploadPage';
import  { FileDisplay }  from './FileDisplay';
import  { FolderDisplay }  from './FolderDisplay';
//import  { StarFileDisplay }  from './StarFileDisplay';
import { fileActions } from '../actions';
import { userActions } from '../actions';
import '../styles/stylesheet.css';
//import { history } from '../helpers';

class MyHomePage extends Component{

	constructor(props) {
        console.log( " in constructor" + JSON.stringify(props));
        super(props);

        this.state = {
            showDeleted: false,
        };
    }

    componentDidMount(){
    	console.log(this.refs.newFolderField.type);
    	this.refs.newFolderField.type='hidden';

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

    handleChange = (event) => {
    	if (event.key == 'Enter') {
      		console.log("enter key pressed");
      		this.handleFolderCreation(event);
    	}
    }

    popsharewindow= (event) => {
		console.log("sharing file");
		console.log("event --> "+event.target.id);
		this.refs.shareFolder.style="display: inline-block, 'position': 'fixed', 'width':'250px', 'height': '150px','border':'5px solid blue', 'margin-left':'-155px', 'margin-top':'-110px', 'top': '50%', 'left':'50%', 'padding':'30px'";
		this.refs.filename.value = event.target.id;
    }

    handleShare = (event) => {
      console.log(" folder added");
      //this.refs.newFolderField.type='hidden';
      const emailIds = this.refs.sharefield.value;
      const filename = this.refs.filename.value;


      console.log("###### emailIds are : " + emailIds);
      console.log("###### emailIds are : " + emailIds.length);
      console.log("###### Filename are : " + filename);

      if(emailIds.length > 0) {
          //API call
          this.refs.sharefield.value = '';
          this.refs.filename.value = '';
          this.refs.shareFolder.style="display: none";
          
      }
    }


    createFolder= (event) => {
    	console.log("creating folder, create an input field to display");
    	this.refs.newFolderField.type='text';
    	this.refs.divFolder.style="display: inline-block";

    }

    handleFolderCreation = (event) => {
    	console.log(" folder added");
    	//this.refs.newFolderField.type='hidden';
    	const { name, value } = event.target;
    	console.log(name + " value is " + value);
    	if(value !== "")
    		this.props.addFolder(value, this.props.pwd );
    	this.refs.newFolderField.value='';
    	this.refs.divFolder.style="display: none";
    }

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
		//console.log("print folder list : " + folderList);
		//var folderList = ["asl", "asdf"];

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
			<div id="divFolder" style={{'display': 'none'}} ref="divFolder">
			<table><tr><td>
			<div className="mc-media-cell-icon">
			<svg width="40" height="40" viewBox="0 0 40 40" class="mc-icon-template-content brws-file-name-cell-icon"><title>content-folder-small</title><g fill="none" fill-rule="evenodd"><path d="M18.422 11h15.07c.84 0 1.508.669 1.508 1.493v18.014c0 .818-.675 1.493-1.508 1.493H6.508C5.668 32 5 31.331 5 30.507V9.493C5 8.663 5.671 8 6.5 8h7.805c.564 0 1.229.387 1.502.865l1.015 1.777s.4.358 1.6.358z" fill="#71B9F4"></path><path d="M18.422 10h15.07c.84 0 1.508.669 1.508 1.493v18.014c0 .818-.675 1.493-1.508 1.493H6.508C5.668 31 5 30.331 5 29.507V8.493C5 7.663 5.671 7 6.5 7h7.805c.564 0 1.229.387 1.502.865l1.015 1.777s.4.358 1.6.358z" fill="#92CEFF"></path></g></svg>
			</div></td>
			<td>
			<input type="text" onKeyPress={this.handleChange} ref="newFolderField" onBlur={this.handleFolderCreation} />
			</td></tr></table>
			</div>

			

            {fileList &&
                    fileList.filter((folder) => {return folder.type === "folder" && folder.deleted !== "Y";}).map((folder,index) => {
                            return(
                                <FolderDisplay
                                    key={index}
                                    folder={folder}
                                />
                            );
                        })
                 }

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
						  <li><FileUploadPage pwd= {this.props.pwd}/></li>
						 <li><table><tr><td><svg width="32" height="32" viewBox="0 0 32 32" className="mc-icon-template-actionable"><title>action-new-shared-folder</title><g fill="none" fillRule="evenodd"><path fill="none" d="M0 0h32v32H0z"></path><path d="M24 11.491c0-.823-.668-1.491-1.505-1.491H16l-2-2H9.499C8.67 8 8 8.664 8 9.493v12.5C8 22.549 8.445 23 9 23h14a1 1 0 0 0 1-.999v-10.51zM22 21H10v-9h12v9zm-11 0h10v2H11v-2z" fill="#0070E0" fillRule="nonzero"></path><path d="M16 23h-3.309c-.545 0-.809-.41-.575-.916l.334-.724c.347-.753 1.301-1.36 2.133-1.36h2.834c.832 0 1.786.607 2.133 1.36l.334.724c.234.506-.03.916-.575.916H16zm0-4a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fill="#0070E0"></path></g></svg></td>
						 	<td><a href="#">New shared folder</a></td></tr></table></li>

				          <li><table><tr><td>
						 	<svg width="32" height="32" viewBox="0 0 32 32" className="mc-icon-template-actionable"><title>action-new-folder</title><g fill="none" fill-rule="evenodd"><path fill="none" d="M0 0h32v32H0z"></path><path d="M24 11.491c0-.823-.668-1.491-1.505-1.491H16l-2-2H9.499C8.67 8 8 8.664 8 9.493v12.014C8 22.332 8.667 23 9.505 23h12.99c.831 0 1.505-.663 1.505-1.491V11.49zM22 21H10v-9h12v9z" fill-rule="nonzero" fill="#0070E0"></path></g></svg></td>
						 	<td><button className="unstyled-button" onClick={this.createFolder}>New folder</button></td></tr></table></li>

						  <li><table><tr><td>
				          	<svg width="32" height="32" viewBox="0 0 32 32" class="mc-icon-template-actionable"><title>action-show-deleted-files</title><g fill="none" fill-rule="evenodd"><g><path fill="none" d="M0 0h32v32H0z"></path><circle fill="#99C6F3" cx="15.5" cy="16" r="2"></circle><path d="M15.5 22c-4.875 0-8.235-5.19-8.235-5.19-.335-.444-.332-1.167-.01-1.607 0 0 3.37-5.203 8.245-5.203 4.875 0 8.235 5.19 8.235 5.19.335.444.332 1.167.01 1.607 0 0-3.37 5.203-8.245 5.203zm.014-2c3.59 0 6.5-4 6.5-4s-2.91-4-6.5-4-6.5 4-6.5 4 2.91 4 6.5 4z" fill="#0070E0"></path></g></g></svg></td>
						 	<td><Link to="/showDeleted">Show deleted files</Link></td></tr></table>
						 </li> 
				          <li className="active">
				          
				          </li>
						  
						</ul>
				</div>

				<div className="popup" id="shareFolder" style={{'display': 'none'}} ref="shareFolder">
                    <input type="text" style={{'display': 'none'}} ref="filename"/>
                    <input type="text"  ref="sharefield"/>
                    <br />
                    <input id="sharewindowclose" type="Button" value="Share" onClick={this.handleShare}/>

                </div>
		</div>);
	}
}


function mapStateToProps(state) {
    console.log("map state to props : " + JSON.stringify(state));
    console.log(state);
    const { fileList, pwd } = state.files;
    const { user } = state.authentication;
  return {user, fileList, pwd};
}
function mapDispatchToProps(dispatch) {
  console.log("Iam in maptoDispatch");
   return {
       getAllFiles : () => dispatch(fileActions.getAllFiles()),
       addFolder : (folderName, path) => dispatch(fileActions.addFolder(folderName, path)),
       signout : () => dispatch(userActions.signout())
    };
}	

const connectedMyHomePage = connect(mapStateToProps, mapDispatchToProps)(MyHomePage);

export  {connectedMyHomePage as MyHomePage};