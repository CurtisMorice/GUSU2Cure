import React, { Component } from 'react';
import { connect } from 'react-redux';

//components

//stylesheets
import './userHomeProfile.css';

const mapStateToProps = state => ({

});

class UserHomeProfile extends Component{
    constructor(){
        super();
        this.state={

        }
    }

    render(){
        return(
            <div className="container">
                <div className="grid"> grid 1</div>
                <div className="grid"> grid 2</div>
                <div className="grid"> grid 3</div>
            </div>
        )
    }



}


export default connect(mapStateToProps)(UserHomeProfile);
