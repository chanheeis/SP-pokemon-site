import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import PageButton from './PageButton';
import LoadingPage from './LoadingPage';
import '../css/PageList.css';

class PageList extends Component {
    state={};
    
    componentDidMount=async()=>{
        const {currentPage,maxPage}=this.props;
        await this.setState({
            pageList:this._createPageList(currentPage,maxPage)
        });
    };
    
    componentWillReceiveProps=async (nextProps)=>{
        if(this.props!==nextProps){
            await this.setState({
                pageList:this._createPageList(nextProps.currentPage,nextProps.maxPage)
            });
        }
    }

    handleNextPage=()=>{
        this.props.handleNextPage();
    };

    handlePreviousPage=()=>{
        this.props.handlePreviousPage();
    };

    handleChangePage=(pageNum)=>{
        this.props.handleChangePage(pageNum);
    };

    //currentPage를 기반으로 pageList를 생성
    _createPageList=(currentPage,maxPage)=>{
        const pageList=[{
            pageNum:currentPage,
            currentPage
        }];

        //Insert element in front of array
        pageList.unshift({pageNum:currentPage-1,currentPage});
        pageList.unshift({pageNum:currentPage-2,currentPage});
        pageList.unshift({pageNum:currentPage-3,currentPage});

        //Insert element in back of array
        pageList.push({pageNum:currentPage+1,currentPage});
        pageList.push({pageNum:currentPage+2,currentPage});
        pageList.push({pageNum:currentPage+3,currentPage});

        //Filter Array
        const filteredPageList=pageList.filter(page=>{
            return (page.pageNum<=maxPage&&page.pageNum>=1);
        });
        return filteredPageList;
    };

    render() {
        const {maxPage,currentPage}=this.props;
        const condition=maxPage && currentPage;
        
        if(condition){
            return (
                <div id="page-list-wrapper">
                    <button id="previous-button" onClick={this.handlePreviousPage}>
                    </button>
                    {
                        this.state.pageList.map((page,index)=>{
                            return (<PageButton pageNum={page.pageNum} key={index}/>)
                        })
                    }
                    <button id="next-button" onClick={this.handleNextPage}>
                    </button>
                </div>
            );
        }else{
            return <LoadingPage/>
        }
    };
}

const mapStateToProps=(state)=>{
    return {
        currentPage:state.currentPage,
        maxPage:state.maxPage
    };
};

const mapDispatchToProps=(dispatch)=>{
    return{
        handleNextPage:()=>{dispatch(actions.nextPage())},
        handlePreviousPage:()=>{dispatch(actions.previousPage())}
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(PageList);