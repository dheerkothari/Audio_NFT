import Web3 from "web3";
import { ToastContainer, toast } from "react-toastify";
import { getChainData } from "./utils";

const detectProvider = () => {
    let provider;
    if (window.ethereum) {
        provider = window.ethereum;
    }
    else if (window.web3) {
        provider = window.web3.currentProvider;
    }
    else {
        toast.error("Connect Metamask")
    }
    return provider;
}

const loadBlockChainData = async (
    setNetworkDetails,
    networkDetails,
    setLoading
) => {

    try {
        const provider = detectProvider();
        const web3 = await new Web3(provider);
        const wallet = "metamask";

        // listen the Chain ID
        const chainId = await window.ethereum.chainId;
        console.log("chainId", chainId);
        const chainData = chainId ? getChainData(chainId) : null;
        console.log("chainData", chainId);
        if (chainData && chainData.isChainValid) {
            // Load Account
            const accounts = await web3.eth.getAccounts();
            console.log("accounts////////////////", accounts);
            let balance = await web3.eth.getBalance(accounts[0])
            balance = balance / 1e18
            // listen the Network ID
            const networkId = await web3.eth.net.getId();
            const networkValue = {
                ...networkDetails,
                address: accounts[0],
                web3: web3,
                connected: true,
                wallet: wallet,
                chainData: chainData,
                chainId: chainId,
                networkId: networkId,
                balance: balance
            }
            return networkValue;
        } else {
            await setNetworkDetails({
                ...networkDetails,
                address: "",
                web3: "",
                connected: false,
                wallet: "",
                chainData: "",
                chainId: "",
                networkId: "",
                balance: ""

            });
            toast.fire({
                icon: "warning",
                title: "Network not supported"
            });
            await setLoading(false);
        }

        // const tokenContract = await new web3.eth.Contract(
        //   TokenABI,
        //   TokenContractAddress
        // );

        // const guessContract = await new web3.eth.Contract(
        //   GuessABI,
        //   GuessContractAddress
        // );
        // await setTokenContract(tokenContract);

        // await setGuessContract(guessContract);
    } catch (err) {
        console.log(err);
    }
};

////////// CHECK IF USER SELECTED A DIFFERENT ACCOUNT IN METAMASK ///////////////

const listenAccountChange = async (
    setNetworkDetails,
    networkDetails,
    setLoading,
    resetApp
) => {
    try {
        const web3 = window.web3;
        window.ethereum.on("accountsChanged", async () => {

            setLoading(true);
            const accounts = await web3.eth.getAccounts();
            console.log("acounts--------", accounts)
            console.log("setNetworkDetails--------", setNetworkDetails)
            console.log("networkDetails--------", networkDetails)
            if (accounts.length !== 0) {
                window.location.reload();
                setLoading(false);
            } else {
                setLoading(false);
                resetApp();
            }
        });
    } catch (err) {
        setLoading(false);
        console.log(err);
    }
};

////////// CHECK IF USER SELECTED A DIFFERENT NETWORK ////////////

const listenNetworkChange = async (
    setNetworkDetails,
    networkDetails,
    setLoading,
    resetApp
) => {
    try {
        const web3 = window.web3;
        window.ethereum.on("networkChanged", async () => {
            const chainId = await window.ethereum.chainId;
            console.log('chainIdchainId', chainId)
            const chainData = chainId ? await getChainData(chainId) : null;
            const networkId = await web3.eth.net.getId();
            if (chainData && chainData.isChainValid) {
                await setNetworkDetails((prevState) => ({
                    ...prevState,
                    chainId: chainId,
                    networkId: networkId,
                    chainData: chainData,
                }));
                setLoading(false);
            } else {
                resetApp();
                toast.fire({
                    icon: "warning",
                    title: "Network not supported"
                });
                setLoading(false);
            }
        });
    } catch (err) {
        setLoading(false);
    }
};

export {
    detectProvider,
    loadBlockChainData,
    listenAccountChange,
    listenNetworkChange,
};
