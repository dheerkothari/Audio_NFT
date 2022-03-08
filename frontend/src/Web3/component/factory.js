import { ToastContainer, toast } from "react-toastify";
import { enviornment } from '../constace/constance'

function getInstance(web3) {
    return new Promise(async (resolve, reject) => {
        if (web3 && web3 != '') {

            try {
                let Instance = await new web3.eth.Contract(
                    enviornment.ERC20ABI,
                    enviornment.ERC20Address
                );

                if (Instance) {
                    resolve(Instance);
                } else {
                    reject({ error: "Issue with instance" });
                }
            } catch (error) {
                reject(error);
            }
        }
    });
};

function candidate(ercInstance, walletAddress) {
    return new Promise(async (resolve, reject) => {
        try {
            return await ercInstance.methods
                ._candidate(walletAddress)
                .call({ from: walletAddress },
                    (err, data) => {
                        if (err) {
                            reject({ error: err });
                        } else {
                            resolve(data)
                        }
                    });
        } catch (error) {
            reject(error)
        }
    })
}

function user(ercInstance, walletAddress) {
    return new Promise(async (resolve, reject) => {
        try {
            return await ercInstance.methods
                ._user()
                .call({ from: walletAddress },
                    (err, data) => {
                        if (err) {
                            reject({ error: err });
                        } else {
                            resolve(data)
                        }
                    });
        } catch (error) {
            reject(error)
        }
    })
}

function registration(ercInstance, walletAddress, id, status, name) {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("id----------", id);
            console.log("status---------", status);
            console.log("name-----------", name);

            return await ercInstance.methods
                .registration(id, name, status)
                .send({ from: walletAddress },
                    (err, data) => {
                        if (err) {
                            reject({ error: err });
                        } else {
                            resolve(data)
                        }
                    });
        } catch (error) {
            console.log("erorrrrrrrrr", error);
            reject(error)
        }
    })
}

function approveCandidate(ercInstance, walletAddress, candidateAddress) {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log("id----------", id);
            // console.log("status---------", status);
            // console.log("name-----------", name);

            return await ercInstance.methods
                .approveCandidate(candidateAddress)
                .send({ from: walletAddress },
                    (err, data) => {
                        if (err) {
                            reject({ error: err });
                        } else {
                            resolve(data)
                        }
                    });
        } catch (error) {
            console.log("erorrrrrrrrr", error);
            reject(error)
        }
    })
}

function approveUser(ercInstance, walletAddress, userAddress) {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log("id----------", id);
            // console.log("status---------", status);
            // console.log("name-----------", name);

            return await ercInstance.methods
                .approveUser(userAddress)
                .send({ from: walletAddress },
                    (err, data) => {
                        if (err) {
                            reject({ error: err });
                        } else {
                            resolve(data)
                        }
                    });
        } catch (error) {
            console.log("erorrrrrrrrr", error);
            reject(error)
        }
    })
}

function voted(ercInstance, walletAddress, candidateAddress) {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log("id----------", id);
            // console.log("status---------", status);
            // console.log("name-----------", name);

            return await ercInstance.methods
                .voted(candidateAddress)
                .send({ from: walletAddress },
                    (err, data) => {
                        if (err) {
                            reject({ error: err });
                        } else {
                            resolve(data)
                        }
                    });
        } catch (error) {
            console.log("erorrrrrrrrr", error);
            reject(error)
            toast.error("Something went wrong or you already voted")
        }
    })
}

export const poolMethods = {
    getInstance,
    candidate,
    user,
    registration,
    approveCandidate,
    approveUser,
    voted
}