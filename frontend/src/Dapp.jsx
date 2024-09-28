import { useEffect, useState } from "react";
import { ethers } from "ethers";
import NavBar from "./components/NavBar";
import TXError from "./components/TxError";
import ConnectWallet from "./components/ConnectWallet";
import contractAdress from "./contracts/contract-address-localhost.json";
import PetAdoptionArtifacts from "./contracts/PetAdoption.json";
import Pets from "./components/Pets";
const HARDHAT_NETWORK_ID = Number(import.meta.env.VITE_HARDHAT_NETWORK_ID);

function Dapp() {
  const [selectedAddress, setselectedAddress] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  
  const [petsData, setpetsData] = useState([]);
  const [contractPets, setContractPets] = useState([]);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    if (contract) {
      fetchPetsFromContract();
    }
  }, [contract]);

  useEffect(() => {
    mergePetsData();
  }, [petsData, contractPets]);

  async function fetchPets() {
    const res = await fetch("/pets.json");
    const data = await res.json();
    setpetsData(data);
  }

  async function fetchPetsFromContract() {
    try {
      if (contract) {
        const pets = await contract.getAllUnadoptedPets();
        setContractPets(pets);
      } else {
        console.log("Contract not initialized");
      }
    } catch (error) {
      console.error("Error fetching pets from contract:", error);
    }
  }

  async function mergePetsData() {
    let pets = [];
    let i = 0;
    let j = 0;
    while (i < petsData.length && j < contractPets.length) {
      if (petsData[i].id == contractPets[j].id) {
        const petWithDetails = {
          ...petsData[i],
          category: contractPets[j].category,
          breed: contractPets[j].breed
        };
        pets.push(petWithDetails);
        i++;
        j++;
      } else {
        i++;
      }
    }
    setPets(pets);
  }

  const initContract = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const newContract = new ethers.Contract(
        contractAdress.PetAdoption,
        PetAdoptionArtifacts.abi,
        signer
      );

      setContract(newContract);
      return newContract;
    } catch (error) {
      console.error("Error initializing contract:", error);
      return null;
    }
  }

  const initDapp = async (address) => {
    setselectedAddress(address);
    const contract = await initContract();
    console.log(contract);
    await fetchPets();
  }

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
      initDapp(accounts[0]);

      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          setselectedAddress(undefined);
          initDapp(accounts[0]);
        }
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
      <br />
      <NavBar adress={selectedAddress} />
      <Pets pets={pets}/>
    </div>
  );
}

export default Dapp;
