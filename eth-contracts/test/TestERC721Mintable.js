var ERC721MintableComplete = artifacts.require('ERC721MintableComplete');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});

            await this.contract.mint(account_two, 1, { from: account_one });
            await this.contract.mint(account_two, 2, { from: account_one });
            await this.contract.mint(account_two, 3, { from: account_one });
            await this.contract.mint(account_two, 4, { from: account_one });
            await this.contract.mint(account_two, 5, { from: account_one });
        })

        it('should return total supply', async function () {
            let totalSup = await this.contract.totalSupply();
            assert.equal(parseInt(totalSup),5, "Total supply is incorrect");
            
        })

        it('should get token balance', async function () { 
            let balance = await this.contract.balanceOf(account_two);
            assert.equal(parseInt(balance), 5, "Token balance is incorrect");
            
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let uri = await this.contract.BaseTokenURI();
            assert.equal(uri, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1", "Incorrect URI");
        })

        it('should transfer token from one owner to another', async function () { 
            await this.contract.transferFrom(account_two, account_one, 1, { from: account_two });
            let changed = await this.contract.ownerOf(1);
            assert.equal(changed, account_two, "Account 2 is not the owner");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({ from: account_one });
        })

        it('should fail when minting when address is not contract owner', async function () { 
            try {
                await this.contract.mint(account_two, 6, { from: account_two });
            } catch(e) {

            }
            
        })

        it('should return contract owner', async function () { 
            let contractOwner = await this.contract.owner.call({ from: account_one });
            assert.equal(contractOwner, account_one, "Incorrect owner");
            
        })

    });
})