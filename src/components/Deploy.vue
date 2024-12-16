<template>
    <div>
        <input v-model="tokenName" placeholder="Enter token name"
        />
        <input v-model="symbol" placeholder="Enter symbol(Ticker) name"
        />
        <input v-model="decimals" placeholder="Enter decimals for your token"
        />
        <button @click="createToken">Create token</button>
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
            decimals: 18,
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


