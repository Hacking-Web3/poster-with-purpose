//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./IZoraNFTCreator.sol";

contract PostersWithPurpose {
    string private constant name = "PostersWithPurpose";
    string private constant version = "1.0";
    uint256 private editionNum = 0;

    struct NftDetails {
        address creator;
        string editName;
        uint16 royaltyBPS;
        address defaultAdmin;
        IERC721Drop.SalesConfiguration saleConfig;
    }

    address public ZoraNFTCreatorAddress;
    IZoraNFTCreator private NFTCreator;

    constructor(address _ZoraNFTCreatorAddress) {
        ZoraNFTCreatorAddress = _ZoraNFTCreatorAddress;
        NFTCreator = IZoraNFTCreator(ZoraNFTCreatorAddress);
    }

    string private constant SALES_CONFIGURATION_SIG = "SalesConfiguration(uint104 publicSalePrice,uint32 maxSalePurchasePerAddress,uint64 publicSaleStart,uint64 publicSaleEnd,uint64 presaleStart,uint64 presaleEnd,bytes32 presaleMerkleRoot)";
    string private constant CREATE_EDITION_SIG = "CreateEdition(address creator,string editName,uint16 royaltyBPS,address defaultAdmin,SalesConfiguration saleConfig)";

    bytes32 private domainSeparator = keccak256(abi.encode(
        keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"),
        keccak256(bytes(name)),
        keccak256(bytes(version)),
        block.chainid,
        address(this)
    ));

    function hashCreateEdition(bytes32 domainSeparator, NftDetails calldata nftDetails) private pure returns (bytes32 hash) {
        hash = keccak256(abi.encodePacked(
            "\x19\x01",
            domainSeparator,
            keccak256(
                abi.encode(
                    keccak256(abi.encodePacked(CREATE_EDITION_SIG, SALES_CONFIGURATION_SIG)),
                    nftDetails.creator,
                    keccak256(bytes(nftDetails.editName)),
                    nftDetails.royaltyBPS,
                    nftDetails.defaultAdmin,
                    keccak256(
                        abi.encode(
                            keccak256(bytes(SALES_CONFIGURATION_SIG)),
                            nftDetails.saleConfig.publicSalePrice,
                            nftDetails.saleConfig.maxSalePurchasePerAddress,
                            nftDetails.saleConfig.publicSaleStart,
                            nftDetails.saleConfig.publicSaleEnd,
                            nftDetails.saleConfig.presaleStart,
                            nftDetails.saleConfig.presaleEnd,
                            nftDetails.saleConfig.presaleMerkleRoot
                        )
                    )
                )
            )
        ));
    }

    function createEdition(NftDetails calldata nftDetails, bytes calldata signature) external returns (address) {
        require(
            ECDSA.recover(
                hashCreateEdition(domainSeparator, nftDetails),
                signature
            ) == nftDetails.creator,
            "signature does not match"
        );

        editionNum++;

        return NFTCreator.createEdition(
            "edition 1",
            getSymbol(),
            100,
            100,
            payable(nftDetails.defaultAdmin),
            nftDetails.defaultAdmin,
            nftDetails.saleConfig,
            "",
            "",
            ""
        );
    }

    function getSymbol() private returns (string memory){
        string memory baseSymbol = "PWP";
        return string(abi.encodePacked(baseSymbol, Strings.toString(editionNum)));
    }
}
