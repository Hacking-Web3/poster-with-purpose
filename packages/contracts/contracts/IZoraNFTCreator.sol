// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import {IERC721Drop} from "./IERC721Drop.sol";

/**

 ________   _____   ____    ______      ____
/\_____  \ /\  __`\/\  _`\ /\  _  \    /\  _`\
\/____//'/'\ \ \/\ \ \ \L\ \ \ \L\ \   \ \ \/\ \  _ __   ___   _____     ____
     //'/'  \ \ \ \ \ \ ,  /\ \  __ \   \ \ \ \ \/\`'__\/ __`\/\ '__`\  /',__\
    //'/'___ \ \ \_\ \ \ \\ \\ \ \/\ \   \ \ \_\ \ \ \//\ \L\ \ \ \L\ \/\__, `\
    /\_______\\ \_____\ \_\ \_\ \_\ \_\   \ \____/\ \_\\ \____/\ \ ,__/\/\____/
    \/_______/ \/_____/\/_/\/ /\/_/\/_/    \/___/  \/_/ \/___/  \ \ \/  \/___/
                                                                 \ \_\
                                                                  \/_/

*/

/// @notice Interface for ZORA Drops contract
interface IZoraNFTCreator {

    function createEdition(
        string memory name,
        string memory symbol,
        uint64 editionSize,
        uint16 royaltyBPS,
        address payable fundsRecipient,
        address defaultAdmin,
        IERC721Drop.SalesConfiguration memory saleConfig,
        string memory description,
        string memory animationURI,
        string memory imageURI
    ) external returns (address);
}
