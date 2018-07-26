import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

// icons for Nav bar
// import HomeIcon from '@material-ui/icons/Home';
// import InfoIcon from '@material-ui/icons/Info';
// import Library_BooksIcon from '@material-ui/icons/Library_Books';
// import AssignmentIcon from '@material-ui/icons/AssignmentIcon';
// import Lock_OpenIcon from '@material-ui/icons/Lock_OpenIcon';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  }
};

function Nav(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button component={Link} to="/home" variant="contained" className={classes.button} color="inherit" aria-label="Home">
            Home
            {/* <HomeIcon /> */}
          </Button>
          <Button component={Link} to="/about" variant="contained" className={classes.button} color="inherit" aria-label="About">
            About
            {/* <InfoIcon /> */}
          </Button>
          <Button component={Link} to="/resources" variant="contained" className={classes.button} color="inherit" aria-label="Resources">
            Resources
            {/* <Library_BooksIcon /> */}
          </Button>
          <div alignContent="flex-end">
            <Button component={Link} to="/register" variant="contained" className={classes.button} color="inherit" aria-label="Register">
              Register
              {/* <AssignmentIcon /> */}
            </Button>
            <Button component={Link} to="/login" variant="contained" className={classes.button} color="inherit" aria-label="Log in">
              Login
              {/* <Lock_OpenIcon /> */}
            </Button>
          </div>
          
        </Toolbar>
      </AppBar>
    </div>
  )
};

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Nav);
