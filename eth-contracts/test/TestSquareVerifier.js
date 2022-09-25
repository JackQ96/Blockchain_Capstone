var verifier = artifacts.require('verifier');
var json = require('./proof.json');

const account_one = accounts[0];

contract('verifier', accounts => {
    describe('Correct test verification', function() {
        beforeEach(async function() {
            this.contract = await verifier.new({ from: account_one});
        })
        it('Correct proof verification', async function() {
            let verified = await this.contract.verifyTx.call(json.proof.a,
                                                            json.proof.b,
                                                            json.proof.c,
                                                            json.proof.inputs,
                                                             { from: account_one });
            assert.equal(verified, true, "Verification completed succesfully");
        })

        it('Incorrect proof verification', async function() {
            json.inputs = [7, 2];
            let verified = await this.contract.verifyTx.call(json.proof.a,
                                                            json.proof.b,
                                                            json.proof.c,
                                                            json.proof.inputs,
                                                            { from: account_one });
            assert.equal(verified, false, "Verification completed succesfully");
        })
    })
});