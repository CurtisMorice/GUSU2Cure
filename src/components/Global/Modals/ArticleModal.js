import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from 'react-redux';
import { DialogContentText } from '@material-ui/core';


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

                <li><em> <strong>URL:</strong></em> <a style={{color:'rgb(51,102,187)'}} href={this.props.adminArticle.institution_url}>{this.props.adminArticle.institution_url}</a> </li><br/>

                <li> <em><strong>Funding Source:</strong></em> {this.props.adminArticle.funding_source} </li><br/>

                <li> <em><strong>Research Date:</strong></em> {this.props.adminArticle.research_date.split('T')[0]} </li><br/>

                <li><em><strong>Related Articles</strong></em> {this.props.adminArticle.related_articles.map((item, i)=> <a style={{color:'rgb(51,102,187)'}} key={i} href={item}><li key={i} style={{listStyleType:"none", marginLeft:"25px"}}>{item}</li></a>)}
            </li>
            </DialogContentText>
            }

            {this.props.article &&
            <DialogContentText >
            <li> <em><strong>Type:</strong></em> {this.props.article.type}</li><br/>

            <li> <em><strong>Phase:</strong></em> {this.props.article.phase} </li><br/>

            <li> <em><strong>Institutions Name:</strong></em> {this.props.article.institution_name} </li><br/>

            <li><em> <strong>URL:</strong></em> <a style={{color:'rgb(51,102,187)'}} href={this.props.article.institution_url}>{this.props.article.institution_url} </a></li><br/>

            <li> <em><strong>Funding Source:</strong></em> {this.props.article.funding_source} </li><br/>

            <li> <em><strong>Research Date:</strong></em> {this.props.article.research_date.split('T')[0]} </li><br/>

            <li><em><strong>Related Articles</strong></em> {this.props.article.related_articles.map((item, i)=> <a key={i} style={{color:'rgb(51,102,187)', marginLeft: '25px'}} href={item}>{i === 0 && <br/>}{item}<br/></a>)}
            </li>
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