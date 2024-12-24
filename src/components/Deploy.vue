<template>
    <h1> DEPLOY CONTRACT SECTION</h1>
    <div>
        <input v-model="tokenName" placeholder="Enter token name"
        />
    </div>
    <div>
        <input v-model="symbol" placeholder="Enter symbol(Ticker) name"
        />
    </div>
    <div>
        <input v-model="decimals" placeholder="Enter decimals for your token"
        />
    </div>
    <br>
    <button @click="createToken">Create token</button>
    
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


