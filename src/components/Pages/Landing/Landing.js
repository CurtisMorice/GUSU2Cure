import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../Global/Nav/Nav';
import { USER_ACTIONS } from '../../../redux/actions/userActions';
import { triggerLogout } from '../../../redux/actions/loginActions';
import DropdownSearch from './Local/DropdownSearch';


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
          <DropdownSearch />
        </div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Landing);

