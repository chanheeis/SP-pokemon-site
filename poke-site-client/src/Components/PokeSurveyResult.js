import React, { Component } from 'react';
import * as actions from '../actions';
import {connect} from 'react-redux';
import '../css/PokeSurveyResult.css';

class PokeSurveyResult extends Component {
    _handleSurveyToggle=()=>{
        this.props.handleSurveyToggle();
    };

    render() {
        const {poke_image,poke_id,poke_name_ko,type_name_ko,habitat_name_ko}=this.props.surveyResult;
        return (
            <div id="poke-survey-result">
                <p id="result-title">Survey Result</p>
                <p>
                    <span className="result-info-title">&#8226; 도감번호 : </span>
                    <span>{poke_id}</span>
                </p>
                <img src={poke_image}/>

                <p>
                    <span className="result-info-title">&#8226; 이름 : </span>
                    <span>{poke_name_ko}</span>
                </p>
                <p>
                    <span className="result-info-title">&#8226; 타입 : </span>
                    <span>{type_name_ko}</span>
                </p>
                <p>
                    <span className="result-info-title">&#8226; 서식지 : </span>
                    <span>{habitat_name_ko?habitat_name_ko:"정보 없음"}</span>
                </p>

                <button onClick={this._handleSurveyToggle}>Survey Reset</button>
            </div>
        );
    }
}

const mapStateToProps=(state)=>{
    return{};
}

const mapDispatchToProps=(dispatch)=>{
    return{
        handleSurveyToggle:()=>{dispatch(actions.changeSurveyStatus())}
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(PokeSurveyResult);