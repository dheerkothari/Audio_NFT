import React, { useState } from 'react';
import './App.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    detectProvider,
    listenAccountChange,
    listenNetworkChange,
    loadBlockChainData
} from './component/web3';
import Web3 from 'web3';
import { poolMethods } from './component/factory';

const App = () => {

    const [isConnected, setIsConnected] = useState(false);
    const [currentAccount, setCurrentAccount] = useState(null);
    const [currentAccountBalance, setCurrentAccountBalance] = useState(null);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const [getData, setGetData] = useState("")
    const [networkDetails, setNetworkDetails] = useState({
        address: "",
        web3: "",
        connected: "",
        connectTag: "",
        chainData: "",
        wallet: "",
        chainId: "",
        networkId: "",
        balance: "",
    });

    const resetApp = async () => {
        setNetworkDetails({
            address: "",
            web3: "",
            connected: false,
            connectTag: "",
            chainData: "",
            wallet: "",
            chainId: "",
            networkId: "",
            balance: "",
        });
        const web3 = window.web3;
        // localStorage.clear();
        //close -> disconnect
        if (web3 && web3.currentProvider) {
            window.location.reload()
            //await web3.currentProvider.disconnect();
        }
    };

    const handleConnect = async () => {
        const provider = detectProvider();
        const web3 = new Web3(provider);
        console.log("web3---------------------", window.web3.currentProvider)
        console.log("web3----------web3-----------", web3)
        if (provider) {

            if (provider !== window.ethereum) {
                console.error("No window.ethereum provider")
            }

            else {

                const accounts = await web3.eth.getAccounts()
                console.log("accounts************************", accounts)
                let balance = await web3.eth.getBalance(accounts[0])
                balance = balance / 1e18
                if (accounts.length === 0) {
                    console.log("please Coonect To Metamask")
                }
                else if (accounts[0]) {
                    setCurrentAccount(accounts[0])
                    setCurrentAccountBalance(balance)
                    setIsConnected(true);


                    await provider.request({
                        method: "eth_requestAccounts"
                    })

                    await detectProvider();

                    const networkValue =
                        await loadBlockChainData(setNetworkDetails, networkDetails);
                    console.log("networkValue--------from 1st---------->>>>>>", networkValue);

                    await listenAccountChange(
                        setNetworkDetails,
                        networkDetails,
                        resetApp
                    );

                    await listenNetworkChange(
                        setNetworkDetails,
                        networkDetails,
                        resetApp
                    );

                    // if (networkValue) {
                    //   const instance = await poolMethods.getInstance(web3)
                    //   if (instance) {
                    //     console.log("instance---------->>>>>>>", instance);
                    //     // setValue(instance)
                    //     await poolMethods.candidate(instance, networkValue.address).then((result) => {
                    //       console.log("getOwner-------------", result)
                    //       setGetData(result);
                    //     })
                    //   }
                    // }

                }
            }
        } else {
            toast.info(
                "Metamask Extension Not Found ! Please Install Metamask to Connect"
            );
        }
    };

    const handleChange = async (event) => {
        const provider = detectProvider();
        const web3 = await new Web3(provider);
        event.preventDefault();
        // let x = BigNumber(senderValue)
        const instance = await poolMethods.getInstance(web3)
        console.log("instance from set", instance);
        if (instance) {
            // console.log(`The value you entered is: ${senderValue}`);
            let registrationresponse = await poolMethods.registration(instance, currentAccount, id, parseInt(status), name)
            console.log(registrationresponse, "***********--------------res")

            let appcandidateresponse = await poolMethods.approveCandidate(instance, currentAccount, '0x2f1CB419Fa0e05A79Ca50D21832a590727B51eCb')
            console.log(appcandidateresponse, "***********--------------res")

            // if (response) {
            //   await poolMethods.getOwner(instance, currentAccount).then((result) => {
            //     console.log(result, "***********--------------result");
            //     setGetData(result);
            //     // props.setGetData(senderValue);
            //   })
            // }


        } else {
            console.log("setmethod===error")
        }
        setId("");
        setStatus("");
        setName("");

        // window.location.reload();
    };

    const approveUser = async (event) => {
        const provider = detectProvider();
        const web3 = await new Web3(provider);
        event.preventDefault();
        // let x = BigNumber(senderValue)
        const instance = await poolMethods.getInstance(web3)
        console.log("instance from set", instance);
        if (instance) {

            let appuserresponse = await poolMethods.approveUser(instance, currentAccount, '0x60046c8E072f51967E95DC105724932BE741F67A')
            console.log(appuserresponse, "***********--------------res")

            // if (response) {
            //   await poolMethods.getOwner(instance, currentAccount).then((result) => {
            //     console.log(result, "***********--------------result");
            //     setGetData(result);
            //     // props.setGetData(senderValue);
            //   })
            // }


        } else {
            console.log("setmethod===error")
        }
        setId("");
        setStatus("");
        setName("");

        // window.location.reload();
    };

    const approveCandidate = async (event) => {
        const provider = detectProvider();
        const web3 = await new Web3(provider);
        event.preventDefault();
        // let x = BigNumber(senderValue)
        const instance = await poolMethods.getInstance(web3)
        console.log("instance from set", instance);
        if (instance) {

            let appcandidateresponse = await poolMethods.approveCandidate(instance, currentAccount, '0x2f1CB419Fa0e05A79Ca50D21832a590727B51eCb')
            console.log(appcandidateresponse, "***********--------------res")

            // if (response) {
            //   await poolMethods.getOwner(instance, currentAccount).then((result) => {
            //     console.log(result, "***********--------------result");
            //     setGetData(result);
            //     // props.setGetData(senderValue);
            //   })
            // }


        } else {
            console.log("setmethod===error")
        }
        setId("");
        setStatus("");
        setName("");

        // window.location.reload();
    };

    const voteCandidate = async (event) => {
        const provider = detectProvider();
        const web3 = await new Web3(provider);
        event.preventDefault();
        // let x = BigNumber(senderValue)
        const instance = await poolMethods.getInstance(web3)
        console.log("instance from set", instance);
        if (instance) {

            let appcandidateresponse = await poolMethods.voted(instance, currentAccount, '0x2f1CB419Fa0e05A79Ca50D21832a590727B51eCb')
            console.log(appcandidateresponse, "***********--------------res")

            // if (response) {
            //   await poolMethods.getOwner(instance, currentAccount).then((result) => {
            //     console.log(result, "***********--------------result");
            //     setGetData(result);
            //     // props.setGetData(senderValue);
            //   })
            // }


        } else {
            console.log("setmethod===error")
        }
        setId("");
        setStatus("");
        setName("");

        // window.location.reload();
    };

    const voteCandidateuser2 = async (event) => {
        const provider = detectProvider();
        const web3 = await new Web3(provider);
        event.preventDefault();
        // let x = BigNumber(senderValue)
        const instance = await poolMethods.getInstance(web3)
        console.log("instance from set", instance);
        if (instance) {

            let appcandidateresponse = await poolMethods.voted(instance, currentAccount, '0x2f1CB419Fa0e05A79Ca50D21832a590727B51eCb')
            console.log(appcandidateresponse, "***********--------------res")

            // if (response) {
            //   await poolMethods.getOwner(instance, currentAccount).then((result) => {
            //     console.log(result, "***********--------------result");
            //     setGetData(result);
            //     // props.setGetData(senderValue);
            //   })
            // }


        } else {
            console.log("setmethod===error")
        }
        setId("");
        setStatus("");
        setName("");

        // window.location.reload();
    };

    return (
        <div>
            <h1>Welcome</h1>
            <p>Current Accout :---  {currentAccount}</p>
            <p>Current Balance :---  {currentAccountBalance}</p>
            {!isConnected && <button type="button" onClick={handleConnect}>Connect</button>}<br></br><br></br>
            {isConnected && <button type="button" onClick={resetApp}>Disconnect</button>}<br></br><br></br>
            <form onSubmit={(event) => handleChange(event)}>
                <label>
                    Enter your id:
                    <input
                        type="string"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                </label><br></br><br></br>

                <label>
                    Enter your status:
                    <input
                        type="string"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    />
                </label><br></br><br></br>

                <label>
                    Enter your name:
                    <input
                        type="string"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label><br></br><br></br>
                <input type="submit" />
            </form>
            <p>Current Owner :---{getData}</p>
            {/* <button type='button'>Registraction</button> */}
            {/* {isConnected && <button type="button" onClick={handleChange}>changeOwner</button>} */}

            {currentAccount === '0x6031CE24Ceb197af86F1b26F6b4EEbb4C7CacfBB' && <button onClick={approveUser}>Approve User</button>}
            {currentAccount === '0x6031CE24Ceb197af86F1b26F6b4EEbb4C7CacfBB' && <button onClick={approveCandidate}>Approve Candidate</button>}
            {currentAccount === '0x60046c8E072f51967E95DC105724932BE741F67A' && <button onClick={voteCandidate}>Vote</button>}
            {currentAccount === '0xd382E0f60c4279DF1167bE64fA86c788863F7C99' && <button onClick={voteCandidateuser2}>Vote</button>}

            <ToastContainer autoClose={3000} />
        </div>
    );
}

export default App;
