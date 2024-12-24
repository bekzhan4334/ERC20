<template>
    <div>
        <input 
            :placeholder="'Enter argument ' + inputText"
            v-model="arg"
            @input="$emit('input', {argId, arg})"
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


