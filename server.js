// server.js
const Blockchain = require('./serverFiles/blockchain');
const bodyParser = require('body-parser');
const rp = require('request-promise');
const uuid = require('uuid/v1');//to simulate addresses of every miner
const port = process.argv[2];//pulling port from script
const nodeAddress = uuid().split('-').join(''); //simulating enode -this must be improved

let createdBlockchainInstance = false;
//BlockchainInstance = new Blockchain();
BlockchainInstance = [];
const next = require('next')
const routes = require('./routes')
const app = next({dev: process.env.NODE_ENV !== 'production'})
const handler = routes.getRequestHandler(app)
// With express
const express = require('express');
server =express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:false}));
app.prepare().then(() => {


  server.get('/existBlockchain',(req,res)=>{  
      res.send({createdBlockchainInstance})
  });

  server.post('/importBlockchainInstance',(req,res)=>{
    /////////////////////////////////
    if(!createdBlockchainInstance){
      const t = Array(5);
      BlockchainInstance = new Blockchain(t,t,t,t,t,t);
      createdBlockchainInstance = true;
    }    
    console.log('BlockchainInstance inicial...',BlockchainInstance);
    const networkNodeUrl = req.body.networkNodeUrl;
    const newNodeUrl = req.body.newNodeUrl;
    //registering the node
    let requestPromises = [];
    let requestOptions = {
      //uri : networkNodeUrl + '/blockchain',
      uri : newNodeUrl + '/callRegisterBroadcast',
      method : 'POST',
      body : {networkNodeUrl:networkNodeUrl,newNodeUrl:newNodeUrl},
      json : true
    };
    requestPromises.push(rp(requestOptions))
    Promise.all(requestPromises)
    ////////////////now updating chain through consensus protocol    
    .then(data=>{      
      let requestOptions = {      
        uri : newNodeUrl + '/consensus',
        method : 'GET',        
        json : true
      };
      return rp(requestOptions);
      //Promise.all(requestPromises)
    })
    .then(data=>{
      console.log('Node successfully registered and updated');        
    })
    .catch(err=>()=>{
      res.send({note:'something went wrong when importing blockchain'})
    })    
  });

  server.post('/createBlockchain',(req,res)=>{
  if(!createdBlockchainInstance) {
    const t1 = {
      "amount":req.body.amount1,
      "sender":req.body.sender1,
      "recipient":req.body.recipient1,
      "value4":req.body.value41,
      "value5":req.body.value51
    };

    const t2 = {
      "amount":req.body.amount2,
      "sender":req.body.sender2,
      "recipient":req.body.recipient2,
      "value4":req.body.value42,
      "value5":req.body.value52
    };

    const t3 = {
      "amount":req.body.amount3,
      "sender":req.body.sender3,
      "recipient":req.body.recipient3,
      "value4":req.body.value43,
      "value5":req.body.value53
    };

    const t4 = {
      "amount":req.body.amount4,
      "sender":req.body.sender4,
      "recipient":req.body.recipient4,
      "value4":req.body.value44,
      "value5":req.body.value54
    };

    const t5 = {
      "amount":req.body.amount5,
      "sender":req.body.sender5,
      "recipient":req.body.recipient5,
      "value4":req.body.value45,
      "value5":req.body.value55
    };

    const t6 = {
      "amount":req.body.amount6,
      "sender":req.body.sender6,
      "recipient":req.body.recipient6,
      "value4":req.body.value46,
      "value5":req.body.value56
    };
    

    
    BlockchainInstance = new Blockchain(t1,t2,t3,t4,t5,t6);
    createdBlockchainInstance = true;
    res.send([{alert:'blockchain_created'}]);
  }else{
    res.send([{alert:'a _blockchain has been already_created'}]);
  };
});

  server.get('/lastBlock',(req,res)=>{
    if(createdBlockchainInstance){
      const lastBlock = BlockchainInstance.getLastBlock();
    res.send(lastBlock);
  }else{
    res.send({alert:'Nothing to show'});
  }
  })

  server.get('/blockchain',(req,res)=>{
    if(createdBlockchainInstance) {      
      res.send(BlockchainInstance);
    }
    else{
      res.send({alert:'Any Blockchain exists in the network'});
    };
  })

  server.post('/transaction/attach',(req,res)=>{
    console.log('Transaction received from other peers to attach to the pending transactions in this blockchain instance',
    req.body);
    const txObj = req.body;
      if(createdBlockchainInstance){
      BlockchainInstance.addTransactionToPendingTransactions(txObj);
      res.json({note:'Transaction successfully attached to pending transactions'});
      }else{
        res.send({alert:'There is not a blockchain instance yet where you can storage this transaction'});
      }

  });

  server.post('/transaction/broadcast',(req,res)=>{
    if(createdBlockchainInstance){
      const newTxObj = BlockchainInstance.createNewTransaction(req.body.amount,req.body.sender,req.body.recipient,req.body.value4,req.body.value5);
      const index = BlockchainInstance.addTransactionToPendingTransactions(newTxObj);
      let requestPromises = [];
      BlockchainInstance.networkNodes.forEach(networkNodeUrl =>{
        let requestOptions = {
          uri : networkNodeUrl + '/transaction/attach',
          method : 'POST',
          body : newTxObj,
          json : true
        };
        requestPromises.push(rp(requestOptions))
      });
      Promise.all(requestPromises)
      .then(data=>{
        res.json({note:'Transaction created and broadcasted successfully.'});        
      })
      
    } else {
      res.send({alert:'There is not a blockchain instance yet to process your transaction'});
    }   
  });
  
  server.get('/getPendingTransactions',(req, res)=>{
    if(createdBlockchainInstance){
      res.send(BlockchainInstance.pendingTransactions);
    }else{
      res.send({alert:'There is not a blockchan instance yet where we can provide pending transactions'});
    }
    
  });

  server.get('/mineBlock',(req,res)=>{
    if(createdBlockchainInstance){
      const currentNodeUrl = BlockchainInstance.currentNodeUrl;      
      const index1 =  BlockchainInstance['chain'].length;
      //console.log('index',index1);
      const previousBlockHash = BlockchainInstance['chain'][index1-1]['hash'];
      const currentBlockData = {transactions:BlockchainInstance['pendingTransactions'],
      index:BlockchainInstance.chain[index1-1]['index']+1};
      console.log('datos de entrada para calcular el nonce: ',
      previousBlockHash,currentBlockData
      );
      const nonce = BlockchainInstance.proofOfWork(previousBlockHash,currentBlockData);
      const hash = BlockchainInstance.hashBlock(previousBlockHash, currentBlockData, nonce);
      console.log('El hash del endpoint /mineBlock es ' + hash , '................' , hash);
      const newBlock = BlockchainInstance.createNewBlock(nonce,previousBlockHash,hash);

      /*
      console.log('datos de entrada para hallar el nonce1: ',
      BlockchainInstance['chain'][index1+1-2]['hash'],
      {transactions:BlockchainInstance['chain'][index1+1-1]['transactions'],
      index:BlockchainInstance['chain'][index1+1-1]['index']}      )

      const nonce1 = BlockchainInstance.proofOfWork(BlockchainInstance['chain'][index1+1-2]['hash'],
      {transactions:BlockchainInstance['chain'][index1+1-1]['transactions'],
      index:BlockchainInstance['chain'][index1+1-1]['index']})
      const hash1 = BlockchainInstance.hashBlock(BlockchainInstance['chain'][index1+1-2]['hash'],
      {transactions:BlockchainInstance['chain'][index1+1-1]['transactions'],
      index:BlockchainInstance['chain'][index1+1-1]['index']},nonce1);
      console.log('El nonce despues de adjuntar el bloque (en el endpoint /mineBlock) es:', nonce1);
      console.log('El hash despues de adjuntar el bloque (en el endpoint /mineBlock) es:', hash1);
      */

      /////////////////////////////////////////////////////////////////////////////////////
      let requestPromises = [];
      BlockchainInstance.networkNodes.forEach(networkNodeUrl =>{
        let requestOptions = {
          uri : networkNodeUrl + '/attach-block',
          method : 'POST',
          body : {newBlock:newBlock},
          json : true
        };
        requestPromises.push(rp(requestOptions))
      });
      Promise.all(requestPromises)

      .then(data=>{
        ///////
          let requestOptions = {
            uri : currentNodeUrl + '/transaction/broadcast',
            method : 'POST',
            body : {amount:'1',sender:'origin',recipient:nodeAddress,value4:'',value5:''},
            json : true
          }        
           return rp(requestOptions);
        })        
        .then(data=>{
          res.send({newBlock:newBlock,mined:true});
        })
        .catch(err =>{
          console.log('there was an error while triying to spread miner reward transaction',err);
        })

        //////
      
      /////////////////////////////////////////////////////////////////////////////////////
      
    }else{
      res.send({alert:'There is not a blockchan instance yet where we start the mining process'});
    }
  });

  server.post('/attach-block',(req,res)=>{
    const newBlock = req.body.newBlock;
    const lastBlock = BlockchainInstance.getLastBlock();
    const same_previous_hash = newBlock.previousBlockHash === lastBlock.hash;
    console.log('new block.previousBlockHash: ',newBlock.previousBlockHash);
    console.log('las Block hash: ', lastBlock.hash);
    console.log('same_previous_hash: ',same_previous_hash);
    const correlative_index = newBlock.index === lastBlock.index + 1;
    console.log('newBlock.index: ', newBlock.index);
    console.log('lastBlock.index: ',lastBlock.index+1);
    console.log('correlative_index: ',correlative_index);
    if(same_previous_hash && correlative_index ){
      BlockchainInstance.chain.push(newBlock);
      BlockchainInstance.pendingTransactions = [];
      res.send({note:'New block received and accepted',
      newBlock:newBlock})
    }else{
      res.send('this index block have just added by another node')
    }    
  });

  server.post('/callRegisterBroadcast',(req,res)=>{
    const newNodeUrl = req.body.newNodeUrl;
    const networkNodeUrl = req.body.networkNodeUrl;
    console.log('Datos recibidos en /callRegisterNode','newNodeUrl: ',newNodeUrl , 'networkNodeUrl',networkNodeUrl);
    const arrPromise = [];
    const requestOptions = {
      uri : networkNodeUrl + '/register-and-broadcast-node',
      method : 'POST',
      body: {newNodeUrl:newNodeUrl},
      json:true
    };
    arrPromise.push(rp(requestOptions));
    Promise.all(arrPromise)
    .then(response =>{
      res.send({note:response})
    })
    .catch(err =>{
      res.send({note:err})
    })
  });

  server.post('/register-and-broadcast-node', (req,res)=>{//registering and broadcasting 
    //a new node
    const newNodeUrl = req.body.newNodeUrl;//recieving information node
    if(BlockchainInstance.networkNodes.indexOf(newNodeUrl)==-1) BlockchainInstance.networkNodes.push(newNodeUrl);//attaching the new node
    const regNodesPromises = [];//aqui se almacenaran las respuestas de cada nodo al que 
        //se le enviara el nuevo nodo a agregar.
    BlockchainInstance.networkNodes.forEach(networkNodeUrl => {        
        //register the newNodeUrl on each existing networkNodeUrl
        //para ello se usara la libreria request-promise
            /////////////////////////////////options en la request////////////////////////////////
        const requestOptions = {
            uri: networkNodeUrl + '/register-node', //en esta iteracion este el nodo al que le apunto,
            //y especificamente en el endpoint 'register-node'
            method:'POST',//metodo que voy a utilizar al apuntar a la uri de arriba, es decir quiero presentarle
            //cierta data al uri.
            body : {newNodeUrl:newNodeUrl},//data que voy a POSTEAR en la URI apuntada
            json : true //formato de envio de data en forma JSON.            
        };
            ////////////////////////////////////////////ahora enviando una request en forma de promise 
            //usando la libreria request-promise.
            regNodesPromises.push(rp(requestOptions));//almaceno la data que recibo del nodo existente 
            //al que le envié los datos del nuevo nodo.                               
    });

    //Until this point the new node has been broadcasted, now I have all the promises in an array
    //that i have received from the existing nodes on the network, 
    //so now I will use the promises by using promise.all
    Promise.all(regNodesPromises)
    .then(data => {
        //now that the returned data from the existing nodes has arrived, I will register
        //all the existing and my current node on a new node:
        const bulkRegisterOptions={
            uri:newNodeUrl+'/register-nodes-bulk',
            method:'POST',
            body:{allNetworkNodes:[...BlockchainInstance.networkNodes,BlockchainInstance.currentNodeUrl]},//haciendo que la
            //data se este separada una en cada elemento del array (...coin.networkNodes)
            json:true
        }
        return rp(bulkRegisterOptions);
    })
    .then(data=>//if the request promise is sent successfully to the new node,
        //I will pass to this step
        res.json({note:'New node successfully registered on the network'})
    )
    .catch(error =>{
        res.json({note:'Something went wrong'})
        console.log('error :',error);
    })

});

server.post('/register-node',(req,res)=>{
    const newNodeUrl = req.body.newNodeUrl;
    const nodeNotAlreadyPresent = BlockchainInstance.networkNodes.indexOf(newNodeUrl) == -1;
    const  notCurrentNode = BlockchainInstance.currentNodeUrl.indexOf(newNodeUrl) ==-1;
    if(nodeNotAlreadyPresent && notCurrentNode)BlockchainInstance.networkNodes.push(newNodeUrl);
    res.json({note:'new node successfully registered'});
});

server.post('/register-nodes-bulk',(req,res)=>{
    const allNetworkNodes = req.body.allNetworkNodes;       
    allNetworkNodes.forEach(networkNodeUrl => {
        const nodeNotAlreadyPresent = BlockchainInstance.networkNodes.indexOf(networkNodeUrl)==-1;
        const  notCurrentNode = BlockchainInstance.currentNodeUrl.indexOf(networkNodeUrl) ==-1;
        if(nodeNotAlreadyPresent && notCurrentNode) BlockchainInstance.networkNodes.push(networkNodeUrl);
    }
    );

    res.json({note:'Bulk registration successful'});

});

server.get('/validateChain',(req,res)=>{
  if(createdBlockchainInstance){
    const valid = BlockchainInstance.chainIsValid(BlockchainInstance.chain);
    res.send({note:'is the blockchain valid?: ' + valid});

  }else{
    res.send({note:'the blockchain not exist'});
  }

});

server.get('/consensus',(req,res)=>{

  if(createdBlockchainInstance){  
    const networkNodes = BlockchainInstance.networkNodes;
    const requestPromises = [];
    networkNodes.forEach(networkNodeUrl =>{
      requestOptions = {
        uri:networkNodeUrl + '/blockchain',
        method:'GET',
        json:true
      }
      requestPromises.push(rp(requestOptions));
    });
    Promise.all(requestPromises)
    .then(blockchains => {
      let maxChainLength = BlockchainInstance.chain.length;
      console.log('BlockchainInstance.chain.length',BlockchainInstance.chain.length);//ok
      let newLongestChain = null;
      let newPendingTransactions = null;
      blockchains.forEach(blockchain => {
        console.log('blockchain recibido de otro nodo: ', blockchain);
        console.log('blockchain.chain.length: ',blockchain.chain.length);
        if(blockchain.chain.length>maxChainLength){
          console.log('aqui');
          maxChainLength =blockchain.chain.length;
          newLongestChain = blockchain.chain;
          newPendingTransactions = blockchain.pendingTransactions;
        }
      });

      console.log('newLongestChain: ',newLongestChain);
      //'chainIsValid: ',BlockchainInstance.chainIsValid(newLongestChain));
      //si agrego esta linea de codigo entonces habrá errores, porque newLongestChain 
      //solo tomara un valor válido si y solo si la cadena nueva es mayor que la que tengo.


      if(!newLongestChain || (newLongestChain && !BlockchainInstance.chainIsValid(newLongestChain)) ){
        //si no hay ninguna cadena mas larga o si se halló dicha cadena pero resulta invalida
        res.json({note:'Current chain has not been replaced',
                  chain: BlockchainInstance.chain})
      }
      else if(newLongestChain && BlockchainInstance.chainIsValid(newLongestChain)){
        BlockchainInstance.chain = newLongestChain;
        BlockchainInstance.pendingTransactions = newPendingTransactions;
        res.json({note:'Current chain has been replaced',
                  chain: BlockchainInstance.chain
        })
      };
    })  
    .catch(err => {
      console.log('there was a error trying to make the consensus algorithm ' + err);
      res.send({alert:'there was a error trying to make the consensus algorithm ' + err})
    })
  }else{
    res.json({note:'No blockchain instance has been initiated yet'});
  }
});
  server.use(handler).listen(port)
})
