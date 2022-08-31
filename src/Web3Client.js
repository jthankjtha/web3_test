import Web3 from "web3";
import BretflixNFTContract from 'contracts/BreitlexNFT.json'

let selectedAccount;
let nftContract;
let isInitialized = false;

function isMetaMaskInstalled() {
  return Boolean(window.ethereum && window.ethereum.isMetaMask);
}

export const init = async () =>{
    let provider = window.ethereum;    

  if(isMetaMaskInstalled()){
    //Metamask is installed
    
    provider.request({method: 'eth_requestAccounts'}).then(accounts =>{
        selectedAccount = accounts[0];
      console.log('Selected Account is ${selectedAccount}');
    }).catch(err =>{
      console.log(err);
      return; 
    });

    window.ethereum.on('accountsChanged', function (accounts){
        selectedAccount = accounts[0];
        console.log('Selected Account changed to ${selectedAccount}');
    })
  }else{
    alert("Metamask not available. Please install and retry.");
    return;
  }

  const web3 = new Web3(provider);
  const networkId = await web3.eth.net.getId();
  nftContract = new web3.eth.Contract(BretflixNFTContract.abi, '0xe3Db97afc41721da4E9dF63ab2f9C9cf1DbE615a');

  isInitialized = true;
};

export const generateToken = async () =>{
  if(!isInitialized){
    await init();
  }
  return nftContract.methods.mint(selectedAccount, selectedAccount).send({from: selectedAccount});
}

export const getTokenUriByTokenId = async (tokenid) =>{
if(!isInitialized){
  await init();
}

  return nftContract.methods.tokenURI(tokenid);
}

export const ownerOf = async (tokenid)=>{
  if(!isInitialized){
    await init();
  }

  return nftContract.methods.ownerOf(tokenid);
}

export const getOwnerBalance = async ()=>{
  if(!isInitialized){
    await init();
  }

  return nftContract.methods.balanceOf(selectedAccount).call().then(balance =>{
    return Web3.utils.fromWei(balance);
  });
}

