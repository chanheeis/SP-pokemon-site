//기본 App 설정
const express=require('express');
const router=express.Router();

//기타 Util 설정
const fetch=require('node-fetch');
const userUtil=require('./api.util');
const makeArrFromInt=require('../util/index.js').makeArrFromInt;

//Database 관련 설정
const config=require('../config').database;
const Database=require('../class/Database');
const pokeSite=new Database(config);

//외부 API 관련 설정
const endPoint="https://pokeapi.co/api/v2";

router.get('/habitat/update',(req,res)=>{
    //habitat Table에 이미 데이터가 존재하면 insert Query 수행을 하지 않음
    const query=`SELECT habitat_id FROM habitat`;
    pokeSite.select(query).then(result=>{
        ////if habitat table is empty
        if(result.length===0){
            fetch(`${endPoint}/pokemon-habitat`)
            .then(res=>res.json())
            .then(data=>insertHabitat(data))
            .then(()=>res.end());
        ////if habitat table is not empty
        }else{
            res.send("The table_habitat is already filled!");
        }
    })

    async function insertHabitat(data){
        data.results.map(async (result,index)=>{
            const query=`INSERT INTO habitat SET ?`
            const queryData={
                habitat_id:index+1,
                habitat_name:result.name
            };
            await pokeSite.insert(query,queryData);
        })
    }
});

router.get('/type/update',(req,res)=>{
    const query=`SELECT type_id FROM type`;
    pokeSite.select(query)
    .then(result=>{
        //if type table is empty
        if(result.length===0){
            fetch(`${endPoint}/type`)
            .then(res=>res.json())
            .then(data=>insertType(data))
            .then(()=>res.end());
        //if type table is not empty
        }else{
            res.send("The table_type is already filled!");
        }
    })

    const insertType = function(data){
        data.results.map(async (result,index)=>{
            const query=`INSERT INTO type SET ?`;
            const queryData={
                type_id:index+1,
                type_name:result.name
            };
            await pokeSite.insert(query,queryData);
        })
    }
})

router.get('/pokemon/update',async (req,res)=>{
    let offset=1;
    let limit=900;

    const pokeIdList=makeArrFromInt(offset,limit);
    const pokeInfoList=await insertPokeInfo(pokeIdList);
    const filteredPokeInfoList=pokeInfoList.filter(data=>{
        if(data.responseError!==true){
            return data;
        }
    });
    await insertPokeHabitat(filteredPokeInfoList);
    await insertPokeType(filteredPokeInfoList);
    
    async function insertPokeInfo(pokeIdList){
        const promises=await pokeIdList.map(async (pokeId,index)=>{
            let APIUrl=`${endPoint}/pokemon/${pokeId}`;
            let res=await userUtil.fetchWithCatch(APIUrl);
            let selectQuery=`SELECT * FROM poke_info WHERE poke_id=${pokeId}`
            let selectResult=await pokeSite.select(selectQuery);
            if(selectResult.length>0) return {poke_Id:pokeId,isDuplicated:true};
            if(res){
                res=await res.json();
                const {id,weight,height,sprites,name}=res;
                const insertQuery=`INSERT INTO poke_info SET ?`;
                let queryData={
                    poke_id:id, poke_name_en:name,
                    poke_weight:weight, poke_height:height,
                    poke_image:sprites.front_default
                };
                APIUrl=`${endPoint}/pokemon-species/${pokeId}`;
                res=await userUtil.fetchWithCatch(APIUrl);
                if(res){
                    res=await res.json();
                    queryData.poke_name_ko=res.names[8].name;
                    const insertResult={
                        isDuplicated:false,
                        responseError:false,    
                        status:await pokeSite.insert(insertQuery,queryData),
                        poke_Id:queryData.poke_id
                    };
                    return insertResult;    
                }else return {responseError:true};
            }else return {responseError:true};
        });
        const promiseResult=await Promise.all(promises);
        return promiseResult;
    }

    async function insertPokeHabitat(pokeInfoList){
        const promises=await pokeInfoList.map(async (pokeInfo)=>{
            let url=`${endPoint}/pokemon-species/${pokeInfo.poke_Id}`;
            let res=await userUtil.fetchWithCatch(url);
            let selectQuery=`SELECT * FROM poke_habitat WHERE poke_id=${pokeInfo.poke_Id}`;
            let selectResult=await pokeSite.select(selectQuery);

            if(selectResult.length>0) return {poke_Id:pokeInfo.poke_Id,isDuplicated:true}
            if(res&&!selectResult.length){
                res=await res.json();
                let insertResult={
                    responseError:false,
                    index:pokeInfo.poke_Id,
                    isDuplicated:false
                };
    
                if(res.habitat!==null){
                    selectQuery=`SELECT habitat_id FROM habitat WHERE habitat_name='${res.habitat.name}'`;   
                    selectResult=await pokeSite.select(selectQuery);

                    const insertQuery=`INSERT INTO poke_habitat SET ?`;
                    const queryData={
                        poke_id:pokeInfo.poke_Id,
                        habitat_id:selectResult[0].habitat_id
                    };
                    insertResult.status=await pokeSite.insert(insertQuery,queryData);        
                
                }else insertResult.status=false;    
                return insertResult;
            }else return {responseError:true};
        })

        const promiseResult=await Promise.all(promises);
        return promiseResult;
    }

    async function insertPokeType(pokeInfoList){
        const promises=await pokeInfoList.map(async (pokeInfo)=>{
            let APIUrl=`${endPoint}/pokemon/${pokeInfo.poke_Id}`;
            let res=await userUtil.fetchWithCatch(APIUrl);
            let selectQuery=`SELECT * FROM poke_type WHERE poke_id=${pokeInfo.poke_Id}`;
            let selectResult=await pokeSite.select(selectQuery);
            
            if(selectResult.length>2) return {poke_Id:pokeInfo.poke_Id,isDuplicated:true};
            if(res){
                res=await res.json();
                const promises_temp=await res.types.map(async type=>{
                    selectQuery=`SELECT type_id FROM type WHERE type_name='${type.type.name}'`;
                    selectResult=await pokeSite.select(selectQuery);
                    const insertQuery=`INSERT INTO poke_type SET ?`;
                    const queryData={
                        poke_id:pokeInfo.poke_Id,
                        type_id:selectResult[0].type_id
                    };
                    const insertResult={
                        isDuplicated:false,
                        responseError:false,
                        index:pokeInfo.poke_Id,
                        status:await pokeSite.insert(insertQuery,queryData)
                    };
                    return insertResult;
                })
                const promiseResult=await Promise.all(promises_temp);
                return promiseResult;
            }else return {responseError:true};
        })
        const result=await Promise.all(promises);
        return result;
    }
    res.redirect('/');
});

module.exports=router;