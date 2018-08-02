import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './Resources.css'

import Nav from '../../Global/Nav/Nav';
import {RESOURCE_ACTIONS} from '../../../redux/actions/resourceActions';
import { USER_ACTIONS } from '../../../redux/actions/userActions';
import { triggerLogout } from '../../../redux/actions/loginActions';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AddResourceModal from '../../Global/Modals/AddResourceModal';

const mapStateToProps = state => ({
  user: state.user,
  resources: state.resourceReducer.resource
});

class UserHome extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
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
          <AddResourceModal />
          {this.props.resources.resourcesFetched && <div className="resourceDiv">
              {this.props.resources.articles.map((resource, i) => 
                <Card key={i} className="resourceCards">
                  <CardContent>
                  <Typography>

                  {resource.name}
                  <br/>
                  {resource.url}
                  <br/>
                  {resource.summary}
                  </Typography>
                  </CardContent>
                </Card>)}
          </div>}
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

