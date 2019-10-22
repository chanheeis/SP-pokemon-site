const config=require('../config').database;
const Database=require('../class/Database');
const pokeSite=new Database(config);

function isParamError(currentPage,maxPage){
    if(
        Number.isInteger(currentPage) &&
        currentPage > 0 &&
        currentPage <= maxPage
    ){ 
        return false;
    }else{
        return true;
    } 
}

async function selectPokeList(currentPage){
    query=`
    SELECT poke_info.poke_id,poke_name_ko,poke_image,habitat_name_ko,type_name_ko
    FROM poke_info
    LEFT JOIN poke_habitat ON poke_info.poke_id=poke_habitat.poke_id
    LEFT JOIN habitat ON poke_habitat.habitat_id=habitat.habitat_id
    LEFT JOIN poke_type ON poke_info.poke_id=poke_type.poke_id
    LEFT JOIN type ON poke_type.type_id=type.type_id
    WHERE poke_info.poke_id > ${(currentPage-1)*20}
    AND poke_info.poke_id <= ${currentPage*20}
    `;

    let queryResult=await pokeSite.select(query);
    queryResult=makePokeTypesArr(queryResult);

    return queryResult;  
}

async function isPokeName(pokeName){
    const query=`
    SELECT poke_name_ko FROM poke_info
    WHERE poke_name_ko='${pokeName}'
    `;

    const response=await pokeSite.select(query);
    
    if(response.length===0){
        return false;
    }else{
        return true;
    }
}

async function selectPokeByName(pokeName){
    const query=`    
    SELECT poke_info.* ,habitat_name_ko ,type_name_ko
    FROM poke_info
    LEFT JOIN poke_habitat ON poke_info.poke_id=poke_habitat.poke_id
    LEFT JOIN habitat ON poke_habitat.habitat_id=habitat.habitat_id
    LEFT JOIN poke_type ON poke_info.poke_id=poke_type.poke_id
    LEFT JOIN type ON poke_type.type_id=type.type_id
    WHERE poke_name_ko='${pokeName}';
    `
    const queryResult=await pokeSite.select(query);
    return queryResult;
}

module.exports={isParamError,selectPokeList,isPokeName,selectPokeByName};