
//정수형의 limit과 offset을 전달하면, 해당하는 정수들의 배열을 return
function makeArrFromInt(offset,limit){
    const resultArr=[];
    for(let index=offset;index<=(offset+limit-1);index++){
        resultArr.push(index);
    }
    return resultArr;
}

function isProperties(obj,arr){
    arr.map(item=>{
        if(obj.hasOwnProperty(item)) //yield;
        return false;
    })
    return true;
}

function checkQueryCond(queryObj,cond){
    let result={queryError:false,condError:false};
    if(queryObj.hasOwnProperty('limit')&&queryObj.hasOwnProperty('offset')){
        result.queryError
    }
    //***queryError=false***/
    //1) queryObj, cond => 각각 객체, 상수
    //2) qeuryObj => should have limit, offset
    //3) queryObj.limit, queryObj.offset => Number
    
    /***condError=false***/ 
    //1) limit-offset+1 <= cond
    return result;
}

module.exports={
    makeArrFromInt,checkQueryCond
};