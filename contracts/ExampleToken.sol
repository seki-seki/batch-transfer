pragma solidity ^0.4.18;

import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract ExampleToken is StandardToken{
  uint8 public decimals = 18;
  string public name = "Example";
  string public symbol = "EX";
  function ExampleToken() public{
     uint _initialSupply = 10000000000000000000000000000;
     balances[msg.sender] = _initialSupply;
     totalSupply_ = _initialSupply;
  }
}

