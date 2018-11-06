import React, { Component } from 'react';
import Web3 from 'web3';
import { Modal, Navbar, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class App extends Component {

  web3;
  eBayClone;

  constructor(props, context) {
    super(props, context);
    this.web3 = new Web3(window.web3.currentProvider);

    const address = ''; // copied from console log of 'node deploy.js' 0x...
    const abi = '  ';// copy from console log of 'node deploy.js'  [{"constant":..., "inputs":[], "name":...}];
    this.eBayClone = new this.web3.eth.Contract(abi, address);
    
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleProductDescChange = this.handleProductDescChange.bind(this);
    this.handleProductNameChange = this.handleProductNameChange.bind(this);
    this.handleProductPriceChange= this.handleProductPriceChange.bind(this);
  }

  state = {
    user:'',
    balance:'',
    show:false
    productName: '',
    productDescription: '',
    productPrice: '',
    message: ''
  };

  handleProductNameChange(e) {
    this.setSate({ productName: e.target.value });
  }
  handleProductDescChange(e) {
    this.setState({ productDescription: e.target.value });
  }

  handleProductPriceChange(e) {
    this.setState({ productPrice: e.target.value });
  }

  handleShow() {
    this.setState({
      show: true,
      productName:'',
      productPrice:'',
      productDescription:''
    });
  }

  handleClose() {
    this.setState({
      show: false
    });
  }

  handleSell = async (event) => {
    event.preventDefault();
    this.setState({message: "waiting on sell trasnaction success.."});
    this.handleClose();
    await this.eBayClone.methods.sellProduct(this.state.productName,
      this.sate.productDescription,
      this.web3.utils.toWei(this.state.productPrice, 'ether'))
      .send({
        from:this.state.user,
        gas:500000
      });

    await this.refreshContractDetails();
    this.setState({message: "Sell transaction entered"});
  }

  componentDidMount() {
    this.refereshContractDetails();
  }

  async refreshContractDetails() {
     const account = await this.web3.eth.getAccounts();
     const user = accounts[0];
     const balance = this.web3.utils.fromWei(await this.web3.eth.getBalance(user), 'ether');

     this.setState({
       user: user,
       balance: balance
     });
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.message}</h1>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>

              <a href="#home">eBay Clone</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Navbar.Text>
              Signed in as: <Navbar.Link href="#">{this.state.user}</Navbar.Link>
            </Navbar.Text>
          
            <Navbar.Text>Balance: {this.state.balance}</Navbar.Text>
            <Navbar.Text pullright>
              <Button onClick={this.handleShow}>Sell an article</Button>
            </Navbar.Text>
 
          </Navbar.Collapse>
        </Navbar>;
 
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Sell a Product </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form>
              <FormGroup controlId="formBasicText">
              
              <ControlLabel>Product name</ControlLabel>

              <FormControl type="text"
                           value={this.state.productName}
                           placeholder="Enter the name of your product"
                           onChange={this.handleProductNameChange} />

              <ControlLabel>Price in ETH</ControlLabel>
              <FormControl type="number"
                           value={this.state.productPrice}
                           placeholer="1"
                           onChange={this.handleProductPriceCHange}
              />
              <ControlLabel>Description</ControlLabel>
              <FormControl type="text"
                           value="{this.state.productDescription}
                           placeholder="Describe your article"
                           onChange={this.handleProductDescChange}
              />
             </FormGroup>
           </form>

          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
            <Button onClick={this.handleSell}>Sell</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
