import React,{Component} from 'react';
import Iframe from 'react-iframe';
import {DropdownButton} from 'react-bootstrap';
import {connect} from 'react-redux';
import {saveVideo,getCollections} from '../../../redux/main_reducer.js';


 class VideoItem extends Component{
    constructor(){
        super()

        this.state={
            VideoList:[],
            description: '',
           
        }
    this.saveToCollection=this.saveToCollection.bind(this);
    
    }
 
 saveToCollection(collection,videoId){
     this.props.dispatch(saveVideo(this.props.userId,collection,videoId,'this is my new video description!!'))
 }



      render(){
          console.log(this.state)
  const collections=this.props.collections
        const collectionsList=collections.map((collection,i)=><li key={collection.id} ><button id={`${collection.id}SaveButton`} onClick={()=>this.props.saveVideo(this.props.userId, collection.id, this.props.video.id.videoId,this.state.description)}>{collection.collection_name}</button></li>) 
          
 
 

        return(
           <div className='youtTubeVideoDisplay'>
                    <br/>
                    <Iframe className="embed-responsive-item" url={`https://www.youtube.com/embed/${this.props.video.id.videoId}`}   width="400px"
                    height="150px"
                    display="initial"
                    position="relative"
                    allowFullScreen/>
                    <br/>
                    <input placeholder="Your Description ..." onChange={(event)=>this.setState(Object.assign({},this.state,{ description: event.target.value }))}/>;
                    <DropdownButton onClick={()=>{this.props.getCollections(this.props.userId)}} className='modal-container' title="Save To" id={`id_${this.props.video.id.videoId}`}>
                           
                            {collectionsList}
                            
                    </DropdownButton>
                    <br/>
                    
                
         </div>
        )
    }
}

function mapStateToProps(state){
   
    return{
        heydoesitwork: state,
        userId : state.userId,
        collections: state.collections
    }
}

export default connect(mapStateToProps,{getCollections,saveVideo})(VideoItem);



  





