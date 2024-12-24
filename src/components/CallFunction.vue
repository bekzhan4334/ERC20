<template>
    <div class="call-function-container">
        <div class="input-section">
            <!-- passing info to myinput component -->
            <my-input
                v-if="(inputText.length > 0 )"
                v-for="id in inputText.length"
                :key="id"
                :inputText="inputText[id-1]"
                :argId="id-1"
                :clear="clearInput"
                @input="inputArgument"
                @clear="stopClear"
                class="my-input"
            >
            </my-input>
        </div>
        <button @click="handler" class="btn">Call contract function <strong>{{ buttonText }}</strong></button>
        <div :id="buttonText" class="field hide">
            <span v-if="(readOnly === true)" class="result-text">
                Result: {{ result }}
            </span>
            <a v-else target="_blank" v-bind:href="result" class="result-link">
                Check transaction on Etherscan
            </a>
        </div>
    </div>
</template>

<script>
import { readonly } from 'vue';
import { mapActions, mapState } from 'vuex'
export default{
    name: "call-function",
    data(){
        return{
            result: "", // if payable hash if non payable means return object 
            args: [], // arguments to enter for function
            clearInput: false
        }
    },
    computed: {
        ...mapState({
            erc20Address: state => state.erc20Address
        })
    },
    props:{
        buttonText: {
            type: String, 
            required: true
        },
        buttonHandler: {
            type: Function,
            required: true
        },
        inputText: {
            type: Array,
            default: []
        },
        //check if it's payable or not
        readOnly: {
            type: Boolean, 
            default: true
        }
    },
    methods:{
        ...mapActions({

        }),
        async handler(){
            if(this.erc20Address == ""){
                alert("You have to deploy or enter valid contract address")
            }
            else{
                if(this.args.length != this.inputText.length){
                alert("You have to enter the arguments!")
            }
            else{
                if(this.readOnly){
                    this.result = await this.$props.buttonHandler(this.args)
                }
                else{
                    "https://sepolia.etherscan.io/tx/0x4ec1d4b5e95b800dcce8aae1cb6908cd23404b430beb57b4ed8968a150f569a7"
                    this.result = 'https://sepolia.etherscan.io/tx/' + await this.$props.buttonHandler(this.args)
                }
                this.clearInput = true
                this.args = []
                if(document.getElementById(this.buttonText).classList.contains("hide")){
                    document.getElementById(this.buttonText).classList.remove("hide")
                }
            }
            }
           
        },
        inputArgument(eventData){
            this.args[eventData.argId] = eventData.arg
        },
        stopClear(){
            this.clearInput = false
        },
    }
}
</script>

<style scoped>
.call-function-container {
    background-color: #1e1e1e;
    color: #e5e5e5;
    padding: 20px;
    margin-bottom: 15px;
    border-radius: 8px;
    border: 1px solid #333;
}

.input-section {
    margin-bottom: 15px;
}

.btn {
    background-color: #18c6a6;
    color: #fff;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
}

.btn:hover {
    background-color: #14a089;
}

.field {
    padding: 10px 0;
    margin-top: 5px;
    color: #e5e5e5;
}

.hide {
    visibility: hidden;
    display: inline;
}

.result-text {
    font-style: italic;
    color: #999;
}

.result-link {
    color: #18c6a6;
    text-decoration: underline;
}

.result-link:hover {
    color: #14a089;
}
</style>


