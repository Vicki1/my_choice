import React,{Component} from 'react';
import {connect} from 'react-redux';
import {getCollections, createCollection} from '../../redux/main_reducer';
import {DropdownButton} from 'react-bootstrap';


class Collections extends Component{
    constructor(props){
        super(props)

        this.state={
            newCollection: ''
        }
 
    }


    render(){
        
        console.log('this is how collections is seen in collection components', this.props.collections)
        const collections=this.props.collections
        const collectionsList=collections.map((collection,i)=><button key={collection.id}>{collection.collection_name}</button>) 
        return(
           
            <div className="collectionsList">
                <DropdownButton onClick={()=>this.props.getCollections(this.props.userId)} className='modal-container' title="collections" id={`id`}>
                            {collectionsList}
                    </DropdownButton>
                    <br/>
               
                <span>New Collection: </span><input onChange={(event)=>this.setState(Object.assign({},this.state,{newCollection:event.target.value}))}/><button onClick={()=>this.props.createCollection(this.props.userId,this.state.newCollection)}></button>
            </div>
        )
    }
}



function mapStateToProps(state){
   
    return{
        collections: state.collections,
        userId: state.userId
    }
}

export default connect(mapStateToProps,{getCollections,createCollection})(Collections);
