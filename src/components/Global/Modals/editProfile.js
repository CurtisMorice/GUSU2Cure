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

class EditProfile extends React.Component {
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
                email: this.props.user.user.email,
                contact_info: this.props.user.user.contact_info,
                bio: this.props.user.user.bio,
                id: this.props.user.user.id
            }
        })
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    handleUpdateProfile = (propertyName) => (event) => {
        this.setState({
            updatedProfile: {
            ...this.state.updatedProfile,
            [propertyName]: event.target.value
            }
        })
    }

    updateUserProfile = () => {
        const action = ({
            type: USER_ACTIONS.UPDATE_PROFILE,
            payload: this.state.updatedProfile
        })
        this.props.dispatch(action)
    }

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
                    {JSON.stringify(this.props.user)}
                    <TextField
                        value={this.state.updatedProfile.email}
                        onChange={this.handleUpdateProfile('email')}
                        name="email"
                        label="User Email"
                        autoFocus
                        margin="dense"
                        fullWidth
                    />
                    <TextField
                        value={this.state.updatedProfile.contact_info}
                        onChange={this.handleUpdateProfile('contact_info')}
                        name="contact"
                        label="User contact"
                        autoFocus
                        margin="dense"
                        fullWidth
                    />
                    <TextField
                        value={this.state.updatedProfile.bio}
                        onChange={this.handleUpdateProfile('bio')}
                        name="bio"
                        label="User Bio"
                        autoFocus
                        margin="dense"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.updateUserProfile} variant="contained" color="primary">
                        Update Profile
                    </Button>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
                </Dialog>

            </div>
        )
    }

}


export default connect(mapStateToProps)(EditProfile);