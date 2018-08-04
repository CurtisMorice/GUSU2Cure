import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { ADMIN_ACTIONS } from '../../../../redux/actions/adminActions';


const mapStateToProps = state => ({
    x:state.adminReducer.approvedArticle
})


class CatalogueTable extends Component{
    state={
        value: 'Approved'
    }

    componentDidMount(){
        this.fetchApprovedArticles();
    }

    fetchApprovedArticles = () => {
        console.log('hello');
        this.props.dispatch({type: ADMIN_ACTIONS.FETCH_APPROVED_ARTICLE});
    }

    render(){
        return(
            <div>
                {JSON.stringify(this.props.x)}
                <p>hello</p>
            </div>
        )
    }
}

export default connect(mapStateToProps)(CatalogueTable);