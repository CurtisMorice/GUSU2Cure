import React, {Component} from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import Map from './Map';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { USER_ACTIONS } from '../../../../../redux/actions/userActions';
import { MAP_ACTIONS } from '../../../../../redux/actions/mapActions';
import { triggerLogout } from '../../../../../redux/actions/loginActions';
import axios from 'axios';
import Marker from './Marker';
import {KEYS} from '../../../../../Key';
import InfoWindow from './InfoWindow';

const mapStateToProps = state => ({
    user: state.user,
    mapReducer: state.mapReducer,
    articleReducer: state.articleReducer
  });

export class Container extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          // articles: this.props.mapReducer.mapReducer.locations, // articles to be rendered on the map
          activeMarker: {},
          searchAddress: '',
          showingInfoWindow: false,
          articlesFetched: false
        }
      }
      
      componentDidMount() {
        this.getLocations();
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
      }
    
      componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.user === null) {
          // this.props.history.push('home');
        }
      }
    
      // gets locations from the database to render markers on the google map
      getLocations = () =>{
        console.log('getLocations');
        
        this.props.dispatch({type:MAP_ACTIONS.FETCH_LOCATIONS})
        // axios.get('/api/articles')
        // .then(async(response)=>{
        //    await this.setState({...this.state, articles: [...response.data]})
        //    console.log('this.state:', this.state);
        // })
        // .catch((error)=>{
        //   console.log('error getting articles in client:', error);
        // })
        // this.setState({
        //   ...this.state,
        //   articlesFetched: true
        // })
      }
      onMarkerClick = async (props, marker) =>{
        console.log('markerClick');
        console.log('props:', props);
        console.log('marker:', marker);
        
        
         await this.setState({
          ...this.state,
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true
        });
        console.log('wrapper state:', this.state);
        
      }
  
      render(){
          const style = {
            width: '100vw',
            height: '100vh'
          }
          return (
            <div>
              {this.props.mapReducer.mapReducer.locations.length !== 0 && <Map google={this.props.google}>
                {this.props.mapReducer.mapReducer.locations.length !== 0 && this.props.mapReducer.mapReducer.locations.map((article,i) =>
                <Marker name={article.institution_name} onClick={this.onMarkerClick} key={i} position={{lat: article.lat, lng: article.lng}} />
                  )}
              
              <InfoWindow
                  marker={this.state.activeMarker}
                  visible={this.state.showingInfoWindow}
                  >
                    <div>
                      <h1>Hello</h1>
                    </div>
              </InfoWindow>

              </Map>}
            </div>
          
        )
        }
      }

{/* 
          {/* <Marker position={pos} /> */}


export default compose(connect(mapStateToProps),GoogleApiWrapper({
  apiKey: KEYS.GOOGLE_API_KEY,
  v: "3"
}))(Container);