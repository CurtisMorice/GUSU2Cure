import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

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


import MapWrapper from './Map/MapWrapper';
import axios from 'axios';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import swal from 'sweetalert2'; 
import './AddArticleModal';


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

swal2container: {
  zIndex: 2147483647,
}


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
              lat: 0,
              lng: 0,
              activeStep: 0, 
              open: false,
      }
    }

    async componentDidUpdate(prevProps){
      if (prevProps.research_type !== this.props.research_type){
        await this.setState({...this.state, research_type_array: this.props.research_type})
      }
      if (prevProps.research_phase !== this.props.research_phase){
        await this.setState({...this.state, research_phase_array: this.props.research_phase})
        
      }
      console.log('this.state:', this.state);
      
    }

    componentDidMount(){
      // this.setState({...this.state, research_type_array: this.props.research_type})
      console.log('this.props:', this.props);
      
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
      if(propertyName === 'research_type'){        
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
          <li>Research Type: {this.props.research_type[this.state.research_type-1].type}</li>
          <li>Research Phase: {this.props.research_phase[this.state.research_phase-1].phase}</li>
          <li>Institution Name: {this.state.institution_name}</li>
          <li>Institution Url: {this.state.institution_url}</li>
          <li>Institution Address: {this.state.address}</li>
          <li>Brief Description: {this.state.brief_description}</li>
          <li>Article Summary: {this.state.summary}</li>
          <li>User Story: {this.state.user_story}</li>
          </ul>
          <div style={{height: `20%`, width:`50%`, justifyContent: `center`}}>
          <MapWrapper initialCenter={{lat:this.state.lat, lng: this.state.lng}} />
          </div>
        </div>);
      
      default:
        return 'error';
    }
  }

  handleInputChangeFor = propertyName => (event) => {
      this.setState({
          [propertyName]: event.target.value,
          user_id: this.props.user.user.id,
      });
  }



  handleNext = (event) => {
    const { activeStep } = this.state;
    if( this.state.activeStep === 0) {   
    if(
    this.state.research_title === '' ||
    this.props.research_type === 0 ||
    this.props.research_phase === 0 ||
    this.state.institution_name === '' ||
    this.state.institution_url === '' ||
    this.state.funding_source ==='') {
    swal({
        type: 'warning',
        title: 'Missing Input',
        text: 'Please Fill In ALL Fields!',
      
      })    
        }else
            this.setState({
              activeStep: activeStep + 1,
            });
            if (this.state.activeStep === 0){
              this.googleApiCall(event);
            }
          }
          else if( this.state.activeStep === 1) {   
            if(this.state.brief_description === '' ||
            this.state.summary ==='') {
              swal({
                type: 'warning',
                title: 'Missing Input',
                text: 'Must have Brief Description and Article Summary!',
              
              }) 

            } 
            else
            this.setState({
              activeStep: activeStep + 1,
            });
            if (this.state.activeStep === 0){
              this.googleApiCall(event);
            }
          }
          else if( this.state.activeStep === 2) {  
            this.setState({
              activeStep: activeStep + 1,
            });
          }
        }
  

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

  fillForm = () => {
    this.setState({
      ...this.state,
      user_id: '',
              research_date: '2018/08/03',
              research_title: 'Induced Pluripotent Stem Cell Therapies for Cervical Spinal Cord Injury',
              research_type: 3,
              research_phase: 3,
              institution_name: 'Department of Neurosurgery, Stanford University School of Medicine',
              institution_url: 'http://med.stanford.edu/neurosurgery.html',
              funding_source: 'National Institute of Health',
              related_articles: 'https://www.nih.gov/about-nih/what-we-do/budget',
              brief_description: 'This research discusses a new type of therapy for certical level spinal cord injuries',
              summary: 'Cervical-level injuries account for the majority of presented spinal cord injuries (SCIs) to date. Despite the increase in survival rates due to emergency medicine improvements, overall quality of life remains poor, with patients facing variable deficits in respiratory and motor function. Therapies aiming to ameliorate symptoms and restore function, even partially, are urgently needed. Current therapeutic avenues in SCI seek to increase regenerative capacities through trophic and immunomodulatory factors, provide scaffolding to bridge the lesion site and promote regeneration of native axons, and to replace SCI-lost neurons and glia via intraspinal transplantation. Induced pluripotent stem cells (iPSCs) are a clinically viable means to accomplish this; they have no major ethical barriers, sources can be patient-matched and collected using non-invasive methods. ',
              user_story: 'If this treatment is found to be effective, it could help a lot of people like me who have cervical level spinal cord injury.',
              address: '300 Pasteur Dr, Palo Alto, CA 94304',
              lat: 0,
              lng: 0,
    })
  }

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
              <Typography className={classes.instructions}><h1>Thank you for submitting your article. The administrator will review your submission before accepting.</h1></Typography>
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
                {this.state.activeStep === 0 && <Button onClick={this.fillForm}>
                  
                </Button>}
      
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