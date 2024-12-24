<template>
    <div class="input-wrapper">
        <input 
            :placeholder="'Enter argument ' + inputText"
            v-model="arg"
            @input="$emit('input', {argId, arg})"
            class="input-field"
        />
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default{
    name: "my-input",
    data(){
        return{
            arg: ""
        }
    },
    props:{
        inputText:{
            type: Array,
            required: true
        },
        argId:{
            type: Number,
            required: true
        },
        clear:{
            type: Boolean,
            required: true
        }  
    },
    methods:{
        ...mapActions({

        }),
    },
    watch:{
        clear(){
            if(this.clear === true){
                this.arg = ""
                this.$emit('clear')
            }
        }
    }
}
</script>

<style scoped>
.input-wrapper {
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
</style>
