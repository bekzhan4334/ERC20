<template>
    <div>
        <h3>Information about the app</h3>
        <div>
            <p>This app was created for comfortable interaction with ERC20 tokens</p>
            <p>1. Connect your EVM wallet</p>
            <p>2. Deploy your new token or connect to already deployed token
                (for example <a href="https://sepolia.etherscan.io/address/0xa27107730942651a855084cfef10826c58677f5a" target="_blank">ERC20token</a>)
            </p>
            <p>3. Work with function with user friendly interface </p>
        </div>
    </div>
    <!-- Connect wallet container -->
    <div class="container"> 
        <button @click="connectionWallet" class="btn">Connect wallet</button>
        <p>User address: {{ $store.state.address }}</p>
        <p> Chain ID: {{ $store.state.chainId }}</p>
        <p>Chain: {{ $store.state.chain }}</p>
    </div>
    <!-- Deploy section -->
    <deploy>
        
    </deploy>
    <!-- Connect contract section -->
    <div>
        <h3>Connect to existing ERC20 token</h3>
        <div>
            <input v-model="erc20Address" placeholder="Enter ERC20 token address"/>
        </div>
        <button @click="connectContract">Connect</button>
    </div>  
    <br>
    <div>
        <h3>Payable functions</h3>

        <call-function
        buttonText="mint(address to, uint256 value)"
        :buttonHandler="mint"
        :inputText="['to', 'value']"
        :readOnly="false"
        >
        </call-function>

        <call-function
        buttonText="transfer(address to, uint256 amount)"
        :buttonHandler="transfer"
        :inputText="['to', 'amount']"
        :readOnly="false"
        >
        </call-function>

        <call-function
        buttonText="approve(address spender, uint256 amount)"
        :buttonHandler="approve"
        :inputText="['spender', 'amount']"
        :readOnly="false"
        >
        </call-function>

        <call-function
        buttonText="transferFrom(address from, address to, uint256 amount)"
        :buttonHandler="transferFrom"
        :inputText="['from', 'to', 'amount']"
        :readOnly="false"
        >
        </call-function>
    </div>
    <br>
    <div>
        <h3>Non-payable functions</h3>

        <call-function
        buttonText="name()"
        :buttonHandler="name"
        >
        </call-function>

        <call-function
        buttonText="symbol()"
        :buttonHandler="symbol"
        >
        </call-function>

        <call-function
        buttonText="decimals()"
        :buttonHandler="decimals"
        >
        </call-function>

        <call-function
        buttonText="totalSupply()"
        :buttonHandler="totalSupply"
        >
        </call-function>

        <call-function
        buttonText="balanceOf(address account)"
        :buttonHandler="balanceOf"
        :inputText="['account']"
        >
        </call-function>

        <call-function
        buttonText="allowance(address owner, address spender)"
        :buttonHandler="allowance"
        :inputText="['owner', 'spender']"
        >
        </call-function>
    </div>
  
    
</template>

<script>
import store from '@/store';
import { mapActions, mapState } from 'vuex'
export default{
    data(){
        return{
            erc20Address: ""
        }
    },
    computed: {
        ...mapState({
        })
    },
    methods:{
        ...mapActions({
            connectionWallet: "connectionWallet",
            connectErc20: "connectErc20",
            mint: "mint",
            getName: "getName",
            symbol: "symbol",
            transfer: "transfer",
            approve: "approve",
            transferFrom: "transferFrom",
            decimals: "decimals",
            totalSupply: "totalSupply",
            balanceOf: "balanceOf",
            allowance: "allowance",
        }),
        async connectContract(){
            await this.connectErc20(this.erc20Address)
        },
    },
}
</script>