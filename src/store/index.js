import { createStore } from 'vuex'
const ethers = require('ethers')
const provider = new ethers.providers.JsonRpcProvider({
        url: "https://eth-sepolia.g.alchemy.com/v2/dDYT6WucN8-Yl9X_i1dgbtTQEgq5ikHN"
})

import { ABI } from "@/contracts/ERC20.abi.js"
import  { bytecode } from "@/contracts/ERC20.bin.js" 
// import {TargetABI} from "@/contracts/Target.abi.js"
const iErc20 = new ethers.utils.Interface(ABI)

export default createStore({
  state: {
    provider: {},
    chainId: "",
    chain: "",
    address: "",
    iErc20: {},
    erc20: {},
    erc20Address: "",
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
      //creating Interface of ERC20 token
     
      // //saving the info in wallet
      state.chainId = await window.ethereum.request({ method: 'eth_chainId' })
      // state.wallet.chain = network.name
      if(state.chainId == "0x1"){
        state.chain = "ethereum"
      }
      else if(state.chainId == "0xaa36a7"){
        state.chain = "sepolia"
      }

      ethereum.on('accountsChanged', (accounts) => {
        state.address = ethers.utils.getAddress(accounts[0])
        console.log(`Account changed to ${state.address}`)
      })

      ethereum.on('chainChanged', async (chainId) => {
        state.provider = new ethers.providers.Web3Provider(ethereum)
        //saving the info in wallet
        state.chainId = await window.ethereum.request({ method: 'eth_chainId' })
        console.log(`chainId changed to: ${state.chainId}`)
        if(state.chainId == "0x1"){
          state.chain = "ethereum"
        }
        else if(state.chainId == "0xaa36a7"){
          state.chain = "sepolia"
        }
      })
    },
    async deployToken({state}, args){
      const [tokenName, symbol, decimals] = args
      
      
      const encodeConstructorParams = ethers.utils.defaultAbiCoder.encode(
        ["string", "string", "uint8"],
        [tokenName, symbol, decimals]
      )
      console.log(encodeConstructorParams)
      const deploymentData = "0x" + bytecode + encodeConstructorParams.slice(2)
      console.log(deploymentData)

      await window.ethereum.request({
        method: "eth_sendTransaction", 
        params: [{
          from: state.address,
          data: deploymentData
        }]
       })
       .then(async (hash) => {
        const tx = await provider.getTransaction(hash)
        const receipt = await tx.wait()
        state.erc20Address = receipt.contractAddress
        state.erc20 = new ethers.Contract(state.erc20Address, ABI, provider)
       })

    },
    async connectErc20({state}, erc20Address){
      state.erc20Address = erc20Address
      state.erc20 = new ethers.Contract(state.erc20Address, ABI, provider)
      console.log(state.erc20)
    },
    async mint({state}, args){
      const [to, value] = args
      const data = iErc20.encodeFunctionData("mint", [to, value])

      return await ethereum.request({
        method: "eth_sendTransaction",
        params: [{
          from: state.address,
          to: state.erc20Address,
          data: data
        }]
      })
    },
    async transfer({state}, args){
      const [to, amount] = args
      const data = iErc20.encodeFunctionData("transfer", [to, amount])

      return await ethereum.request({
        method: "eth_sendTransaction",
        params: [{
          from: state.address,
          to: state.erc20Address,
          data: data
        }]
      })
    },
    async approve({state}, args){
      const [spender, amount] = args
      const data = iErc20.encodeFunctionData("approve", [spender, amount])

      return await ethereum.request({
        method: "eth_sendTransaction",
        params: [{
          from: state.address,
          to: state.erc20Address,
          data: data
        }]
      })
    },
    async transferFrom({state}, args){
      const [from, to, amount] = args
      const data = iErc20.encodeFunctionData("transferFrom", [from, to, amount])

      return await ethereum.request({
        method: "eth_sendTransaction",
        params: [{
          from: state.address,
          to: state.erc20Address,
          data: data
        }]
      })
    },
    async getName({state}, args){
      return await state.erc20.name()
    },
    async symbol({state}, args){
      return await state.erc20.symbol()
    },
    async decimals({state}, args){
      return await state.erc20.decimals()
    },
    async totalSupply({state}, args){
      return await state.erc20.totalSupply()
    },
    async balanceOf({state}, args){
      const [address] = args
      return await state.erc20.balanceOf(address)
    },
    async allowance({state}, args){
      const [owner, spender] = args
      return await state.erc20.allowance(owner, spender)
    },


  },
  modules: {
  }
})
