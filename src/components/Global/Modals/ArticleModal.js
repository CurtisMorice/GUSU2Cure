import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { DialogContentText } from '../../../../node_modules/@material-ui/core';


const mapStateToProps = state => ({
    adminReducer :state.adminReducer.newArticles,
})


class ArticleModal extends React.Component {
  state = {
    open: false,
    scroll: 'paper',
  };

  handleClickOpen = scroll => () => {
    this.setState({ open: true, scroll });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
      return(
      <div>
        <Button onClick={this.handleClickOpen('paper')}>More Info</Button>
        {/* <Button onClick={this.handleClickOpen('body')}></Button> */}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          scroll={this.state.scroll}
          aria-labelledby="scroll-dialog-title"
        >
       
          <DialogTitle id="scroll-dialog-title">More Info</DialogTitle>
          {/* {JSON.stringify(this.props.adminReducer)} */}

          <DialogContent >
          {this.props.adminArticle &&
            <DialogContentText > 

                <li> <em><strong>Type:</strong></em> {this.props.adminArticle.type}</li><br/>

                <li> <em><strong>Phase:</strong></em> {this.props.adminArticle.phase} </li><br/>

                <li> <em><strong>Institutions Name:</strong></em> {this.props.adminArticle.institution_name} </li><br/>

                <li><em> <strong>URL:</strong></em> {this.props.adminArticle.institution_url} </li><br/>

                <li> <em><strong>Funding Source:</strong></em> {this.props.adminArticle.funding_source} </li><br/>

                <li> <em><strong>Research Date:</strong></em> {this.props.adminArticle.research_date} </li><br/>
              
            </DialogContentText>
            }
        </DialogContent>
  
          <DialogActions>
            <Button onClick={this.handleClose} color="primary"> Close </Button>
          </DialogActions>
        
        </Dialog>
      </div>
);
  }
}

export default connect(mapStateToProps)(ArticleModal);