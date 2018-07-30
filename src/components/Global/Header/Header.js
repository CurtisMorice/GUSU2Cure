import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import './Header.css';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

function Header(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <div className="App">
        <div className="App-header">
          <h1 className="App-title"><br />Spinal Cord Injury Research Map Database</h1>
        </div>
      </div> 
    </div>
    
    
    
  );
}

export default withStyles(styles)(Header);
