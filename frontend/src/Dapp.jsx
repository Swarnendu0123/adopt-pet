import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import PetItem from "./components/PetItem";
import TXError from "./components/TxError";
import ConnectWallet from "./components/ConnectWallet";

const HARDHAT_NETWORK_ID = Number(import.meta.env.VITE_HARDHAT_NETWORK_ID);

function Dapp() {
  const [pets, setPets] = useState([]);
  const [selectedAddress, setselectedAddress] = useState(undefined);

  useEffect(() => {
    async function fetchPets() {
      const res = await fetch("/pets.json");
      const data = await res.json();
      setPets(data);
    }
    fetchPets();
  }, [])

  const switchNetwork = async () => {
    const chainIdHex = `0x${HARDHAT_NETWORK_ID.toString(16)}`;

    return window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chainIdHex }]
    });
  }

  const checkNetwork = async () => {
    if (window.ethereum.networkVersion !== HARDHAT_NETWORK_ID.toString()) {
      return switchNetwork();
    }
  }

  const connectWallet = async () => {
    try {

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      await checkNetwork();
      setselectedAddress(accounts[0]);

      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          setselectedAddress(undefined);
        }
        setselectedAddress(accounts[0]);
      });
      
    } catch (error) {
      console.error(error);
    }
  }



  if (selectedAddress === undefined) {
    return <ConnectWallet connect={connectWallet} />
  }

  if (window.ethereum === undefined) {
    return (
      <div className="container">
        <div className="message-warning" role="alert">
          <div>Please install <a href="https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn" target="_blank">MetaMask</a> to use this application</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <TXError />
      <br />
      <NavBar adress={selectedAddress} />
      <div className="items">
        {
          pets.map((pet, index) => {
            return <PetItem key={index} pet={pet} />;
          })
        }
      </div>
    </div>
  );
}

export default Dapp;