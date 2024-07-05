const ConnectWallet = ({connect}) => {
    return (
        <div>
            <p>Please, connect your wallet to enter into the application.</p>
            <br />
            <button onClick={connect}>
                Connect Wallet
            </button>
        </div>
    )
}


export default ConnectWallet;