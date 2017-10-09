import React,{Component} from 'react';
import {connect} from 'react-redux';
import {getCollections, createCollection, selectCollection, deleteCollection} from '../../redux/main_reducer';
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
            "color":"white",
            "background": "red",
            "borderRadius": "20px"
            
        }
       
        //const collections=this.props.collections;
        const collectionsList=(this.props.collections).map((collection,i)=>
        <div className="individualCollectionDiv">
        <button className="collectionsDropdownChoices" onClick={()=>this.props.selectCollection(collection.id)} key={collection.id}>{collection.collection_name}</button>
  
        </div>
        ) 
         const deleteCollectionsList=(this.props.collections).map((collection,i)=>
        <div className="deleteIndividualCollectionDiv">
        <button className="deleteCollectionsDropdownChoices" onClick={()=>this.props.deleteCollection(collection.id,this.props.userId)} key={collection.id}>{collection.collection_name}</button>
        <button onClick={()=>deleteCollection(collection.id, this.props.userId)}>x</button>
        </div>
        ) 
        return(
           
            <div className="collectionsList">
                <DropdownButton id='collectionsDropdown'  style={buttonStyle} onClick={()=>this.props.getCollections(this.props.userId)} className='modal-container' title="My collections" id={`id`}>
                            
                            {collectionsList}
                            
                    </DropdownButton>
                    <br/>
                    <DropdownButton id='deleteCollectionsDropdown'  style={buttonStyle} onClick={()=>this.props.getCollections(this.props.userId)} className='modal-container' title="play collection as playlist" id={`id`}>
                            
                            {deleteCollectionsList}
                            
                </DropdownButton>
                <br/>
               
                <button id="createNewCollectionButton" onClick={()=>this.props.createCollection(this.props.userId,this.state.newCollection)}>create</button><input className="newCollectionName" placeholder="new collection name ..." onChange={(event)=>this.setState(Object.assign({},this.state,{newCollection:event.target.value}))}/>
                <br/>
                <DropdownButton id='deleteCollectionsDropdown'  style={buttonStyle} onClick={()=>this.props.getCollections(this.props.userId)} className='modal-container' title="delete" id={`id`}>
                            
                            {deleteCollectionsList}
                            
                </DropdownButton>
                
           
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

export default connect(mapStateToProps,{getCollections,createCollection,selectCollection,deleteCollection})(Collections);
