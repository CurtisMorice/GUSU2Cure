import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Nav from '../../Global/Nav/Nav';

import { USER_ACTIONS } from '../../../redux/actions/userActions';
import { triggerLogout } from '../../../redux/actions/loginActions';


const mapStateToProps = state => ({
  user: state.user,
});

class UserHome extends Component {
  
    constructor(props) {
        super(props);
    
        this.state = {
          resources: ['l'],
          resourcesFetched: false
        };
      }
  
    componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.getResources();
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.user === null) {
    //   this.props.history.push('home');
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
    // this.props.history.push('home');
  }

  getResources = async () =>{
    axios.get('api/resource').then((response)=>{
        console.log('got resources successfully:', response.data);
        this.setState({...this.state, resources: response.data, resourcesFetched:true});
        
        return response.data;  
      })
      .catch((error)=>{
          console.log('error getting resources:', error);
          return error
      });
    //   console.log('resources:',resources);
    //   await this.setState({...this.state, resources: [...resources], resourcesFetched:true});
    //   console.log('this.state:', this.state);
  }

  getCall = async ()=>{
   
  }

  render() {
    let content = null;

    if (this.state) {
      content = (
        <div>
          <h1>Resources</h1>
          {this.state.resourcesFetched && <ol>
              {this.state.resources.map((resource, i)=><li key={i}>{resource.name}</li>)}
          </ol>}
        </div>
      );
    }

    return (
      <div>
        <Nav />
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserHome);

