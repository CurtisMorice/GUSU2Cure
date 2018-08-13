import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { renderComponent } from 'recompose';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

import {USER_ACTIONS} from '../../../redux/actions/userActions';


const mapStateToProps = state => ({
    user: state.user,
});

class editProfile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          open: false,
          updatedProfile: {
            }
        }
    }

    componentDidMount(){
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });

    }

    handleClickOpen  = () => {
        this.setState({
            open: true,
            updatedProfile: {

            }
        })
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    render(){
        return(
            <div>
        <IconButton onClick={this.handleClickOpen}>
            <Icon color="primary">edit_icon</Icon>
        </IconButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
        <DialogTitle id="form-dialog-title">Update the article below:</DialogTitle>
        <DialogContent>
        </DialogContent>
        </Dialog>

            </div>
        )
    }

}


