// React requires
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// used to mapStateToProps
import { connect } from 'react-redux';

// allows exporting of multiple file props
import { compose } from 'recompose';

// Redux Actions
import { USER_ACTIONS } from '../../../redux/actions/userActions';
import {ADMIN_ACTIONS} from '../../../redux/actions/adminActions';
import { MAP_ACTIONS } from '../../../redux/actions/mapActions';
import { triggerLogout } from '../../../redux/actions/loginActions';
import { ARTICLE_ACTIONS } from '../../../redux/actions/articleActions';

// Material-UI required components
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// External components required for functionality
import DropdownSearch from '../Landing/Local/DropdownSearch';
import SearchBar from '../Landing/Local/SearchBar';
import AddArticleModal from '../../Global/Modals/AddArticle/AddArticleModal';
import ArticleModal from '../../Global/Modals/ArticleModal';
import Map from './Local/Map/Map';
import MapWrapper from './Local/Map/MapWrapper';

// Stylesheet
import './Landing.css';

// Mapping the reducer states to the props of the app
const mapStateToProps = state => ({
  user: state.user,
  mapReducer: state.mapReducer,
  articles: state.articleReducer.article,
  catalogue: state.adminReducer.approvedArticle,
  research_type: state.articleReducer.research_type,
  research_phase: state.articleReducer.research_phase
});

// sets the width of the sidebar portion of the landing page
const drawerWidth = 563;

// setting styling and thematic properties of objects
const theme = createMuiTheme({
  palette: {
    type: 'light',
  },
});

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    width: '100%',
    marginTop: 0,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  flex: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: '#18335a',
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  addArticleModalButton: {
    marginLeft: 20,
    marginRight: -12,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: 0,
    width: '100%',
    height: '100%',
    minWidth: 0, // So the Typography noWrap works
    'overflow-x': 'scroll',
  },
  gridList: {
    flexWrap: 'flex',
    transform: 'translateZ(0)',
  },
  toolbar: theme.mixins.toolbar,
  cardOutput: {
    position: 'relative',
    float: 'left',
    paddingLeft: '20px',
    paddingRight: '20px',
  },
  cardObject: {
    float: 'right',
    marginLeft: '10px',
    minWidth: 300,
  },
  title: {
    marginBottom: 16,
  }
  
});

class Sidebar extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      articles: [], // articles to be rendered on the map
      markers: [], // markers displayed on the map
      searchAddress: '',
    }
  }

  // upon page mounting, these actions are run
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch({ type: ADMIN_ACTIONS.FETCH_APPROVED_ARTICLE});
    this.props.dispatch({ type: ARTICLE_ACTIONS.FETCH_RESEARCH_TYPE});
    this.props.dispatch({ type: ARTICLE_ACTIONS.FETCH_RESEARCH_PHASE});
    if (!this.props.user.isLoading && this.props.user.user === null) {
      // this.props.history.push('home');
    }
  }

  // allows users to logout
  logout = () => {
    this.props.dispatch(triggerLogout());
    this.props.history.push('home');
  }

  // this is what React is rending to output to the DOM
  render() {

    // allows for classname styles as previously declared in styles
    const { classes } = this.props;
    
    return (
      <div className={classes.root}>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          >
          <div className={classes.toolbar}>
            <AppBar position="absolute" className={classes.appBar} >
              <Toolbar>
                <Typography variant='title' color='inherit' className={classes.flex}>
                  Find resources in your area
                </Typography>
                <div className={classes.addArticleModalButton}>
                  {this.props.user.user && <AddArticleModal />}  
                </div>
              </Toolbar>
            </AppBar>
          </div>

          <div className={classes.gridList} cols={1}>
            <GridList className={classes.cardOutput}>
              {this.props.catalogue.map((article, i) => {
                return (
                  <GridListTile className={classes.cardObject}>
                  <Card key={i} value={article}>
                    <CardContent>
                      <Typography variant="title">
                        {article.research_title}
                      </Typography>
                      <Typography className={classes.title}>
                        {article.institution_name}
                        <br />
                        {article.institution_url}
                      </Typography>
                      <Typography component='p'>
                        {article.funding_source}
                        <br />
                        {article.related_articles}
                        <br />
                        {article.date_posted.split('T')[0]}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <ArticleModal article={article} />
                    </CardActions>
                  </Card>
                </GridListTile>
                )
              })}
            </GridList>
          </div>
        </Drawer>
        <main className={classes.appFrame}>
          <div className={classes.content}>
            <MapWrapper />
          </div>
        </main>
      </div>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(Sidebar);