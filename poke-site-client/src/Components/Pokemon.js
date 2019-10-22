import React from 'react';
import '../css/Pokemon.css';
const Pokemon = ({id,name,image,habitat,types})=>{
    return (
        <div className="pokemon">
            <p id="pokemon-id">
                {id}
            </p>
            
            <img src={image} alt={name}/>
            
            <p id="pokemon-name">
                <span className="poke-title">&#8226; 이름 :</span> {name}
            </p>

            <p id="pokemon-habitat">
                <span className="poke-title">&#8226; 서식지 : </span> {habitat?habitat:"정보 없음"}
            </p>

            <p id="pokemon-type">
                <span className="poke-title">&#8226; 타입 : </span>
                {
                    types.map((type,index)=>{
                        if(index===types.length-1){
                            return type;
                        }else{
                            return `${type},`
                        }
                    })
                }
            </p>
        </div>
    );
}
export default Pokemon;