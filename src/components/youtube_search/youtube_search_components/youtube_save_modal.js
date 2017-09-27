import React,{Component} from 'react';

export default class saveModal extends Component{
    constructor(props){
        super(props)

        this.setState={
                hello: 'hello'
        }
    }

    render(){
        return(
            <div className='youtube_save_modal'>
            hello this is my save modal!!!
            </div>
        )
    }
}