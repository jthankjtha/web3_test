
import React, {useEffect, useState} from 'react';
import {init, generateToken, getTokenUriByTokenId, ownerOf, getOwnerBalance} from './Web3Client';

function App() {
//const providerUrl = process.env.PROVIDER_URL || "http://localhost:8545";
const [minted, setMinted] = useState(false);
const [owner, setOwner] = useState("");
const [balance, setBalance] = useState(0);

const mintToken = ()=>{
  generateToken().then(tx =>{
    console.log(tx);
    setMinted(true);
  }).catch(err=>{
    console.log(err)
  })
}

const fetchFokenUriByTokenId = ()=>{
  getTokenUriByTokenId(1).then(tx =>{
    console.log(tx);
    alert(tx);
  }).catch(err=>{
    console.log(err);
  })
}

const getOwner = (tokenId)=>{
  ownerOf(tokenId).then(tx=>{
    console.log(tx);
    setOwner(tx);
  }).catch(err =>{
    console.log(err);
  })
}

const fetchOwnerBalance = ()=>{
  getOwnerBalance().then(tx=>{
    console.log(tx);
    setBalance(tx);
  }).catch(err =>{
    console.log(err);
  })
}


useEffect(() => {
  init();
}, []);

  return (
    <div className="App">
      {!minted ? <button onClick={()=> mintToken()}>Mint Token </button>
      : <p>"Token minted successfully"</p>
      }
    <br />
    <button onClick={() => fetchFokenUriByTokenId()}>Get Token URI</button>
    <br />
    <button onClick={()=> getOwner(8)}>Owner Of</button> <span>{owner}</span>
    <br></br>
    <button onClick={()=> fetchOwnerBalance()}>Refresh Balance</button>
    <p>Your balance is {balance}</p>
    </div>  
  );
}

export default App;
