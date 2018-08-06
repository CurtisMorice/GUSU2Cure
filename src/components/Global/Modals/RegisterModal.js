import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import { LOGIN_ACTIONS } from '../../../redux/actions/loginActions';
import { triggerLogin, formError, clearError, formError2 } from '../../../redux/actions/loginActions';
import Icon from '@material-ui/core/Icon';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const mapStateToProps = state => ({
    user: state.user,
    login: state.login,
  });

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    flex: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing.unit,
    },
    rightIcon: {
        marginRight: theme.spacing.unit,
    },
    });

class RegisterModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          username: '',
          password: '',
          message: '',
          email: '',
          bio: '',
          contact_info: '',
          open: false,
        };
      }
    
    registerUser = (event) => {
    event.preventDefault();

    if (this.state.username === '' || this.state.password === '') {
        this.setState({
        message: 'Choose a username and password!',
        });
    } else {
        const body = {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
        bio: this.state.bio,
        contact_info: this.state.contact_info
        };

        // making the request to the server to post the new user's registration
        axios.post('/api/users/register/', body)
        .then((response) => {
            if (response.status === 201) {
            // this.props.history.push('/home');
            this.handleClose();
            } else {
            this.setState({
                message: 'Ooops! That didn\'t work. The username might already be taken. Try again!',
            });
            }
        })
        .catch(() => {
            this.setState({
            message: 'Ooops! Something went wrong! Is the server running?',
            });
        });
    }
    } // end registerUser
    
    handleInputChangeFor = propertyName => (event) => {
        console.log('event.target.value', event.target.value, this.state);
        this.setState({
            [propertyName]: event.target.value,
        });
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

  render() {
    const { classes } = this.props;
    return (
      <div>
        {!this.props.user.user && <Button className={classes.button} variant="contained" aria-label="Register" onClick={this.handleClickOpen}>Register<Icon>person_add</Icon></Button>}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">{"Register"}</DialogTitle>
          {this.state.message}
          <form onSubmit={this.registerUser}>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            <TextField 
                type="text"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
                name="username"
                autoFocus
                margin="dense"
                label="Username"
                fullWidth
                multiline
            />
             <TextField 
                type="text"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
                name="password"
                autoFocus
                margin="dense"
                label="Password"
                fullWidth
                multiline
            />
            <TextField 
                type="text"
                value={this.state.email}
                onChange={this.handleInputChangeFor('email')}
                name="email"
                autoFocus
                margin="dense"
                label="Email"
                fullWidth
                multiline
            />
            <TextField 
                type="text"
                value={this.state.bio}
                onChange={this.handleInputChangeFor('bio')}
                name="bio"
                autoFocus
                margin="dense"
                label="Biography"
                fullWidth
                multiline
            />
            <TextField 
                type="text"
                value={this.state.contact_info}
                onChange={this.handleInputChangeFor('contact_info')}
                name="contact_info"
                autoFocus
                margin="dense"
                label="Contact Information"
                fullWidth
                multiline
            />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained" color="primary" autoFocus>Register</Button>
            <Button onClick={this.handleClose}  type="button">Cancel</Button>
          </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

export default compose(connect(mapStateToProps), withStyles(styles))(RegisterModal);