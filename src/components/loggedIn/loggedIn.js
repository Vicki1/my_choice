import React, {Component} from 'react';
import Collections from '../collections/collections';
import SelectedCollection from '../selected_collection/selected_collection';
import YouTubeSearch from '../youtube_search/youtube_search';
import {getAuth0User} from '../../redux/main_reducer';
import {connect} from 'react-redux';
import axios from 'axios';

class MainPage extends Component{
    constructor(props){
        super(props)

            this.state={
                    
            }
    }


componentDidMount(){
axios.get('/api/user').then(resp=>{
    this.setState({
        email: resp.data.email,
        username: resp.data.username,
        name: resp.data.name,
        img: resp.data.img

        })
    })
}

    render(){
        console.log(`this is local state`,this.state)
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
function mapStateToProps(state){
   
    return{
        state: state
    }
}

export default connect(mapStateToProps,{getAuth0User})(MainPage);