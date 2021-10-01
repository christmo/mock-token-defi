var assert = require('assert');
const DeFi = artifacts.require('DeFi');
const DAIMock = artifacts.require('DAIMock');

const DAIAddress = '0x6b175474e89094c44da98b954eedeac495271d0f';
const USDCAddress = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';

const COINBASE = '0x503828976D22510aad0201ac7EC88293211D23Da';

contract('DeFi', accounts => {
  let owner;
  const INITIAL_AMOUNT = 9999;
  let balanceOwnerDaiBefore;
  const amountToTransfer = 30;

  before(async function() {
    accounts = await web3.eth.getAccounts();
    owner = accounts[0];
    console.log('owner account is ', owner);

    let balanceOwner = await web3.eth.getBalance(owner);
    console.log('Owner Balance: ' + balanceOwner / 1e18);

    const DAI_TokenContract = await DAIMock.at(DAIAddress);
    balanceOwnerDaiBefore = await DAI_TokenContract.balanceOf(owner);
    console.log('Owner Balance DAI: ' + balanceOwnerDaiBefore);
    // set up   DAI_TokenContract here from the DAI address
    let balanceCoinbaseDai = await DAI_TokenContract.balanceOf(COINBASE);
    console.log('Coinbase Balance DAI before transfer: ' + balanceCoinbaseDai);

    // test that we have the correct contract
    const symbol = await DAI_TokenContract.symbol();
    console.log(symbol);
    // now transfer some DAI from the COINBASE account to the owner account
    let tx = await DAI_TokenContract.transfer(owner, amountToTransfer, {
      from: COINBASE
    });

    balanceCoinbaseDai = await DAI_TokenContract.balanceOf(COINBASE);
    console.log('Coinbase Balance DAI after transfer: ' + balanceCoinbaseDai);

    //console.log(tx);
  });

  it('should check transfer succeeded', async () => {
    // write test to show transfer succeeded
    const DAI_TokenContract = await DAIMock.at(DAIAddress);
    let balanceOwner = await web3.eth.getBalance(owner);
    console.log('Owner Balance after transfer: ' + balanceOwner / 1e18);
    let balanceOwnerDaiAfter = await DAI_TokenContract.balanceOf(owner);
    console.log('Owner Balance DAI after transfer: ' + balanceOwnerDaiAfter);

    console.log(
      (balanceOwnerDaiBefore.toNumber() + amountToTransfer) + ' == ' + balanceOwnerDaiAfter
    );

    assert.equal(
      balanceOwnerDaiAfter,
      (balanceOwnerDaiBefore.toNumber() + amountToTransfer),
      'Both balances should be equal'
    );
  });
});
