import React, { Component }from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { LOGIN_ACTIONS, triggerLogout} from '../../../redux/actions/loginActions';
import { compose } from 'recompose';

import { USER_ACTIONS } from '../../../redux/actions/userActions';
import './Header.css';

// header App Bar
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import HomeIcon from '@material-ui/icons/Home';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PersonIcon from '@material-ui/icons/Person';
import SecurityIcon from '@material-ui/icons/Security';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import LoginModal from '../Modals/LoginModal';
import RegisterModal from '../Modals/RegisterModal';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
// import MenuList from '@material-ui/core/MenuList';
import Divider from '@material-ui/core/Divider';

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
    width: '100%',
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
  list: {
    width: 250,
  },
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& $primary, & $icon': {
        color: theme.palette.common.white,
      },
    },
  },
  primary: {},
  icon: {},
});

class Header extends Component {
  state={
    left: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

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

    const sideList = (
      <div>
        {/* <HeaderList /> */}
        <List component="nav">
          <ListItem component={props => (
            <ListItem button>
              <Link style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
              }}
              to={"/home"}>
              </Link>
              {props.children}
            </ListItem>
          )}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem component={props => (
            <ListItem button>
              <Link style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
              }}
              to={"/resources"}>
              </Link>
              {props.children}
            </ListItem>
          )}>
            <ListItemIcon>
              <LibraryBooksIcon />
            </ListItemIcon>
            <ListItemText primary="Resources" />
          </ListItem>
        <ListItem component={props => (
            <ListItem button>
              <Link style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
              }}
              to={"/user-profile"}>
              </Link>
              {props.children}
            </ListItem>
          )}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          { adminHomeListItem }
        </List>
      </div>
    );

    const loginButton = this.props.user.user ? (
      <Button onClick={this.logout} variant="contained" className={classes.button} color="secondary" aria-label="Log Out">
        Log Out
        <Icon className={classes.rightIcon}>lock_closed</Icon>
      </Button>
    ) : (<LoginModal />);

    const adminHomeListItem = this.props.user.type == 'admin' ? (
      <ListItem component={props => (
        <ListItem button>
          <Link style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
          to={"/admin"}>
          </Link>
          {props.children}
        </ListItem>
      )}>
        <ListItemIcon>
          <SecurityIcon />
        </ListItemIcon>
        <ListItemText primary="Admin Home" />
      </ListItem>
    ) : '';

    return (
      <div className={classes.root}>
        <div className="App">
          <AppBar color="primary" position='static'>
            <Toolbar>
              <IconButton className={classes.menuButton} color='inherit' aria-label='Open drawer' onClick={this.toggleDrawer('left', true)}>
                <MenuIcon />
              </IconButton>
              <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                <div
                  tabIndex={0}
                  role='button'
                  onClick={this.toggleDrawer('left', false)}
                  onKeyDown={this.toggleDrawer('left', false)}
                >
                  {sideList}
                </div>
              </Drawer>
              <Typography variant='title' color='inherit' className={classes.flex}>
                Spinal Cord Injury Resource Database
              </Typography>
              { loginButton }
              <RegisterModal />
            </Toolbar>
          </AppBar>
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
