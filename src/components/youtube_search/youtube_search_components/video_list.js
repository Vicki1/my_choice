import React,{Component} from 'react';
import Iframe from 'react-iframe';
import {Modal} from 'react-bootstrap';

export default class VideoItem extends Component{
    constructor(){
        super()

        this.state={
            VideoList:[]
        }
    }
 
      render(){
          console.log(this.props.videos)
     

        return(
           <div className='youtTubeVideoDisplay'>
                    <br/>
                    <Iframe className="embed-responsive-item" url={`https://www.youtube.com/embed/${this.props.video.id.videoId}`}   width="200px"
        height="150px"
        display="initial"
        position="relative"
        allowFullScreen/><button className='modal-container' onClick={()=>console.log(this.props.video.id.videoId)}></button>
                    <br/>
                    
                
         </div>
        )
    }
}




  





