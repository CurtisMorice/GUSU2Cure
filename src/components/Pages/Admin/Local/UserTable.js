import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

//material-ui
// import classNames from 'classnames';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TablePagination from '@material-ui/core/TablePagination';
// import TableRow from '@material-ui/core/TableRow';
// import TableSortLabel from '@material-ui/core/TableSortLabel';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Paper from '@material-ui/core/Paper';
// import Checkbox from '@material-ui/core/Checkbox';
// import IconButton from '@material-ui/core/IconButton';
// import Tooltip from '@material-ui/core/Tooltip';
// import DeleteIcon from '@material-ui/icons/Delete';
// import FilterListIcon from '@material-ui/icons/FilterList';
// import { lighten } from '@material-ui/core/styles/colorManipulator';

//components



//Actions
import { ADMIN_ACTIONS } from '../../../../redux/actions/adminActions';

const mapStateToProps = state => ({
  allUsers: state.adminReducer.allUser
})

class UserTable extends Component{
  state={

  }

  componentDidMount(){
    this.fetchAllUsers();
  }

  //Get all user info
  fetchAllUsers = () => {
    console.log('hello');
    this.props.dispatch({type: ADMIN_ACTIONS.FETCH_ALL_USER});
  }

  render(){
    return(
      <div>
        {JSON.stringify(this.props.allUsers)}
        
      </div>

    )
  }
}


export default connect(mapStateToProps)(UserTable);