import React, {Component} from 'react';
import { GoogleApiWrapper} from 'google-maps-react';
import Map from './Map';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { USER_ACTIONS } from '../../../../../redux/actions/userActions';
import { MAP_ACTIONS } from '../../../../../redux/actions/mapActions';
import { triggerLogout } from '../../../../../redux/actions/loginActions';
import axios from 'axios';
import Marker from './Marker';

const mapStateToProps = state => ({
    user: state.user,
    mapReducer: state.mapReducer,
    articleReducer: state.articleReducer
  });

export class Container extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          articles: [], // articles to be rendered on the map
          markers: [],
          searchAddress: '',
        }
      }
      
      componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.getLocations();
      }
    
      componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.user === null) {
          // this.props.history.push('home');
        }
      }
    
      // gets locations from the database to render markers on the google map
      getLocations = () =>{
        axios.get('/api/articles')
        .then(async(response)=>{
           await this.setState({...this.state, articles: [...response.data]})
           console.log('this.state:', this.state);
        })
        .catch((error)=>{
          console.log('error getting articles in client:', error);
        })
        
      }
  
render(){
    const style = {
      width: '100vw',
      height: '100vh'
    }
    const pos = {lat: 37.759703, lng: -122.428093}

    return (
      <div style={style}>
        <Map google={this.props.google}>
          {this.state.articles.length !== 0 && this.state.articles.map((article,i) =><Marker position={{lat: article.lat, lng: article.lng}} />)}
          {/* <Marker />
          <Marker position={pos} /> */}
        </Map>
      </div>
    )
  }
}


export default compose(connect(mapStateToProps),GoogleApiWrapper({
  apiKey: "AIzaSyDHHRhTzzE5wUoHuZKmTJdTzD7sBFxvXB0",
  v: "3"
}))(Container);