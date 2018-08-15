import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { LOGIN_ACTIONS } from '../../../redux/actions/loginActions';
import { triggerLogin, formError, clearError, formError2 } from '../../../redux/actions/loginActions';
import Icon from '@material-ui/core/Icon';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';

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

class LoginModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            username: '',
            password: '',
        };
    }

  componentDidMount() {
    this.props.dispatch(clearError());
  }

  
  componentWillReceiveProps(nextProps) {
    if (nextProps.user.user) {
    //   this.props.history.push('/home');
    }
  }

  login = (event) => {
    event.preventDefault();
    if (this.state.username === '' || this.state.password === '') {
        this.props.dispatch(formError());
    } else {
      this.props.dispatch(triggerLogin(this.state.username, this.state.password));
      this.handleClose();
    }
  }

  handleInputChangeFor = propertyName => (event) => {
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
        <Button className={classes.button} variant="contained" color="primary" aria-label="Log In" onClick={this.handleClickOpen}>Login<Icon>lock_open</Icon></Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Login"}</DialogTitle>
          {this.props.login.message}
          <form onSubmit={this.login}>
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
                type="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
                id="password-input"
                label="Password"
                autoComplete="current-password"
                margin="normal"
                label="Password"
                fullWidth
            />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained" color="primary" autoFocus>Login</Button>
            <Button onClick={this.handleClose}  type="button" value="Cancel">Cancel</Button>
          </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

export default compose(connect(mapStateToProps), withStyles(styles))(LoginModal);