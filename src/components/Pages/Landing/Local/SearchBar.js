import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import '../Landing.css';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  searchButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    margin: theme.spacing.unit,
    color: 'white',
  },
  textField: {
    flexBasis: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

function SearchBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.searchButton} color="inherit" aria-label="search icon">
            <SearchIcon />
          </IconButton>
          <FormControl inputTypeSearch fullWidth  className={classes.margin}>
            <Input
                type="search"
                id="full-width"
                disableUnderline="true"
                placeholder="Search Google Maps"
                className={classes.input}
                color="white"
                inputProps={{
                  'aria-label': 'Search Input',
                }}
              />
          </FormControl>
          <Button variant="contained" className={classes.button} aria-label="search" color="primary">Search</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchBar);
