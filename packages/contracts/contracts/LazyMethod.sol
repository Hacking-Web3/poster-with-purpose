//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract LazyMethod {
    uint256 private prints = 0;

    string name = "Lazy Method";
    string version = "1.0";

    struct PrintParams {
        uint256 prints;
        address signer;
    }

    bytes32 constant UPDATE_PRINTS_TYPEHASH = keccak256(
        "UpdatePrints(uint256 prints,address signer)"
    );

    bytes32 public domainSeparator = keccak256(abi.encode(
            keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"),
            keccak256(bytes(name)),
            keccak256(bytes(version)),
            block.chainid,
            address(this)
        ));

    function hashPrintsUpdate(bytes32 domainSeparator, PrintParams calldata printParams) private pure returns (bytes32 hash) {
        hash = keccak256(abi.encodePacked(
            "\x19\x01",
            domainSeparator,
            keccak256(
                abi.encode(
                    UPDATE_PRINTS_TYPEHASH,
                    printParams.prints,
                    printParams.signer
                )
            )
        ));
    } 

    function updatePrints(PrintParams calldata printParams, bytes calldata signature) external {
        require(
            ECDSA.recover(
                hashPrintsUpdate(domainSeparator, printParams),
                signature
            ) == printParams.signer,
            "signature does not match"
        );
        prints = printParams.prints;
    }

    function getPrint() public view returns (uint256) {
        return prints;
    }
}
