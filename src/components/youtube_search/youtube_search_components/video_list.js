import React,{Component} from 'react';
import Iframe from 'react-iframe';
import {DropdownButton} from 'react-bootstrap';
import {connect} from 'redux';


 class VideoItem extends Component{
    constructor(){
        super()

        this.state={
            VideoList:[],
            collectionList: ['weights','running','puppies']
           
        }
    this.saveToCollection=this.saveToCollection.bind(this);
    }
 
 saveToCollection(collection,videoId){
     console.log(collection,videoId)
    return{
        type: 'save',
        payload: {
            collection: collection,
            video: videoId,
            
        }
          }
     
          
 }
 


      render(){
          console.log(this.props.videos)
          const collections=this.state.collectionList
          const collectionButtons=collections.map((collection)=>{return <button key={collection} onClick={()=>this.saveToCollection(collection,this.props.video.id.videoId)}>{collection}</button>})
        return(
           <div className='youtTubeVideoDisplay'>
                    <br/>
                    <Iframe className="embed-responsive-item" url={`https://www.youtube.com/embed/${this.props.video.id.videoId}`}   width="200px"
        height="150px"
        display="initial"
        position="relative"
        allowFullScreen/><DropdownButton className='modal-container' title="Save To" id={`id_${this.props.video.id.videoId}`} onClick={()=>console.log(this.props.video.id.videoId)}>
                            {collectionButtons}
                        </DropdownButton>
                    <br/>
                    
                
         </div>
        )
    }
}

function mapStateToProps(state){
    return{
        alreadysave: state.savedVideos
    }
}

export default connect(mapStateToProps,null),(VideoItem);



  





