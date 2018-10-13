import React , {Component} from 'react';
import {Header} from "semantic-ui-react";

class ShowChain extends Component{
  render(){
    let {index,previousHash,timestamp,data,hash,nonce} = this.props.block;


    return(
      <div>
      <Header as='h4' style={ {marginTop: "30px"} } textAlign='left'>Block {index + 1} has been created: </Header>
        [{index},{previousHash},{timestamp},{data},{hash},{nonce}]
      </div>
    )

  }
}

export default ShowChain;
