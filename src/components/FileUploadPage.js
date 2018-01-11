import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {uploadSingleFile} from "../actions/index";

class FileUploadPage extends Component {
	state = 
	{
		fName: "",
		fHandle: {}
	};

	handleChange = event => {
		console.log("handle change");
		console.log(this.props);
		this.setState({fName:event.target.files[0].name});
		this.setState({fHandle: event.target.files[0]});
		this.props.uploadSingleFile({fName:event.target.files[0].name, fHandle: event.target.files[0]}, this.props.pwd);
	}
	render(){
		const {fdata} = this.props;
		console.log(this.props);
		return(
			<div className="row justify-content-md-center">
			    

			    <form encType="multipart/formdata" onSubmit={() => this.props.uploadSingleFile(this.state)}>
			    <div className="fileUpload">
					<input type="submit" readOnly className="btn primary-action-menu__button mc-button-primary" value="Upload Files" />
					<input type="file" id="uploadBtn"  className="upload" name="uploadFile" onChange={this.handleChange} />
				</div>
				
				</form>
			</div>	    
			);
	}
}

function mapDispatchToProps(dispatch) {
	return {
			uploadSingleFile : (fileDetails, path) => dispatch(uploadSingleFile(fileDetails, path))
	};
}

const connectedFileUploadPage =  connect(null, mapDispatchToProps)(FileUploadPage);

export { connectedFileUploadPage as FileUploadPage }; 