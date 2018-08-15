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
                <div className="grid" id="articleHeader"> 
                    <h3>Administrator Home</h3>
                    <AdminNav/>
                </div>
                <div className="grid"></div>
                <div className='grid'></div>
                <div className='grid'></div>
                <div className='grid'></div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(AdminHomeProfile);