import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { LOGIN_ACTIONS, triggerLogout} from '../../../redux/actions/loginActions';
import { compose } from 'recompose';

import { USER_ACTIONS } from '../../../redux/actions/userActions';
import './Header.css';

// header App Bar
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LoginModal from '../Modals/LoginModal';
import RegisterModal from '../Modals/RegisterModal';
import Typography from '@material-ui/core/Typography';

const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

const logout = () => {
  this.props.dispatch({
    type: LOGIN_ACTIONS.LOGOUT
  });
  this.props.history.push('home');
}

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
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

class Header extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.user === null) {
      // this.props.history.push('home');
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
  }

  render() {
    let content = null;
    const { classes } = this.props;

    const loginButton = this.props.user.user ? (
      <Button onClick={this.logout} variant="contained" className={classes.button} color="secondary" aria-label="Log Out">
        Log Out
        <Icon className={classes.rightIcon}>lock_closed</Icon>
      </Button>
    ) : (<LoginModal />);

    return (
      <div className={classes.root}>
        <div className="App">
          <AppBar color="primary" position='static'>
            <Toolbar>
              <IconButton className={classes.menuButton} color='inherit' aria-label='Menu'>
                <MenuIcon />
              </IconButton>  
              <Typography variant='title' color='inherit' className={classes.flex}>
                Spinal Cord Injury Resource Database
              </Typography>
              { loginButton }
              <RegisterModal />
            </Toolbar>
          </AppBar>
          <Grid container>
            <Grid item xs={14}>
              <div className="App-header">
                <h1 className="App-title"><br /><br />Spinal Cord Injury Research Map Database</h1>
              </div> 
            </Grid>
            {/* <Grid item xs={2} >
              <div className="App-header">
                <br />
                { loginButton }
                <RegisterModal />
              
              </div>
            </Grid> */}
          </Grid>
        </div> 
      </div>
    );
  }
 }

Header.proptypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(Header);
