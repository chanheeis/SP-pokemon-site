import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';

import '../css/PageButton.css';
class PageButton extends Component{
    render(){
        const {pageNum,currentPage,handleChangePage}=this.props;
        if(pageNum===currentPage){
            return(
                <div className="page-button-selected">
                    <span onClick={handleChangePage.bind(this,pageNum)}>{pageNum}</span>
                </div>
            )
        }else{
            return(
                <div className="page-button">
                    <span onClick={handleChangePage.bind(this,pageNum)}>{pageNum}</span>
                </div>
            )
        }
    }
}

const mapStateToProps=(state)=>{
    return{
        currentPage:state.currentPage
    };
};

const mapDispatchToProps=(dispatch)=>{
    return{
        handleChangePage:(pageNum)=>{dispatch(actions.changePage(pageNum))}
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(PageButton);