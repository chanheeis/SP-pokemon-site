import React,{Component,Fragment} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import Pokemon from './Pokemon';
import PageList from './PageList';
import LoadingPage from './LoadingPage';
import '../css/PokeList.css';
//페이지별로 포켓몬의 정보를 20개씩 출력하는 컴포넌트
class PokeList extends Component{
    state={
        isLoaded:false
    };

    componentDidMount=async()=>{
        const {currentPage}=this.props;
        const data=await this._APICall(currentPage);
        await this.setState({
            maxPage:data.maxPage,
            paramError:data.paramError,
            pokeList:data.result?data.result:null,
            isLoaded:true
        });
        await this.props.setMaxPage(this.state.maxPage);
    };

    componentWillReceiveProps=async(nextProps)=>{
        if(nextProps.currentPage!==this.props.currentPage){

            await this.setState({isLoaded:false});
            
            const data=await this._APICall(nextProps.currentPage);
            
            await this.setState({
                paramError:data.paramError,
                pokeList:data.result?data.result:null,
                isLoaded:true
            });
        }
    }

    _APICall=async (currentPage)=>{
        const url=`/user/list/${currentPage}`;
        const data = await fetch(url).then(res=>res.json())
        return data;
    };

    render(){
        if(this.state.isLoaded===true&&this.state.paramError===false){
            return(
                <Fragment>
                    <div id="poke-list-wrapper">
                        { 
                            this.state.pokeList.map((pokemon,index)=>{
                                return (
                                    <Pokemon 
                                        id={pokemon.poke_id} 
                                        image={pokemon.poke_image} 
                                        habitat={pokemon.habitat_name_ko}
                                        name={pokemon.poke_name_ko}
                                        types={pokemon.types}
                                        key={index}/>
                                );
                            })
                        }
                    </div>
                    <PageList/>
                </Fragment>         
            )
        }else{
            return (
                <Fragment>
                    <LoadingPage/>
                    <PageList/>
                </Fragment>
            )
        }
    }
}
const mapStateToProps=(state)=>{
    return{
        currentPage:state.currentPage
    };
}

const mapDispatchToProps=(dispatch)=>{
    return{
        setMaxPage:(maxPage)=>{dispatch(actions.setMaxPage(maxPage))}
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(PokeList);