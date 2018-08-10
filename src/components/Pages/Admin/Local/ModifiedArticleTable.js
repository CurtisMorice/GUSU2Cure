import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { ADMIN_ACTIONS } from '../../../../redux/actions/adminActions';

import PropTypes from 'prop-types';
import { withStyles} from '@material-ui/core/styles';

//Table Imports
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
import { Typography } from '../../../../../node_modules/@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
//components
import swal from 'sweetalert2';


const mapStateToProps = state => ({
    adminReducer :state.adminReducer.newArticles,
})

    
    const actionsStyles = theme => ({
        root: {
          flexShrink: 0,
          color: theme.palette.text.secondary,
          marginLeft: theme.spacing.unit * 2.5,
        },
      });
    
      class ModifiedArticleTable extends React.Component{
        
        handleFirstPageButtonClick = event => {
            this.props.onChangePage(event, 0);
          };
    

        componentDidMount(){
            this.fetchModifiedArticles();
          
        }
    
        fetchModifiedArticles = () => {
            console.log('hello, is it me your looking for ');
            this.props.dispatch({type: ADMIN_ACTIONS.FETCH_MODIFIED_ARTICLE});
        }
      
    
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
    
    ModifiedArticleTable.propTypes = {
            classes: PropTypes.object.isRequired,
            count: PropTypes.number.isRequired,
            onChangePage: PropTypes.func.isRequired,
            page: PropTypes.number.isRequired,
            rowsPerPage: PropTypes.number.isRequired,
            theme: PropTypes.object.isRequired,
        };
    
        const TablePaginationActionsWrapped = compose(connect(mapStateToProps),withStyles(actionsStyles, { withTheme: true }))
        (ModifiedArticleTable,
        );
          
          let counter = 0;
          function createData(name, calories, fat) {
            counter += 1;
            return { id: counter, name, calories, fat };
          }
          
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
          
          class ModifiedArticleTableBody extends React.Component {
            constructor(props) {
              super(props);
          
              this.state = {
                page: 0,
                rowsPerPage: 5,
                rejected: 3,
                approved: 2,
              };
            }
          
            handleChangePage = (event, page) => {
              this.setState({ page });
            };
          
            handleChangeRowsPerPage = event => {
              this.setState({ rowsPerPage: event.target.value });
            };
            fetchNewArticles = () => {
              console.log('hello, is it me your looking for ');
              this.props.dispatch({type: ADMIN_ACTIONS.FETCH_NEW_ARTICLE});
            }
            
            approveNewArticle = (id) => {   
              let approved = this.state.approved;
              let approvedObj = {approved: approved, id: id};
              swal({
                title: 'Please Confirm Change',
                text: 'Are you sure you want to approve this article?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'Cancel',
                reverseButtons: true }).then(()=>{
                const action = ({
                    type: ADMIN_ACTIONS.APPROVED_ARTICLE,
                    payload: approvedObj
                })
                this.props.dispatch(action);
              })
            }

              rejectNewArticle = (id) => {            
                let rejected = this.state.rejected;
                let rejectedObj = {rejected: rejected , id: id };
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
              const { classes } = this.props;
              const { rowsPerPage, page } = this.state;
              const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.props.adminReducer.length - page * rowsPerPage);
          
              return (
                <Paper className={classes.root}>
                  <div className={classes.tableWrapper}>
                  {/* {JSON.stringify(this.props.adminReducer)} */}
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="display3">Modified Articles</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                        <TableCell> Date Posted </TableCell>
                        <TableCell> Research Title </TableCell>
                        <TableCell> Research Type </TableCell>
                        <TableCell> Research Phase </TableCell>
                        <TableCell> Institution Name </TableCell>
                        <TableCell> Institution URL </TableCell>
                        <TableCell> Funding Source</TableCell>
                        <TableCell> Research Date </TableCell>
                        <TableCell> User Name </TableCell>
                        <TableCell> User Email </TableCell>
                        <TableCell> Approved </TableCell>
                        <TableCell> Rejected </TableCell>
                    </TableRow>
                </TableHead>
            <TableBody>
                        {this.props.adminReducer.map(newArticle => {
                          return (
                            <TableRow key={newArticle.id}>
    
                              <TableCell component="th" scope="row">{newArticle.date_posted}</TableCell>
                              <TableCell component="th" scope="row">{newArticle.research_title}</TableCell> 
                              <TableCell component="th" scope="row">{newArticle.type}</TableCell>
                              <TableCell component="th" scope="row">{newArticle.phase}</TableCell> 
                              <TableCell component="th" scope="row">{newArticle.institution_name}</TableCell>
                              <TableCell component="th" scope="row">{newArticle.institution_url}</TableCell>
                              <TableCell component="th" scope="row">{newArticle.funding_source}</TableCell>
                              <TableCell component="th" scope="row">{newArticle.research_date}</TableCell>
                              <TableCell component="th" scope="row">{newArticle.username}</TableCell>
                              <TableCell component="th" scope="row">{newArticle.email}</TableCell>
                              <TableCell> 
                              <Tooltip title="Approved">
                              <IconButton aria-label="Approved" color="primary" onClick={()=>this.approveNewArticle(newArticle.id)}>
                                <i className="material-icons">
                                  thumb_up
                                </i>
                              </IconButton>
                              </Tooltip> 
                            </TableCell>
                            <TableCell> 
                              <Tooltip id="rejected" title="Rejected">
                                <IconButton aria-label="Rejected" color="primary" value="2" onClick={()=>this.rejectNewArticle(newArticle.id)}>
                                <i className="material-icons" style={{color: "red"}}>
                                  thumb_down
                                </i>
                                </IconButton>
                              </Tooltip>
                              </TableCell>
                                  </TableRow>
                                );
                              })}
                              {emptyRows > 0 && (
                                <TableRow style={{ height: 48 * emptyRows }}>
                                  <TableCell colSpan={12} />
                                </TableRow>
                              )}
                            </TableBody>
                            <TableFooter>
                              <TableRow>
                                <TablePagination
                                  colSpan={10}
                                  count={this.props.adminReducer.length}
                                  rowsPerPage={rowsPerPage}
                                  page={page}
                                  onChangePage={this.handleChangePage}
                                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                  ActionsComponent={TablePaginationActionsWrapped}
                                />
                              </TableRow>
                            </TableFooter>
                          </Table>
                        </div>
                      </Paper>
                    );
                  }
                }
          
          ModifiedArticleTableBody.propTypes = {
            classes: PropTypes.object.isRequired,
          };
          
    export default compose(withStyles(styles),connect(mapStateToProps))(ModifiedArticleTableBody);