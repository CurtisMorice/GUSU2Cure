import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './Resources.css'

// import Nav from '../../Global/Nav/Nav';
import {RESOURCE_ACTIONS} from '../../../redux/actions/resourceActions';
import { USER_ACTIONS } from '../../../redux/actions/userActions';
import { triggerLogout } from '../../../redux/actions/loginActions';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AddResourceModal from '../../Global/Modals/AddResourceModal';
import EditResource from '../../Global/Modals/EditResourceModal'

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';


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

  removeResource = (id) => {
    const action = ({
      type: RESOURCE_ACTIONS.DELETE_RESOURCE,
      payload: id
    })
    this.props.dispatch(action);
    
  }

  render() {
    let content = null;

    if (this.state) {
      content = (
        <div>
          <h1 style={{textAlign:"center"}}>Resources</h1>
          {this.props.user.user !== null && this.props.user.user.type === "admin" && <AddResourceModal />}
          {this.props.resources.resourcesFetched && <div className="resourceDiv">
              {this.props.resources.articles.map((resource, i) => 
                <Card style={{position:'relative', justifyContent:'center'}} key={i} className="resourceCards">
                  <CardContent>
                  <Typography>
                  Title: {resource.name}
                  <br/>
                  Url: {resource.url}
                  <br/>
                  Summary: {resource.summary}
                  </Typography>
                  {this.props.user.user !== null && this.props.user.user.type === "admin" && <EditResource resource={resource}/>}
                  {this.props.user.user !== null && this.props.user.user.type === "admin" && <IconButton size="small" variant="contained" color="primary" onClick={() => this.removeResource(resource.id)}><DeleteIcon /></IconButton>}
                  </CardContent>
                </Card>)}
      
          </div>}
          <br/>
        </div>
      );
    }

    return (
      <div>
        {/* <Nav /> */}
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserHome);

