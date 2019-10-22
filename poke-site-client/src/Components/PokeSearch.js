import React,{Component} from 'react';
import {connect} from 'react-redux';
import PokeSearchBar from './PokeSearchBar';
import PokeInfo from './PokeInfo';
import '../css/PokeSearch.css';

class PokeSearch extends Component {
    render(){
        const pokeName=this.props.pokeName;
        let pokeInfo;
        if(pokeName===""){
            pokeInfo="";
        }else{
            pokeInfo=<PokeInfo pokeName={pokeName}/>
        }
        return(
            <div id="poke-search-wrapper">
                <PokeSearchBar/>
                {pokeInfo}
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        pokeName:state.currentPokeName
    };    
};

export default connect(mapStateToProps)(PokeSearch); 

//connect(mapStateToProps,mapDispatchToProps)(PokeSearch);