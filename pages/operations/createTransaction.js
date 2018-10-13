import React, {Component} from 'react';
import {Menu,Button,Header,Grid,Input, GridColumn} from "semantic-ui-react";
import Layout from '../../components/Layout';
import axios from 'axios';
import { Link } from "../../routes.js";
class createTransaction extends Component {
    state={
        data : new Array(5)
    }

    setData = (order,e) => {
        console.log(this.state.data);
        let data = this.state.data;
        const value = e.target.value;
        data[order]=value;
        this.setState({data});
      }

    createTx = () => {
        const newTx = this.state.data;     
        axios.post('/transaction/broadcast', {
            "amount":newTx[0],
            "sender":newTx[1],
            "recipient":newTx[2],
            "value4":newTx[3],
            "value5":newTx[4]
        })
        .then(function (response) {
            console.log('Respuesta desde el servidor: ',response);
        })
        .catch(function (error) {
            console.log('error trying to post a Transaction: ',error);
        });
    }



    render(){
        return(
            <Layout>
                <div style={{ marginTop: "10px" }}>
                <Menu>
                    <Button
                    content="Create Transaction"
                    icon="add circle"
                    labelPosition="left"
                    floated="left"
                    primary
                    onClick={this.createTx}
                    disabled = {false}
                        />

                    
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

                <Menu>      
            <Grid columns={3} style={{marginRight:"-80px",marginLeft:"2px",marginTop:"1px", marginBottom:"1px" }} >
                <Grid.Row> <Grid columns={1}><Header as='h5' style={{marginBottom:"-20px",marginLeft:"20px",marginTop:"1px"}} >
                DataSet 1:</Header></Grid> </Grid.Row>
                
                <Grid.Row style={{marginTop:"2px"}}>   
                <Grid.Column>   
                    <Input label ="Tx-data1" labelPosition='left' value = {this.state.data[0]} placeholder="enter data"
                    onChange={e=>this.setData(0,e)} ></Input>
                </Grid.Column>
                <Grid.Column>            
                    <Input label ="Tx-data2" labelPosition='left' value = {this.state.data[1]} placeholder="enter data"
                    onChange={e=>this.setData(1,e)} ></Input>
                </Grid.Column>
                <Grid.Column>            
                    <Input label ="Tx-data3" labelPosition='left' value = {this.state.data[2]} placeholder="enter data"
                    onChange={e=>this.setData(2,e)} ></Input>
                </Grid.Column>
                </Grid.Row>
                <Grid.Row>          
                <Grid.Column>            
                    <Input label ="Tx-data4" labelPosition='left' value = {this.state.data[3]} placeholder="enter data"
                    onChange={e=>this.setData(3,e)} ></Input>
                </Grid.Column>
                <Grid.Column>           
                    <Input label ="Tx-data5" labelPosition='left' value = {this.state.data[4]} placeholder="enter data"
                    onChange={e=>this.setData(4,e)} ></Input>
                </Grid.Column>          
                </Grid.Row>            
            </Grid>
            </Menu>


                </div>
            </Layout>   

        )
    }
}
export default createTransaction;