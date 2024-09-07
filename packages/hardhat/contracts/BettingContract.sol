//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BettingContract is Ownable {
    enum BetOutcome { True, False, Stalemate }

    struct Bet {
        address creator;
        address teamAToken;
        address teamBToken;
        address betToken;
        uint256 amount;
        string statement;
        BetOutcome outcome;
        bool isActive;
        mapping(address => uint256) participants;
        mapping(address => BetOutcome) participantOutcomes;
        uint256 totalPool;
    }

    mapping(uint256 => Bet) public bets;
    uint256 public betCount;
    uint256 public platformFee;
    uint256 public collectedPlatformFees;
    mapping(address => bool) public approvedTokens;

    event BetCreated(uint256 betId, address creator, address teamAToken, address teamBToken, address betToken, uint256 amount, string statement);
    event BetParticipated(uint256 betId, address participant, uint256 amount, BetOutcome outcome);
    event BetAttested(uint256 betId, BetOutcome outcome);
    event WinningsClaimed(uint256 betId, address winner, uint256 amount);
    event StakeReturned(uint256 betId, address participant, uint256 amount);
    event PlatformFeeWithdrawn(address to, uint256 amount);
    event TokenApproved(address token);
    event TokenRemoved(address token);

    constructor(uint256 _platformFee) {
        platformFee = _platformFee;

        // add known fan token addresses on Spicy
        approvedTokens[0x44B190D30198F2E585De8974999a28f5c68C6E0F] = true; // AFC
        approvedTokens[0x66F80ddAf5ccfbb082A0B0Fae3F21eA19f6B88ef] = true; // CITY
        approvedTokens[0x9B9C9AAa74678FcF4E1c76eEB1fa969A8E7254f8] = true; // SPUR
        approvedTokens[0x7F73C50748560BD2B286a4c7bF6a805cFb6f735d] = true; // BAR
        approvedTokens[0xb0Fa395a3386800658B9617F90e834E2CeC76Dd3] = true; // PSG
        approvedTokens[0x8DBe49c4Dcde110616fafF53b39270E1c48F861a] = true; // NAP
        approvedTokens[0x945EeD98f5CBada87346028aD0BeE0eA66849A0e] = true; // JUV
        approvedTokens[0x641d040dB51398Ba3a4f2d7839532264EcdCc3aE] = true; // ACM

    }

    function approveToken(address _tokenAddress) public onlyOwner {
        require(_tokenAddress != address(0), "Token address cannot be zero address");
        approvedTokens[_tokenAddress] = true;
        emit TokenApproved(_tokenAddress);
    }

    function removeToken(address _tokenAddress) public onlyOwner {
        require(approvedTokens[_tokenAddress], "Token not approved");
        approvedTokens[_tokenAddress] = false;
        emit TokenRemoved(_tokenAddress);
    }

    function createBet(address _teamAToken, address _teamBToken, address _betToken, uint256 _amount, string memory _statement) public payable {
        require(msg.value >= platformFee, "Insufficient platform fee");
        require(_teamAToken != address(0) && _teamBToken != address(0), "Invalid token address!");
        require(approvedTokens[_betToken], "Bet token not approved");

        collectedPlatformFees += platformFee;

        betCount++;
        Bet storage newBet = bets[betCount];
        newBet.creator = msg.sender;
        newBet.teamAToken = _teamAToken;
        newBet.teamBToken = _teamBToken;
        newBet.betToken = _betToken;
        newBet.amount = _amount;
        newBet.statement = _statement;
        newBet.isActive = true;
        newBet.totalPool = 0;

        IERC20 token = IERC20(_betToken);
        require(token.transferFrom(msg.sender, address(this), _amount), "Transfer failed");

        emit BetCreated(betCount, msg.sender, _teamAToken, _teamBToken, _betToken, _amount, _statement);
    }
}
