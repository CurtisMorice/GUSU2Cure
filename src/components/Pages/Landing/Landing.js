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
import Button from '@material-ui/core/Button'; 
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CustomCard from './CustomCard/CustomCard';
import CustomCardBody from './CustomCard/CustomCardBody';
import CustomCardFooter from './CustomCard/CustomCardFooter';
import CustomCardHeader from './CustomCard/CustomCardHeader';
import Parallax from './Parallax/Parallax';
import Paper from '@material-ui/core/Paper';

// External components required for functionality
import AddArticleModal from '../../Global/Modals/AddArticle/AddArticleModal';
import ArticleModal from '../../Global/Modals/ArticleModal';
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
    overflow: 'auto',
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
    overflow: 'auto',
  },
  toolbar: theme.mixins.toolbar,
  cardOutput: {
    position: 'relative',
    float: 'left',
    padding: '20px',
  },
  cardObject: {
    float: 'right',
    marginTop: '30px',
    marginBottom: '30px',
    minWidth: 500,
    flexGrow: 'auto',
  },
  title: {
    marginBottom: 16,
  },
  toolbarContainer: {
		position: 'sticky',
		width: '100%',
		zIndex: 1
  },
  gridList: {
    maxWidth: '550px',
  },
  articleList: {
    scroll: 'paper',
  },

  subtext: {
    color: '#808080',
    fontSize: '.75rem',
  },

  button: {
    marginRight: '1rem',
  },

  
});

class Landing extends Component {
  
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
              <div className='toolbarContainer'>
                <Toolbar>
                  <Typography variant='title' color='inherit' className={classes.flex}>
                    Find resources in your area
                  </Typography>
                  <div className={classes.addArticleModalButton}>
                    {this.props.user.user && <AddArticleModal />}  
                  </div>
                </Toolbar>
              </div>
            </AppBar>
          </div>
          <div>
            <Paper elevation={1} className={classes.articleList}>
            
              <Parallax filter>
                <div className={classes.gridList} cols={1}>
                  <GridList className={classes.cardOutput}>
                    {this.props.catalogue.map((article, i) => {
                      return (
                        
                        <ListItem className={classes.cardObject}>
                          <CustomCard key={i} value={article}>
                            <CustomCardHeader>
                              <Typography color='inherit' variant='title'>
                                {article.research_title}
                              </Typography>
                            </CustomCardHeader>
                            <CustomCardBody>
                              <Typography className={classes.title}>
                                {article.institution_name}
                                <br />
                              </Typography>
                              <Typography component='p'>
                                Funded by: {article.funding_source}
                                <br />
                                {/* {article.related_articles} */}
                                <br />
                                
                              </Typography>
                              <Typography className={classes.subtext}>
                                Posted on: {article.date_posted.split('T')[0]}
                              </Typography>
                            </CustomCardBody>
                            <CustomCardFooter>
                              <a href={article.institution_url}>
                                <Button variant='contained' color='primary' className={classes.button}>
                                  Visit Website
                                </Button>
                              </a>
                              <ArticleModal article={article} />
                            </CustomCardFooter>
                          </CustomCard>
                        </ListItem>
                      )
                    })}
                  </GridList>
                </div>
              </Parallax>
            </Paper>
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

Landing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(Landing);