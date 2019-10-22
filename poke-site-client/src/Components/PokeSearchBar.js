import React,{Component} from 'react';
import * as actions from '../actions/index';
import {connect} from 'react-redux';
import '../css/PokeSearchBar.css';

class PokeSearchBar extends Component {
    state={
        searchKeyword:"",
    }

    handleChange=(event)=>{
        this.setState({
            searchKeyword:event.target.value
        });
    }

    handleSubmit=(event)=>{
        event.preventDefault();
        this.props.handlePokeName(this.state.searchKeyword)
    }

    render(){
        return(
            <div id="poke-search-bar">
                <form method="GET" onSubmit={this.handleSubmit}>
                    <p>Search</p>
                    <input 
                        autoComplete="false"
                        value={this.state.searchKeyword} 
                        type="text" 
                        name="pokeName" 
                        onChange={this.handleChange}/>                
                    <input 
                        value=""
                        type="submit" 
                    />
                </form>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        currentPokeName:state.currentPokeName,
    }
};

const mapDispatchToProps=(dispatch)=>{
    return {
        handlePokeName:(pokeName)=>{dispatch(actions.changePokeName(pokeName))}
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(PokeSearchBar);