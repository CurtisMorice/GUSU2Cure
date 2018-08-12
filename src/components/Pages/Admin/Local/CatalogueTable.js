import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { ADMIN_ACTIONS } from '../../../../redux/actions/adminActions';

//material ui
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';

import swal from 'sweetalert2';

// redux Store
const mapStateToProps = state => ({
    catalogue:state.adminReducer.approvedArticle,
})

const actionsStyles = theme => ({
    root: {
      flexShrink: 0,
      color: theme.palette.text.secondary,
      marginLeft: theme.spacing.unit * 2.5,
    },
  });

  class ApprovedArticleTable extends React.Component{
  
    handleFirstPageButtonClick = event => {
        this.props.onChangePage(event, 0);
      };

    // componentDidMount(){
    //         this.fetchNewArticles();
    // };

    // fetchNewArticles = () => {
    //     this.props.dispatch({type: ADMIN_ACTIONS.FETCH_APPROVED_ARTICLE});
    // };

    handleBackButtonClick = event => {
        this.props.onChangePage(event, this.props.page - 1);
    };

    handleNextButtonClick = event => {
        this.props.onChangePage(event, this.props.page + 1);
    };

    handleLastPageButtonClick = event => {
        this.props.onChangePage(
        event,
        Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
        );
    };


    render(){
        const { classes, count, page, rowsPerPage, theme } = this.props;

        return(
            <div className={classes.root}>
            
            <IconButton
              onClick={this.handleFirstPageButtonClick}
              disabled={page === 0}
              aria-label="First Page"
            >
              {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
              onClick={this.handleBackButtonClick}
              disabled={page === 0}
              aria-label="Previous Page"
            >
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
              onClick={this.handleNextButtonClick}
              disabled={page >= Math.ceil(count / rowsPerPage) - 1}
              aria-label="Next Page"
            >
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
              onClick={this.handleLastPageButtonClick}
              disabled={page >= Math.ceil(count / rowsPerPage) - 1}
              aria-label="Last Page"
            >
              {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
          </div>         
        );
    }
}

    ApprovedArticleTable.propTypes = {
        classes: PropTypes.object.isRequired,
        count: PropTypes.number.isRequired,
        onChangePage: PropTypes.func.isRequired,
        page: PropTypes.number.isRequired,
        rowsPerPage: PropTypes.number.isRequired,
        theme: PropTypes.object.isRequired,
    };

    const TablePaginationActionsWrapped = compose(connect(mapStateToProps),withStyles(actionsStyles, { withTheme: true }))(
        ApprovedArticleTable,
      );
      
    let counter = 0;
      
    const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    });

class CatalogueTable extends Component{
    state={
        value: 'Approved',
        page: 0,
        rowsPerPage: 5,
    }

    componentDidMount(){
        this.fetchApprovedArticles();
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };
    
    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    fetchApprovedArticles = () => {
        this.props.dispatch({type: ADMIN_ACTIONS.FETCH_APPROVED_ARTICLE});
    }

    deleteArticle = (id) => {
        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then((result) => {
            if (result.value) {
                console.log(id);
              this.props.dispatch({type: ADMIN_ACTIONS.DELETE_TARGET_ARTICLE, payload: id});
              swal(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            } else if (result.dismiss === swal.DismissReason.cancel) {
              swal(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
              )
            }
          })
    }

    render(){

        const { classes } = this.props;
        const { data, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.props.catalogue.length - page * rowsPerPage);

        return(
            <div>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell> Date Posted </TableCell>
                                <TableCell> Research Title </TableCell>
                                <TableCell> Research Type </TableCell>
                                <TableCell> Research Phase </TableCell>
                                <TableCell > Institution Name </TableCell>
                                <TableCell> Institution Website </TableCell>
                                <TableCell> Funding Source </TableCell>
                                <TableCell> Research Date </TableCell>
                                {/* <TableCell> Related Articles </TableCell> */}
                                <TableCell> User Posted </TableCell>
                                <TableCell> User Email </TableCell>
                                <TableCell> Delete Article </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.catalogue.map(article => {
                                return(
                                    <TableRow key={article.id} >
                                        <TableCell component="th" scope="row"> {article.date_posted.split('T')[0]} </TableCell>
                                        <TableCell component="th" scope="row"> {article.research_title} </TableCell>
                                        <TableCell component="th" scope="row"> {article.type} </TableCell>
                                        <TableCell component="th" scope="row"> {article.phase} </TableCell>
                                        <TableCell component="th" scope="row" > {article.institution_name} </TableCell>
                                        <TableCell component="th" scope="row"> {article.institution_url} </TableCell>
                                        <TableCell component="th" scope="row"> {article.funding_source} </TableCell>
                                        <TableCell component="th" scope="row"> {article.research_date} </TableCell>
                                        {/* <TableCell component="th" scope="row"> {article.related_articles} </TableCell> */}
                                        <TableCell component="th" scope="row"> {article.username} </TableCell>
                                        <TableCell component="th" scope="row"> {article.email} </TableCell>
                                        <TableCell component="th" scope="row"> 
                                            <Tooltip title="Delete">
                                                <IconButton aria-label="Delete" color="secondary" onClick={()=>this.deleteArticle(article.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>

                    </Table>
                </Paper>
            </div>
        )
    }
}

CatalogueTable.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default compose(withStyles(styles),connect(mapStateToProps))(CatalogueTable);