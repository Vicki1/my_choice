import React,{Component} from "react";
//import Iframe from 'react-iframe';
//import ReactDOM from 'react-dom';
//import Carousel from 'react-responsive-carousel'
import Iframe from 'react-iframe';
import {connect} from 'react-redux'; 
import {deleteVideo} from '../../redux/main_reducer.js';


class SelectedCollection extends Component{
    constructor(props){
        super(props)

        this.state={
            selectedCollection: props.selectedCollection
        }
    }

    render(){
       const selectedCollection=this.props.selectedCollection;
       const selectedCollectionDisplay=selectedCollection.map((video,i)=><div key={i}><Iframe className="embed-responsive-item" url={`https://www.youtube.com/embed/${video.video_id}`}   width="400px"
                    height="150px"
                    display="initial"
                    position="relative"
                    allowFullScreen/>
                    <br/>
                    <div className="underVideo">
                        <div>
                            <span className="underVideoDescription">{video.description}</span>
                        </div>
                        <div>
                            <button className="deleteVideoButton" onClick={()=>this.props.deleteVideo(video.id,video.collection_id) }>Delete</button>
                        </div>
                   </div>
                   </div>
                   
                  
       )
        /*var savedVideosDisplay= function(savedVideos){
                                console.log(savedVideos)
                                if(savedVideos){
                                    savedVideos.map((video,i)=>{
                                    return <Iframe key={i} className="embed-responsive-item" url={`https://www.youtube.com/embed/${video.videoId}`}   width="200px"
                                    height="150px"
                                    display="initial"
                                    position="relative"
                                    allowFullScreen/>
                                    
                                    })};
                               
                                    return 'no videos to display'
                                     
                                     }
        */
             return(
            <div className='selectedCollection'>
                 {selectedCollectionDisplay}
                 
            </div>
        )
    }
}
function mapStateToProps(state){
   
    return{
       selectedCollection : state.selectedCollection
    }
}

export default connect(mapStateToProps,{deleteVideo})(SelectedCollection);
