import React, { Component } from 'react';
import {API_KEY} from '../../config.js'
import YTSearch from 'youtube-api-search';
import SearchBar from './youtube_search_components/search_bar.js'
import VideoItem from  './youtube_search_components/video_list.js'
import _ from 'lodash';

//import {GoogleAuth, gapi, initClient, updateSigninStatus} from 'googleauth';

class YouTubeSearch extends Component {
  constructor(props){
    super(props);

    this.state={
      videos: [],
      selectedVideo: null
    };
    this.videoSearch=this.videoSearch.bind(this)
  }

 videolist
videoSearch(term){
   YTSearch({key: API_KEY, term:term,},(videos)=>{
  this.videolist = videos.map(video=>{
    return <VideoItem key={video.etag} video={video}/>
  });
   this.setState({
       videos: this.videolist,
       selectedVideo: videos[0]
      });
    });

}


  
  render() {
    const videoSearch=_.debounce((term)=>{this.videoSearch(term)},300);

    return (
      <div>
        <SearchBar searchForTerm={videoSearch}/>
      <div className="youTubeSearchArea">
       
       {this.state.videos}
       
       
      </div>
      </div>
    );
  }
  }





export default YouTubeSearch;