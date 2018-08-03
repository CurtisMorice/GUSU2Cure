import React, { Component } from 'react';
import { connect } from 'react-redux';

//materiaul-ui
import AddCircle from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import './adminHomeProfile.css';

//Components
import ProfileCard from '../../UserHome/Local/Card';
import { Typography } from '@material-ui/core';

import AdminNav from '../Local/AdminNav';

const mapStateToProps = state => ({
    user: state.user,
  });


class AdminHomeProfile extends Component{

    render(){
        return(
            <div className="container">
                <div className="grid"> 
                    <ProfileCard/>
                </div>

                {/* GRID 2 */}
                <div className="grid" id="articleHeader"> 
                    <h3>Administrator Home</h3>
                    <AdminNav/>
                </div>

                {/* GRID 3 */}
                <div className="grid">  
                    3
                </div>

                <div className='grid'>4</div>
                <div className='grid'>5</div>
                <div className='grid'>6</div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(AdminHomeProfile);