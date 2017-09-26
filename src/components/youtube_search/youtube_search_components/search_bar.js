import React,{Component} from 'react';

export default class SeachBar extends Component{
    constructor(props){
        super(props)


        this.state={
            searchTerm: ''
        }
    }


    render(){
       console.log(this.state.searchTerm)
        return(
            
            <input className='input' value={this.state.term} onChange={event=>this.changeSearchTerm(event.target.value)}/>
          
        )
    }

    changeSearchTerm(term){
     this.setState({
            searchTerm : Object.assign({},this.state,{searchTerm:term})
                        });
    this.props.searchForTerm(term);
    }
    }
