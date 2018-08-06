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
import Autocomplete from 'react-google-autocomplete';
import {KEYS} from '../../../../Key';

const styles = theme => ({
  root: {
    flexGrow: 'auto',
  },
  flex: {
    flexGrow: 'auto',
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

  googleApiCall = (event) => {
    event.preventDefault();
    console.log('googleApiCall');
    console.log('searchAddress:', this.state.searchAddress);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.searchAddress}&key=${KEYS.GOOGLE_API_KEY}`
    console.log('url:', url);
    
    axios.get(url)
    .then((response) => {
      console.log('response', response)
        const latLng = {...response.data.results[0].geometry.location}
        console.log('latLng:', latLng);
        this.props.setCurrentLocation(latLng)
        // this.props.dispatch({type: MAP_ACTIONS.SET_ADDRESS, payload: latLng})
        // this.props.dispatch({type: MAP_ACTIONS.RECENTER})
    })
         .catch(err => {
           console.log('in googleApicall',err);                     //Axios entire error message
           
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
          <FormControl fullWidth  className={classes.margin}>
          {/* TODO STRETCH GOAL  */}
          <Autocomplete
            id="full-width"
            className={classes.input}
            placeholder="Search Google Maps"
            onChange={this.handleInputChangeFor("searchAddress")}
           style={{width: '99%',
            flex:'auto',
            height:'50px',
            fontSize:'18px',
            disableUnderline:"true",
            placeholder:"Search Google Maps",
            color:"white",
            backgroundColor: "#475c87",

          }}
          onPlaceSelected={(place) => {
            console.log(place);
          }}
          types={['(regions)']}
          />
          {/* <Input
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

            /> */}
          </FormControl>
          <Button variant="contained" onClick={this.googleApiCall} className={classes.button} aria-label="search" color="primary">Search</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}
}

export default compose(connect(mapStateToProps),withStyles(styles))(SearchBar);
