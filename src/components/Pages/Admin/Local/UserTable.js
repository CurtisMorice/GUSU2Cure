import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

//material-ui
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
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
import TableHead from '@material-ui/core/TableHead';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';

//components
import EditUserModal from '../../../Global/Modals/UserProfileModal';


//Actions
import { ADMIN_ACTIONS } from '../../../../redux/actions/adminActions';
import swal from 'sweetalert2';


const mapStateToProps = state => ({
  allUsers: state.adminReducer.allUser
})

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

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

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
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

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
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


class UserTable extends Component{
  state={
    page: 0,
    rowsPerPage: 5,

  }

  componentDidMount(){
    this.fetchAllUsers();
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  //Get all user info
  fetchAllUsers = () => {
    this.props.dispatch({type: ADMIN_ACTIONS.FETCH_ALL_USER});
  }

  // deletes user
  deleteUser = (id) => {
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
        this.props.dispatch({type: ADMIN_ACTIONS.DELETE_USER, payload: id});
        swal(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.fetchAllUsers()
      } else if (result.dismiss === swal.DismissReason.cancel) {
        swal(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
    
  }



    // console.log('hello', id);
    // this.props.dispatch({type: ADMIN_ACTIONS.DELETE_USER, payload: id});
    // this.fetchAllUsers();
  

  render(){

    // const { classes } = this.props;
    const { data, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.props.allUsers.length - page * rowsPerPage);

    return(
      <div>
        <paper>
          <Table>
            <TableHead>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Contact Info</TableCell>
              <TableCell>User Type</TableCell>
              <TableCell>Edit User Type</TableCell>
              <TableCell>Delete User</TableCell>
            </TableHead>

            <TableBody>
              {this.props.allUsers.map((n, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell component="th" scope="row"> {n.username} </TableCell>
                    <TableCell component="th" scope="row"> {n.email} </TableCell>
                    <TableCell component="th" scope="row"> {n.contact_info} </TableCell>
                    <TableCell component="th" scope="row"> {n.type} </TableCell>
                    <TableCell component="th" scope="row"> <EditUserModal id={n}/> </TableCell>

                    <TableCell component="th" scope="row"> 
                      <Tooltip title="Delete" >
                        <IconButton aria-label="Delete" color="secondary" onClick={ ()=>this.deleteUser(n.user_id) }>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )
              })}
              {/* {emptyRows > 0 && (
                <TableRow style={{ height: 10 * emptyRows}}> <TableCell colSpan={6}/> </TableRow>
              )} */}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={3}
                  count={this.props.allUsers.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </paper>

      </div>

    )
  }
}

UserTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(UserTable);