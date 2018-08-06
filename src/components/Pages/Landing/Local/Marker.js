import React, {Component} from 'react';
/* eslint-disable no-undef */
// const FaAnchor = "@fortawesome/react-fontawesome";

import  {
    // Marker,
    InfoWindow,
  } from "google-maps-react";

  class Marker extends Component {
    
    constructor(props){
      super(props);
      this.state = {
        isOpen: false,
        markers: []
      }
    }
    
    
  
      onToggleOpen = () => {
        console.log('onToggleOpen');
        console.log('this.props:', this.props);
        this.setState({...this.state, isOpen: !this.state.isOpen})
      }
  
      componentWillMount() {
          this.setState({ markers: [] })
        }
      
        componentDidMount() {
          
        }
      
        render( ) {
  
            let parsedLat = parseFloat(this.props.lat);
            let parsedLng = parseFloat(this.props.lng);            

          return (
            <Marker
            position={{ lat: parsedLat, lng: parsedLng }}
            onClick={this.onToggleOpen}>
        {this.state.isOpen && 
        <InfoWindow onCloseClick={this.onToggleOpen}>
        <div>
        {this.props.markers}
        </div> 
        </InfoWindow>}
          </Marker>
          )
        }
      }
      
      
      
  
  export default Marker;
  