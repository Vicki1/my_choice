import React, {Component} from 'react';
import Collections from '../collections/collections';
import SelectedCollection from '../selected_collection/selected_collection';
import YouTubeSearch from '../youtube_search/youtube_search'

export default class MainPage extends Component{
    constructor(props){
        super(props)

            this.state={
                    loggedIn: false,
                    showLoginSignUpButton: false
            }
    }


    render(){
        return(
            <div className="mainPageDiv">
                <Collections/>
                <SelectedCollection/>
                <h2>Search YouTube Videos</h2>
                <YouTubeSearch/>
            </div>
        )
    }
}



/*<Collections/>
            </div>
              <SelectedCollection/>
              <YouTubeSearch/>*/



