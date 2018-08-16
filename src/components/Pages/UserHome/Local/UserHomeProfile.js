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
                <div className="grid"> 
                    <ProfileCard/>
                </div>
                <div className="grid" id="articleHeader"> 
                    <h3>History</h3>
                    <br/>
                    <div className="article">
                    <ArticleCard/>
                    </div>
                </div>
                <div className="grid"> 
                </div>
            </div>
        )
    }



}


export default connect(mapStateToProps)(UserHomeProfile);
