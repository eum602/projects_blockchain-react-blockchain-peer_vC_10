import Peer from 'simple-peer';
import React , {Component} from 'react';
var wrtc = require('wrtc');
import { Header } from "semantic-ui-react";
class PeersBlock extends Component{
  state={
    //p1 : Peer({trickle: false, initiator: true}),
    //peer1 : new Peer({ initiator: true, wrtc: wrtc }),
    //peer2 : new Peer({ wrtc: wrtc })
    //p2 : Peer({trickle: false})
  }
  render(){
    var peer1 = new Peer({ initiator: true, wrtc: wrtc });
    var peer2 = new Peer({ wrtc: wrtc });
    //var peer3 = new Peer({ wrtc: wrtc });
    /*
    const p1 = Peer({trickle: false, initiator: true});
    const p2 = Peer({trickle: false});
    */
    const data1=this.props.block;
    //this.state.peer1.on('signal', (data) => {
    peer1.on('signal', (data) => {
    console.log('p1 signal', data);
    peer2.signal(data);
    //peer3.signal(data);
    //this.state.peer2.signal(data)
    })

    peer2.on('signal', (data) => {
      console.log('p2 signal', data);
    peer1.signal(data);
    //peer3.signal(data);
    })
    /*
    peer3.on('signal', (data) => {
      console.log('p3 signal', data);
    peer1.signal(data);
    peer2.signal(data);
  })*/

    //peer 1 sends the data to all peers
    peer1.on('connect', () => {
    console.log('p1 connected')
    //peer1.send('Hello, p2. How are you?')
    peer1.send(data1)
    });

    //setting peer2 to receive the block
    peer2.on('data', (data) => {
    console.log('Received in Peer 2:', data.toString('utf-8'))
    peer2.send('Data received in peer1!!')
    });

    //setting peer3 to receive the block
    /*
    peer3.on('data', (data) => {
    console.log('Received', data.toString('utf-8'))
    peer3.send('Data received in peer3!!')
  });*/

/*
    p1.on('signal', (data) => console.log('p1 signal', data))
    p1.on('connect', () => console.log('p1 connected'))
    p1.on('data', (data) => console.log('p1 received', data))
    p1.on('error', (error) => console.error('p1 error', error))
    p1.on('close', () => console.log('p1 connection closed'))


    p2.on('signal', (data) => console.log('p2 signal', data))
    p2.on('connect', () => console.log('p2 connected'))
    p2.on('data', (data) => console.log('p2 received', data))
    p2.on('error', (error) => console.error('p2 error', error))
    p2.on('close', () => console.log('p2 connection closed'))
*/
    return(<div>
      <Header as='h3' style={ {marginTop: "30px"} } textAlign='center'>"Peers connected"</Header>
      </div>);
  }
}
export default PeersBlock;
