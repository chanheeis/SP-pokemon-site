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

function makePokeTypesArr(pokeList){
    const newPokeList=[];
    for(let index=0;index+1<=pokeList.length;index++){
        //현재 포켓몬의 아이디와 이전 포켓몬의 아이디가 같으면 다음 배열 탐색
        if(
            index>0 &&
            pokeList[index].poke_id==pokeList[index-1].poke_id
        )continue;

        const pokeInfo={
            poke_id:pokeList[index].poke_id,
            poke_name_ko:pokeList[index].poke_name_ko,
            poke_image:pokeList[index].poke_image,
            habitat_name_ko:pokeList[index].habitat_name_ko,
            types:[pokeList[index].type_name_ko]
        }

        if(
            index+1<pokeList.length&&
            pokeList[index].poke_id==pokeList[index+1].poke_id
        )pokeInfo.types.push(pokeList[index+1].type_name_ko)

        newPokeList.push(pokeInfo);
    }
    return newPokeList;
}

module.exports={isParamError,selectPokeList,isPokeName,selectPokeByName};