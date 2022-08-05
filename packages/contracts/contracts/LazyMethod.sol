//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract LazyMethod {
    uint256 private prints = 0;

    function getPrint() public view returns (uint256) {
        return prints;
    }
}
