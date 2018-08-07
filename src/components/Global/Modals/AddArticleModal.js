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

import Map from '../../Pages/Landing/Local/Map/Map';

const mapStateToProps = state => ({
  user: state.user,
  mapReducer: state.mapReducer,
  articles: state.articleReducer.article,
  research_type: state.articleReducer.research_type,
  research_phase: state.articleReducer.research_phase
});

const styles = theme => ({
root: {
  width: '90%',
},
backButton: {
  marginRight: theme.spacing.unit,
},
instructions: {
  marginTop: theme.spacing.unit,
  marginBottom: theme.spacing.unit,
},
});

class AddArticleModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
          article: {},
          activeStep: 0,
          date_posted: '08/06/2018',
          research_date: '08/06/2018'
          
    }
  }
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  getSteps = () => {
    return ['Basic Information', 'Summary', 'Confirm'];
  }

  getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <div>
          <InputLabel htmlFor="research_phase-simple">Research Type</InputLabel>
          <Select
            value={this.state.research_type}
            onChange={this.handleInputChangeFor('research_type')}
            inputProps={{
            name: 'research_type',
            id: 'research_type-simple',
            }}
          >
            <MenuItem value="">
            <em>None</em>
            </MenuItem>
            {this.props.research_type.map(research_type => {
                return (
                    <MenuItem value={research_type.type}>{research_type.type}</MenuItem>
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
            <MenuItem value="">
            <em>None</em>
            </MenuItem>
            {this.props.research_phase.map(research_phase => {
                return (
                    <MenuItem value={research_phase.phase}>{research_phase.phase}</MenuItem>
                )
            })}
          </Select>
          <TextField 
            type="text"
            value={this.state.research_title}
            onChange={this.handleInputChangeFor('reasearch_title')}
            name="reasearch_title"
            autoFocus
            margin="dense"
            label="Research Title"
            fullWidth
            multiline
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
            // value={this.state.}
            onChange={this.handleInputChangeFor('address')}
            name="address"
            autoFocus
            margin="dense"
            label="Institution Address"
            fullWidth  
          />
          <TextField 
            type="date"
            value={this.state.date_posted}
            onChange={this.handleInputChangeFor('date_posted')}
            name="date_posted"
            autoFocus
            margin="dense"
            label="Date Published"
            fullWidth
            />
            </div>;
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
            label="Summary"
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
        </div>);
      default:
        return 'blah';
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

  handleNext = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1,
    });
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
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Add an article:"}</DialogTitle>
          <DialogContent>
            
          </DialogContent>
          <DialogActions>
          <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {this.state.activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>All steps completed</Typography>
              <Button onClick={this.handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>{this.getStepContent(activeStep)}</Typography>
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
          </DialogActions>
          </Dialog>
      </div>
    );
  }
}

AddArticleModal.propTypes = {
  classes: PropTypes.object,
};

export default compose(connect(mapStateToProps), withStyles(styles))(AddArticleModal);