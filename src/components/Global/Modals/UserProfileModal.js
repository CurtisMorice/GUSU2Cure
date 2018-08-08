import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

// material ui
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

//ReduxStore
const mapStateToProps = state => ({
    user: state.user,
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
    open: false,
    type: ''
  };

  handleOpen = () => {
    this.setState({ open: true,
            type: this.props.user.type
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleUpdateUser = (type) => (event) => {
    console.log(event.target.value);
    this.setState({
        type: event.target.value
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
                {/* <MenuItem value={30}>Thirty</MenuItem> */}
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