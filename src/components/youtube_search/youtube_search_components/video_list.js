import React,{Component} from 'react';
import Iframe from 'react-iframe';
import {DropdownButton} from 'react-bootstrap';
import {connect} from 'react-redux';
import {saveVideo} from '../../../redux/actions.js'


 class VideoItem extends Component{
    constructor(){
        super()

        this.state={
            VideoList:[],
            collectionList: ['WEIGHTS','running','puppies']
           
        }
    this.saveToCollection=this.saveToCollection.bind(this);
    }
 
 saveToCollection(collection,videoId){
     console.log('saveToCollection recieved input', collection, videoId)
    this.props.dispatch(saveVideo(collection,videoId))
          
     
          
 }
 


      render(){
          
          const collections=this.state.collectionList
          const collectionButtons=collections.map((collection)=>{return <button key={collection} onClick={()=>this.saveToCollection(collection,this.props.video.id.videoId)}>{collection}</button>})
          console.log(this.props.heydoesitwork,'hey im getting state back from store')
        return(
           <div className='youtTubeVideoDisplay'>
                    <br/>
                    <Iframe className="embed-responsive-item" url={`https://www.youtube.com/embed/${this.props.video.id.videoId}`}   width="200px"
                    height="150px"
                    display="initial"
                    position="relative"
                    allowFullScreen/>
                    <br/>
                    <DropdownButton className='modal-container' title="Save To" id={`id_${this.props.video.id.videoId}`} onClick={()=>console.log(this.props.video.id.videoId)}>
                            {collectionButtons}
                            <button>Create New Collection</button>
                    </DropdownButton>
                    <br/>
                    
                
         </div>
        )
    }
}

function mapStateToProps(state){
    console.log(state);
    return{
        heydoesitwork: state
    }
}

export default connect(mapStateToProps)(VideoItem);



  





