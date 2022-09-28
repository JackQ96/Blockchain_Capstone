var verifier = artifacts.require('verifier');
var json = require('./proof.json');


contract('verifier', accounts => {
    const owner = accounts[0];

    
    describe('Correct test verification', function() {
        beforeEach(async function() {
            this.instance = await verifier.new({ from: owner });
        })
        it('Correct proof verification', async function() {
            let verified = await this.instance.verifyTx.call(json.proof.A,
                                                        json.proof.A_p,
                                                        json.proof.B,
                                                        json.proof.B_p,
                                                        json.proof.C,
                                                        json.proof.C_p,
                                                        json.proof.H,
                                                        json.proof.K,
                                                        json.input
                                                        );
            assert.equal(verified, true, "Verification completed succesfully");
        })

        it('Incorrect proof verification', async function() {
            json.input = [7, 2];
            let verified = await this.instance.verifyTx.call(json.proof.A,
                                                        json.proof.A_p,
                                                        json.proof.B,
                                                        json.proof.B_p,
                                                        json.proof.C,
                                                        json.proof.C_p,
                                                        json.proof.H,
                                                        json.proof.K,
                                                        json.input
                                                        );
            assert.equal(verified, false, "Verification completed succesfully");
        })
    })
});