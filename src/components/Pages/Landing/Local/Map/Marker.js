import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import SearchBar from '../SearchBar'

const evtNames = [
  'click'
]


export class MyMarker extends Component {
    
    componentDidMount(){
      
    }
  
    // renders marker on the map
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

      // adds onClick event listener for markers
      evtNames.forEach(e => {
        this.marker.addListener(e, this.handleEvent(e))
      })
      
    }

    // sets first letter of string to upper case
    camelize = (str) => {
      return str.split(' ').map(function(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }).join('');
    }


    handleEvent = (evt) => {
      return (e) => {
        const evtName = `on${this.camelize(evt)}`
        
        if (this.props[evtName]){
          this.props[evtName](this.props, this.marker, e)
        }
      }
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
