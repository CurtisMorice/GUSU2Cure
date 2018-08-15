import React, {Component} from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import Map from './Map';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { MAP_ACTIONS } from '../../../../../redux/actions/mapActions';
import Marker from './Marker';
import {KEYS} from '../../../../../Key';
import InfoWindow from './InfoWindow';
import ArticleModal from '../../../../Global/Modals/ArticleModal';

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
          // articles: this.props.mapReducer.mapReducer.locations, // articles to be rendered on the map
          activeMarker: {},
          searchAddress: '',
          showingInfoWindow: false,
          articlesFetched: false,
          selectedPlace: '',
        }
      }
      
      componentDidMount() {
        // use this dispatch  
        this.props.dispatch({type:MAP_ACTIONS.FETCH_LOCATIONS})
        // for testing purposes
        // this.props.dispatch({type:MAP_ACTIONS.FETCH_LOCATIONS, payload: {param: 'phase', value: 2}})

      }
    
      componentDidUpdate(prevProps, prevState) {
        
        // this conditional is what causes all of the markers to appear on the map. without this,
        // only the first location got from the database will render on the map
        if (prevProps.mapReducer.mapReducer !== this.props.mapReducer.mapReducer){
          this.forceUpdate();
        }
      }
    
      // gets locations from the database to render markers on the google map
      getLocations = () =>{
        
      }
      onMarkerClick = async (props, marker) =>{        
        // sets the state of this component to the marker clicked on. necessary for displaying
        // the info window with the correct information
         await this.setState({
          ...this.state,
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true
        });        
      }
  
      render(){
          const style = {
            width: '100vw',
            height: '100vh'
          }
          return (
            <div>
              {this.props.mapReducer.mapReducer.length !== 0 && <Map google={this.props.google}>
                {this.props.mapReducer.mapReducer.length !== 0 && this.props.mapReducer.mapReducer.map((article,i) =>
                <Marker name={article.institution_name} article={article} onClick={this.onMarkerClick} key={i} position={{lat: article.lat, lng: article.lng}} />
                  )}
              
              <InfoWindow
                  marker={this.state.activeMarker}
                  visible={this.state.showingInfoWindow}
                  name="info-window"
                  >
                    <div>
                      <h1>{this.state.selectedPlace && this.state.selectedPlace.article.research_title}</h1>
                      <div>
                        {this.state.selectedPlace !== '' && <ArticleModal article={this.state.selectedPlace.article} />}
                      </div>
                    </div>
              </InfoWindow>

              </Map>}
            </div>
          
        )
        }
      }

export default compose(connect(mapStateToProps),GoogleApiWrapper({
  apiKey: KEYS.GOOGLE_API_KEY,
  v: "3"
}))(Container);