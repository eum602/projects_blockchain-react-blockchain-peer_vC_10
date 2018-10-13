import React, {Component} from 'react';
//import { Link } from "../routes.js";
import {Menu,Button,Header,Grid,Input, GridColumn} from "semantic-ui-react";
import axios from 'axios';
import {Link} from "../routes";


class CreateBlock extends Component {  

  state = { 
    blockchain:[],    
    data : new Array(30) 
  }

   /*getting initial props */
   componentDidMount(){    
    axios.get('existBlockchain')        
    .then(result =>{
      console.log('El servidor responde que la blockchain (existe/no existe):(true/false)',result);      
      const createdBlockchainInstance=result.data.createdBlockchainInstance;
      this.setState({createdBlockchainInstance});
    }).catch(error =>{
      console.log('error trying to get the blckchain instance status',error);
    });    
  }



  createBlockchain = () => {  
    let lastBlock;
    const newTx = this.state.data;

    /*
    fetch('/createBlockchain')//catching data from my server node
        .then(res => res.json())
        .then(blockchain => {
          console.log('fetched block:',blockchain);
          newChain = blockchain;
          //this.setState({blockchain})
        })
        */
     axios.post('/createBlockchain', {     

      "amount1":newTx[0],
      "sender1":newTx[1],
      "recipient1":newTx[2],
      "value41":newTx[3],
      "value51":newTx[4],

      "amount2":newTx[5],
      "sender2":newTx[6],
      "recipient2":newTx[7],
      "value42":newTx[8],
      "value52":newTx[9],

      "amount3":newTx[10],
      "sender3":newTx[11],
      "recipient3":newTx[12],
      "value43":newTx[13],
      "value53":newTx[14],


      "amount4":newTx[15],
      "sender4":newTx[16],
      "recipient4":newTx[17],
      "value44":newTx[18],
      "value54":newTx[19],

      "amount5":newTx[20],
      "sender5":newTx[21],
      "recipient5":newTx[22],
      "value45":newTx[23],
      "value55":newTx[24],

      "amount6":newTx[25],
      "sender6":newTx[26],
      "recipient6":newTx[27],
      "value46":newTx[28],
      "value56":newTx[29]

      
    })
    .then(function (response) {
        console.log('Respuesta desde el servidor: ',response);        
    }).then(response =>{
      //this.setState({createdBlockchainInstance})
      console.log('respuesta desde el servidor al crear la blockchain', response);
    })
    .catch(function (error) {
        console.log('error when trying to create an instance of a Blockchain: ',error);
    });
    
    
    axios.get('/lastBlock')
    //.then(res => res.json())
    .then(result => {
      console.log('Bloque de entrada',result);
      console.log('bloque de envio desde fcn createBlockchain en component createBlock hacia index.js',result.data);
      this.props.lastBlock(result.data);
      //lastBlock = block;
      //this.setState({block})
  })
  //this.setState({blockchain:newChain , lastBlock:lastBlock});
  //console.log('bloque de envio desde fcn createBlockchain en component createBlock hacia index.js',lastBlock);
  //this.props.lastBlock(lastBlock)
}

setData = (order,e) => {
  console.log(this.state.data);
  let data = this.state.data;
  const value = e.target.value;
  data[order]=value;
  this.setState({data});
}


render(){
  return(
    <div style={{ marginTop: "10px" }}>
      <Menu>
      <Menu.Menu position = "left" style={{ marginBottom: "2px" }} >      
      <Button
        content="Create Blockchain"
        icon="add circle"
        labelPosition="left"
        floated="left"
        primary
        onClick={this.createBlockchain}
        disabled = {this.state.createdBlockchainInstance}
      />
      </Menu.Menu>
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

      <Header as='h3' style={ {marginTop: "30px"} } textAlign='center'>Data Sets: </Header>
      
      <Menu>      
      <Grid columns={3} style={{marginRight:"-80px",marginLeft:"2px",marginTop:"1px", marginBottom:"1px" }} >
        <Grid.Row> <Grid columns={1}><Header as='h5' style={{marginBottom:"-20px",marginLeft:"20px",marginTop:"1px"}} >
        DataSet 1:</Header></Grid> </Grid.Row>
        
        <Grid.Row style={{marginTop:"2px"}}>          
          <Grid.Column>   
            <Input label ="Tx1-data1" labelPosition='left' value = {this.state.data[0]} placeholder="enter data"
             onChange={e=>this.setData(0,e)} ></Input>
          </Grid.Column>
          <Grid.Column>            
            <Input label ="Tx1-data2" labelPosition='left' value = {this.state.data[1]} placeholder="enter data"
             onChange={e=>this.setData(1,e)} ></Input>
          </Grid.Column>
          <Grid.Column>            
            <Input label ="Tx1-data3" labelPosition='left' value = {this.state.data[2]} placeholder="enter data"
             onChange={e=>this.setData(2,e)} ></Input>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>          
          <Grid.Column>            
            <Input label ="Tx1-data4" labelPosition='left' value = {this.state.data[3]} placeholder="enter data"
             onChange={e=>this.setData(3,e)} ></Input>
          </Grid.Column>
          <Grid.Column>           
            <Input label ="Tx1-data5" labelPosition='left' value = {this.state.data[4]} placeholder="enter data"
             onChange={e=>this.setData(4,e)} ></Input>
          </Grid.Column>          
        </Grid.Row>            
      </Grid>
      </Menu>

      <Menu>      
      <Grid columns={3} style={{marginRight:"-80px",marginLeft:"2px",marginTop:"1px", marginBottom:"1px" }} >
        <Grid.Row> <Grid columns={1}><Header as='h5' style={{marginBottom:"-20px",marginLeft:"20px",marginTop:"1px"}} >
        DataSet 2:</Header></Grid> </Grid.Row>
        
        <Grid.Row style={{marginTop:"2px"}}>          
          <Grid.Column>   
            <Input label ="Tx2-data1" labelPosition='left' value = {this.state.data[5]} placeholder="enter data"
             onChange={e=>this.setData(5,e)} ></Input>
          </Grid.Column>
          <Grid.Column>            
            <Input label ="Tx2-data2" labelPosition='left' value = {this.state.data[6]} placeholder="enter data"
             onChange={e=>this.setData(6,e)} ></Input>
          </Grid.Column>
          <Grid.Column>            
            <Input label ="Tx2-data3" labelPosition='left' value = {this.state.data[7]} placeholder="enter data"
             onChange={e=>this.setData(7,e)} ></Input>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>          
          <Grid.Column>            
            <Input label ="Tx2-data4" labelPosition='left' value = {this.state.data[8]} placeholder="enter data"
             onChange={e=>this.setData(8,e)} ></Input>
          </Grid.Column>
          <Grid.Column>            
            <Input label ="Tx2-data5" labelPosition='left' value = {this.state.data[9]} placeholder="enter data"
             onChange={e=>this.setData(9,e)} ></Input>
          </Grid.Column>

        </Grid.Row>            
      </Grid>
      </Menu>


      <Menu>      
      <Grid columns={3} style={{marginRight:"-80px",marginLeft:"2px",marginTop:"1px", marginBottom:"1px" }} >
        <Grid.Row> <Grid columns={1}><Header as='h5' style={{marginBottom:"-20px",marginLeft:"20px",marginTop:"1px"}} >
        DataSet 3:</Header></Grid> </Grid.Row>
        
        <Grid.Row style={{marginTop:"2px"}}>          
          <Grid.Column>   
            <Input label ="Tx3-data1" labelPosition='left' value = {this.state.data[10]} placeholder="enter data"
             onChange={e=>this.setData(10,e)} ></Input>
          </Grid.Column>
          <Grid.Column>            
            <Input label ="Tx3-data2" labelPosition='left' value = {this.state.data[11]} placeholder="enter data"
             onChange={e=>this.setData(11,e)} ></Input>
          </Grid.Column>
          <Grid.Column>            
            <Input label ="Tx3-data3" labelPosition='left' value = {this.state.data[12]} placeholder="enter data"
             onChange={e=>this.setData(12,e)} ></Input>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>          
          <Grid.Column>            
            <Input label ="Tx3-data4" labelPosition='left' value = {this.state.data[13]} placeholder="enter data"
             onChange={e=>this.setData(13,e)} ></Input>
          </Grid.Column>
          <Grid.Column>            
            <Input label ="Tx3-data5" labelPosition='left' value = {this.state.data[14]} placeholder="enter data"
             onChange={e=>this.setData(14,e)} ></Input>
          </Grid.Column>          
        </Grid.Row>            
      </Grid>
      </Menu>

            <Menu>      
      <Grid columns={3} style={{marginRight:"-80px",marginLeft:"2px",marginTop:"1px", marginBottom:"1px" }} >
        <Grid.Row> <Grid columns={1}><Header as='h5' style={{marginBottom:"-20px",marginLeft:"20px",marginTop:"1px"}} >
        DataSet 4:</Header></Grid> </Grid.Row>
        
        <Grid.Row style={{marginTop:"2px"}}>          
          <Grid.Column>   
            <Input label ="Tx4-data1" labelPosition='left' value = {this.state.data[15]} placeholder="enter data"
             onChange={e=>this.setData(15,e)} ></Input>
          </Grid.Column>
          <Grid.Column>            
            <Input label ="Tx4-data2" labelPosition='left' value = {this.state.data[16]} placeholder="enter data"
             onChange={e=>this.setData(16,e)} ></Input>
          </Grid.Column>
          <Grid.Column>            
            <Input label ="Tx4-data3" labelPosition='left' value = {this.state.data[17]} placeholder="enter data"
             onChange={e=>this.setData(17,e)} ></Input>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>          
          <Grid.Column>            
            <Input label ="Tx4-data4" labelPosition='left' value = {this.state.data[18]} placeholder="enter data"
             onChange={e=>this.setData(18,e)} ></Input>
          </Grid.Column>
          <Grid.Column>            
            <Input label ="Tx4-data5" labelPosition='left' value = {this.state.data[19]} placeholder="enter data"
             onChange={e=>this.setData(19,e)} ></Input>
          </Grid.Column>          
        </Grid.Row>            
      </Grid>
      </Menu>

      <Menu>      
      <Grid columns={3} style={{marginRight:"-80px",marginLeft:"2px",marginTop:"1px", marginBottom:"1px" }} >
        <Grid.Row> <Grid columns={1}><Header as='h5' style={{marginBottom:"-20px",marginLeft:"20px",marginTop:"1px"}} >
        DataSet 5:</Header></Grid> </Grid.Row>
        
        <Grid.Row style={{marginTop:"2px"}}>          
          <Grid.Column>   
            <Input label ="Tx5-data1" labelPosition='left' value = {this.state.data[20]} placeholder="enter data"
             onChange={e=>this.setData(20,e)} ></Input>
          </Grid.Column>
          <Grid.Column>            
            <Input label ="Tx5-data2" labelPosition='left' value = {this.state.data[21]} placeholder="enter data"
             onChange={e=>this.setData(21,e)} ></Input>
          </Grid.Column>
          <Grid.Column>            
            <Input label ="Tx5-data3" labelPosition='left' value = {this.state.data[22]} placeholder="enter data"
             onChange={e=>this.setData(22,e)} ></Input>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>          
          <Grid.Column>            
            <Input label ="Tx5-data4" labelPosition='left' value = {this.state.data[23]} placeholder="enter data"
             onChange={e=>this.setData(23,e)} ></Input>
          </Grid.Column>
          <Grid.Column>            
            <Input label ="Tx5-data5" labelPosition='left' value = {this.state.data[24]} placeholder="enter data"
             onChange={e=>this.setData(24,e)} ></Input>
          </Grid.Column>          
        </Grid.Row>            
      </Grid>
      </Menu> 

      <Menu>      
      <Grid columns={3} style={{marginRight:"-80px",marginLeft:"2px",marginTop:"1px", marginBottom:"1px" }} >
        <Grid.Row> <Grid columns={1}><Header as='h5' style={{marginBottom:"-20px",marginLeft:"20px",marginTop:"1px"}} >
        DataSet 6:</Header></Grid> </Grid.Row>
        
        <Grid.Row style={{marginTop:"2px"}}>          
          <Grid.Column>   
            <Input label ="Tx6-data1" labelPosition='left' value = {this.state.data[25]} placeholder="enter data"
             onChange={e=>this.setData(25,e)} ></Input>
          </Grid.Column>
          <Grid.Column>            
            <Input label ="Tx6-data2" labelPosition='left' value = {this.state.data[26]} placeholder="enter data"
             onChange={e=>this.setData(26,e)} ></Input>
          </Grid.Column>
          <Grid.Column>            
            <Input label ="Tx6-data3" labelPosition='left' value = {this.state.data[27]} placeholder="enter data"
             onChange={e=>this.setData(27,e)} ></Input>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>          
          <Grid.Column>            
            <Input label ="Tx6-data4" labelPosition='left' value = {this.state.data[28]} placeholder="enter data"
             onChange={e=>this.setData(28,e)} ></Input>
          </Grid.Column>
          <Grid.Column>            
            <Input label ="Tx6-data5" labelPosition='left' value = {this.state.data[29]} placeholder="enter data"
             onChange={e=>this.setData(29,e)} ></Input>
          </Grid.Column>          
        </Grid.Row>            
      </Grid>
      </Menu>    


    </div>
  );

  }
}

export default CreateBlock;
