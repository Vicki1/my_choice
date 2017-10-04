import React,{Component} from 'react';
import {connect} from 'react-redux';
import {getCollections, createCollection, selectCollection} from '../../redux/main_reducer';
import {DropdownButton} from 'react-bootstrap';



class Collections extends Component{
    constructor(props){
        super(props)

        this.state={
            newCollection: ''
           
        }
 
    }


    render(){
        const buttonStyle={
            "background":"rgb(247, 158, 2)",
            "border-radius": "15px",
            "border": "none",
            "box-shadow":" 1px 1px 1px rgb(27, 156, 229)",
            "color":"white",
            "text-shadow":" 1px 1px rgb(27, 156, 229)"
          
        }
    
       const collections=this.props.collections;
        const collectionsList=collections.map((collection,i)=><button className="collectionsDropdownChoices" onClick={()=>this.props.selectCollection(collection.id)} key={collection.id}>{collection.collection_name}</button>) 
        return(
           
            <div className="collectionsList">
                <DropdownButton className='collectionsDropdown' style={buttonStyle} onClick={()=>this.props.getCollections(this.props.userId)} className='modal-container' title="collections" id={`id`}>
                            <button>New Collection</button>
                            {collectionsList}
                            
                    </DropdownButton>
                    <br/>
               
                <input placeholder="new collection" onChange={(event)=>this.setState(Object.assign({},this.state,{newCollection:event.target.value}))}/><button style={buttonStyle} onClick={()=>this.props.createCollection(this.props.userId,this.state.newCollection)}>create</button>
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

export default connect(mapStateToProps,{getCollections,createCollection,selectCollection})(Collections);
