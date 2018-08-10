import React, {Component} from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import Map from './Map';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { MAP_ACTIONS } from '../../../../../redux/actions/mapActions';
import Marker from './Marker';
import {KEYS} from '../../../../../Key';

const mapStateToProps = state => ({
    user: state.user,
    mapReducer: state.mapReducer,
    articleReducer: state.articleReducer
  });


// this is the componen that goes around the google map. this component is curried at the bottom with
// the GoogleApiWrapper. this feeds it the prop 'google' which is necessary for the rest of the components
export class Container extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          
        }
      }
      
      componentDidMount() {
        // use this dispatch  
        // this.props.dispatch({type:MAP_ACTIONS.FETCH_LOCATIONS})
        // for testing purposes
        // this.props.dispatch({type:MAP_ACTIONS.FETCH_LOCATIONS, payload: {param: 'phase', value: 2}})

      }
    
      componentDidUpdate(prevProps, prevState) {
        
        // this conditional is what causes all of the markers to appear on the map. without this,
        // only the first location got from the database will render on the map
        // if (prevProps.mapReducer.mapReducer !== this.props.mapReducer.mapReducer){
        //   this.forceUpdate();
        // }
      }
    
      // gets locations from the database to render markers on the google map
  
      render(){
          
          return (
            <div>
              <Map initialCenter={this.props.initialCenter} google={this.props.google}>
                <Marker position={{lat: this.props.initialCenter.lat, lng: this.props.initialCenter.lng}} />
              </Map>
            </div>
          
        )
        }
      }

export default compose(connect(mapStateToProps),GoogleApiWrapper({
  apiKey: KEYS.GOOGLE_API_KEY,
  v: "3"
}))(Container);