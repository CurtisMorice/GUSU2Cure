import React, { Component } from 'react';
import { connect } from 'react-redux';
//material-ui
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import { TableRow } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';


const mapStateToProps = state => ({
    user: state.user,
  });

class UserList extends Component {
    state = {

    }

    render(){
        return(
            <div>
                <TableCell padding="checkbox">
                  <Checkbox  />
                </TableCell>
                <TableCell component="th" scope="row" padding="none">
                  6
                </TableCell>
                <TableCell >1</TableCell>
                <TableCell >2</TableCell>
                <TableCell >3</TableCell>
                <TableCell >4</TableCell>
            </div>

        )
    }
}

export default connect(mapStateToProps)(UserList);