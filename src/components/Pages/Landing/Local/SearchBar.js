import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import '../Landing.css';
import { MAP_ACTIONS } from '../../../../redux/actions/mapActions';

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

const mapStateToProps = state => ({
  user: state.user,
  booking: state.booking,
  mapReducer: state.mapReducer
});

class SearchBar extends React.Component{


  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      markers: []
    }
  }

  googleApiCall = (searchAddress) => async(event) => {
    event.preventDefault();
    console.log('googleApiCall');
    console.log('searchAddress:',searchAddress);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchAddress}&key=AIzaSyD9e9e4rYBfPVZsPiKNBvQ8Ciu5yGPlfq8&`
    console.log('url:', url);
    
    await axios.get(url)
    .then(async (response) => {
        const latLng = {...response.data.results[0]}
        console.log('latLng:', latLng);
         await this.props.dispatch({type: MAP_ACTIONS.SET_ADDRESS, payload: latLng})
        await this.props.dispatch({type: MAP_ACTIONS.RECENTER})
    })
         .catch(err => {
           console.log(err)                     //Axios entire error message
           console.log(err.response.data.error) //Google API error message 
         });
  }


  handleInputChangeFor = propName => (event) => {
    event.preventDefault();
    this.setState({...this.state, [propName]: event.target.value})
  }

  render( ) {

  const { classes } = this.props;


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
                onChange={this.handleInputChangeFor("searchAddress")}
              />
          </FormControl>
          <Button variant="contained" onClick={this.googleApiCall(this.state.searchAddress)} className={classes.button} aria-label="search" color="primary">Search</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}
}

export default compose(connect(mapStateToProps),withStyles(styles))(SearchBar);
