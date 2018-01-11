
import React, {Component} from 'react';
import {connect} from 'react-redux';
//import {addItem} from "../action/index";
import { Table } from 'reactstrap';
import { fileActions } from '../actions';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class StarFileDisplay extends Component {

	 constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
          dropdownOpen: false
        };
    }

	toggle() {
        this.setState({
        dropdownOpen: !this.state.dropdownOpen
        });
    }

    handleClick = (event) => {
        const { id, value } = event.target;
        //console.log("hellooooooo" + id);
        console.log(event.target);
        this.props.toggleStar(id);
    };

	render(){

		const {file} = this.props;

		return (
			<div className="row justify-content-md-center">
                <Table>
                     <tbody>
          <tr>
            <td style={{'height':'30px'}}>
            <button className="unstyled-button" onClick={() => { this.props.downloadFile(file.path , file.filename); }}>{ file.filename }</button>
                <button style={{'background': '#FFF'}} > 
                <svg  width="32" height="32" viewBox="0 0 32 32" className="mc-icon-star" onClick={this.handleClick} id={file.fileId}>
                    <title>Artboard</title>
                    {file.starred === "Y" ? 
                        <path d="M16 20.95l-4.944 2.767 1.104-5.558L8 14.312l5.627-.667L16 8.5l2.373 5.145 5.627.667-4.16 3.847 1.104 5.558z" fill-rule="nonzero" fill="#0070E0"></path> 
                        :   
                        <path d="M20.944 23.717L16 20.949l-4.944 2.768 1.104-5.558L8 14.312l5.627-.667L16 8.5l2.373 5.145 5.627.667-4.16 3.847 1.104 5.558zM17.66 17.45l1.799-1.663-2.433-.289L16 13.275l-1.026 2.224-2.433.289 1.799 1.663-.478 2.403L16 18.657l2.138 1.197-.478-2.403z" fill-rule="nonzero" fill="#0070E0"></path>
                    }
                </svg>
                </button>
            </td>
            <td>
                
                <div className="recents-item__actions">
                    <div className="recents-item__actions-inner">  
                        <div className="recents-item__more-actions">
                            <div className="recents-item__more-actions-button recents-item__action-button " >
                                <div>
                                    <div className="mc-popover">
                                    <ButtonDropdown style={{'background':'#FFF'}} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                        <DropdownToggle style={{'background':'#FFF'}}>
                                            <button role="button" style={{'background': '#FFF'}} tabIndex="0" aria-haspopup="true" aria-expanded="false" className="mc-popover-trigger ">
                                            <span aria-label="More Actions" tabIndex="0" className="recents-item__actions-button button-secondary mc-overflow-button mc-button mc-button-secondary">
                                            
                                            <span className="mc-button-content">
                                            <svg width="45" height="32" viewBox="0 0 45 32" className="mc-icon-template-stateless mc-overflow-button-icon">
                                            <title>table-overflow</title>
                                            <g fill="none" fillRule="evenodd">
                                            <g fill="#637282">
                                                <circle cx="10.5" cy="16.5" r="1.5"></circle>
                                                <circle cx="15.5" cy="16.5" r="1.5"></circle>
                                                <circle cx="20.5" cy="16.5" r="1.5"></circle>
                                            </g>
                                            </g>
                                            </svg></span></span>
                                            </button>
                                        </DropdownToggle>
                                        <DropdownMenu>                                      
                                          <DropdownItem style={{'background':'#FFF'}}><a href= {file.path.replace(/,/g, '/')} download> Download </a></DropdownItem>
                                          <DropdownItem divider />
                                          <DropdownItem style={{'background':'#FFF'}}>Comment</DropdownItem>
                                          <DropdownItem divider />
                                          <DropdownItem style={{'background':'#FFF'}}>
                                          <button className="unstyled-button" onClick={() => { this.props.deleteFile(file.fileId); }}>Delete</button></DropdownItem>
                                          <DropdownItem style={{'background':'#FFF'}}>Version History</DropdownItem>
                                        </DropdownMenu>
                                </ButtonDropdown>     


                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </td>
          </tr>
        </tbody>
        </Table>
            </div>
		);
	}
}


function mapDispatchToProps(dispatch) {
  console.log("Iam in maptoDispatch");
   return {
       toggleStar : (fileId) => dispatch(fileActions.toggleStar(fileId)),
       deleteFile : (fileId) => dispatch(fileActions.deleteFile(fileId)),
       downloadFile: (path,filename) => dispatch(fileActions.downloadFile(path, filename))
    };
}

const connectedStarFileDisplay = connect(null, mapDispatchToProps)(StarFileDisplay); 

export  {connectedStarFileDisplay as StarFileDisplay};