import React, { Component } from 'react';
import { connect } from 'react-redux';

//components
import ProfileCard from './Card';

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
                {/* GRID 1 */}
                <div className="grid"> 
                    <ProfileCard/>
                </div>

                {/* GRID 2 */}
                <div className="grid"> 
                    <p>grid 2 User History/Post Status goes here</p>
                    <h3>History</h3>
                    <br/>
                    <div>
                    <p>cards go here</p>
                    </div>
                </div>

                {/* GRID 3 */}
                <div className="grid"> grid 3</div>
            </div>
        )
    }



}


export default connect(mapStateToProps)(UserHomeProfile);
