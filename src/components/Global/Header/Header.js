import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { LOGIN_ACTIONS} from '../../../redux/actions/loginActions';
import { compose } from 'recompose';
import LoginModal from '../Modals/LoginModal';
import RegisterModal from '../Modals/RegisterModal';
import './Header.css';

const mapStateToProps = state => ({
  user: state.user,
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

class Header extends React.Component {
  render() {
    const { classes } = this.props;
    const loginButton = this.props.isLogin ? (
      <Button onClick={logout} variant="contained" className={classes.button} color="secondary" aria-label="Log Out">
        Log Out
        <Icon className={classes.rightIcon}>lock_closed</Icon>
      </Button>
    ) : (<LoginModal />);

    return (
      <div className={classes.root}>
        <div className="App">
          <Grid container spacing={12}>

            <Grid item xs={10}>
              <div className="App-header">
                <h1 className="App-title"><br />Spinal Cord Injury Research Map Database</h1>
              </div> 
            </Grid>
            <Grid item xs={2}>
              <br /><br />
              { loginButton }
              <RegisterModal />
            </Grid>
          </Grid>
        </div> 
      </div>
    );
  }
 }
export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(Header);
