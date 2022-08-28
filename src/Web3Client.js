import Web3 from "web3";

let selectedAccount;

export const init = () =>{
    let provider = window.ethereum;

  if(typeof provider != undefined){
    //Metamask is installed

    provider.request({method: 'eth_requestAccounts'}).then(accounts =>{
        selectedAccount = accounts[0];
      console.log("Selected Account is ${selectedAccount}");
    }).catch(err =>{
      console.log(err);
    });

    window.ethereum.on('accountsChanged', function (accounts){
        selectedAccount = accounts[0];
        console.log("Selected Account changed to ${selectedAccount}");
    })
  }

  const web3 = new Web3(provider);
}