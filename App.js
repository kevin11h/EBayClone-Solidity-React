import React, { Component } from 'react';
import Web3 from 'web3';

class App extends Component {
  async getAccount() {

    console.log(web3.eth.accounts)

    const web3 = new Web3(window.web3.currentProvider);

    const accounts = await web3.eth.getAccounts();

    console.log(accounts[0]);

  }

  render() {
    this.getAccount();
    return (
      <div className="app">
      </div>
    );
  }

}

export default App;
