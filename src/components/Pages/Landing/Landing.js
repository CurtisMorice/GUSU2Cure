import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../Global/Nav/Nav';
import { USER_ACTIONS } from '../../../redux/actions/userActions';
import { triggerLogout } from '../../../redux/actions/loginActions';
import DropdownSearch from './Local/DropdownSearch';
import SearchBar from './Local/SearchBar';
import Grid from '@material-ui/core/Grid';


const mapStateToProps = state => ({
  user: state.user,
});

class Landing extends Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.user === null) {
      // this.props.history.push('home');
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
    this.props.history.push('home');
  }

  render() {
    return (
      <div>
        <Nav />
        <div>
          <Grid container spacing={24}>
            <Grid item xs={12} />
            <Grid item xs={4}>
              <DropdownSearch />
            </Grid>
            <Grid item xs={8}>
              <SearchBar />  
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Landing);

