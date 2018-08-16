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
import FormHelperText from '@material-ui/core/FormHelperText';


const mapStateToProps = state => ({
    user: state.user,
    articles: state.articleReducer.article,
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
     

handleClickOpen = (article) => {
    this.setState({ 
      open: true,
      updatedArticle: {
        id: article.id,
        user_id: this.props.user.user.id,
        research_date: article.research_date,
        research_title: article.research_title,
        institution_name: article.institution_name,
        institution_url: article.institution_url,
        funding_source: article.funding_source,
        related_articles: article.related_articles,
        user_story: article.user_story,
        summary: article.summary,
        brief_description: article.brief_description,
        status: article.status
      } 
    });    
};

handleClose = () => {
    this.setState({ open: false });
};

handleUpdate = (propertyName) => async (event) => {
    await this.setState({
        updatedArticle: {
            ...this.state.updatedArticle,
            [propertyName]: event.target.value
        }
    })    
}

postQuasiArticle = () => {
  const action = ({
    type: ARTICLE_ACTIONS.POST_QUASI_ARTICLE,
    payload: this.state.updatedArticle
  })
  this.props.dispatch(action);
  this.handleClose();
}


  render() {
    return (
      <div>
        {this.props.article.status !== 'edit-review'?
        <IconButton onClick={() => this.handleClickOpen(this.props.article)}>
        <Icon color="primary">edit_icon</Icon>
        </IconButton>:<IconButton onClick={() => this.handleClickOpen(this.props.article)} disabled>
        <Icon color="primary">edit_icon</Icon>
        </IconButton> 
        }
        
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Update the article below:</DialogTitle>
          <DialogContent>
          <InputLabel htmlFor="research_phase-simple">Current Research Type: {this.props.article.type}</InputLabel>
            <br/>
            Update to: <Select
              value={this.state.updatedArticle.type}
              onChange={this.handleUpdate('type')}
              inputProps={{
              name: 'type',
              id: 'research_type-simple',
              }} 
            >
            <MenuItem>
            <em>None</em>
            </MenuItem>
            {this.props.research_type.map((research_type, i) => {
                return (

                    <MenuItem key={i} value={research_type.id}>{research_type.type}</MenuItem>
                )
            })}
          </Select> 
       <br/>
       <br/>


          <InputLabel htmlFor="research_phase-simple">Current Research Phase: {this.props.article.phase}</InputLabel>
          <br/>
          Update to: <Select
            value={this.state.updatedArticle.phase}
            onChange={this.handleUpdate('phase')}
            inputProps={{
            name: 'phase',
            id: 'research_phase-simple',
            }} 
          > 
            <MenuItem>
            <em>None</em>
            </MenuItem>
            {this.props.research_phase.map((research_phase, i) => {
              return (
                  <MenuItem key={i} value={research_phase.id}>{research_phase.phase}</MenuItem>
              )
            })}
          </Select> 
          <br/>
          <br/>

          <InputLabel htmlFor="research_date-simple">Current Research Date: {(this.props.article.research_date)}</InputLabel>
            <TextField 
              type="date"
              InputLabelProps={{ shrink: true, }}
              value={this.state.updatedArticle.research_date} 
              // defaultValue={this.props.article.research_date}
              onChange={this.handleUpdate('research_date')}
              name="research_date"
              autoFocus
              margin="dense"
              label="Update to:"
              fullWidth
              
            />
            <TextField 
              value={this.state.updatedArticle.research_title} 
              // defaultValue={this.props.article.research_title}
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
              // defaultValue={this.props.article.institution_name}
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
              // defaultValue={this.props.article.institution_url}
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
              // defaultValue={this.props.article.funding_source}
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
              // defaultValue={this.props.article.related_articles} 
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
              // defaultValue={this.props.article.brief_description}
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
              // defaultValue={this.props.article.summary}
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
              // defaultValue={this.props.article.user_story}
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
          <Button onClick={this.postQuasiArticle} variant ="contained" color="primary">
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