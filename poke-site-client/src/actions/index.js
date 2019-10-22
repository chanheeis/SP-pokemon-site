import * as types from './actionTypes';

export function changePokeName(pokeName){
    return{
        type:types.CHANGE_POKE_NAME,
        pokeName
    };
};

export function nextPage(){
    return{
        type:types.NEXT_PAGE
    };
};

export function previousPage(){
    return{
        type:types.PREVIOUS_PAGE
    };
};

export function changeSurveyStatus(){
    return{
        type:types.CHANGE_SURVEY_STATUS
    };
};

export function setMaxPage(maxPage){
    return{
        type:types.SET_MAX_PAGE,
        maxPage
    };
};

export function changePage(pageNum){
    return{
        type:types.CHANGE_PAGE,
        pageNum
    };
};