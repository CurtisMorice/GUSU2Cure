import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import { connect } from 'react-redux';
import { compose } from 'recompose';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import {ARTICLE_ACTIONS} from '../../../../redux/actions/articleActions';
import {MAP_ACTIONS} from '../../../../redux/actions/mapActions';

import MapWrapper from '../../../Pages/Landing/Local/Map/MapWrapper';
import SearchBar from '../../../Pages/Landing/Local/SearchBar';
import axios from 'axios';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';

const mapStateToProps = state => ({
  user: state.user,
  mapReducer: state.mapReducer,
  articles: state.articleReducer.article,
  research_type: state.articleReducer.research_type,
  research_phase: state.articleReducer.research_phase
});

const styles = theme => ({
root: {
  width: '100%',
  maxWidth: 'none',
},
backButton: {
  marginRight: theme.spacing.unit,
},
instructions: {
  marginTop: theme.spacing.unit,
  marginBottom: theme.spacing.unit,
},
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AddArticleModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
              user_id: '',
              date_posted: '',
              research_date: '',
              research_title: '',
              research_type: '',
              research_phase: '',
              institution_name: '',
              institution_url: '',
              funding_source: '',
              related_articles: '',
              brief_description: '',
              summary: '',
              user_story: '',
              address: '',
              lat: '',
              lng: '',
              activeStep: 0, 
              open: false,
      }
    }

    googleApiCall = (event) => {
      event.preventDefault();
      console.log('googleApiCall');
      console.log('searchAddress:', this.state.address);
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.address}&key=AIzaSyD9e9e4rYBfPVZsPiKNBvQ8Ciu5yGPlfq8`
      console.log('url:', url);
      axios.get(url)
      .then(async(response) => {
        console.log('response', response)
          const latLng = {...response.data.results}
          console.log('latLng:', latLng);
          await this.setState({
            ...this.state,
            lat: latLng[0].geometry.location.lat,
            lng: latLng[0].geometry.location.lng,
          });
          console.log('this.state', this.state);
          
      })
      .catch(err => {
      console.log('in googleApicall',err);                     
      });
    }

    addLocation = () => {
      const body = {
        address:this.state.address
      }
    }

    addArticle = (event) => {
        event.preventDefault();
        // if (this.state.user.user.type === 'admin') {
            const body = {
                user_id: this.state.user_id,
                research_date: this.state.research_date,
                research_title: this.state.research_title,
                research_type: this.state.research_type,
                research_phase: this.state.research_phase,
                institution_name: this.state.institution_name,
                institution_url: this.state.institution_url,
                funding_source: this.state.funding_source,
                related_articles: [this.state.related_articles],
                user_story: this.state.user_story,
                summary: this.state.summary,
                brief_description: this.state.brief_description,
                address: this.state.address,
                lat: this.state.lat,
                lng: this.state.lng
            };
            console.log('body:',body);
            const action = ({
                type: ARTICLE_ACTIONS.POST_ARTICLE,
                payload: body
            })
            this.props.dispatch(action);
            this.handleClose();
        // }
    }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.handleReset();
  };


  getSteps = () => {
    return ['Basic Information', 'Summary', 'Confirm'];
  }

  handleInputChangeFor = propertyName => (event) => {
      console.log('user id', this.props.user.user.id);  
      if(propertyName === 'research_type'){
        console.log('research type');
        
      }
      else {
        this.setState({
          ...this.state,
          [propertyName]: event.target.value,
          user_id: this.props.user.user.id,
    });
      }
      
  }

  getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <div>
            <InputLabel htmlFor="research_phase-simple">Research Type</InputLabel>
            <Select
              value={this.state.research_type}
              onChange={this.handleInputChangeFor('research_type')}
              inputProps={{
              name: 'research_type',
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

          <InputLabel htmlFor="research_phase-simple">Research Phase</InputLabel>
          <Select
            value={this.state.research_phase}
            onChange={this.handleInputChangeFor('research_phase')}
            inputProps={{
            name: 'research_phase',
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
          <TextField 
            type="text"
            value={this.state.research_title}
            onChange={this.handleInputChangeFor('research_title')}
            name="research_title"
            autoFocus
            margin="dense"
            label="Research Title"
            fullWidth
            multiline
          />
          <TextField 
            type="date"
            value={this.state.research_date}
            onChange={this.handleInputChangeFor('research_date')}
            name="research_date"
            autoFocus
            margin="dense"
            label="Date Published"
            fullWidth
            InputLabelProps={{ shrink: true, }}
            />
          <TextField 
            type="text"
            value={this.state.institution_name}
            onChange={this.handleInputChangeFor('institution_name')}
            name="institution_name"
            autoFocus
            margin="dense"
            label="Institution Name"
            fullWidth  
          />
          <TextField
            type="text"
            value={this.state.institution_url}
            onChange={this.handleInputChangeFor('institution_url')}
            name="institution_url"
            autoFocus
            margin="dense"
            label="Institution Website"
            fullWidth  
          />
          <TextField
            type="text"
            value={this.state.address}
            onChange={this.handleInputChangeFor('address')}
            name="address"
            autoFocus
            margin="dense"
            label="Institution Address"
            fullWidth  
          />
          <TextField
            type="text"
            value={this.state.funding_source}
            onChange={this.handleInputChangeFor('funding_source')}
            name="funding_source"
            autoFocus
            margin="dense"
            label="Funding Source"
            fullWidth  
          />
        </div>);
      case 1:
        return (
        <div>
          <TextField 
            type="text"
            value={this.state.brief_description}
            onChange={this.handleInputChangeFor('brief_description')}
            name="brief_description"
            autoFocus
            margin="dense"
            label="Brief Description"
            fullWidth
            multiline
            />
            <TextField 
            type="text"
            value={this.state.summary}
            onChange={this.handleInputChangeFor('summary')}
            name="summary"
            autoFocus
            margin="dense"
            label="Article Summary"
            fullWidth
            multiline
            />
            <TextField 
            type="text"
            value={this.state.user_story}
            onChange={this.handleInputChangeFor('user_story')}
            name="user_story"
            autoFocus
            margin="dense"
            label="User Story"
            fullWidth
            multiline
            />
            <TextField 
            type="text"
            value={this.state.related_articles}
            onChange={this.handleInputChangeFor('related_articles')}
            name="related_articles"
            autoFocus
            margin="dense"
            label="Related Articles"
            fullWidth
            multiline
            />
        </div>);
      case 2:
        return (
        <div>
          <ul>
          <li>Title: {this.state.research_title}</li>
          <li>Date Published: {this.state.research_date}</li>
          <li>Research Type: {this.state.research_type}</li>
          <li>Research Phase: {this.state.research_phase}</li>
          <li>Institution Name: {this.state.institution_name}</li>
          <li>Institution Url: {this.state.institution_url}</li>
          <li>Institution Address: {this.state.address}</li>
          <li>Brief Description: {this.state.brief_description}</li>
          <li>Article Summary: {this.state.summary}</li>
          <li>User Story: {this.state.user_story}</li>
          </ul>
          <Paper>
          <MapWrapper />
          </Paper>
        </div>);
      
      default:
        return 'error';
    }
  }

  handleInputChangeFor = propertyName => (event) => {
      console.log('user id', this.props.user.user.id);
      this.setState({
          [propertyName]: event.target.value,
          user_id: this.props.user.user.id,
      
      });
      console.log('this.state:', this.state);
  }

  handleNext = (event) => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1,
    });
    if (this.state.activeStep === 0){
      this.googleApiCall(event);
    }
    
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const { classes } = this.props;
    const steps = this.getSteps();
    const { activeStep } = this.state;
    return (
      <div>
        <Button onClick={this.handleClickOpen} variant="contained" color="primary">Add Article</Button>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
        <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                Add an article:
              </Typography>
            </Toolbar>
          </AppBar>
          <DialogTitle id="alert-dialog-title">Add an article:</DialogTitle>
          <DialogContent>
          <div className={classes.root}>
          <br/>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <br/>
        <br/>
        <div>
          {this.state.activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>Thank you for submitting your article</Typography>
              <Button color="primary" variant="contained" onClick={this.addArticle}>Done</Button>
            </div>
          ) : (
            <div>
              <div className={classes.instructions}>{this.getStepContent(activeStep)}</div>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button variant="contained" color="primary" onClick={this.handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
      
              </div>
            </div>
          )}
        </div>
      </div>
          </DialogContent>
           </Dialog>
      </div>
    );
  }
}

AddArticleModal.propTypes = {
  classes: PropTypes.object,
};

export default compose(connect(mapStateToProps), withStyles(styles))(AddArticleModal);