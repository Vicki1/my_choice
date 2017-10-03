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
            collectionList: ['running','puppies']
            
        }
    this.saveToCollection=this.saveToCollection.bind(this);
    }
 
 saveToCollection(collection,videoId){
     
    this.props.dispatch(saveVideo(this.props.userId,collection,videoId,'this is my new video description!!'))
          
     
          
 }
 


      render(){
          
  const collections=this.props.collections
        const collectionsList=collections.map((collection,i)=><button key={collection.id}>{collection.collection_name}</button>) 
          
        return(
           <div className='youtTubeVideoDisplay'>
                    <br/>
                    <Iframe className="embed-responsive-item" url={`https://www.youtube.com/embed/${this.props.video.id.videoId}`}   width="200px"
                    height="150px"
                    display="initial"
                    position="relative"
                    allowFullScreen/>
                    <br/>
                    <DropdownButton onClick={()=>this.props.getCollections(this.props.userId)} className='modal-container' title="Save To" id={`id_${this.props.video.id.videoId}`}>
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

export default connect(mapStateToProps,{getCollections})(VideoItem);



  





