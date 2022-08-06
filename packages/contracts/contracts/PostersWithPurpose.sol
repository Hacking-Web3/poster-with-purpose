//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./IZoraNFTCreator.sol";

contract PostersWithPurpose {
    string private constant name = "PostersWithPurpose";
    string private constant version = "1.0";
    // TODO: Remove if not able to handle
    uint256 private editionNum;

    uint64 MAX_UINT64 = 2*64 - 1;

    struct NftDetails {
        address creator;
        string name;
        address fundsRecipient;
        string description;
        string imageURI;
    }

    bytes32 basicMerkleRoot = 0x0000000000000000000000000000000000000000000000000000000000000000;

    IERC721Drop.SalesConfiguration defaultConfig = IERC721Drop.SalesConfiguration(
        uint104(0), uint32(0), uint64(0), MAX_UINT64, uint64(0), uint64(0), basicMerkleRoot
    );

    address public ZoraNFTCreatorAddress;
    IZoraNFTCreator private NFTCreator;

    constructor(address _ZoraNFTCreatorAddress, uint256 _editionNum) {
        ZoraNFTCreatorAddress = _ZoraNFTCreatorAddress;
        NFTCreator = IZoraNFTCreator(ZoraNFTCreatorAddress);
        editionNum = _editionNum;
    }

    // string private constant SALES_CONFIGURATION_SIG = "SalesConfiguration(uint104 publicSalePrice,uint32 maxSalePurchasePerAddress,uint64 publicSaleStart,uint64 publicSaleEnd,uint64 presaleStart,uint64 presaleEnd,bytes32 presaleMerkleRoot)";
    bytes32 private constant CREATE_EDITION_TYPEHASH =
        keccak256("CreateEdition(address creator,string name,address fundsRecipient,string description,string imageURI)");

    bytes32 private domainSeparator =
        keccak256(
            abi.encode(
                keccak256(
                    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
                ),
                keccak256(bytes(name)),
                keccak256(bytes(version)),
                block.chainid,
                address(this)
            )
        );

    function hashCreateEdition(
        NftDetails calldata nftDetails
    ) private view returns (bytes32 hash) {
        hash = keccak256(
            abi.encodePacked(
                "\x19\x01",
                domainSeparator,
                keccak256(
                    abi.encode(
                        CREATE_EDITION_TYPEHASH,
                        nftDetails.creator,
                        keccak256(bytes(nftDetails.name)),
                        nftDetails.fundsRecipient,
                        keccak256(bytes(nftDetails.description)),
                        keccak256(bytes(nftDetails.imageURI))
                    )
                )
            )
       );
    }

    function createEdition(
        NftDetails calldata nftDetails,
        bytes calldata signature
    ) external returns (address) {
        require(
            ECDSA.recover(
                hashCreateEdition(nftDetails),
                signature
            ) == nftDetails.creator,
            "signature does not match"
        );

        editionNum++;

        return
            NFTCreator.createEdition(
                nftDetails.name,
                "PWP",
                MAX_UINT64,
                0,
                payable(nftDetails.fundsRecipient),
                address(this),
                defaultConfig,
                nftDetails.description,
                "",
                nftDetails.imageURI
            );
    }
}
