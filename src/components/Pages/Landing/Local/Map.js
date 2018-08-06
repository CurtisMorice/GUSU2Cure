// old way of doing map

// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { USER_ACTIONS } from '../../../../redux/actions/userActions';
// import { MAP_ACTIONS } from '../../../../redux/actions/mapActions';
// import { triggerLogout } from '../../../../redux/actions/loginActions';
// import Marker from './Marker';
// import  {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
// } from "react-google-maps";
// import axios from 'axios';
// import SearchBar from './SearchBar';


// const mapStateToProps = state => ({
//     user: state.user,
//     mapReducer: state.mapReducer,
//   });
  
//   class Map extends Component {
    
//     constructor(props){
//       super(props);
//       this.state = {
//         articles: [], // articles to be rendered on the map
//         markers: [],
//         searchAddress: '',
//       }
//     }
    
//     componentDidMount() {
//       this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
//       this.getLocations();
//     }
  
//     componentDidUpdate() {
//       if (!this.props.user.isLoading && this.props.user.user === null) {
//         // this.props.history.push('home');
//       }
//     }
  
//     // gets locations from the database to render markers on the google map
//     getLocations = () =>{
//       axios.get('/api/articles')
//       .then(async(response)=>{
//          await this.setState({...this.state, articles: [...response.data]})
//          console.log('this.state.articles:', this.state.articles);
//       })
//       .catch((error)=>{
//         console.log('error getting articles in client:', error);
//       })
      
//     }
  
//     logout = () => {
//       this.props.dispatch(triggerLogout());
//       this.props.history.push('home');
//     }
  
//     render() {
//       // try to put this into its own component and put that into the return below
//       let MyMap = (withScriptjs(withGoogleMap(()=>{
//         return <GoogleMap
//         defaultZoom={12}
//         center={{ lat:this.props.mapReducer.mapReducer.location.lat, lng:this.props.mapReducer.mapReducer.location.lng}}
//         // center={this.props.mapReducer.mapReducer.location === null ? null : {lat:this.props.mapReducer.mapReducer.location.lat, lng:this.props.map.mapReducer.location.lng}}
//         >
//         {this.state.articles.map((article, i)=> <Marker key={i} lat={article.lat} lng={article.lng}/>)}
//       </GoogleMap>
//       })));
//       return (
//         <div>
//               <SearchBar />  
//               <MyMap
//               googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDHHRhTzzE5wUoHuZKmTJdTzD7sBFxvXB0&v=3.exp&libraries=geometry,drawing,places"
//               loadingElement={<div style={{ height: `100%` }} />}
//               containerElement={<div style={{ height: `800px`, width: `auto`, flex: 'auto' }} />}
//               mapElement={<div style={{ height: `100%` }} />}
//               />
//         </div>
//       );
//     }
//   }
  
//   // this allows us to use <App /> in index.js
//   export default connect(mapStateToProps)(Map);
  
  