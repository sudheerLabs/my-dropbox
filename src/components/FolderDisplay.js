import React, {Component} from 'react';
import {connect} from 'react-redux';
//import {addItem} from "../action/index";
import { Table } from 'reactstrap';
import { fileActions } from '../actions';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class FolderDisplay extends Component {

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
        //console.log(event.target);
        //this.props.toggleStar(id);
    };


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

    render() {

        const {folder} = this.props;
        console.log(" Props "+ JSON.stringify(this.props));
        

        return (
            <div className="row justify-content-md-center" onClick={() => { this.props.getAllFilesHome(this.props.folder.path + this.props.folder.filename + ","); }}>
        <Table>
        <tbody>
          <tr>

            <td style={{'height':'30px', 'valign':'top', 'width' : '50px'}}>
                <div className="mc-media-cell-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" class="mc-icon-template-content brws-file-name-cell-icon"><title>content-folder-small</title>
                    <g fill="none" fill-rule="evenodd">
                        <path d="M18.422 11h15.07c.84 0 1.508.669 1.508 1.493v18.014c0 .818-.675 1.493-1.508 1.493H6.508C5.668 32 5 31.331 5 30.507V9.493C5 8.663 5.671 8 6.5 8h7.805c.564 0 1.229.387 1.502.865l1.015 1.777s.4.358 1.6.358z" fill="#71B9F4">
                        </path>
                        <path d="M18.422 10h15.07c.84 0 1.508.669 1.508 1.493v18.014c0 .818-.675 1.493-1.508 1.493H6.508C5.668 31 5 30.331 5 29.507V8.493C5 7.663 5.671 7 6.5 7h7.805c.564 0 1.229.387 1.502.865l1.015 1.777s.4.358 1.6.358z" fill="#92CEFF">
                        </path>
                    </g>
                </svg>
                </div>
            </td>
            <td style={{'height':'30px', 'valign':'top', 'width' : '650px'}}>
                { folder.filename }
                <svg  width="32" height="32" viewBox="0 0 32 32" className="mc-icon-star" 
                onClick={() => { this.props.toggleStar(folder); }}>
                    <title>Artboard</title>
                    {folder.starred === "Y" ? 
                        <path d="M16 20.95l-4.944 2.767 1.104-5.558L8 14.312l5.627-.667L16 8.5l2.373 5.145 5.627.667-4.16 3.847 1.104 5.558z" fill-rule="nonzero" fill="#0070E0"></path> 
                        :   
                        <path d="M20.944 23.717L16 20.949l-4.944 2.768 1.104-5.558L8 14.312l5.627-.667L16 8.5l2.373 5.145 5.627.667-4.16 3.847 1.104 5.558zM17.66 17.45l1.799-1.663-2.433-.289L16 13.275l-1.026 2.224-2.433.289 1.799 1.663-.478 2.403L16 18.657l2.138 1.197-.478-2.403z" fill-rule="nonzero" fill="#0070E0"></path>
                    }
                </svg>
            </td>
                
            <td style={{'height':'30px', 'valign':'top'}}>
                <div className="recents-item__sharing recents-item__action-button">
                       <a className="button-secondary recents-item__share-link" href="#share">Share</a>
                </div>
            </td>
            <td>
                
            </td>
          </tr>
        </tbody>
        </Table>
            </div>
        );
    }
}

function mapStateToProps(store) {
    const {files} = store;
    console.log(store);
    const filesArr = files.recentfiles;
  return {filesArr};
}

function mapDispatchToProps(dispatch) {
  console.log("Iam in maptoDispatch");
   return {
       toggleStar : (folderId) => dispatch(fileActions.toggleStar(folderId)),
       getAllFilesHome : (dir) => dispatch(fileActions.getAllFilesHome(dir))
       //deletefolder : (folderId) => dispatch(fileActions.deletefolder(folderId))
    };
}

const connectedFolderDisplay = connect(mapStateToProps, mapDispatchToProps)(FolderDisplay); 

export  {connectedFolderDisplay as FolderDisplay};  