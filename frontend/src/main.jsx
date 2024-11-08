import React from 'react'
import ReactDOM from 'react-dom/client'
import Dapp from './Dapp.jsx'
import './index.css'
import Contributors from "./components/Contributors";
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Contributors />
    {/* <Dapp/> */}
  </React.StrictMode>,
)
