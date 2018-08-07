import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

import { LOGIN_ACTIONS } from '../../../redux/actions/loginActions';
import {RESOURCE_ACTIONS} from '../../../redux/actions/resourceActions';
import { triggerLogin, formError, clearError, formError2 } from '../../../redux/actions/loginActions';
import Icon from '@material-ui/core/Icon';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const mapStateToProps = state => ({
    user: state.user,
    resources: state.resourceReducer.resource
})

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    flex: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing.unit,
    },
    rightIcon: {
        marginRight: theme.spacing.unit,
    },
    
    });

class AddResourceModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            resource: {
            name: '',
            url: '',
            summary: '',
            date_created: '',
            }
        }
    }
    addResource = (event) => {
        event.preventDefault();
        // if (this.state.user.user.type === 'admin') {
            const body = {
            name: this.state.name,
            url: this.state.url,
            summary: this.state.summary,
            date_created: this.state.date_created
            };
            console.log('body:',body);
            const action = ({
                type: RESOURCE_ACTIONS.POST_RESOURCE,
                payload: body
            })
            this.props.dispatch(action);
            this.handleClose();
        // }
    }
        
        handleInputChangeFor = propertyName => (event) => {
            this.setState({
                [propertyName]: event.target.value,
            });
        }
    
        handleClickOpen = () => {
            this.setState({ open: true });
          };
        
          handleClose = () => {
            this.setState({ open: false });
          };
    
      render() {
        const { classes } = this.props;
        return (
          <div>
            <Button className={classes.button} onClick={()=>this.handleClickOpen} variant="contained" color="primary">Add a new resource</Button>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{"Add a new resource:"}</DialogTitle>
              {this.state.message}
              <form onSubmit={this.addResource}>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                <TextField 
                    type="text"
                    value={this.state.name}
                    onChange={this.handleInputChangeFor('name')}
                    name="name"
                    autoFocus
                    margin="dense"
                    label="Name"
                    fullWidth
                    multiline
                    />
                <TextField 
                    type="text"
                    value={this.state.url}
                    onChange={this.handleInputChangeFor('url')}
                    name="url"
                    autoFocus
                    margin="dense"
                    label="Url"
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
                    type="date"
                    value={this.state.date_created}
                    onChange={this.handleInputChangeFor('date_created')}
                    name="date_created"
                    autoFocus
                    margin="dense"
                    // label="Date Created"
                    fullWidth  
                    />
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button type="submit" value="Add Resource" color="primary" variant="contained" autoFocus>Add</Button>
                <Button onClick={this.handleClose}  type="button" value="Cancel">Cancel</Button>
              </DialogActions>
              </form>
            </Dialog>
          </div>
        );
      }
    }
    
    export default compose(connect(mapStateToProps), withStyles(styles))(AddResourceModal);
