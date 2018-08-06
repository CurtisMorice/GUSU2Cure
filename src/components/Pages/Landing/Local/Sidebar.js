import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/withStyles';
import Drawer from '@material/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const drawerWidth = 360;

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: '100%',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    background: {
        position: "absolute",
        zIndex: "1",
        height: "100%",
        width: "100%",
        display: "block",
        top: "0",
        left: "0",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        "&:after": {
          position: "absolute",
          zIndex: "3",
          width: "100%",
          height: "100%",
          content: '""',
          display: "block",
          background: "#000",
          opacity: ".8"
        }
      },
      drawerPaper: {
          border: 'none',
          position: 'fixed',
          top: '0',
          bottom: '0',
          left: '0',
          zIndex: '1',
          boxShadow: '0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
          width: drawerWidth,
      },
      sidebarWrapper: {
        position: "relative",
        height: "calc(100vh - 75px)",
        overflow: "auto",
        width: "360px",
        zIndex: "4",
        overflowScrolling: "touch"
      },
      appBar: {
          position: 'absolute',
          transition: theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.duration.leavingScreen,
          }),
      },
      toolbar: theme.mixins.toolbar,
});

function Sidebar(props) {
    const { classes } = props;

    return (
        <div className={classes.root}>
            <AppBar position='absolute' className={classes.appBar}>
                <Toolbar>
                    
                </Toolbar>
            </AppBar>
            <Drawer
              variant='permanent'
              classes={{
                  paper: classes.drawerPaper
              }}
            >
                <div className={classes.sidebarWrapper}>
                    <List>...</List>
                    <Divider />
                    <List>...</List>
                </div>
                {image !== undefined ? (
                    <div
                        className={classes.background}
                        style={{ backgroundImage: "url(" + image + ")" }}
                    />
                    ) : null}

            </Drawer>
        </div>
    );
};

Sidebar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Sidebar);