import React,{Component} from 'react';
import {connect} from 'react-redux';
import '../css/PokeInfo.css';

class PokeInfo extends Component {
    state={
        pokeName:this.props.pokeName,
        paramError:null,
        pokeInfo:null,
        isLoaded:false
    };

    componentDidMount=async()=>{
        const pokeName=this.state.pokeName;
        const response=await this._APICall(pokeName);
        await this.setState({
            paramError:response.paramError,
            pokeInfo:response.pokeInfo?response.pokeInfo:null,
            isLoaded:true
        });
    };

    componentWillReceiveProps=async(nextProps)=>{
        if(nextProps.pokeName!==this.state.pokeName){
            await this.setState({
                pokeName:nextProps.pokeName
            });
            const pokeName=this.state.pokeName;
            const response=await this._APICall(pokeName);
            await this.setState({
                paramError:response.paramError,
                pokeInfo:response.pokeInfo?response.pokeInfo:null,
                isLoaded:true
            });
        };
    }

    _APICall=async (pokeName)=>{
        const url=`/user/search/${pokeName}`;
        let res=await fetch(url);
        res=await res.json();
        return res;
    };
    
    render(){
        const {paramError,isLoaded,pokeInfo,pokeName}=this.state;
        if(paramError&&isLoaded){
            return(
                <div id="poke-info">
                    <img
                        src={pokeInfo[0].poke_image}
                        alt={pokeName}
                    />
                    
                    <p>
                        <span className="info-title">&#8226; 이름 : </span>
                        <span id="poke-info-name">{pokeName}</span></p>
                    <p>
                        <span className="info-title">&#8226; 키 : </span>
                        <span id="poke-info-height">{pokeInfo[0].poke_height}</span></p>
                    <p>
                        <span className="info-title">&#8226; 무게 : </span>
                        <span id="poke-info-weight">{pokeInfo[0].poke_weight}</span></p>
                    <p><span className="info-title">&#8226; 타입 : </span>{
                        pokeInfo.map((pokemon,index)=>{
                            if(index!==pokeInfo.length-1){
                                return (
                                    <span id="poke-info-types">{pokemon.type_name_ko},</span>
                                )
                            }else{
                                return (
                                    <span id="poke-info-types">{pokemon.type_name_ko}</span>
                                )
                            }
                            
                        })
                    }</p>
                </div>
            )
        }else{
            return "Loading...";
        } 
    }
}
const mapStateToProps=(state)=>{
    return{
        pokeName:state.currentPokeName
    };
}
export default connect(mapStateToProps)(PokeInfo);