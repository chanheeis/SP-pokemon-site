const mysql=require('mysql');
const queryStr=require('./query');

class Database {
    constructor(config){
        this.conn=mysql.createConnection(config);
    }

    select(query){
        return new Promise((resolve,reject)=>{
            this.conn.query(query,(err,result,fileds)=>{
                if(err) reject(err);
                resolve(result);
            })
        })
    }

    selectWithArgs(query,queryArr) {
        return new Promise((resolve,reject)=>{
            this.conn.query(query,queryArr,(err,result,fileds)=>{
                if(err) reject(err);
                resolve(result);
            })
        })
    }

    insert(query,queryOb) {
        return new Promise((resolve,reject)=>{
            this.conn.query(query,queryOb,(err,result,fileds)=>{
                if(err) reject(`Error Occured During ${query}, Error Message : ${err}`);
                resolve(true);
            })
        })
    }

    selectByHabitatType(habitat,type){
            return new Promise((resolve,reject)=>{
                const query=queryStr.selectByHabitatType(habitat,type);
                this.conn.query(query,(err,result)=>{
                    if(err) reject(`Error Occured During ${query}, Error Message : ${err}`);
                    resolve(result);
                })
            })
        }

    selectByType(type){
            return new Promise((resolve,reject)=>{
                const query=queryStr.selectByType(type);
                this.conn.query(query,(err,result)=>{
                    if(err) reject(`Error Occured During ${query}, Error Message : ${err}`);
                    resolve(result);
                })
            })
        }

    close() {
        return new Promise((resolve,reject)=>{
            this.conn.end((err)=>{
                if(err) reject(err);
                resolve();
            })
        })
    };
}

module.exports=Database;