// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./EduPoints.sol";

contract Ecosystem is Ownable {
    EduPoints public epToken;

    struct User {
        string username;
        bool isRegistered;
        address walletId;
        uint256 epBalance;
    }

    struct Transaction {
        address _to;
        address _from;
        uint256 _cost; 
    }


    mapping(address => User) public users;
    mapping(uint256 => Transaction) public transactions;
    uint256 public transactionCounter;

    event UserRegistered(address indexed walletId, string username);
    event EPTransferred(address indexed from, address indexed to, uint256 amount);


    constructor(uint256 initialSupply) Ownable(msg.sender) {
        epToken = new EduPoints(initialSupply);
        serviceCounter = 0;
    }

    function registerUser(string memory _username,  address _walletId) external {
        require(!users[_walletId].isRegistered, "User is already registered");
        require(bytes(_username).length > 0, "Username cannot be empty");
        require(_walletId != address(0), "Invalid wallet address");

        users[_walletId] = User({
            username: _username,
            isRegistered: true,
            walletId: msg.sender,
            epBalance: 0
        });

        emit UserRegistered(msg.sender, _username);
    }

    function transferEP(address _from, address _to, uint256 _cost) external {
        require(users[_from].isRegistered, "Sender is not registered");
        require(users[_to].isRegistered, "Receiver is not registered");
        require(users[_from].epBalance >= _cost, "Insufficient EP balance");
        require(_from != _to, "Cannot transfer to self");

        bool success = epToken.transferFrom(_from, _to, _cost);
        require(success, "Transfer failed");
        // Deduct EP from sender
        users[_from].epBalance -= _cost;

        // Add EP to receiver
        users[_to].epBalance += _cost;

        // Create and store the transaction
        Transaction memory newTransaction = Transaction({
            _to: _to,
            _from: _from,
            _cost: _cost
        });
        transactions.push(newTransaction);

        // Emit an event for the transaction
        emit EPTransferred(_from, _to, _cost);
    }
}