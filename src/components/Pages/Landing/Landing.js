// React requires
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// used to mapStateToProps
import { connect } from 'react-redux';

// allows exporting of multiple file props
import { compose } from 'recompose';

// Redux Actions
import { USER_ACTIONS } from '../../../redux/actions/userActions';
import {ADMIN_ACTIONS} from '../../../redux/actions/adminActions';
import { triggerLogout } from '../../../redux/actions/loginActions';
import { ARTICLE_ACTIONS } from '../../../redux/actions/articleActions';

// Material-UI required components
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button'; 
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import GridList from '@material-ui/core/GridList';
import Typography from '@material-ui/core/Typography';
import CustomCard from './CustomCard/CustomCard';
import CustomCardBody from './CustomCard/CustomCardBody';
import CustomCardFooter from './CustomCard/CustomCardFooter';
import CustomCardHeader from './CustomCard/CustomCardHeader';

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
    backgroundColor: '#dcdcdc'
  },
  flex: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: '#18335a',
    position: 'sticky',
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    backgroundColor: '#dcdcdc', 
    overflow: 'auto',
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
  cardOutput: {
    position: 'relative',
    float: 'left',
    padding: '40px',
    overflow: 'auto',
    backgroundColor: '#dcdcdc',
  },
  cardObject: {
    float: 'right',
    marginTop: '30px',
    marginBottom: '80px',
    minWidth: 500,
    flexGrow: 'auto',
    padding: '30px',
  },
  title: {
    marginBottom: 16,
  },
  toolbarContainer: {
		width: '100%',
		zIndex: 1
  },
  container: {
    maxWidth: '550px',
    overflow: 'auto',
    backgroundColor: '#dcdcdc',
    display: 'flex',
    justifyContent: 'space-between',
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
                <Toolbar className={classes.toolbar}>
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
            
          <div className={classes.container} cols={1}>
            <GridList className={classes.cardOutput}>
              {this.props.catalogue.map((article, i) => {
                return (
                  <div className={classes.cardObject}>
                  
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
                  </div>
                )
              })}
            </GridList>
          </div>

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