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
                <div className="grid"> grid 1 Profile card goes here</div>
                <div className="grid"> 
                    <p>grid 2 User History/Post Status goes here</p>
                    <h3>History</h3>
                    <br/>
                    <p>cards go here</p>
                
                
                </div>
                <div className="grid"> grid 3</div>
            </div>
        )
    }



}


export default connect(mapStateToProps)(UserHomeProfile);
