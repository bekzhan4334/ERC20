import { createStore } from 'vuex'
const ethers = require('ethers')
const provider = new ethers.providers.JsonRpcProvider({
        url: "https://eth-sepolia.g.alchemy.com/v2/dDYT6WucN8-Yl9X_i1dgbtTQEgq5ikHN"
})

import {tokenABI} from "@/contracts/ERC20.abi.js"
import {tokenBytecode} from "@/contracts/ERC20.bin.js"
// import {TargetABI} from "@/contracts/Target.abi.js"

export default createStore({
  state: {
    provider: {},
    chainId: "",
    address: "",
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    async connectionWallet({state}){
      if(typeof window.ethereum !== 'undefined'){
        console.log("Ethereum client installed")
        if(ethereum.isMetaMask === true){
          console.log("Metemask installed")
          if(ethereum.isConnected() !== true){
            console.log("Metamask is not connected")
            await ethereum.enable()
          }
          else{
            console.log("Metamask connected")
          }
        }
        else{
          alert("Metamask is not installed")
        }
      }
      //connecting Metamask account
      await ethereum.request({method: "eth_requestAccounts"})
      .then(accounts => {
        state.address = ethers.utils.getAddress(accounts[0])
        console.log(`Account ${state.address} connected`)
      })
      //creating provider
      state.provider = new ethers.providers.Web3Provider(ethereum)
      // //saving the info in wallet
      state.chainId = await window.ethereum.request({ method: 'eth_chainId' })
      // state.wallet.chain = network.name

      ethereum.on('accountsChanged', (accounts) => {
        state.address = ethers.utils.getAddress(accounts[0])
        console.log(`Account changed to ${state.address}`)
      })

      ethereum.on('chainChanged', async (chainId) => {
        state.provider = new ethers.providers.Web3Provider(ethereum)
        //saving the info in wallet
        state.chainId = await window.ethereum.request({ method: 'eth_chainId' })
        console.log(`chainId changed to: ${state.chainId}`)
      })
    },
    async deployToken({state}, args){
      console.log(args)
      const [tokenName, symbol, decimals] = args
      
      
      const encodeConstructorParams = ethers.utils.defaultAbiCoder.encode(
        ["string", "string", "uint8"],
        [tokenName, symbol, decimals]
      )
      console.log(encodeConstructorParams)
      const deploymentData = tokenBytecode + encodeConstructorParams.slice(2)

      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction", 
        params: [{
          from: state.address,
          data: deploymentData
        }]
       })

       console.log("txHash: ", txHash)
    }
    // async sendTransaction({state}, {value}){
    //   let tempValue = ethers.utils.parseUnits(value, "ether")
    //   let tempHash = ""
    //   await ethereum.request({
    //     method: "eth_sendTransaction",
    //     params: [{
    //       from: state.address,
    //       to: state.multisigAddress,
    //       value: tempValue
    //     }]
    //   })
    //   .then(hash => {
    //     tempHash = hash
    //   })
    //   return tempHash
    // },

  },
  modules: {
  }
})
