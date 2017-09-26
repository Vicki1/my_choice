import React,{Component} from 'react';

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
                    <iframe className="embed-responsive-item" src={`https://www.youtube.com/embed/${this.props.video.id.videoId}`}></iframe>
                    <br/>
                    
                
         </div>
        )
    }
}




  





