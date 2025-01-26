// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract TippingPlatform is ReentrancyGuard {
    address public owner;
    IERC20 public token;
    
    struct Creator {
        string name;
        string description;
        uint256 totalTips;
        bool isRegistered;
    }
    
    mapping(address => Creator) public creators;
    mapping(address => mapping(address => uint256)) public tipHistory;
    
    event CreatorRegistered(address indexed creator, string name);
    event TipSent(address indexed from, address indexed to, uint256 amount);
    
    constructor(address _token) {
        owner = msg.sender;
        token = IERC20(_token);
    }
    
    function registerCreator(string memory _name, string memory _description) external {
        require(!creators[msg.sender].isRegistered, "Already registered");
        
        creators[msg.sender] = Creator({
            name: _name,
            description: _description,
            totalTips: 0,
            isRegistered: true
        });
        
        emit CreatorRegistered(msg.sender, _name);
    }
    
    function tipCreator(address _creator, uint256 _amount) external nonReentrant {
        require(creators[_creator].isRegistered, "Creator not registered");
        require(_amount > 0, "Amount must be greater than 0");
        
        require(token.transferFrom(msg.sender, _creator, _amount), "Transfer failed");
        
        creators[_creator].totalTips += _amount;
        tipHistory[msg.sender][_creator] += _amount;
        
        emit TipSent(msg.sender, _creator, _amount);
    }
    
    function getCreatorInfo(address _creator) external view returns (Creator memory) {
        return creators[_creator];
    }
    
    function getTipAmount(address _tipper, address _creator) external view returns (uint256) {
        return tipHistory[_tipper][_creator];
    }
}