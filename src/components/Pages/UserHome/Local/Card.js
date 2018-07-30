import React, { Component } from 'react';
import { connect } from 'react-redux';

//components

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
import { compose } from '../../../../../../../../Library/Caches/typescript/2.8/node_modules/@types/redux-logger/node_modules/redux';

//ReduxStore
const mapStateToProps = state => ({
    user: state.user
})

const styles = theme => ({
    card: {
      maxWidth: 400,
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
  
class ProfileCard extends React.Component {
    state = { 
        expanded: false,
        
    
    };
  
    componentDidMount(){
        this.getUserProfile();
    }

    handleExpandClick = () => {
      this.setState(state => ({ expanded: !state.expanded }));
    };

    getUserProfile = (id) => {
        id = this.props.user.user.id;
        console.log(id);
        // this.props.dispatch({type: , payload: id})
    }
  
    render() {
        const { classes } = this.props;        
      return (
        <div>
        {JSON.stringify(this.props.user.user.username)}
        {/* {this.props.user} */}

          <Card className={classes.card}>
            <CardHeader
              avatar={
                <Avatar aria-label="Recipe" className={classes.avatar}>
                  img
                </Avatar>
              }
            //   action={
            //     <IconButton>
            //       <MoreVertIcon />
            //     </IconButton>
            //   }
              title={this.props.user.user.username}
            //   subheader="September 14, 2016"
            />
            {/* <CardMedia
              className={classes.media}
              image="/static/images/cards/paella.jpg"
              title="Contemplative Reptile"
            /> */}
            <CardContent>
              <Typography component="p">
                Email: {this.props.user.user.email}
              </Typography>
              <Typography component="p">
                Contact: {this.props.user.user.contact_info}
              </Typography>
            </CardContent>
            <CardActions className={classes.actions} disableActionSpacing>
                <Typography>
                    User Bio
                </Typography>
              {/* <IconButton aria-label="Add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="Share">
                <ShareIcon />
              </IconButton> */}
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
                  Bio
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </div>
      );
    }
}
  
  ProfileCard.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
//   export default withStyles(styles)(ProfileCard);
  export default compose(
      withStyles(styles),
      connect(mapStateToProps)
  )(ProfileCard);