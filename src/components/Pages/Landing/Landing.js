import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../Global/Nav/Nav';
import { USER_ACTIONS } from '../../../redux/actions/userActions';
import { MAP_ACTIONS } from '../../../redux/actions/mapActions';
import { triggerLogout } from '../../../redux/actions/loginActions';
import DropdownSearch from './Local/DropdownSearch';
import SearchBar from './Local/SearchBar';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Map from './Local/Map';
import AddArticleModal from '../../Global/Modals/AddArticleModal';
import { ARTICLE_ACTIONS } from '../../../redux/actions/articleActions';


const mapStateToProps = state => ({
  user: state.user,
  mapReducer: state.mapReducer,
  articles: state.articleReducer.article,
  research_type: state.articleReducer.research_type,
  research_phase: state.articleReducer.research_phase
});

class Landing extends Component {
  
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
    this.props.dispatch({ type: ARTICLE_ACTIONS.FETCH_ARTICLES});
    this.props.dispatch({ type: ARTICLE_ACTIONS.FETCH_RESEARCH_TYPE});
    this.props.dispatch({ type: ARTICLE_ACTIONS.FETCH_RESEARCH_PHASE});
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.user === null) {
      // this.props.history.push('home');
    }
  }

  // gets locations from the database to render markers on the google map


  logout = () => {
    this.props.dispatch(triggerLogout());
    this.props.history.push('home');
  }

  render() {
    
    return (
      <div>
        <Nav />
        <div>
          <Grid container spacing={24}>
            <Grid item xs={12} />
            <Grid item xs={4}>
              <DropdownSearch />
              {this.props.user.user&& <AddArticleModal />}
            </Grid>
            <Grid item xs={8}>
              <div style={{ height: `800px`, width: `auto`, flex: 'auto' }}>
            <Map /> 
            </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Landing);

