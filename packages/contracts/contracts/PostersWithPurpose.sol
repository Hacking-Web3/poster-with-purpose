//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./IZoraNFTCreator.sol";
import "./ERC721DropStorageV1.sol";

contract PostersWithPurpose {
    string private constant name = "PostersWithPurpose";
    string private constant version = "1.0";
    uint256 private minDonation;
    // TODO: Remove if not able to handle
    uint256 private editionNum;
    
    address public DAOAddress;

    mapping(string => address) public editionAddress;

    uint64 MAX_UINT64 = 2*64 - 1;
    uint104 MAX_UINT104 = 2*104 -1;

    struct NftDetails {
        address creator;
        string name;
        address fundsRecipient;
        string description;
        string imageURI;
    }

    bytes32 basicMerkleRoot =
        0x0000000000000000000000000000000000000000000000000000000000000000;

    IERC721Drop.SalesConfiguration defaultConfig = IERC721Drop.SalesConfiguration(
        MAX_UINT64, uint32(0), uint64(0), MAX_UINT64, uint64(0), uint64(0), basicMerkleRoot
    );

    address public ZoraNFTCreatorAddress;
    IZoraNFTCreator private NFTCreator;

    constructor(address _ZoraNFTCreatorAddress, uint256 _editionNum, uint256 _minDonation, address _DAOAddress) {
        require(_ZoraNFTCreatorAddress != address(0) && _DAOAddress != address(0), "Invalid Address initialization");
        ZoraNFTCreatorAddress = _ZoraNFTCreatorAddress;
        NFTCreator = IZoraNFTCreator(ZoraNFTCreatorAddress);
        editionNum = _editionNum;
        minDonation = _minDonation;
        DAOAddress = _DAOAddress;
    }

    bytes32 private constant CREATE_EDITION_TYPEHASH =
        keccak256(
            "CreateEdition(address creator,string name,address fundsRecipient,string description,string imageURI)"
        );

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

    function hashCreateEdition(NftDetails calldata nftDetails)
        private
        view
        returns (bytes32 hash)
    {
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

    function mintNft(
        NftDetails calldata nftDetails,
        bytes calldata signature
    ) payable external returns (address) {
        require(msg.value > 0, "make some donation to mint");
        address nftAddress = editionAddress[nftDetails.imageURI];
        if(nftAddress == address(0)) {
            nftAddress = createEdition(nftDetails, signature);
        }
        
        if (msg.value > minDonation) {
            IERC721Drop(nftAddress).adminMint(msg.sender, 1);
        }

        (,,,address payable fundsRecipient) = ERC721DropStorageV1(nftAddress).config(); 

        fundsRecipient.transfer(msg.value);

        return nftAddress;
    }

    function getNftAddress(NftDetails memory nftDetails) private returns(address) {
        return 
            NFTCreator.createEdition(
                nftDetails.name,
                string(abi.encodePacked("PWP", Strings.toString(editionNum))),
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

    function createEdition(
        NftDetails calldata nftDetails,
        bytes calldata signature
    ) public returns (address) {
        require(
            ECDSA.recover(hashCreateEdition(nftDetails), signature) ==
                nftDetails.creator,
            "signature does not match"
        );

        require(
            nftDetails.fundsRecipient == nftDetails.creator ||
                nftDetails.fundsRecipient == DAOAddress,
            "Funds can only go to the creator or the DAO"
        );

        address nftAddress = getNftAddress(nftDetails);
        editionNum++;

        editionAddress[nftDetails.imageURI] = nftAddress;
        return nftAddress;
    }

    function getMinDonation() external view returns (uint256) {
        return minDonation;
    }

    function updateMinDonation(uint256 newMin) external {
        require(msg.sender == DAOAddress, "You don't have the right");
        require(newMin > 0, "Minimum donation can't be negative");
        minDonation = newMin;
    }

    function getDAOAddress() public view returns (address) {
        return (DAOAddress);
    }

    function updateDAOAddress(address newAddress) external {
        require(msg.sender == DAOAddress, "You don't have the right to update the address");
        require(newAddress != address(0), "Address shouldn't be null address");
        DAOAddress = newAddress;
    }

    function getEditionNum() external view returns (uint256) {
        return (editionNum);
    }
}
