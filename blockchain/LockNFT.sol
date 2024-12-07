// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Key is ERC721 {

    constructor(string memory lockID,address keyOwner) ERC721(lockID, "KEY") {
        _mint(keyOwner, 0);
    }

}