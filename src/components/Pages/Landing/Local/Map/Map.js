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
  
    renderChildren = () =>{
        const {children} = this.props;

        if(!children) return;

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
      this.loadMap();
    }
  
    loadMap = () => {
      if (this.props && this.props.google){
        console.log('hello');

        const {google} = this.props;
        const maps = google.maps;
  
        const mapRef = this.refs.map;
        const node = ReactDOM.findDOMNode(mapRef);
  
        let {initialCenter, zoom} = this.props;
        let {lat, lng} = initialCenter;
        const center = new maps.LatLng(lat, lng);
        const mapConfig = Object.assign({}, {
          center: center,
          zoom: zoom
        })
        this.map = new maps.Map(node, mapConfig)
      }
    }
  
    setCurrentLocation = async(location) =>{
        console.log('in setCurrentLocation with location:', location);
        
        await this.setState({...this.state, currentLocation: location})
        console.log('this.state.currentLocation:', this.state.currentLocation);
        
    }

    onMarkerClick(props, marker, e) {
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      });
    }
  
  
    render() {
      if (!this.props.google) {
        return <div>Loading...</div>;
      }
  
      const style = {
        width: '100vw',
        height: '100vh'
      }

      return (
          // div MUST have width and height defined here AND in map container
        <div>
        <SearchBar setCurrentLocation={this.setCurrentLocation} />
        <div style={style} ref="map">
          Loading map...
          {/* {this.state.articles.map((article, i)=> <Marker key={i} lat={article.lat} lng={article.lng}/>)} */}
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