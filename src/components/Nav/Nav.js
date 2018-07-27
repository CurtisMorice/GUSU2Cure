import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

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
          <div>
            <i class="material-icons">home</i>
            <Button component={Link} to="/home" variant="contained" className={classes.button} color="primary" aria-label="Home">
              Home
            </Button>  
          </div>
          <div>
            <i class="material-icons">info</i>
            <Button component={Link} to="/about" variant="contained" className={classes.button} color="primary" aria-label="About">
              About
            </Button>  
          </div>
          <div>
            <i class="material-icons">library_books</i>
            <Button component={Link} to="/resources" variant="contained" className={classes.button} color="primary" aria-label="Resources">
              Resources
            </Button>  
          </div>
          <div>
            <i class="material-icons">assignment</i>
            <Button component={Link} to="/register" variant="contained" className={classes.button} color="primary" aria-label="Register">
                Register
            </Button>  
          </div>
          <div>
            <i class="material-icons">lock_open</i>
            <Button component={Link} to="/login" variant="contained" className={classes.button} color="primary" aria-label="Log in">
              Login
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
