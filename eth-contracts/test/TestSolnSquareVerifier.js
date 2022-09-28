// Test if a new solution can be added for contract - SolnSquareVerifier

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier

const truffleAssert = require('truffle-assertions');
const expect = require('chai').expect;

const solnSquareCon = artifacts.require("SolnSquareVerifier");
const verifierCon = artifacts.require("Verifier");
const jproof = require("./proof.json");

contract('SolnSquareVerifier', acc => {
    accounts = acc;
    owner = accounts[0];
    receiver = accounts[1];

    const name = "PracticeToken";
    const symbol = "PTOK";
    

    describe('See if a new solution can be added', function() {
        before(async () => {
            const verifier = await verifierCon.new({ from: owner });
            instance = await solnSquareCon.new(verifier.address, name, symbol, { from: owner });
            
        });
        
        it( 'Allow to add the new solution', async () => {
            let res = await instance.addSolutions(jproof.proof.a, jproof.proof.b, jproof.proof.c, jproof.proof.inputs, { from: owner});

            truffleAssert.eventEmitted(res, 'AddSolutions', (ev) => {
                return expect(ev.solutionAddress).to.equal(accounts[0]);
            });
        });       
    })


    describe('See if an ERC721 token can be minted', function() {
        before(async () => {
            const verifier = await verifierCon.new({ from: owner });
            instance = await solnSquareCon.new(verifier.address, name, symbol, { from: owner });
            
        });
        
        it( 'Allow ERC721 mint', async () => {
            let res = await instance.mintNFT(6, 1, receiver, { from: owner});

            truffleAssert.eventEmitted(res, 'Transfer', (ev) => {
                return expect(ev.to).to.equal(receiver) && expect(Number(ev.tokenId)).to.equal(1);
            });

            let uri = await instance.tokenURI(1, { from: receiver });
            assert.equal(uri, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "URI is incorrect");
        });

    
        
    })
})
