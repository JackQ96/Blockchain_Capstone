# Udacity Blockchain Capstone

Capstone is the final project for the Udacity Blockchain Nano Degree. This project focused on creating smart contracts to be able to mint your own ERC721 tokens to represent properties for sale. During this project I made use of Zocrates(ZK-SNARK) and Docker to be able to verify ownership without having to provide any confidential details about the property. Finally, I minted 10 tokens onto Rinkeby test net (using MyEtherWallet) and listed 5 of them on Opensea marketplace.

## Versions

```
Truffle v5.0.24 (core: 5.0.24)
Solidity - 0.5.1 (solc-js)
Node v12.22.12
Web3.js v1.0.0-beta.37
```

## Get Started

1) Firstly clone the repo:

```
git clone https://github.com/udacity/Blockchain-Capstone.git
```
2) cd into the project so that you can download the prerequisites and run the code.

```
cd Blockchain_Capstone/eth-contracts
```

3) Install dependencies

```
npm install
```

4) Compile contracts

```
truffle compile
```

5) Run ganache-cli

```
open a new tab in your terminal and enter ganache-cli
```

6) Migrate the contracts locally

```
truffle migrate --network development --reset
```



## Running tests


To test the ERC721 functionality, run:

```
truffle test ./test/TestERC721Mintable.js
```

To test ZK, run:

```
truffle test ./test/TestSquareVerifier.js
```

To Test minting with ZKSnarks, run:

```
truffle test ./test/TestSolnSquareVerifier.js
```


##Deployment

Contract Address: 0x0d3A736E6657516DCc37D877B19107839a3D4Db0
URL: https://rinkeby.etherscan.io/address/0x0d3a736e6657516dcc37d877b19107839a3d4db0

Open sea Tokens:

1)
2)
3)
4)
5)



# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
