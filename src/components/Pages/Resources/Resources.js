import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Nav from '../../Global/Nav/Nav';
import {RESOURCE_ACTIONS} from '../../../redux/actions/resourceActions';
import { USER_ACTIONS } from '../../../redux/actions/userActions';
import { triggerLogout } from '../../../redux/actions/loginActions';


const mapStateToProps = state => ({
  user: state.user,
  resources: state.resourceReducer.resource
});

class UserHome extends Component {
  
    constructor(props) {
        super(props);
    
        this.state = {
          resources: [],
          resourcesFetched: false
        };
      }
  
    componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch({ type: RESOURCE_ACTIONS.FETCH_RESOURCES});
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

  render() {
    let content = null;

    if (this.state) {
      content = (
        <div>
          <h1>Resources</h1>
          {JSON.stringify(this.props.resources)}
          {this.state.resourcesFetched && <ul>
              {this.props.resources.map((resource, i)=><li key={i}>{resource.name}, {resource.url}, {resource.summary}</li>)}
          </ul>}
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

