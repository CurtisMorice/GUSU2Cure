import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 140,
  },
});

class DropdownSearch extends Component {
    state = {
      research_type: 0,
      open: false,
    };
    
    handleChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };
    
    handleClose = () => {
      this.setState({ open: false });
    };
    
    handleOpen = () => {
      this.setState({ open: true });
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <form autoComplete="off">
                    <Button className={classes.button} onClick={this.handleOpen}>
                        Search by Research Type
                    </Button>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="landing-page-open-select">
                            Type of Research
                        </InputLabel>
                        <Select
                            open={this.state.open}
                            onClose={this.handleClose}
                            onOpen={this.handleOpen}
                            value={this.state.research_type}
                            onChange={this.handleChange}
                            inputProps={{
                                name: 'research_type',
                                id: 'landing-page-open-select',
                            }}
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={1}>Stem Cell</MenuItem>
                            <MenuItem value={2}>Molecular</MenuItem>
                            <MenuItem value={3}>Gene</MenuItem>
                            <MenuItem value={4}>Pharamceutical</MenuItem>
                            <MenuItem value={5}>Device</MenuItem>
                            <MenuItem value={6}>Rehabilitation/Fitness</MenuItem>
                            <MenuItem value={7}>Survey</MenuItem>
                            <MenuItem value={8}>Other</MenuItem>
                        </Select>
                    </FormControl>
                </form>
            </div>
        );
    }
}

DropdownSearch.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DropdownSearch);