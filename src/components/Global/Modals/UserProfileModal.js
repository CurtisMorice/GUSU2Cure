import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {ADMIN_ACTIONS} from '../../../redux/actions/adminActions';
import {USER_ACTIONS} from '../../../redux/actions/userActions';


// material ui
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';

//components
import swal from 'sweetalert2'



//ReduxStore
const mapStateToProps = state => ({
    user: state.user.user.id,
    allUsers: state.adminReducer.allUser,
})


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class EditUserModal extends React.Component {
  state = {
    type: ''
  };

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  //Handler to change user type
  handleUpdateUser = (type) => (event) => {
    swal({
      title: 'Please Confirm Change',
      text: 'Are you sure you want to change the user type?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    }).then((result) => {
      if(result.value && this.props.user !== this.props.id.user_id) {
        let userId = this.props.id.user_id;
        this.setState({
          type: event.target.value
        })
        this.props.dispatch({type: ADMIN_ACTIONS.SET_USER_TYPE, payload: this.state.type, userId })
        // this.props.dispatch({type: ADMIN_ACTIONS.FETCH_ALL_USER})
        swal(
          `Success`,
          'User Type Has been Modified',
          'success'
        )
      } if (this.props.user === this.props.id.user_id){
        swal(
          'Invalid',
          `Users Can't Change Own User Type`,
          'error'
        )
      } else if (result.dismiss === swal.DismissReason.cancel) {
        swal(
          'Cancelled',
          'User Type Change Action Cancelled',
          'error'
        )
      }
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
            <FormHelperText> {this.props.id.type} </FormHelperText>
            <Select
                value={this.state.type} 
                onChange={this.handleUpdateUser('type')}
                name="type"
                autoFocus
                margin="dense"
                label="Type"
                inputProps={{
                    name:'type',
                    id:'userType'
                }}
            >
                <MenuItem value='user'> User </MenuItem>
                <MenuItem value='admin'> Admin </MenuItem>
            </Select>
      </div>
    );
  }
}

EditUserModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const EditUserModalWrapped = withStyles(styles)(EditUserModal);

export default compose(
    withStyles(styles),
    connect(mapStateToProps))(EditUserModal);