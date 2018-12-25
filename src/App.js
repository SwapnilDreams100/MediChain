import React, { Component } from 'react'
import MediChainContract from '../build/contracts/MediChain.json'
import getWeb3 from './utils/getWeb3'
import mediChainBytecode from './utils/mediChain'  // eslint-disable-line

import DrugOutput from './components/DrugOutput'
import DrugInput from './components/DrugInput'
import SupplierOutput from './components/SupplierOutput'
import SupplierInput from './components/SupplierInput'

import {Tabs} from './components/Tabs';
import {Tab} from './components/Tab';

import Modal from './components/Modal'

import './css/roboto.css'
import './css/rubik.css'
import './css/milligram.min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.gDrug = this.gDrug.bind(this);
    this.sDrug = this.sDrug.bind(this);
    this.gSupplier = this.gSupplier.bind(this);
    this.sSupplier= this.sSupplier.bind(this);

    this.initModal = this.initModal.bind(this);

    this.state = {

      id:123,
      price:123,
      name:"Swapnil",
      mrp:123,
      mfgdate:123,
      validity:123,
      chain:[123,1234,12345],
      t1:"",

      id_supplier:123,
      nameS:"DrugStore",
      city:"",
      t2:"",

      contractAddress: "none",
      modal: 0,
      instance: null,
      web3: null
    }
  }

  componentWillMount() {

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateGetDrug()
      this.instantiateSetDrug()
      this.instantiateGetSupplier()
      this.instantiateSetSupplier()

    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

//Drug Area
  instantiateGetDrug() {
    
    const contract = require('truffle-contract')
    const mediChain = contract(MediChainContract)
    let mediChainInstance
    mediChain.setProvider(this.state.web3.currentProvider)

    mediChain.deployed().then((instance) => {
      mediChainInstance = instance
      this.setState({ instance: mediChainInstance })

      this.setState({ contractAddress: mediChainInstance.address })

    }).then((result) => {
      return this.setState({ id:result[0],
        price:result[1],
        name:result[2],
        mrp:result[3],
        mfgdate:result[4],
        validity:result[5],
        chain:result[6] })
    })
  }

  instantiateSetDrug() {
    
    const contract = require('truffle-contract')
    const mediChain = contract(MediChainContract)
    let mediChainInstance
    mediChain.setProvider(this.state.web3.currentProvider)

    mediChain.deployed().then((instance) => {
      mediChainInstance = instance
      this.setState({ instance: mediChainInstance })
      this.setState({ contractAddress: mediChainInstance.address })

    }).then((result) => {
      return this.setState({ 
        t1:result
    })
    })
  }

  gDrug(message) {
    this.setState({ id:message[0],
      price:message[1],
      name:message[2],
      mrp:message[3],
      mfgdate:message[4],
      validity:message[5],
      chain:message[6] })
  }

  sDrug(message) {
    this.setState({ 
      t1: message
    })
  }

//Supplier Area

  instantiateGetSupplier() {
    
    const contract = require('truffle-contract')
    const mediChain = contract(MediChainContract)
    let mediChainInstance
    mediChain.setProvider(this.state.web3.currentProvider)

    mediChain.deployed().then((instance) => {
      mediChainInstance = instance
      this.setState({ instance: mediChainInstance })

      this.setState({ contractAddress: mediChainInstance.address })

    }).then((result) => {
      return this.setState({ id:result[0],
        id_supplier:result[1],
        nameS:result[2],
        city:result[3],
      })
    })
  }

  instantiateSetSupplier() {
    
    const contract = require('truffle-contract')
    const mediChain = contract(MediChainContract)
    let mediChainInstance
    mediChain.setProvider(this.state.web3.currentProvider)

    mediChain.deployed().then((instance) => {
      mediChainInstance = instance
      this.setState({ instance: mediChainInstance })
      this.setState({ contractAddress: mediChainInstance.address })

    }).then((result) => {
      return this.setState({ 
        t2:result
    })
    })
  }

  gSupplier(message) {
    this.setState({ id:message[0],
      id_supplier:message[1],
      nameS:message[2],
      city:message[3],
    })
  }

  sSupplier(message) {
    this.setState({ 
      t2: message
    })
  }

//Modal
  initModal(value) {
    this.setState({
      modal: value
    })
  }

  render() {
    return (
      <div className="App">
        <div className="top-bar">
          <a href="#" className="title-link">MediChain</a>
          <div className="notice-box">Working</div>
        </div>
        <main className="container">
          <h1>MediChain</h1>
          <h2>A Medicine Supply Chain Tracking BlockChain</h2>
          <div className="contract-status">
            <p>Contract address: <span className="contract-address">{this.state.contractAddress}</span></p>
          </div>
          <Tabs>

              <Tab iconClassName={'fa fa-headphones'} linkClassName={'custom-link'}>
                  <p className="message">The no. of drugs is: <strong className="hello-world">{this.state.t1}</strong></p>

                  <DrugInput state={this.state} sDrug={this.sDrug} initModal={this.initModal} />

              </Tab>

              <Tab iconClassName={'fa fa-headphones'} linkClassName={'custom-link'}>

                  <p className="message">The drug name from your contract is: <strong className="hello-world">{this.state.chain}</strong></p>

                  < DrugOutput state={this.state} gDrug={this.gDrug} initModal={this.initModal} />             

              </Tab>

              <Tab iconClassName={'fa fa-headphones'} linkClassName={'custom-link'}>
                  <p className="message">The no. of suppliers is: <strong className="hello-world">{this.state.t2}</strong></p>

                  <SupplierInput state={this.state} sSupplier={this.sSupplier} initModal={this.initModal} />

              </Tab>

              <Tab iconClassName={'fa fa-headphones'} linkClassName={'custom-link'}>

                  <p className="message">The supplier name from your contract is: <strong className="hello-world">{this.state.nameS}</strong></p>

                  < SupplierOutput state={this.state} gSupplier={this.gSupplier} initModal={this.initModal} />             

              </Tab>
              
          
          </Tabs>
          
        </main>
        <Modal modal={this.state.modal} />
      </div>
    );
  }
}

export default App
