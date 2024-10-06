// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./EduPoints.sol";
contract EducationEcosystem is Ownable {
    EduPoints public epToken;

    struct User {
        string username;
        bool isRegistered;
        address walletId;
        uint256 epBalance;
    }

    // struct Service {
    //     uint256 service_id;
    //     string title;
    //     address provider;
    //     address consumer;
    //     uint256 cost;
    //     ServiceStatus status;
    // }

    struct Transaction {
        address _to;
        address _from;
        uint256 _cost;
        
    }

    enum ServiceStatus { Created, InProgress, Completed, Cancelled }

    mapping(address => User) public users;
    mapping(uint256 => Service) public services;
    uint256 public serviceCounter;

    event UserRegistered(address indexed walletId, string username);
    event EPEarned(address indexed user, uint256 amount);
    event EPSpent(address indexed user, uint256 amount);
    event ServiceCreated(uint256 indexed serviceId, string title, address providerId);
    event ServiceRequested(uint256 indexed serviceId, address consumerId);
    event ServiceStatusUpdated(uint256 indexed serviceId, string status);


    constructor(uint256 initialSupply) Ownable(msg.sender) {
        epToken = new EduPoints(initialSupply);
        serviceCounter = 0;
    }

   function registerUser(string memory _username) external {
        require(users[msg.sender].walletId != address(0), "User already registered");
        users[msg.sender] = User(_username,true, msg.sender,0);
        emit UserRegistered(msg.sender, _username);
    }

    function earnEP(address _user, uint256 _amount) external onlyOwner {
        require(users[_user].walletId != address(0), "User not registered");
        epToken.mint(_user, _amount);
        users[_user].epBalance += _amount;
        emit EPEarned(_user, _amount);
    }

    function spendEP(uint256 _amount) external {
        require(users[msg.sender].walletId != address(0), "User not registered");
        require(users[msg.sender].epBalance >= _amount, "Insufficient EP balance");
        users[msg.sender].epBalance -= _amount;
        epToken.burn(_amount);
        emit EPSpent(msg.sender, _amount);
    }

    function createService(uint256 _title, uint256 _cost) external {
        require(users[msg.sender].walletId != address(0), "User not registered");
        serviceCounter++;
        services[serviceCounter] = Service(_title, serviceCounter, msg.sender, address(0), "Available", _cost);
        emit ServiceCreated(serviceCounter, _title, msg.sender);
    }

    function requestService(uint256 _serviceId) external {
        require(users[msg.sender].walletId != address(0), "User not registered");
        require(services[_serviceId].serviceId != 0, "Service does not exist");
        require(services[_serviceId].consumerId == address(0), "Service already taken");
        require(users[msg.sender].epBalance >= services[_serviceId].cost, "Insufficient EP balance");

        services[_serviceId].consumerId = msg.sender;
        services[_serviceId].status = "Requested";
        users[msg.sender].epBalance -= services[_serviceId].cost;
        users[services[_serviceId].providerId].epBalance += services[_serviceId].cost;

        emit ServiceRequested(_serviceId, msg.sender);
    }

    function updateServiceStatus(uint256 _serviceId, string memory _status) external {
        require(services[_serviceId].serviceId != 0, "Service does not exist");
        require(services[_serviceId].providerId == msg.sender, "Only provider can update status");
        services[_serviceId].status = _status;
        emit ServiceStatusUpdated(_serviceId, _status);
    }

    function getUserEPBalance(address _user) external view returns (uint256) {
        return users[_user].epBalance;
    }

    function getServiceDetails(uint256 _serviceId) external view returns (Service memory) {
        require(services[_serviceId].serviceId != 0, "Service does not exist");
        return services[_serviceId];
    }
}