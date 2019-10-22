const fetch=require('node-fetch');

async function fetchWithCatch(url){
    const res=await fetch(url).catch(err=>console.log(`Error Occured during fetch, ${err}`));
    if(res.status===200){
        return res;
    }else{
        return null;
    }
}

module.exports={
    fetchWithCatch
};