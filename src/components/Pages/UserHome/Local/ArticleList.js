import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

//components
import DeleteArticle from '../../../Global/Article/Article';

//material-ui
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';

//actions
import { USER_ACTIONS } from '../../../../redux/actions/userActions';
import { ARTICLE_ACTIONS } from '../../../../redux/actions/articleActions';
import EditArticleModal from '../../../Global/Modals/AddArticle/EditArticleModal';
import ArticleModal from '../../../Global/Modals/ArticleModal';

//ReduxStore
const mapStateToProps = state => ({
    user: state.user,
    articles: state.articleReducer.article
})

const styles = theme => ({
    card: {
      maxWidth: 750,
    },
    media: {
      height: 0,
      paddingTop: '106.25%', // 16:9
    },
    actions: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
      marginLeft: 'auto',
      [theme.breakpoints.up('sm')]: {
        marginRight: -8,
      },
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
});
  
class ArticleCard extends React.Component {
    state = { 
        expanded: false,
        isButtonDisabled: false
    };
  
    componentDidMount(){
      this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
      this.getArticleDetail();
        
    }

    handleExpandClick = () => {
      this.setState(state => ({ expanded: !state.expanded }));
    };

    editProfile = () => {
        console.log('hello')
    }

    getArticleDetail = (id) => {
        id = this.props.user.user.id;
        this.props.dispatch({type: ARTICLE_ACTIONS.FETCH_USER_ARTICLES, payload: id});
    }

    requestDelete = (id) =>{
      console.log('this is the article id,', id);
      const action = ({
        type: ARTICLE_ACTIONS.UPDATE_ARTICLE,
        payload: id
      })
      console.log('action:', action);
      this.props.dispatch(action);
      this.setState({
        isButtonDisabled: true
      });
    }

    render() {
        const { classes } = this.props;        
      return (
        <div >
         
            {this.props.articles.map((article, i) => 
            <div> 
              <br/>
                <Card key={i} className={classes.card}>
                <CardHeader
                  style={{ textDecoration: 'underline', backgroundColor:'#',  fontSize:'20px' }}
                  title={article.research_title}
                />
                <CardContent id="articleStatus">
                  <Typography style={{color:'#475c87', fontStyle: 'italic', fontSize:'20px'}}component="p">
                    Date Submitted: {article.date_posted}
                  </Typography>
                  { article.status === "rejected" &&  
                  <Typography style={{color:'#475c87', fontStyle: 'italic', fontSize:'20px'}} component="p">
                    Status: {article.status}

                  </Typography>
                  }
                </CardContent>
                <CardContent>
                  <Typography  style={{color:'#475c87', fontSize:'20px'}}> Institution Name: </Typography> 

                  <Typography style={{color:'black', fontStyle: 'italic', fontSize:'20px'}}> { article.institution_name } </Typography>

                </CardContent>
                { article.status === "rejected" &&  
                <CardContent>
                  <Typography  style={{color:'#A23645', fontSize:'25px'}}>
                
                    Reason article was rejected:</Typography> 
                    
                    <Typography style={{color:'black', fontStyle: 'italic', textDecoration: 'underline',  fontSize:'20px'}}>{article.admin_comment}</Typography>
                  
                  
                </CardContent>
                  }
                <CardActions className="actionButton">
                    <EditArticleModal article={article}/>
                    <IconButton variant="fab" color="secondary" disabled={this.state.isButtonDisabled} aria-label="Edit" onClick={ ()=>this.requestDelete(article.id) }>
                        <DeleteRoundedIcon/>
                    </IconButton>
                </CardActions>
              </Card>
            </div>
            )}
            
        </div>
      );
    }
}
  
  ArticleCard.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
//   export default withStyles(styles)(ArticleCard);
  export default compose(
      withStyles(styles),
      connect(mapStateToProps)
  )(ArticleCard);