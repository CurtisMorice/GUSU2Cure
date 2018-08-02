import React, { Component } from 'react';
import { connect } from 'react-redux';

//materiaul-ui
import AddCircle from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import './adminHomeProfile.css';


const mapStateToProps = state => ({
    user: state.user,
  });


class AdminHomeProfile extends Component{

    render(){
        return(
            <div className="container">
                <div className="grid"> 

                </div>

                {/* GRID 2 */}
                <div className="grid" id="articleHeader"> 

                </div>

                {/* GRID 3 */}
                <div className="grid">  
                
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(AdminHomeProfile);