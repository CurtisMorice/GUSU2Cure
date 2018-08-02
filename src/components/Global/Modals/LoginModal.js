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
    } else if (this.state.username != this.props.username || this.state.password != this.props.password) {
        this.props.dispatch(formError2());
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
        <Button className={classes.button} onClick={this.handleClickOpen}>Login<Icon>lock_open</Icon></Button>
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
            <label htmlFor="username">
              Username: <input type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}/>
            </label>
            <label htmlFor="password">
              Password: <input type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}/>
            </label>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <input type="submit" value="Login" color="primary" autoFocus/>
            <input onClick={this.handleClose}  type="button" value="Cancel"/> 
          </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

export default compose(connect(mapStateToProps), withStyles(styles))(LoginModal);