//SPDX-License-Identifier: UNLICENSED
pragma solidity <=0.8.10;

import "openzeppelin-solidity/contracts/token/ERC20/utils/SafeERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "openzeppelin-solidity/contracts/access/Ownable.sol";
import "openzeppelin-solidity/contracts/access/AccessControlEnumerable.sol";

contract Vault is Ownable, AccessControlEnumerable {
    IERC20 private token;
    uint256 public maxWithdrawAmount;
    bool public withdrawEnable;
    bytes32 public constant WITHDRAWER_ROLE = keccak256("WITHDRAWER_ROLE");

    function setWithdrawEnable(bool _isEnable) public onlyOwner {
        withdrawEnable = _isEnable;
    }
    function setMaxWithdrawAmount(uint256 _maxAmount) public onlyOwner {
        maxWithdrawAmount = _maxAmount;
    }
    function setToken(IERC20 _token) public onlyOwner {
        token = _token;
    }
    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    }
    function withdraw(
        uint256 _amount,
        address _to
    ) external onlyWithdrawer {
        require(withdrawEnable,"Withdraw is not available");
        require(_amount<=maxWithdrawAmount,"Exceed maximum amount");
        token.transfer(_to, _amount);
    }

    function deposit(uint256 _amount) external {
        require(
            token.balanceOf(msg.sender) >= _amount,
            "Insufficient account balance"
        );
        SafeERC20.safeTransferFrom(token, msg.sender, address(this), _amount);
    }
    modifier onlyWithdrawer() {
        require(owner() == _msgSender()||hasRole(WITHDRAWER_ROLE,_msgSender()), "Caller is not a withdrawer");
        _;
    }
}