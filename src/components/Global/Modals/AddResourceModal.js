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
            resource: {
            name: '',
            url: '',
            summary: '',
            date_created: ''
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
            <Button className={classes.button} onClick={this.handleClickOpen} variant="contained" color="primary">Add a new resource</Button>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{"Register"}</DialogTitle>
              {this.state.message}
              <form onSubmit={this.addResource}>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                <label htmlFor="name">
                  Name: <input type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleInputChangeFor('name')}/>
                </label>
                <label htmlFor="url">
                  Url: <input type="text"
                    name="url"
                    value={this.state.url}
                    onChange={this.handleInputChangeFor('url')}/>
                </label>
                <label htmlFor="summary">
                  Summary: <input type="text"
                    name="summary"
                    value={this.state.summary}
                    onChange={this.handleInputChangeFor('summary')}/>
                </label>
                <label htmlFor="date_created">
                  Date Created: <input type="text"
                    name="date_created"
                    value={this.state.date_created}
                    onChange={this.handleInputChangeFor('date_created')}/>
                </label>
              
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <input type="submit" value="Add Resource" color="primary" autoFocus/>
                <input onClick={this.handleClose}  type="button" value="Cancel"/> 
              </DialogActions>
              </form>
            </Dialog>
          </div>
        );
      }
    }
    
    export default compose(connect(mapStateToProps), withStyles(styles))(AddResourceModal);
