<template>
    <div class="deploy-contract-container">
        <h1 class="section-title">DEPLOY CONTRACT SECTION</h1>
        <div class="input-container">
            <input 
                v-model="tokenName" 
                placeholder="Enter token name" 
                class="input-field"
            />
        </div>
        <div class="input-container">
            <input 
                v-model="symbol" 
                placeholder="Enter symbol (Ticker) name" 
                class="input-field"
            />
        </div>
        <div class="input-container">
            <input 
                v-model="decimals" 
                placeholder="Enter decimals for your token" 
                class="input-field"
            />
        </div>
        <br />
        <button @click="createToken" class="btn">Create Token</button>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default{
    name: "deploy",
    data(){
        return{
            tokenName: "",
            symbol: "",
            decimals: "",
        }
    },
    methods:{
        ...mapActions({
            deployToken: 'deployToken'
        }),
        async createToken(){
            await this.deployToken([this.tokenName, this.symbol, this.decimals])
            this.tokenName = ""
            this.symbol = ""
            this.decimals = ""
        }
    }
}
</script>


<style scoped>
.deploy-contract-container {
    background-color: #1e1e1e;
    color: #e5e5e5;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #333;
    margin-bottom: 15px;
}

.section-title {
    color: #18c6a6;
    font-size: 1.5em;
    margin-bottom: 20px;
    text-align: center;
}

.input-container {
    margin-bottom: 15px;
}

.input-field {
    width: 100%;
    padding: 10px;
    background-color: #333;
    color: #e5e5e5;
    border: 1px solid #444;
    border-radius: 4px;
    font-size: 14px;
}

.input-field::placeholder {
    color: #aaa;
}

.input-field:focus {
    outline: none;
    border-color: #18c6a6;
}

.btn {
    background-color: #18c6a6;
    color: #fff;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    font-size: 14px;
    display: block;
    width: 100%;
}

.btn:hover {
    background-color: #14a089;
}
</style>