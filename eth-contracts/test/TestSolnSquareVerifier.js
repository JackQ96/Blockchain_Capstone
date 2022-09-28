const jproof = require("./proof.json");
const solnSquareCon = artifacts.require('SolnSquareVerifier');
const verifierCon = artifacts.require("Verifier");


contract('SolnSquareVerifier', acc => {

    accounts = acc;
    owner = accounts[0];
    receiver = accounts[1];

    const name = "PracticeToken";
    const symbol = "PTOK";



    describe('See if a new solution can be added', function () {
        beforeEach(async function () {
            const verifier = await verifierCon.new({from: owner});
            this.instance = await solnSquareCon.new(verifier.address, name, symbol, {from: owner});

        })

        it('Allow to add the new solution', async function () {
          let res = await this.instance.addToArray(jproof.proof.A, jproof.proof.A_p, jproof.proof.B, jproof.proof.B_p, jproof.proof.C, jproof.proof.C_p, jproof.proof.H, jproof.proof.K, jproof.proof.input,{ from: receiver });
          assert.equal(res.logs[0].args[1], receiver,"Address does not match");
        });
  });

    describe('See if an ERC721 token can be minted', function () {
        beforeEach(async function () {
          const verifier = await verifierCon.new({from: owner});
          this.instance = await solnSquareCon.new(verifier.address, name, symbol, {from: owner});
        })

        it('Allow ERC721 mint', async function () {

          let result = await this.instance.addToArray(jproof.proof.A, jproof.proof.A_p, jproof.proof.B, jproof.proof.B_p, jproof.proof.C, jproof.proof.C_p, jproof.proof.H, jproof.proof.K, jproof.proof.input, {from:owner});
          assert.equal(result.logs[0].args[1], owner,"Address does not match");
          await this.instance.mintNFT(json.inputs[0],json.inputs[1],receiver,{from:owner});
          let bal = await this.instance.balanceOf(receiver);
          assert.equal(parseInt(bal), 1, "Incorrect balance");

          let uri = await this.instance.tokenURI(0,{from:owner});
          assert.equal(uri, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/0"," Incorrect uri");


        });
    });

})