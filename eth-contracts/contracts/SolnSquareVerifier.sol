pragma solidity >=0.4.21 <0.6.0;

import "./ERC721Mintable.sol";

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>

contract Verifier {
    function verifyTx(
        uint[2] memory A,
        uint[2] memory A_p,
        uint[2][2] memory B,
        uint[2] memory B_p,
        uint[2] memory C,
        uint[2] memory C_p,
        uint[2] memory H,
        uint[2] memory K,
        uint[2] memory input
    )

    public
    returns (bool r);
}



// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class

contract SolnSquareVerifier is ERC721Token {
    Verifier private verifierContract;

    constructor(address verifierAddress, string memory name, string memory symbol)
    ERC721Token(name, symbol)
    public
    {
        verifierContract = Verifier(verifierAddress);
    }


// TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint256 solutionIndex;
        address solutionAddress;
        bool minted;
    }


// TODO define an array of the above struct
    uint256 public numOfSol = 0;


// TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => Solution) solutions;



// TODO Create an event to emit when a solution is added
    event AddSolutions(uint256 solutionIndex, address indexed solutionAddress);



// TODO Create a function to add the solutions to the array and emit the event
    function addToArray(
        uint[2] memory A,
        uint[2] memory A_p,
        uint[2][2] memory B,
        uint[2] memory B_p,
        uint[2] memory C,
        uint[2] memory C_p,
        uint[2] memory H,
        uint[2] memory K,
        uint[2] memory input
    )
    public
    {
        bytes32 solHash = keccak256(abi.encodePacked(input[0], input[1]));
        require(solutions[solHash].solutionAddress == address(0), "Already exists");

        bool verified = verifierContract.verifyTx(A, A_p, B, B_p, C, C_p, H, K, input);
        require(verified, "Verification failed");

        solutions[solHash] = Solution(numOfSol, msg.sender, false);

        emit AddSolutions(numOfSol, msg.sender);
        numOfSol++;
    }



// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly

    function mintNFT(uint a, uint b, address to)
    public
    {
        bytes32 solHash = keccak256(abi.encodePacked(a, b));

        require(solutions[solHash].solutionAddress == msg.sender, "Only owner can mint new NFT's");
        require(solutions[solHash].minted == false, "This token has already been minted");

        super.mint(to, solutions[solHash].solutionIndex);
        solutions[solHash].minted = true;
    }
}


