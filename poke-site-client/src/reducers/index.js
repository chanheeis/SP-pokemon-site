import * as types from '../actions/actionTypes';

const initialState={
    currentPokeName:"",
    currentPage:1,
    maxPage:null,
    currentSurveyStatus:false
};

export function reducer(state=initialState,action){
    switch(action.type){
        //검색되는 포켓몬의 이름을 newState로 return
        case types.CHANGE_POKE_NAME:{
            const newState=Object.assign(
                {},
                state,
                {currentPokeName:action.pokeName}
            );
            return newState;
        }
        //next Button을 클릭하였을 때 다음 페이지를 newState로 return
        case types.NEXT_PAGE:{
            if(state.currentPage>=state.maxPage){
                return state;
            }
            const newState=Object.assign(
                {},
                state,
                {currentPage:state.currentPage+1}
            );
            return newState;
        }
        case types.PREVIOUS_PAGE:{   
            //currentPage가 0보다 작거나 같으면 기존 state를 그대로 반환
            if(state.currentPage<=1){
                return state;
            }
            const newState=Object.assign(
                {},
                state,
                {currentPage:state.currentPage-1}
            );
            return newState;
        };
        case types.SET_MAX_PAGE:{
            const newState=Object.assign(
                {},
                state,
                {maxPage:action.maxPage}
            );
            return newState;
        };
        case types.CHANGE_PAGE:{
            const newState=Object.assign(
                {},
                state,
                {currentPage:action.pageNum}
            );
            return newState;
        };
        
        case types.CHANGE_SURVEY_STATUS:{
            const newState=Object.assign(
                {},
                state,
                {currentSurveyStatus:!state.currentSurveyStatus}
            );
            console.log(newState);
            return newState;
        };

        default : return state;
    }
}