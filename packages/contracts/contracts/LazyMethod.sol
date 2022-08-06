//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./IZoraNFTCreator.sol";

contract PostersWithPurpose {
    string private constant name = "PostersWithPurpose";
    string private constant version = "1.0";
    uint256 private editionNum;

    struct NftDetails {
        address creator;
        string name;
        address fundsRecipient;
        string description;
        string imageURI;
    }

    address public ZoraNFTCreatorAddress;
    IZoraNFTCreator private NFTCreator;

    constructor(address _ZoraNFTCreatorAddress, uint256 _editionNum) {
        ZoraNFTCreatorAddress = _ZoraNFTCreatorAddress;
        NFTCreator = IZoraNFTCreator(ZoraNFTCreatorAddress);
        editionNum = _editionNum;
    }

    // string private constant SALES_CONFIGURATION_SIG = "SalesConfiguration(uint104 publicSalePrice,uint32 maxSalePurchasePerAddress,uint64 publicSaleStart,uint64 publicSaleEnd,uint64 presaleStart,uint64 presaleEnd,bytes32 presaleMerkleRoot)";
    string private constant CREATE_EDITION_SIG =
        "CreateEdition(address creator,string name,address fundsRecipient,string description,string imageURI)";

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
        bytes32 domainSeparator,
        NftDetails calldata nftDetails
    ) private pure returns (bytes32 hash) {
        hash = keccak256(
            abi.encodePacked(
                "\x19\x01",
                domainSeparator,
                keccak256(
                    abi.encode(
                        CREATE_EDITION_SIG,
                        keccak256(bytes(nftDetails.name)),
                        nftDetails.fundsRecipient,
                        nftDetails.description,
                        nftDetails.imageURI
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
                hashCreateEdition(domainSeparator, nftDetails),
                signature
            ) == nftDetails.creator,
            "signature does not match"
        );
        uint64 MaxValue = 18446744073709551615;

        editionNum++;

        return
            NFTCreator.createEdition(
                nftDetails.name,
                createSymbol(),
                MaxValue,
                0,
                payable(nftDetails.fundsRecipient),
                address(this),
                createSalesConfig(),
                nftDetails.description,
                "",
                nftDetails.imageURI
            );
    }

    function createSalesConfig()
        private
        returns (IERC721Drop.SalesConfiguration memory)
    {
         IERC721Drop.SalesConfiguration memory config;

        uint64 maxTimeStamp = 99999999999999;
        bytes32 basicMerkleRoot = 0x0000000000000000000000000000000000000000000000000000000000000000;

        config.publicSalePrice = uint104(0);
        config.maxSalePurchasePerAddress = uint32(0);
        config.publicSaleStart = uint64(0);
        config.publicSaleEnd = maxTimeStamp;
        config.presaleStart = uint64(0);
        config.presaleEnd = uint64(0);
        config.presaleMerkleRoot = basicMerkleRoot;
        return config;
    }

    function createSymbol() private returns (string memory) {
        string memory baseSymbol = "PWP";
        return
            string(abi.encodePacked(baseSymbol, Strings.toString(editionNum)));
    }
}
