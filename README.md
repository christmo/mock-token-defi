# mock-token-defi
Enconde Academy - Mock token transfer in DAI, ganache + infura copy mainnet

# Homework

This exercise is to provide the initial setup for the rest of the DeFi exercises.
We will be forking Ethereum mainnet so that we can interact with existing contracts, today we will interact with the DAI stablecoin contract.
1. Set up an account on Infura
2. Go to gitpod : https://gitpod.io/workspaces (https://gitpod.io/workspaces) and create a new workspace
3. Navigate to the DeFi directory , there is the beginnings of a project
4. Run npm i to install the dependencies
5. In a terminal start ganache that forks the mainnet
npx ganache-cli -f <Your INFURA URL> -m “your 12 word mnemonic” --unlock 0x503828976D22510aad0201ac7EC88293211D23Da -i 9997 -p 8545
6. In a new terminal start the truffle console npx truffle console
We will work on the test file - DeFi.test.js, I have added in some useful addresses and the artifacts required
7. Add to the Before section, include a transaction to pay the owner account some DAI from the COINBASE account.
8. Add a unit test to check that the owner account has been funded.