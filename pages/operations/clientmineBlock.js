import React, {Component} from 'react';
import SHA256 from "crypto-js/sha256";
import { Link } from "../../routes.js";
import {List, Menu,Button,Visibility,Grid,Input,Header} from "semantic-ui-react";
import Layout from '../../components/Layout';
import axios from 'axios';
import PendingTransactions from '../../components/pendingTransactions';
import ShowLatestBlock from '../../components/showLatestBlock';

class MineBlock extends Component {
  state = {

  }

 getPendingTransactions = ()=>{
   axios.get('/getPendingTransactions')
   .then((response)=>{
     console.log('response', response.data);
     this.setState({pending_transactions:response.data});
   })
 }

 mine = () => {
   this.setState({mining:true});
   axios.get('/mineBlock')
   .then((response)=>{
     console.log('nuevo bloque creado es:',response.data.newBlock);
     this.setState({lastBlock:response.data.newBlock,mining:response.data.mining});
   })
   .catch(err => {
     console.log('error al intentar realizar el minado: ',err);
   })
 }
  
render(){
  let renderLatestBlock = () => {
    //console.log('last block en renderLatestBLock')       
    return(<ShowLatestBlock block={this.state.lastBlock}/>);
  }
    return(
      <Layout>
        <Menu>
          <Menu.Menu position = "left" style={{ marginBottom: "2px" }}>
            <Link route="/operations/connectUpdate">
              <a>
                <Button
                  content="Connect to peers"
                  icon="add circle"
                  labelPosition="right"
                  floated="right"
                  primary           
                  disabled = {false}
                />         
              </a>
            </Link>
          </Menu.Menu >

          <Menu.Menu style={{ marginBottom: "1px", marginLeft:"0px" }} >      
              <Link route="/operations/createTransaction">
                <a>
                  <Button
                    content="Create Transaction"
                    icon="add circle"
                    labelPosition="right"
                    floated="right"
                    primary           
                    disabled = {false}
                  />         
                </a>
              </Link>
          </Menu.Menu>
          
          <Menu.Menu style={{ marginBottom: "2px" , marginLeft:"100px"}}>
            <Button
                content="Get Pending Transactions"
                icon="add circle"
                labelPosition="left"
                floated="left"
                onClick={this.getPendingTransactions}
                primary     
                disabled = {false/*this.state.created*/}
              />
              </Menu.Menu >

              <Menu.Menu position = "right" style={{ marginBottom: "1px" }}>
              <Button
                content="Mine"
                icon="add circle"
                labelPosition="right"
                floated="left"
                onClick={this.mine}
                primary
                disabled = {false/*this.state.created*/}
                loading = {this.state.mining}
              />
              </Menu.Menu>     
                
        </Menu>
        <PendingTransactions pending_transactions={this.state.pending_transactions}/>

        {renderLatestBlock()}
        
      </Layout>
        
    );

  }
}

export default MineBlock;
