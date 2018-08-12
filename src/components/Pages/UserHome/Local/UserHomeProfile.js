import React, { Component } from 'react';
import { connect } from 'react-redux';

//components
import ProfileCard from './Card';
import ArticleCard from './ArticleList';


//stylesheets
import './userHomeProfile.css';




const mapStateToProps = state => ({
    adminReducer: state.adminReducer.newArticles

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
                <div className="grid" id="articleHeader"> 
                    <h3>History</h3>
                    <br/>
                    <div className="article">
                    <ArticleCard/>
                    </div>
                </div>

                {/* GRID 3 */}
                <div className="grid"> 
                    
                    
                    {/* {JSON.stringify(this.props.adminReducer)} */}
                    
                </div>
            </div>
        )
    }



}


export default connect(mapStateToProps)(UserHomeProfile);
