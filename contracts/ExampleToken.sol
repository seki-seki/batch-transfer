pragma solidity ^0.4.18;

import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract ExampleToken is StandardToken,Ownable{
  uint8 public decimals = 18;
  string public name = "Example";
  string public symbol = "EX";
  function ExampleToken() public{
     balances[owner]=1000000000000000000000000000;
  }
}

