import React, { Component } from 'react';
import { connect } from 'react-redux';

// import Nav from '../../Global/Nav/Nav';

import { USER_ACTIONS } from '../../../redux/actions/userActions';
import { triggerLogout } from '../../../redux/actions/loginActions';

// Components
import AdminNav from './Local/AdminNav';

// styles

const mapStateToProps = state => ({
  user: state.user,
});

class AdminHome extends Component {
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
    // this.props.history.push('home');
  }

  render() {
    let content = null;
    if (this.props.user.user != null && this.props.user.user.type === 'admin') {
      content = (
        <div>
          <AdminNav/>
        </div>
      )
    }
        else {
          return(
            content = (
              <div>
                <h3>User Unauthorized</h3>
              </div>
            )
          )
        }

    return (
      <div>
        {/* <Nav /> */}
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(AdminHome);
