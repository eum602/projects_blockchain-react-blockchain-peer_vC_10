import React , {Component} from 'react';
import Layout from '../../components/Layout';
import { Menu , Button ,  Input , Form, Grid , Header } from 'semantic-ui-react';
import {Link} from "../../routes";
import axios from 'axios';

class ConnectUpdate extends Component {
  state = {
    
           
  }

  setData = (e) => {
    const networkNodeUrl = e.target.value;
    this.setState({networkNodeUrl:networkNodeUrl});
    console.log(this.state.networkNodeUrl);
  }

  setData1 = (e) => {
    const myNetworkNodeUrl = e.target.value;
    this.setState({myNetworkNodeUrl:myNetworkNodeUrl});
    console.log(this.state.myNetworkNodeUrl);
  }

  getChain = () => {
    const myNetworkNodeUrl = this.state.myNetworkNodeUrl;
    const networkNodeUrl = this.state.networkNodeUrl;
    axios.post('/importBlockchainInstance', {"newNodeUrl":myNetworkNodeUrl, "networkNodeUrl":networkNodeUrl})
    .then(res=>{
      console.log('response from server /importBlockchainInstance: ',res)
    })
    .catch(err =>{
      console.log('error triyng to get the block, please try with another node',err);
    })
  }

  registerNode = () => {
    const myNetworkNodeUrl = this.state.myNetworkNodeUrl;
    const networkNodeUrl = this.state.networkNodeUrl;
    console.log('data antes de enviar a /callRegisterBroadcast', "newNodeUrl",myNetworkNodeUrl,"networkNodeUrl",networkNodeUrl);
    axios.post('/callRegisterBroadcast', {"newNodeUrl":myNetworkNodeUrl, "networkNodeUrl":networkNodeUrl})
    .then(res=>{
      console.log('response from server /register-and-broadcast-node: ',res)
    })
    .catch(err =>{
      console.log('error triyng broadcast and register this node',err);
    })
  }


  render(){

    return(
      <Layout style={{ marginTop: "10px" }}>
        <Menu>
        <Menu.Menu position = "right" style={{ marginBottom: "1px" }} >      
          <Link route="/operations/mineBlock">
          <a>
             <Button
               content="Operations"
               icon="add circle"
               labelPosition="right"
               floated="right"
               primary            
               disabled = {false}
             />          
          </a>
          </Link>
        </Menu.Menu>
        </Menu>

        <Grid.Row>
          <Header as='h3' style={{marginBottom:"20px",marginLeft:"1px",marginTop:"40px"}} >
            Sincronize and Update:</Header>
          <Form>
            <Form.Input label ="Another peer NodeUrl" labelPosition='left' value = {this.state.networkNodeUrl} 
            placeholder="http://localhost:3001/"
              onChange={e=>this.setData(e)} />
            
            <Form.Input label ="YourNodeUrl" labelPosition='left' value = {this.state.myNetworkNodeUrl} 
            placeholder="http://localhost:3003/"
              onChange={e=>this.setData1(e)} />

            <Button onClick={this.getChain}>Connect </Button>            
          </Form>
        </Grid.Row>       
        
      </Layout>
    );
  }
}
export default ConnectUpdate;
