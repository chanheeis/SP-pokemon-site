import React, { Component } from 'react';
import PokeSurveyResult from './PokeSurveyResult';
import * as actions from '../actions';
import {connect} from 'react-redux';
import '../css/PokeSurvey.css';

class PokeSurvey extends Component {
    constructor(props){
        super(props);
        this._preventDefault=this._preventDefault.bind(this);
    }

    _preventDefault=async (e)=>{
        e.preventDefault();
        const req={};
        req.isSanitary=this._getRadioValue("isSanitary");
        req.isActive=this._getRadioValue("isActive");
        req.isIndependent=this._getRadioValue("isIndependent");

        req.isMeek=this._getRadioValue("isMeek");
        req.isExtrovert=this._getRadioValue("isExtrovert");
        req.isCurious=this._getRadioValue("isCurious");
        req.isUnusual=this._getRadioValue("isUnusual");

        const url="/user/survey";
        let response=await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify(req)
        });
        response=await response.json();
        const randomIndex=Math.floor(Math.random() * response.length);

        await this.setState({
            surveyResult:response[randomIndex]
        });

        await this.props.handleSurveyToggle();
    };

    _getRadioValue=(name)=>{
        let result;
        const nodeList=document.getElementsByName(name);
        nodeList.forEach((item)=>{
            if(item.checked===true){
                result=item.value;
            }
        })
        return result;
    }

    render() {
        const {currentSurveyStatus}=this.props;
        if(currentSurveyStatus===true) return <PokeSurveyResult surveyResult={this.state.surveyResult}/>
        return (
            <div id="poke-survey-wrapper">
                <p id="survey-title">Personality Survey</p>
                <form action="/user/survey" method="post" onSubmit={this._preventDefault}>
                    <p className="survey-wrapper">
                        <span className="survey-title">집과 업무 환경이 잘 정돈되어 있다.</span>
                        <p>
                            <span className="yes">예</span>
                            <input type="radio" name="isSanitary" value="true" defaultChecked className="survey-button-true"/>
                            
                            <span className="no">아니오</span>
                            <input type="radio" name="isSanitary" value="false" className="survey-button-false"/>
                        </p>
                    </p>
                    <hr/>
                    <p className="survey-wrapper">
                        <span className="survey-title">의욕적이고 활동적이다.</span>
                        <p>
                            <span className="yes">예</span>
                            <input type="radio" name="isActive" value="true" defaultChecked className="survey-button-true"/>
                            
                            <span className="no">아니오</span>
                            
                            <input type="radio" name="isActive" value="false" className="survey-button-false"/>
                        </p>
                    </p>
                    <hr/>
                    <p className="survey-wrapper">
                        <span className="survey-title">여행 계획을 철저하게 세우는 편이다.</span>
                        <p>
                            <span className="yes">예</span>
                            <input type="radio" name="isIndependent" value="true" defaultChecked className="survey-button-true"/>
                            
                            <span className="no">아니오</span>
                            <input type="radio" name="isIndependent" value="false" className="survey-button-false"/>
                        </p>
                    </p>
                    <hr/>
                    <p className="survey-wrapper">
                        <span className="survey-title">다툼이 일어나도 내가 참는 편이다.</span>
                        <p>
                            <span className="yes">예</span>
                            <input type="radio" name="isMeek" value="true" defaultChecked className="survey-button-true"/>
                            
                            <span className="no">아니오</span>
                            <input type="radio" name="isMeek" value="false" className="survey-button-false"/>
                        </p>
                    </p>
                    <hr/>
                    <p className="survey-wrapper">
                        <span className="survey-title">새로운 사람들과 곧잘 어울린다.</span>
                        <p>
                            <span className="yes">예</span>
                            <input type="radio" name="isExtrovert" value="true" defaultChecked className="survey-button-true"/>
                            
                            <span className="no">아니오</span>
                            <input type="radio" name="isExtrovert" value="false" className="survey-button-false"/>
                        </p>
                    </p>
                    <hr/>
                    <p className="survey-wrapper">
                        <span className="survey-title">새로운 것에 관심이 많다.</span>
                        <p>
                            <span className="yes">예</span>
                            <input type="radio" name="isCurious" value="true" defaultChecked className="survey-button-true"/>
                            
                            <span className="no">아니오</span>
                            <input type="radio" name="isCurious" value="false" className="survey-button-false"/>
                        </p>
                    </p>
                    <hr/>
                    <p className="survey-wrapper">
                        <span className="survey-title">종종 터무니없는 생각을 하며 시간을 보낸다.</span>
                        <p>
                            <span className="yes">예</span>
                            <input type="radio" name="isUnusual" value="true" defaultChecked className="survey-button-true"/>
                            
                            <span className="no">아니오</span>
                            <input type="radio" name="isUnusual" value="false" className="survey-button-false"/>
                        </p>
                    </p>

                    <p id="survey-submit-wrapper">
                        <input type="submit" value="Submit"/>
                    </p>
                </form>
            </div>
        );
    }
}

const mapStateToProps=(state)=>{
    return {
        currentSurveyStatus:state.currentSurveyStatus        
    };
};

const mapDispatchToProps=(dispatch)=>{
    return {
        handleSurveyToggle:()=>{dispatch(actions.changeSurveyStatus())}
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(PokeSurvey);