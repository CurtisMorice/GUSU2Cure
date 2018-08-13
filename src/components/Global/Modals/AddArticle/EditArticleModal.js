import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {ARTICLE_ACTIONS} from '../../../../redux/actions/articleActions';
import {ADMIN_ACTIONS} from '../../../../redux/actions/adminActions';
import { connect } from 'react-redux';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { renderComponent } from 'recompose';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import {USER_ACTIONS} from '../../../../redux/actions/userActions';
import ResearchPhaseSelect from './ResearchPhaseSelect';
import ResearchTypeSelect from './ResearchTypeSelect';
 

const mapStateToProps = state => ({
    user: state.user,
    // articles: state.articleReducer.article,
    research_type: state.articleReducer.research_type,
    research_phase: state.articleReducer.research_phase
  });

class EditArticle extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          open: false,
          updatedArticle: {
            }
        }
    }

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({ type: ARTICLE_ACTIONS.FETCH_RESEARCH_TYPE});
        this.props.dispatch({ type: ARTICLE_ACTIONS.FETCH_RESEARCH_PHASE});
        // this.props.dispatch({ type: ADMIN_ACTIONS.FETCH_APPROVED_ARTICLE})
        if (!this.props.user.isLoading && this.props.user.user === null) {
          // this.props.history.push('home');
        }
      
      }

      // componentDidUpdate(prevProps) {
      //   if(this.props.research_phase !== prevProps.research_phase){
      //     this.setState({
      //       ...this.state,
      //       research_phase: this.props.research_phase
      //     })
      //     console.log('this.state:', this.state);
          
      //   }
      //   else if(this.props.research_type !== prevProps.research_type){
      //     this.setState({
      //       ...this.state,
      //       research_type: this.props.research_type
      //     })
      //     console.log('this.state:', this.state);
      //   }
      // }

handleClickOpen = () => {
    this.setState({ 
      open: true,
      updatedArticle: {
        user_id: this.state.user_id,
        research_date: this.props.research_date,
        research_title: this.props.research_title,
        research_type: this.props.research_type,
        research_phase: this.props.research_phase,
        institution_name: this.props.institution_name,
        institution_url: this.props.institution_url,
        funding_source: this.props.funding_source,
        related_articles: [this.props.related_articles],
        user_story: this.props.user_story,
        summary: this.props.summary,
        brief_description: this.props.brief_description,
        address: this.props.address,
        status: this.props.status
      } 
    });
};

handleClose = () => {
    this.setState({ open: false });
};

handleUpdate = (propertyName) => (event) => {
    console.log('event happened', event.target.value);
    this.setState({
        updatedArticle: {
            ...this.state.updatedArticle,
            status: 4,
            [propertyName]: event.target.value
        }
    })
    console.log('state:', this.state);   
}

updateArticle = () => {
    console.log('in updateResource');
    const action = ({
      type: ARTICLE_ACTIONS.UPDATE_ARTICLE,
      payload: this.state.updatedArticle
    })
    console.log('action:', action);
    
    this.props.dispatch(action);
    this.handleClose();
  }


  render() {
    return (
      <div>
        <IconButton onClick={this.handleClickOpen}>
        <Icon color="primary">edit_icon</Icon>
        </IconButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Update the article below:</DialogTitle>
          <DialogContent>
          <label>Research Type</label>
          <ResearchTypeSelect article={this.props.article} research_type={this.props.research_type}/>
          <label>Research Phase</label>
          <ResearchPhaseSelect article={this.props.article} research_phase={this.props.research_phase}/>
             {JSON.stringify(this.props.article)} 
            <TextField 
              type="date"
              InputLabelProps={{ shrink: true, }}
              value={this.state.updatedArticle.research_date} 
              defaultValue={this.props.article.research_date}
              onChange={this.handleUpdate('research_date')}
              name="research_date"
              autoFocus
              margin="dense"
              label="Research Date"
              fullWidth
              
            />
            <TextField 
              value={this.state.updatedArticle.research_title} 
              defaultValue={this.props.article.research_title}
              onChange={this.handleUpdate('research_title')}
              multiline
              rowsMax="5"
              name="research_title"
              autoFocus
              margin="dense"
              label="Research Title"
              fullWidth
            />
            <TextField 
              value={this.state.updatedArticle.institution_name} 
              defaultValue={this.props.article.institution_name}
              onChange={this.handleUpdate('institution_name')}
              multiline
              rowsMax="5"
              name="institution_name"
              autoFocus
              margin="dense"
              label="Institution Name"
              fullWidth
            />
            <TextField 
              value={this.state.updatedArticle.institution_url} 
              defaultValue={this.props.article.institution_url}
              onChange={this.handleUpdate('institution_url')}
              multiline
              rowsMax="5"
              name="institution_url"
              autoFocus
              margin="dense"
              label="Institution Website"
              fullWidth
            />
            <TextField 
              value={this.state.updatedArticle.funding_source} 
              defaultValue={this.props.article.funding_source}
              onChange={this.handleUpdate('funding_source')}
              multiline
              rowsMax="5"
              name="funding_source"
              autoFocus
              margin="dense"
              label="Funding Source"
              fullWidth
            />
            <TextField 
              value={this.state.updatedArticle.related_articles} 
              defaultValue={this.props.article.related_articles}
              onChange={this.handleUpdate('related_articles')}
              multiline
              rowsMax="5"
              name="related_articles"
              autoFocus
              margin="dense"
              label="Related Articles"
              fullWidth
            />
            <TextField 
              value={this.state.updatedArticle.brief_description} 
              defaultValue={this.props.article.brief_description}
              onChange={this.handleUpdate('brief_description')}
              multiline
              rowsMax="5"
              name="brief_description"
              autoFocus
              margin="dense"
              label="Brief Description"
              fullWidth
              multiline
            />
            <TextField 
              value={this.state.updatedArticle.summary} 
              defaultValue={this.props.article.summary}
              onChange={this.handleUpdate('summary')}
              multiline
              rowsMax="5"
              name="summary"
              autoFocus
              margin="dense"
              label="Summary"
              fullWidth
              multiline
            />
            <TextField 
              value={this.state.updatedArticle.user_story} 
              defaultValue={this.props.article.user_story}
              onChange={this.handleUpdate('user_story')}
              multiline
              rowsMax="5"
              name="user_story"
              autoFocus
              margin="dense"
              label="User Story"
              fullWidth
              multiline
            />
            
          </DialogContent>
          <DialogActions>
          <Button onClick={this.updateArticle} variant ="contained" color="primary">
              Edit Article
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  } 
}

export default connect(mapStateToProps)(EditArticle);