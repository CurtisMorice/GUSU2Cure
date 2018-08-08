import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import SearchBar from '../SearchBar'
import Marker from './Marker';
import axios from 'axios'

export class Map extends Component {
    constructor(props) {
      super(props);
      const {lat, lng} = this.props.initialCenter;
      this.state = {
        currentLocation: {
            lat: lat,
            lng: lng
        },
        articles: []
      };
    }
  
    // renders the children onto the map
    renderChildren = () =>{
        const {children} = this.props;
        // console.log('children:', children);
      
        if(!children) return;

        // children is the array, c is the object at each array index
        return React.Children.map(children, c =>{
            return React.cloneElement(c, {
                map: this.map,
                google: this.props.google,
                mapCenter: this.state.currentLocation

            })
        })
    }

    componentDidMount(){
      // this.getLocations();
    }

    componentDidUpdate(prevProps, prevState){
      if (prevProps.google !== this.props.google){
        this.loadMap();
      }
      if (prevState.currentLocation !== this.state.currentLocation){
          this.recenterMap();
          
      }
    }
  
    // recenters the map when prevState.currentLocation is different from this.state.currentLocation
    recenterMap = () => {
        const map = this.map;
        const currentLocation = this.state.currentLocation;

        const google = this.props.google;
        const maps = google.maps;

        if(map){
            let center = new maps.LatLng(currentLocation.lat, currentLocation.lng)
            map.panTo(center);
        }

    }

    componentDidMount(){
      // this puts the map into the div with ref="map" in the render function
      this.loadMap();
    }
  
    loadMap = () => {
      if (this.props && this.props.google){

        // google is fed through proprs from the GoogleApiWrapper
        const {google} = this.props;
        const maps = google.maps;
  
        const mapRef = this.refs.map;
        const node = ReactDOM.findDOMNode(mapRef);
  
        // these are from the bottom of the page in Map.defaultProps
        let {initialCenter, zoom} = this.props;
        console.log('initialCenter:', initialCenter);
        
        let {lat, lng} = initialCenter;
        const center = new maps.LatLng(lat, lng);1 
        
        // sets the map configurations. i.e. what the zoom should be and where the center should be
        const mapConfig = Object.assign({}, {
          center: center,
          zoom: zoom
        })
        this.map = new maps.Map(node, mapConfig)
      }
    }
  
    // this is fed to the searchbar component. it allows the searchbar to set the state
    // of this component so the map can recenter
    setCurrentLocation = async(location) =>{
        await this.setState({...this.state, currentLocation: location})        
    }
  
    render() {
      if (!this.props.google) {
        return <div>Loading...</div>;
      }
  
      const style = {
        width: '100%',
        height: '100vh'
      }

      return (
          // div MUST have width and height defined here AND in map container
        <div>
        <SearchBar setCurrentLocation={this.setCurrentLocation} />
        <div style={style} ref="map">
          Loading map...
          {/* calling renderChildren here is what renders the children fed into the map in the Container
          component on the map (i.e. the markers and the info window)
           */}
          {this.renderChildren()}
        </div>
        </div>
      );
    }
  }

  // allows strict typing for specific properties
Map.propsTypes = {
    google: PropTypes.object,
    zoom: PropTypes.number,
    initialCenter: PropTypes.object
}

// sets default values for certain properties
Map.defaultProps = {
    zoom: 11,

    initialCenter: {
        lat: 44.986656,
        lng: -93.273079
        
    }
}

export default Map