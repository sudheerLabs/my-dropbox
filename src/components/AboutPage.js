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

class AboutPage extends Component{

}