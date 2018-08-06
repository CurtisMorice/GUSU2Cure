import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import SearchBar from '../SearchBar'

// let marker = new google.maps.Marker({
//   position: somePosition,
//   map: map
// })

export class MyMarker extends Component {
    

    onMarkerClick(props, marker, e) {
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      });
    }
  
    componentDidUpdate(prevProps){
      if ((this.props.map !== prevProps.map) ||
      (this.props.position !== prevProps.position)) {
        this.renderMarker();
      }
    }

    renderMarker = () =>{
      let {
        map, google, position, mapCenter
      } = this.props;

      let pos = position || mapCenter;
      position = new google.maps.LatLng(pos.lat, pos.lng)

      const pref = {
        map: map,
        position: position
      };
      this.marker = new google.maps.Marker(pref);
    }

    render() {
      if (!this.props.google) {
        return <div>Loading...</div>;
      }
  
      

      return (
        <div>
        
        </div>
      );
    }
  }

  // allows strict typing for specific properties
  MyMarker.propTypes = {
    position: PropTypes.object,
    map: PropTypes.object
  }

// sets default values for certain properties

export default MyMarker