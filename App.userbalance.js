import React, { Component } from 'react';
import Web3 from 'web3';
import { Modal, Navbar, Button } from 'react-bootstrap';

class App extends Component {

  web3;
  eBayClone;

  constructor(props, context) {
    super(props, context);
    this.web3 = new Web3(window.web3.currentProvider);

    const address = '0xF4c1801B5EF9D02E3CB0B91B728eF24Bfb7b77C7'; // copied from console log of 'node deploy.js' 0x...
    const abi = [{"constant":true,"inputs":[],"name":"getNumberOfProducts","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"products","outputs":[{"name":"id","type":"uint256"},{"name":"seller","type":"address"},{"name":"buyer","type":"address"},{"name":"name","type":"string"},{"name":"description","type":"string"},{"name":"price","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"string"},{"name":"_description","type":"string"},{"name":"_price","type":"uint256"}],"name":"sellProduct","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"}],"name":"buyProduct","outputs":[],"payable":true,"stateMutability":"payable","type":"function"}];// copy from console log of 'node deploy.js'  [{"constant":..., "inputs":[], "name":...}];
    this.eBayClone = new this.web3.eth.Contract(abi, address);
  }

  state = {
    user:'',
    balance:''
  };

  componentDidMount() {
    this.refreshContractDetails();
  }

  async refreshContractDetails() {
     const accounts = await this.web3.eth.getAccounts();
     const user = accounts[0];
     const balance = this.web3.utils.fromWei(await this.web3.eth.getBalance(user), 'ether');

     this.setState({
       user: user,
       balance: balance
     });
  }

  render() {
    return (
     <div>
        User: {this.state.user}
        <br />
        Balance: {this.state.balance}
      </div>
    );
  }
}
    
export default App;
