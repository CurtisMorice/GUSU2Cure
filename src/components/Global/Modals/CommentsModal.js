import React from 'react';
import {connect} from 'react-redux';

//Actions brought in From the Actions!
import { ADMIN_ACTIONS } from '../../../redux/actions/adminActions';

//Imports for form modal
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import swal from 'sweetalert2';



const mapStateToProps = state => ({
  adminReducer :state.adminReducer.newArticles,
})

class CommentsModal extends React.Component {
  state = {
    open: false,
    rejected: 3,
    comments:'',
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleCommentsChange = propertyName => (event) => { 
    console.log('handle change for Comments in COmMeNTS Modal', event.target.value);
    this.setState({
      ...this.state,
      [propertyName]: event.target.value,
    })
  };

  rejectNewArticle = (id) => {
    this.handleClose();
    let rejected = this.state.rejected;
    let comments = this.state.comments;
    let rejectedObj = { id: id, rejected: rejected , comments: comments };
    console.log('rejectNew Article PAYLOAD', rejectedObj)
    
    swal({
      title: 'Please Confirm Change',
      text: 'Are you sure you want to reject this article?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
      reverseButtons: true 
    }).then((result)=>{
        if(result.value){
        const action = ({
         type: ADMIN_ACTIONS.REJECTED_ARTICLE,
         payload:rejectedObj
     });
     
     this.props.dispatch(action);
     swal(
      'Rejected!',
      'That file has been Rejected.',
      'success'
    )
  } else if (result.dismiss === swal.DismissReason.cancel) {
    swal(
    'Cancelled',
    'Rejection has been stopped',
    'error'
  )
}
    })
}


  render() {
    return (
      <div>
        <Tooltip id="rejected" title="Rejected"> 
                          <IconButton aria-label="Reject" style={{color:'#bf5754'}}  onClick={this.handleClickOpen}> 
                           <i className="material-icons" >
                            thumb_down
                           </i>
                          </IconButton>
                         </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Improvement Needed</DialogTitle>
          <DialogContent>
            <DialogContentText>
          Stated Below is the reason for the rejection.
            </DialogContentText>
            <TextField
              type="text"
              autoFocus
              margin="dense"
              value={this.state.comments}
            onChange={this.handleCommentsChange('comments')}
            inputProps={{
            name: 'comments',
            }}
              id="name"
              label="comments"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={()=> this.rejectNewArticle(this.props.adminArticle.id)} color="primary">
              Send to User
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default connect(mapStateToProps)(CommentsModal);