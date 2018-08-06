import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

//components
import UserTable from './UserTable';
import CatalogueTable from './CatalogueTable';
import NewArticleTable from './NewArticleTable';
import ModifiedArticleTable from './ModifiedArticleTable';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class SimpleTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="New Articles" />
            <Tab label="Article Edits" />
            <Tab label="Catalogue" />
            <Tab label="Users" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer> <NewArticleTable /> </TabContainer>}
        {value === 1 && <TabContainer> <ModifiedArticleTable /> </TabContainer>}
        {value === 2 && <TabContainer> <CatalogueTable /> </TabContainer>}
        {value === 3 && <TabContainer> <UserTable /> </TabContainer>}
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);