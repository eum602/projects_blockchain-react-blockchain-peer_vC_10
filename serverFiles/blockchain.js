const sha256 = require('sha256');
const currentNodeUrl = process.argv[3];//jalando la url contenida en el script cuando se inici esta
const uuid = require('uuid/v1');

function Blockchain(t1,t2,t3,t4,t5,t6) {
	this.chain = [];
	this.pendingTransactions = [];

	this.currentNodeUrl = currentNodeUrl; //inicializando la url del nodo
	this.networkNodes = []; //

	t = [t1,t2,t3,t4,t5,t6];
	for (let tx of t){
		//const newTx=this.createNewTransaction(tx['amount'],tx['sender'],tx['recipient'],tx['value4'],tx['value5']);
		const newTx = {
			amount: tx.amount,
			sender: tx['sender'],
			recipient: tx['recipient'],
			value4:tx['value4'],
			value5:tx['value5'],
			transactionId: uuid().split('-').join('') //adding a new attribute, latter this must be
			//sophisticated with cryptogtaphy.
		};
		this.pendingTransactions.push(newTx);
	}
	this.createNewBlock(100, '0', '0');
};


Blockchain.prototype.createNewBlock = function(nonce, previousBlockHash, hash) {
	const newBlock = {
		index: this.chain.length + 1,
		timestamp: Date.now(),
		transactions: this.pendingTransactions,
		nonce: nonce,
		hash: hash,
		previousBlockHash: previousBlockHash
	};

	this.pendingTransactions = [];
	this.chain.push(newBlock);

	return newBlock;
};


Blockchain.prototype.getLastBlock = function() {
	return this.chain[this.chain.length - 1];
};


Blockchain.prototype.createNewTransaction = function(amount, sender, recipient,value4,value5) {
	const newTransaction = {
		amount: amount,
		sender: sender,
		recipient: recipient,
		value4:value4,
		value5:value5,
		transactionId: uuid().split('-').join('') //adding a new attribute, latter this must be
		//sophisticated with cryptogtaphy.
	};
	//this.pendingTransactions.push(newTransaction);
	//return newTransaction;
	if(typeof(this.getLastBlock())=='undefined') {return 0;
	}else{
		//return this.getLastBlock()['index']+1;
		return newTransaction;
	}
	//return newTransaction;
};

Blockchain.prototype.addTransactionToPendingTransactions = function(transactionObj) {
	this.pendingTransactions.push(transactionObj);
	return this.getLastBlock()['index'] + 1;
};


Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce) {
	const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
	const hash = sha256(dataAsString);
	return hash;
};


Blockchain.prototype.proofOfWork = function(previousBlockHash, currentBlockData) {
	let nonce = 0;
	let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
	while (hash.substring(0, 6) !== '000000' && hash.substring(0, 6) !== '000001' &&
	hash.substring(0, 6) !== '000002' && hash.substring(0, 6) !== '000003' &&
	hash.substring(0, 6) !== '000004' &&
	hash.substring(0, 6) !== '000005' &&
	hash.substring(0, 6) !== '000006' &&
	hash.substring(0, 6) !== '000007' &&
	hash.substring(0, 6) !== '000008') {
		nonce++;
		hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
	}
	console.log('El nonce del pow es: ' +  hash , '..........', hash);
	return nonce;
};


Blockchain.prototype.chainIsValid = function(blockchain) { //as a parameter a chain enter into this
	//function with the name blockchain
	let validChain = true;
	for (var i = 1; i < blockchain.length; i++) {		
		const prevBlock = blockchain[i - 1];
		console.log('previous block' + ' : ',prevBlock);
		const currentBlock = blockchain[i];
		console.log('block' + i+1 + ' : ',currentBlock);
		//1. verify the hashes on every block by rehashing them and verifiying the amount of zeros.
		//const hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
		let currentBlockData = { transactions: currentBlock['transactions'], index: currentBlock['index'] };
		let previousBlockHash = prevBlock['hash'];
		const blockHash = this.hashBlock(previousBlockHash, currentBlockData,currentBlock['nonce']);
		console.log('blockHash',blockHash);
		if (blockHash.substring(0, 6) !== '000000' && blockHash.substring(0, 6) !== '000001' &&
		blockHash.substring(0, 6) !== '000002' && blockHash.substring(0, 6) !== '000003' &&
		blockHash.substring(0, 6) !== '000004' &&
		blockHash.substring(0, 6) !== '000005' &&
		blockHash.substring(0, 6) !== '000006' &&
		blockHash.substring(0, 6) !== '000007' &&
		blockHash.substring(0, 6) !== '000008' ) validChain = false;
		console.log('1. verify the hashes on every block by rehashing them and verifiying the amount of zeros: ',
		validChain);
		//2. verify the hash of the previous block hash on every current block
		if (currentBlock['previousBlockHash'] !== prevBlock['hash']) validChain = false;
		console.log('hash anterior',prevBlock['hash'],'previousBlockHash en current block',
		currentBlock['previousBlockHash'])
		console.log('2. verify the hash of the previous hash on every block: ', 
		currentBlock['previousBlockHash'] == prevBlock['hash']);
	};
	//3. verify the initial values on the genesis block
	const genesisBlock = blockchain[0];
	const correctNonce = genesisBlock['nonce'] === 100;
	const correctPreviousBlockHash = genesisBlock['previousBlockHash'] === '0';
	const correctHash = genesisBlock['hash'] === '0';
	const correctTransactions = genesisBlock['transactions'].length === 6;

	if (!correctNonce || !correctPreviousBlockHash || !correctHash || !correctTransactions) validChain = false;
	console.log('3. verify the initial values on the genesis block: ',
	correctNonce && correctPreviousBlockHash && correctHash && correctTransactions);
	return validChain;
};
/*

Blockchain.prototype.getBlock = function(blockHash) {
	let correctBlock = null;
	this.chain.forEach(block => {
		if (block.hash === blockHash) correctBlock = block;
	});
	return correctBlock;
};


Blockchain.prototype.getTransaction = function(transactionId) {
	let correctTransaction = null;
	let correctBlock = null;

	this.chain.forEach(block => {
		block.transactions.forEach(transaction => {
			if (transaction.transactionId === transactionId) {
				correctTransaction = transaction;
				correctBlock = block;
			};
		});
	});

	return {
		transaction: correctTransaction,
		block: correctBlock
	};
};


Blockchain.prototype.getAddressData = function(address) {
	const addressTransactions = [];
	this.chain.forEach(block => {
		block.transactions.forEach(transaction => {
			if(transaction.sender === address || transaction.recipient === address) {
				addressTransactions.push(transaction);
			};
		});
	});

	let balance = 0;
	addressTransactions.forEach(transaction => {
		if (transaction.recipient === address) balance += transaction.amount;
		else if (transaction.sender === address) balance -= transaction.amount;
	});

	return {
		addressTransactions: addressTransactions,
		addressBalance: balance
	};
};




*/



module.exports = Blockchain;



