import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { compose } from 'recompose';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    user: state.user,
    mapReducer: state.mapReducer,
    articles: state.articleReducer.article,
    research_type: state.articleReducer.research_type,
    research_phase: state.articleReducer.research_phase
});

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
      research_phase: 0,
      openType: false,
      openPhase: false
    };
    
    handleChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };
    
    handleCloseType = () => {
      this.setState({ openType: false });
    };

    handleClosePhase = () => {
        this.setState({ openPhase: false });
      };
    
    handleOpenType = () => {
      this.setState({ openType: true });
    };

    handleOpenPhase = () => {
        this.setState({ openPhase: true });
      };

    render() {
        const { classes } = this.props;

        return (
            <div>
               
                    <label>
                        Search by Research Type
                    </label>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="landing-page-open-select">
                            Type of Research
                        </InputLabel>
                        <Select
                            open={this.state.openType}
                            onClose={this.handleCloseType}
                            onOpen={this.handleOpenType}
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
                            {this.props.research_type.map((research_type, i) => {
                            return (
                                <MenuItem key={i} value={research_type.type}>{research_type.type}</MenuItem>
                            )
                            })}
                        </Select>
                    </FormControl>
                    <br/>
                    <label>
                        Search by Research Phase
                    </label>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="landing-page-open-select">
                            Phase of Research
                        </InputLabel>
                        <Select
                            open={this.state.openPhase}
                            onClose={this.handleClosePhase}
                            onOpen={this.handleOpenPhase}
                            value={this.state.research_phase}
                            onChange={this.handleChange}
                            inputProps={{
                                name: 'research_phase',
                                id: 'landing-page-open-select',
                            }}
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {this.props.research_phase.map((research_phase, i) => {
                            return (
                                <MenuItem key={i} value={research_phase.phase}>{research_phase.phase}</MenuItem>
                            )
                            })}
                        </Select>
                    </FormControl> 
             
            </div>
        );
    }
}

DropdownSearch.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(connect(mapStateToProps), withStyles(styles))(DropdownSearch)
