const express=require('express');
const router=express.Router();

//Database 관련 설정
const config=require('../config').database;
const Database=require('../class/Database');
const pokeSite=new Database(config);

//Util 관련 설정
const userUtil=require('./user.util');

router.get('/list/:page',async (req,res)=>{
    let query=`SELECT COUNT(*) as count FROM poke_info`;
    const count=await pokeSite.select(query);
    const maxPage=Math.ceil(count[0].count/20);
    
    const currentPage=parseInt(req.params.page);
    const paramError=userUtil.isParamError(currentPage,maxPage);
    
    if(paramError){
        res.json({paramError})
    }else{
        const result=await userUtil.selectPokeList(currentPage);
        const response={
            paramError,
            maxPage,
            result
        };
        res.json(response);
    }
});

router.get('/search/:name',async (req,res)=>{
    const pokeName=req.params.name;
    const paramError=await userUtil.isPokeName(pokeName);

    if(paramError===false){
        res.json({paramError})
    }else{
        const pokeInfo=await userUtil.selectPokeByName(pokeName);
        const response={
            paramError,
            pokeInfo
        };
        res.json(response);
    }
})

//Response json data from simple pokemon survey 
router.post('/survey',async (req,res)=>{
    const {isSanitary,isActive,isIndependent,isMeek,isExtrovert,isCurious,isUnusual}=req.body;

    const habitat={},type={};
    habitat.isSanitary=isSanitary==="true"?true:false;
    habitat.isActive=isActive==="true"?true:false;
    habitat.isIndependent=isIndependent==="true"?true:false;

    type.isMeek=isMeek==="true"?true:false;
    type.isExtrovert=isExtrovert==="true"?true:false;
    type.isCurious=isCurious==="true"?true:false;
    type.isUnusual=isUnusual==="true"?true:false;
    
    let result=await pokeSite.selectByHabitatType(habitat,type);
    if(result.length===0){
       result=await pokeSite.selectByType(type); 
    }

    res.json(result);
})

module.exports=router;