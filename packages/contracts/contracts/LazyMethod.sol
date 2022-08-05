//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./IZoraNFTCreator.sol";

contract LazyMethod {
    uint256 private prints = 0;
    uint256 private editionNum = 0;

    string name = "Lazy Method";
    string version = "1.0";

    struct PrintParams {
        uint256 prints;
        address signer;
    }

    struct NFTInfo {
        address creator;
        string editName;
        uint16 royaltyBPS;
        address defaultAdmin;
        IERC721Drop.SalesConfiguration saleConfig;
        string description;
        string animationURI;
        string imageURI;
    }

    address ZoraNFTCreatorAddress;
    IZoraNFTCreator NFTCreator;

    constructor(address _ZoraNFTCreatorAddress) {
        ZoraNFTCreatorAddress = _ZoraNFTCreatorAddress;
        NFTCreator = IZoraNFTCreator(ZoraNFTCreatorAddress);
    }

    bytes32 constant UPDATE_PRINTS_TYPEHASH = keccak256(
        "UpdatePrints(uint256 prints,address signer)"
    );

    bytes32 constant CREATE_COLLECTION_TYPEHASH = keccak256(
        "CreateCollection(address creator,string editName,uint64 editionSize,uint16 royaltyBPS,address payable fundsRecipient,address defaultAdmin,IERC721Drop.SalesConfiguration saleConfig,string description,string animationURI,string imageURI)"
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

    function hashCreateEdition(bytes32 domainSeparator, NFTInfo calldata nftInfo) private pure returns (bytes32 hash) {
        hash = keccak256(abi.encodePacked(
            "\x19\x01",
            domainSeparator,
            keccak256(
                abi.encode(
                    CREATE_COLLECTION_TYPEHASH,
                    nftInfo.creator,
                    nftInfo.editName,
                    nftInfo.royaltyBPS,
                    nftInfo.defaultAdmin,
                    nftInfo.saleConfig,
                    nftInfo.description,
                    nftInfo.animationURI
                )
            )
        ));
    }

    function getSymbol() private returns (string memory){
        string memory baseSymbol = "PWP";
        return string(abi.encodePacked(baseSymbol, Strings.toString(editionNum)));
    }

    function createEdition(
        NFTInfo calldata nftInfo, bytes calldata signature) external returns (address) {
        
        require(
            ECDSA.recover(
                hashCreateEdition(domainSeparator, nftInfo),
                signature
            ) == nftInfo.creator,
            "signature does not match"
        );

        return NFTCreator.createEdition(
            "123",
            getSymbol(),
            100,
            100,
            payable(nftInfo.defaultAdmin),
            nftInfo.defaultAdmin,
            nftInfo.saleConfig,
            "",
            "",
            ""
        );
    }
}
