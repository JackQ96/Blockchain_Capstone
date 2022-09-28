var ERC721MintableComplete = artifacts.require('ERC721Token');

contract('TestERC721Mintable', accounts => {

    const owner = accounts[0];
    const receiver = accounts[1];

    const name = "PraticeToken";
    const symbol = "PTOK";

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            instance = await ERC721MintableComplete.new(name, symbol, {from: owner});

            await instance.mint(receiver, 1, { from: owner });
            await instance.mint(receiver, 2, { from: owner });
            await instance.mint(receiver, 3, { from: owner });
            await instance.mint(receiver, 4, { from: owner });
            await instance.mint(receiver, 5, { from: owner });
        })

        it('should return total supply', async function () {
            let totalSup = await instance.totalSupply();
            assert.equal(parseInt(totalSup),5, "Total supply is incorrect");
            
        })

        it('should get token balance', async function () { 
            let balance = await instance.balanceOf(receiver);
            assert.equal(parseInt(balance), 5, "Token balance is incorrect");
            
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let uri = await instance.baseTokenURI();
            assert.equal(uri, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "Incorrect URI");
        })

        it('should transfer token from one owner to another', async function () { 
            await instance.transferFrom(receiver, owner, 1, { from: receiver });
            let changed = await instance.ownerOf(1);
            assert.equal(changed, receiver, "Account 2 is not the owner");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            instance = await ERC721MintableComplete.new(name, symbol, { from: owner });
        })

        it('should fail when minting when address is not contract owner', async function () { 
            try {
                await instance.mint(receiver, 6, { from: receiver });
            } catch(e) {

            }
            
        })

        it('should return contract owner', async function () { 
            let contractOwner = await instance._owner.call();
            assert.equal(contractOwner, owner, "Incorrect owner");
            
        })

    });
})