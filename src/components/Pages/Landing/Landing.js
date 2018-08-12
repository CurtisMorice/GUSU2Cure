import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Nav from '../../Global/Nav/Nav';
import { USER_ACTIONS } from '../../../redux/actions/userActions';
import {ADMIN_ACTIONS} from '../../../redux/actions/adminActions';
import { MAP_ACTIONS } from '../../../redux/actions/mapActions';
import { triggerLogout } from '../../../redux/actions/loginActions';
import Grid from '@material-ui/core/Grid';
// import Sidebar from './Sidebar';
import AddArticleModal from '../../Global/Modals/AddArticle/AddArticleModal';
import { ARTICLE_ACTIONS } from '../../../redux/actions/articleActions';
import MapWrapper from './Local/Map/MapWrapper';
import ArticleModal from '../../Global/Modals/ArticleModal';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './Landing.css'

const mapStateToProps = state => ({
  user: state.user,
  mapReducer: state.mapReducer,
  articles: state.articleReducer.article,
  catalogue: state.adminReducer.approvedArticle,
  research_type: state.articleReducer.research_type,
  research_phase: state.articleReducer.research_phase,
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
    this.props.dispatch({ type: ARTICLE_ACTIONS.FETCH_RESEARCH_TYPE});
    this.props.dispatch({ type: ARTICLE_ACTIONS.FETCH_RESEARCH_PHASE});
    this.props.dispatch({ type: ADMIN_ACTIONS.FETCH_APPROVED_ARTICLE})
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
        {/* <Nav /> */}
        <div>
          <Grid container spacing={24}>
            {/* <Grid item xs={12}>
              <Sidebar />
            </Grid> */}
            <Grid item xs={4}>
              {this.props.user.user && <AddArticleModal />}


              {this.props.catalogue.map((article, i) => {
                return (
                  <Card key={i} value={article}>
                  <CardContent>
                  <Typography variant="title">
                  {article.research_title}
                  </Typography>
                  <Typography>
                  <br/>
                  {article.institution_name}
                  <br/>
                  {article.institution_url}
                  <br/>
                  {article.funding_source}
                  <br/>
                  {article.related_articles}
                  <br/>
                  {article.date_posted.split('T')[0]}
                  </Typography>
                  <ArticleModal article={article} />
                  </CardContent>
                  </Card>
                   )
                })}
            </Grid>
            <Grid item xs={8}>
              <div style={{ height: `800px`, width: `auto`, flex: 'auto' }}>
            <MapWrapper /> 
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

