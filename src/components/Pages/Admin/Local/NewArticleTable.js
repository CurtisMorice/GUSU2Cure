import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { ADMIN_ACTIONS } from '../../../../redux/actions/adminActions';


const mapStateToProps = state => ({
    adminReducer :state.adminReducer.newArticles,
})


class NewArticleTable extends Component{
    state={
        value: 'New'
    }

    componentDidMount(){
        this.fetchNewArticles();
    }

    fetchNewArticles = () => {
        console.log('hello, is it me your looking for ');
        this.props.dispatch({type: ADMIN_ACTIONS.FETCH_NEW_ARTICLE});
    }

    render(){
        return(
            <div>
                {JSON.stringify(this.props.adminReducer)}
                <p>hello</p>
            </div>
        )
    }
}

export default connect(mapStateToProps)(NewArticleTable);