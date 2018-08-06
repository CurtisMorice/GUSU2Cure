import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PersonIcon from '@material-ui/icons/Person';
import MemoryRouter from 'react-router/MemoryRouter';
import Route from 'react-router/Route';
import { Link } from 'react-router-dom';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 360,
  },
  lists: {
    backgroundColor: theme.palette.background.paper,
  },
});

class ListItemLink extends React.Component {
  renderLink = itemProps => <Link to={this.props.to} {...itemProps} />;

  render() {
    const { icon, primary, to } = this.props;
    return (
      <li>
        <ListItem button component={this.renderLink}>
          {icon && <ListItemIcon>{icon}</ListItemIcon>}
          <ListItemText inset primary={primary} />
        </ListItem>
      </li>
    );
  }
}

ListItemLink.propTypes = {
  icon: PropTypes.node.isRequired,
  primary: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};

function HeaderList(props) {
  const { classes } = props;
  return (
    <MemoryRouter initialEntries={['/home']} initialIndex={0}>
      <div className={classes.root}>
        <Route>
          {({ location }) => (
            <Typography gutterBottom type="title">
              Currently on: {location.pathname}
            </Typography>
          )}
        </Route>
        <div className={classes.lists}>
          <List component="nav">
            <ListItemLink to="/home" primary="Home" aria-label="home" icon={<HomeIcon />} />
            <Divider />
            <ListItemLink to="/resources" primary="Resources" aria-label="resources" icon={<LibraryBooksIcon />} />
            <Divider />
            <ListItemLink to="/user-profile" primary="Profile" aria-label="profile" icon={<PersonIcon />} />
          </List>
        </div>
      </div>
    </MemoryRouter>
  );
}

HeaderList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HeaderList);