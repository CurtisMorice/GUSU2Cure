// import React, {Component} from 'react';
// import {InfoWindow, Marker} from 'google-maps-react';


// export class MyMarker extends Component{

//   constructor(props){
//     super(props);
//     this.state = {
//       isOpen: false,
//       markers: []
//     }
//   }
  
  

//     onToggleOpen = () => {
//       console.log('onToggleOpen');
//       console.log('this.props:', this.props);
//       this.setState({...this.state, isOpen: !this.state.isOpen})
//     }

//     componentWillMount() {
//         this.setState({ markers: [] })
//       }
    
//       componentDidMount() {
        
//       }


//   render(){

// let parsedLat = parseFloat(this.props.lat);
//             let parsedLng = parseFloat(this.props.lng);   

//     return(
//         <div>
//         <Marker onClick={this.onToggleOpen}
//                 position={{ lat: parsedLat, lng: parsedLng }}
//         />
              
//         <InfoWindow onClose={this.onToggleOpen}>
//             <div>
//               <h1>Hello</h1>
//             </div>
//         </InfoWindow>
//         </div>
//     )
//   }

// }



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
          // div MUST have width and height defined here AND in map container
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