import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../Global/Nav/Nav';
import { USER_ACTIONS } from '../../../redux/actions/userActions';
import { MAP_ACTIONS } from '../../../redux/actions/mapActions';
import { triggerLogout } from '../../../redux/actions/loginActions';
import DropdownSearch from './Local/DropdownSearch';
import SearchBar from './Local/SearchBar';
import Grid from '@material-ui/core/Grid';
import Marker from './Local/Marker';
import  {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
} from "react-google-maps";
import axios from 'axios';


const mapStateToProps = state => ({
  user: state.user,
  mapReducer: state.mapReducer
});

class Landing extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      articles: [], // articles to be rendered on the map
      markers: [],
      searchAddress: '',
    }
  }
  
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.getLocations();
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.user === null) {
      // this.props.history.push('home');
    }
  }

  // gets locations from the database to render markers on the google map
  getLocations = () =>{
    axios.get('/api/articles')
    .then(async(response)=>{
       await this.setState({...this.state, articles: [...response.data]})
       console.log('this.state:', this.state);
    })
    .catch((error)=>{
      console.log('error getting articles in client:', error);
    })
    
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
    this.props.history.push('home');
  }

  render() {
    let MyMap = (withScriptjs(withGoogleMap(()=>{
      return <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat: this.props.mapReducer.mapReducer.location.lat, lng: this.props.mapReducer.mapReducer.location.lng}}>
      {this.state.articles.map((article, i)=> <Marker key={i} lat={article.lat} lng={article.lng}/>)}
    </GoogleMap>
    })));
    return (
      <div>
        <Nav />
        <div>
          <Grid container spacing={24}>
            <Grid item xs={12} />
            <Grid item xs={4}>
              <DropdownSearch />
            </Grid>
            <Grid item xs={8}>
              <SearchBar />  
              <div>
            <MyMap
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDHHRhTzzE5wUoHuZKmTJdTzD7sBFxvXB0&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `800px`, width: `1400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            />
            </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Landing);

