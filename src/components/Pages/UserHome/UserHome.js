import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Nav from '../../Global/Nav/Nav';
import { USER_ACTIONS } from '../../../redux/actions/userActions';
import { triggerLogout } from '../../../redux/actions/loginActions';
// Components
import ArticleCard from './Local/ArticleList';
import UserHomeProfile from './Local/UserHomeProfile';

const mapStateToProps = state => ({
  user: state.user,
});

class UserHome extends Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.user === null) {
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
  }

  render() {
    let content = null;

    if (this.props.user.user) {
      content = (
        <div>
          <UserHomeProfile/>
        </div>
      );
    }

    return (
      <div>
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserHome);

