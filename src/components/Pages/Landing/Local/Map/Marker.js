import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import SearchBar from '../SearchBar'

const evtNames = [
  'click'
]

export class MyMarker extends Component {
    
    componentDidMount(){
      // this.markerPromise = wrappedPromise();
      // console.log('this.markerPromise:', this.markerPromise);
      
    }

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
      // sets these variables equal to the matching properties in the props
      let {
        map, google, position, mapCenter
      } = this.props;      



      let pos = position || mapCenter;
      // sets position to a google maps LagLng object
      position = new google.maps.LatLng(pos.lat, pos.lng)      

      const pref = {
        map: map,
        position: position
      };
      this.marker = new google.maps.Marker(pref);

      // adds event listners to markers. only adds onClick for now
      evtNames.forEach(e => {
        this.marker.addListener(e, this.handleEvent(e))
      })
      
      // this.marker.addListener('click', this.props.onMarkerClick)

      // this.markerPromise.resolve(this.marker);
    }

    camelize = (str) => {
      return str.split(' ').map(function(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }).join('');
    }

    handleEvent = (evt) => {
      return (e) => {
        const evtName = `on${this.camelize(evt)}`
        console.log('evtName:', evtName);
        
        if (this.props[evtName]){
          this.props[evtName](this.props, this.marker, e)
        }
      }
    }

      

    getMarker() {
      return this.markerPromise;
    }

    render() {
      if (!this.props.google) {
        return null;
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