import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const styles = {
  checked: {},
  size: {
    width: 40,
    height: 40,
  },
  sizeIcon: {
    fontSize: 20,
  },
};

const mapStateToProps = state => ({
  user: state.user,
  research_type: state.articleReducer.research_type,
});

class ResearchTypeSelect extends React.Component {
  state = {
    checkedA: false,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
      <FormGroup row>
      {this.props.research_type.map((research_type, i) => {
        return (
          <FormControlLabel
          control={
            <Checkbox
              checked={this.state.research_type}
              onChange={this.handleChange('research_type')}
              value={research_type.id}
              color="primary"
            />
          }
          label={research_type.type}
        />
        )
      })}
      </FormGroup>
      </div>
    );
  }
}

ResearchTypeSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResearchTypeSelect);