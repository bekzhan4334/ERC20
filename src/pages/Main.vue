<template>
    <!-- Connect wallet container -->
    <div class="container"> 
        <button @click="connectionWallet" class="btn">Connect wallet</button>
        <p>User address: {{ $store.state.address }}</p>
        <p> Chain ID: {{ $store.state.chainId }}</p>
    </div>
    <deploy>
        
    </deploy>
</template>

<script>
import store from '@/store';
import { mapActions, mapState } from 'vuex'
export default{
    data(){
        return{
            to: "",
            txValue: "",
        }
    },
    computed: {
        ...mapState({
        })
    },
    methods:{
        ...mapActions({
            connectionWallet: "connectionWallet",
            // sendTransaction: "sendTransaction",
        }),
    },
}
</script>