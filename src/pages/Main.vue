<template>
    <div class="app-container">
        <h3 class="header">Information about the app</h3>
        <div class="info-section">
            <p>This app was created for comfortable interaction with ERC20 tokens</p>
            <p>1. Connect your EVM wallet</p>
            <p>
                2. Deploy your new token or connect to already deployed token
                (for example 
                <a 
                    href="https://sepolia.etherscan.io/address/0xa27107730942651a855084cfef10826c58677f5a" 
                    target="_blank" 
                    class="link"
                >
                    ERC20token
                </a>)
            </p>
            <p>3. Work with functions using a user-friendly interface </p>
        </div>

        <!-- Connect wallet container -->
        <div class="container"> 
            <button @click="connectionWallet" class="btn">Connect wallet</button>
            <p class="wallet-info">User address: {{ $store.state.address }}</p>
            <p class="wallet-info">Chain ID: {{ $store.state.chainId }}</p>
            <p class="wallet-info">Chain: {{ $store.state.chain }}</p>
        </div>

        <div class="contract-info">
            <h3 class="header">Connected to:</h3>
            <div>Contract address: {{ $store.state.erc20Address }}</div>
        </div>

        <!-- Deploy section -->
        <deploy></deploy>

        <!-- Connect contract section -->
        <div class="connect-contract">
            <h3 class="header">Connect to existing ERC20 token</h3>
            <div>
                <input v-model="erc20Address" class="input-field" placeholder="Enter ERC20 token address"/>
            </div>
            <button @click="connectContract" class="btn">Connect</button>
        </div>  

        <br>

        <div>
            <h3 class="header">Payable functions</h3>
            <call-function
                buttonText="mint(address to, uint256 value)"
                :buttonHandler="mint"
                :inputText="['to', 'value']"
                :readOnly="false"
                class="call-function"
            ></call-function>
            <call-function
                buttonText="transfer(address to, uint256 amount)"
                :buttonHandler="transfer"
                :inputText="['to', 'amount']"
                :readOnly="false"
                class="call-function"
            ></call-function>
            <call-function
                buttonText="approve(address spender, uint256 amount)"
                :buttonHandler="approve"
                :inputText="['spender', 'amount']"
                :readOnly="false"
                class="call-function"
            ></call-function>
            <call-function
                buttonText="transferFrom(address from, address to, uint256 amount)"
                :buttonHandler="transferFrom"
                :inputText="['from', 'to', 'amount']"
                :readOnly="false"
                class="call-function"
            ></call-function>
        </div>

        <br>

        <div>
            <h3 class="header">Non-payable functions</h3>
            <call-function
                buttonText="name()"
                :buttonHandler="getName"
                class="call-function"
            ></call-function>
            <call-function
                buttonText="symbol()"
                :buttonHandler="symbol"
                class="call-function"
            ></call-function>
            <call-function
                buttonText="decimals()"
                :buttonHandler="decimals"
                class="call-function"
            ></call-function>
            <call-function
                buttonText="totalSupply()"
                :buttonHandler="totalSupply"
                class="call-function"
            ></call-function>
            <call-function
                buttonText="balanceOf(address account)"
                :buttonHandler="balanceOf"
                :inputText="['account']"
                class="call-function"
            ></call-function>
            <call-function
                buttonText="allowance(address owner, address spender)"
                :buttonHandler="allowance"
                :inputText="['owner', 'spender']"
                class="call-function"
            ></call-function>
        </div>
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

<style scoped>
.app-container {
    background-color: #121212;
    color: #e5e5e5;
    font-family: 'Arial', sans-serif;
    padding: 20px;
    border-radius: 8px;
    max-width: 800px;
    margin: 0 auto;
}

.header {
    color: #18c6a6;
    font-size: 1.5rem;
    margin-bottom: 10px;
}

.info-section, .contract-info, .connect-contract {
    margin-bottom: 20px;
}

.container {
    background-color: #1e1e1e;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
    border: 1px solid #333;
}

.btn {
    background-color: #18c6a6;
    color: #fff;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.btn:hover {
    background-color: #14a089;
}

.wallet-info {
    margin: 5px 0;
}

.input-field {
    width: 100%;
    padding: 8px;
    border: 1px solid #333;
    border-radius: 4px;
    background-color: #1e1e1e;
    color: #e5e5e5;
}

.input-field::placeholder {
    color: #999;
}

.link {
    color: #18c6a6;
    text-decoration: underline;
}

.link:hover {
    color: #14a089;
}

.call-function {
    margin-bottom: 15px;
}
</style>