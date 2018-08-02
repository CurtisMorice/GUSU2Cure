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
      paddingTop: '56.25%', // 16:9
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
    };
  
    componentDidMount(){
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
        console.log(id);
        this.props.dispatch({type: ARTICLE_ACTIONS.FETCH_ARTICLES, payload: id});
    }

    render() {
        const { classes } = this.props;        
      return (
        <div>
            {this.props.articles.map((detail) => 
                <Card className={classes.card}>
                <CardHeader
                //   avatar={
                //     <Avatar aria-label="Recipe" className={classes.avatar}>
                //       img
                //     </Avatar>
                //   }
                //   action={
                //     <IconButton>
                //       <MoreVertIcon />
                //     </IconButton>
                //   }
                  title={detail.research_title}
                />
                <CardContent id="articleStatus">
                  <Typography component="p">
                    Date Submitted: {detail.date_posted}
                  </Typography>
                  <Typography component="p">
                    Status: {detail.status}
                  </Typography>
                </CardContent>
                {/* <CardActions className={classes.actions} disableActionSpacing>
                    <Typography>
                        Article
                    </Typography>
                  <IconButton aria-label="Add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="Share">
                    <ShareIcon />
                  </IconButton>
                  <IconButton
                    className={classnames(classes.expand, {
                      [classes.expandOpen]: this.state.expanded,
                    })}
                    onClick={this.handleExpandClick}
                    aria-expanded={this.state.expanded}
                    aria-label="Show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography>
                        {this.props.user.user.bio}
                    </Typography>
                  </CardContent>
                </Collapse> */}
                <CardActions className="actionButton">
                    <IconButton variant="fab" color="primary" aria-label="Edit">
                        <EditIcon/>
                    </IconButton>
                    <IconButton variant="fab" color="secondary" aria-label="Edit" >
                        <DeleteRoundedIcon/>
                    </IconButton>
                    {/* <DeleteArticle /> */}
                </CardActions>
              </Card>
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