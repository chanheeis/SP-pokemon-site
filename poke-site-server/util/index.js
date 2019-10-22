function makeArrFromInt(offset,limit){
    const resultArr=[];
    for(let index=offset;index<=(offset+limit-1);index++){
        resultArr.push(index);
    }
    return resultArr;
}

function checkQueryCond(queryObj,cond){
    let result={queryError:false,condError:false};
    if(queryObj.hasOwnProperty('limit')&&queryObj.hasOwnProperty('offset')){
        result.queryError
    }
    return result;
}

module.exports={
    makeArrFromInt,checkQueryCond
};