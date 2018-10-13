import React, {Component} from 'react';
import SHA256 from "crypto-js/sha256";
//import { Link } from "../routes.js";
import {List, Menu,Button,Visibility,Grid,Input,Header} from "semantic-ui-react";
import Layout from "./Layout";
import Style from "./style";
import {Link} from "../routes.js";

class Block extends Component {
  state={
    createGenesis:false,
    data:[]
  }

  createBlock = () =>{
      const index = this.props.index1;
      const previousHash = this.props.previousHash;
      const timestamp = new Date().toLocaleString();//Date.now();//new Date().toLocaleString();////this.props.timestamp,
      const data1 = this.dataSet();
      const data2 = this.dataSet();
      const data3 = this.dataSet();
      const data4 = this.dataSet();
      const data5 = this.dataSet();
      const data6 = this.dataSet();
      const data = [data1,data2,data3,data4,data5,data6];//5000;//this.state.data;
      let nonce = this.mineBlock(index,previousHash,timestamp,data);
      const hash = this.calculateHash(index,previousHash,timestamp,data,nonce);
      let block ={index:index,previousHash:previousHash,timestamp:timestamp,data:data,hash:hash,nonce:nonce};
      this.props.onCreateBlock(block);
      if(index<1){
        this.setState({created:true});
      }
      this.setState({index:index,previousHash:previousHash,timestamp:timestamp,data:data,hash:hash,nonce:nonce});
      console.log('index en block_init: ',index);
      //console.log('')

      /*
      if(this.state.created){
        Router.pushRoute('/operations/mineBlock');
      }*/
      
  }

  calculateHash = (index,previousHash,timestamp,data,nonce) => {
        return SHA256(index + previousHash +
          timestamp + JSON.stringify(data) + nonce.toString()).toString();
    }

  dataSet = () => {
    const data = ['a','b','c','d','e'];
    return data;
  }

  mineBlock = (index,previousHash,timestamp,data) => {
    let nonce = 0;
    let hash=this.calculateHash(index,previousHash,timestamp,data,nonce);
    //hash = hash.toString().substring(0,4);
    while(hash.toString().substring(0,2)!=='00'){
      hash = this.calculateHash(index,previousHash,timestamp,data,nonce);
      nonce++;
    }
    return nonce;
  } 


render(){
  let created = this.state.created;
  return(
    <div style={{ marginTop: "10px" }}>
      <Menu>
      <Button
        content="Create Blockchain"
        icon="add circle"
        labelPosition="left"
        floated="left"
        primary
        onClick={this.createBlock}
        disabled = {this.state.created}
      />
      
        
        <Menu.Menu position = "right">       
          
          <Button
            content="Mine Block"
            icon="add circle"
            labelPosition="right"
            floated="right"
            primary
            onClick={this.createBlock}
            disabled = {!this.state.created}
          />

          <Link route="/operations/mineBlock">
          <a><div style={{ marginTop: "10px" }}>+</div></a>
          </Link>
        </Menu.Menu>        
      
      </Menu>

      <Header as='h3' style={ {marginTop: "30px"} } textAlign='center'>Data Sets: </Header>
      <Grid columns={6}>
        <Grid.Row>
          <Grid.Column>
            <Header as='h5'>DataSet 1:</Header>
            <Input value={this.dataSet()}/>
          </Grid.Column>
          <Grid.Column>
            <Header as='h5'>DataSet 2:</Header>
            <Input value={this.dataSet()}/>
          </Grid.Column>
          <Grid.Column>
            <Header as='h5'>DataSet 3:</Header>
            <Input value={this.dataSet()}/>
          </Grid.Column>
          <Grid.Column>
            <Header as='h5'>DataSet 4:</Header>
            <Input value={this.dataSet()}/>
          </Grid.Column>
          <Grid.Column>
            <Header as='h5'>DataSet 5:</Header>
            <Input value={this.dataSet()}/>
          </Grid.Column>
          <Grid.Column>
            <Header as='h5'>DataSet 6:</Header>
            <Input value={this.dataSet()}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );

  }
}

export default Block;
