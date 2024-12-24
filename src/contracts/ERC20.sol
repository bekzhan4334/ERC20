// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.27;

contract ERC20 {

    uint256 _totalSupply = 0;
    string _name;
    string _symbol;
    uint8 _decimals;
    address _owner;

    mapping(address => uint256) balances;
    mapping(address => mapping(address => uint256 )) allowed;

    constructor(string memory name, string memory symbol, uint8 decimals){
        _name = name;
        _symbol = symbol;
        _decimals = decimals;
        _owner = msg.sender;
    }

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approve(address indexed owner, address indexed spender, uint256 value);

    function name() external view returns(string memory){
        return _name;
    }

    function symbol() external view returns(string memory){
        return _symbol;
    }

    function decimals() external view returns(uint8){
        return _decimals;
    }

    function totalSupply() external view returns(uint256){
        return _totalSupply;
    }

    function balanceOf(address account) external view returns(uint256){
        return balances[account];
    }

     function allowance(address owner, address spender) public view returns(uint256){
        return allowed[owner][spender];
    }

    function transfer(address to, uint256 amount) public returns(bool){
        require(balances[msg.sender] >= amount, "ERC20: not enough tokens");
        balances[msg.sender] -= amount;
        balances[to] += amount;
        emit Transfer(msg.sender, to , amount);
        return true;
        
    }

    function approve(address spender, uint256 amount) public returns (bool){
        require(allowed[msg.sender][spender] == 0, "ERC20: You already have approval!");
        allowed[msg.sender][spender] = amount;
        emit Approve(msg.sender, spender, amount);
        return true;
    }

   
    function transferFrom(address from, address to, uint256 amount) public returns(bool){
        require(allowed[from][msg.sender] >= amount, "ERC20: no permission to spend");
        require(balances[from] >= amount, "ERC20: not enough tokens");
        balances[from] -= amount;
        balances[to] += amount;
        allowed[from][msg.sender] -= amount;
        emit Transfer(from, to, amount);
        emit Approve(from, msg.sender, allowed[from][msg.sender]);
        return true;
    }

    function mint(address to, uint256 amount) public returns(bool){
        require(msg.sender == _owner, "ERC20: You are not owner");
        balances[to] += amount;
        _totalSupply += amount;
        emit Transfer(address(0), to, amount);
        return true;
    }

    function burn(uint256 amount) public returns(bool){
        require(balances[msg.sender] >= amount, "ERC20: not enough tokens");
        balances[msg.sender] -= amount;
        _totalSupply -= amount;
        emit Transfer(msg.sender, address(0), amount);
        return true;
    }

    function increaseAllowance(address spender, uint256 addValue) public returns(bool){
        allowed[msg.sender][spender] += addValue;
        emit Approve(msg.sender, spender, allowed[msg.sender][spender]);
        return true;
    }

    function decreaseAllowance(address spender, uint256 addValue) public returns(bool){
        allowed[msg.sender][spender] -= addValue;
        emit Approve(msg.sender, spender, allowed[msg.sender][spender]);
        return true;
    }
}



