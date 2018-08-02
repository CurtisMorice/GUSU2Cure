import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { LOGIN_ACTIONS } from '../../../redux/actions/loginActions';
import { compose } from 'recompose';
import LoginModal from '../Modals/LoginModal';
import { triggerLogout } from '../../../redux/actions/loginActions';
import { USER_ACTIONS } from '../../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
  login: state.login
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
});

class Nav extends React.Component {
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
      <AppBar position="static">
        <Toolbar>
          <Grid container>
            <Grid item>
              <Button component={Link} to="/home" variant="contained" className={classes.button} color="primary" aria-label="Home">
                Home
                <Icon className={classes.rightIcon}>home</Icon> 
              </Button>  
            </Grid>
            <Grid item>
              <Button component={Link} to="/resources" variant="contained" className={classes.button} color="primary" aria-label="Resources">
                Resources
                <Icon className={classes.rightIcon}>library_books</Icon>
              </Button>  
            </Grid>
            <Grid item>
              {this.props.user.user && <Button component={Link} to="/user-profile" variant="contained" className={classes.button} color="primary" aria-label="UserProfile">
                User Profile
                <Icon className={classes.rightIcon}>info</Icon>  
              </Button>}  
            </Grid>
          </Grid>
          {/* <Grid container justify='flex-end'>
            <Grid item>
            {!this.props.user.user && <Button component={Link} to="/register" variant="contained" className={classes.button} color="primary" aria-label="Register" style={{ flex: 1 }}>
                Register
                <Icon className={classes.rightIcon}>person_add</Icon>
            </Button>}  
            </Grid>
            <Grid item>
              { loginButton }  
            </Grid>
          </Grid> */}
        </Toolbar>
      </AppBar>
    </div>
  )}
};

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles),connect(mapStateToProps))(Nav);
