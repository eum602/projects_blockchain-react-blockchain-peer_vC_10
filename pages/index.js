import React , {Component} from 'react';
import Layout from '../components/Layout';
import ShowLatestBlock from "../components/showLatestBlock";
import CreateBlock from '../components/createBlock';
//import { Link } from "../routes.js";

class Blockchain extends Component {
  state = {
           
  }
  
  getLastBlock = (lastBlock)=>{
    console.log('last block recibido en funcion getLastBlock del index.js', lastBlock)
    this.setState({lastBlock});
  }

  render(){
      let renderLatestBlock = () => {
        //console.log('last block en renderLatestBLock')       
        return(<ShowLatestBlock block={this.state.lastBlock}/>);
      }

    return(
      <Layout style={{ marginTop: "10px" }}>
      <CreateBlock lastBlock = {this.getLastBlock.bind(this)}/>
      {renderLatestBlock()}
      </Layout>
    );
  }
}
export default Blockchain;
