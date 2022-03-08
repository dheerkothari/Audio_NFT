export const enviornment = {
    ERC20ABI: [
        { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" },
        {
            "inputs": [
                { "internalType": "address", "name": "_cd", "type": "address" }
            ],
            "name": "_candidate", "outputs":
                [
                    { "internalType": "string", "name": "", "type": "string" },
                    { "internalType": "string", "name": "", "type": "string" },
                    { "internalType": "bool", "name": "", "type": "bool" },
                    { "internalType": "uint256", "name": "", "type": "uint256" }
                ],
            "stateMutability": "view", "type": "function"
        },
        {
            "inputs":
                [
                    { "internalType": "address", "name": "_us", "type": "address" }
                ], "name": "_user", "outputs":
                [
                    { "internalType": "string", "name": "", "type": "string" },
                    { "internalType": "string", "name": "", "type": "string" }, { "internalType": "bool", "name": "", "type": "bool" },
                    { "internalType": "bool", "name": "", "type": "bool" }, { "internalType": "address", "name": "", "type": "address" }
                ], "stateMutability": "view", "type": "function"
        },
        {
            "inputs": [], "name": "admin", "outputs":
                [
                    { "internalType": "address", "name": "", "type": "address" }
                ], "stateMutability": "view", "type": "function"
        },
        {
            "inputs":
                [
                    { "internalType": "address", "name": "add_", "type": "address" }
                ], "name": "approveCandidate", "outputs": [], "stateMutability": "nonpayable", "type": "function"
        },
        {
            "inputs": [
                { "internalType": "address", "name": "add", "type": "address" }
            ], "name": "approveUser", "outputs": [], "stateMutability": "nonpayable", "type": "function"
        },
        {
            "inputs":
                [
                    { "internalType": "address", "name": "", "type": "address" }
                ],
            "name": "cd", "outputs":
                [
                    { "internalType": "string", "name": "ID", "type": "string" },
                    { "internalType": "string", "name": "name", "type": "string" },
                    { "internalType": "bool", "name": "verified", "type": "bool" },
                    { "internalType": "uint256", "name": "totalVote", "type": "uint256" }
                ], "stateMutability": "view", "type": "function"
        },
        {
            "inputs":
                [
                    { "internalType": "address", "name": "count_", "type": "address" }
                ], "name": "getCount", "outputs":
                [
                    { "internalType": "uint256", "name": "", "type": "uint256" }
                ], "stateMutability": "view", "type": "function"
        },
        {
            "inputs":
                [
                    { "internalType": "uint8", "name": "status_", "type": "uint8" },
                    { "internalType": "address", "name": "names", "type": "address" }
                ], "name": "getUserOrCandidate", "outputs":
                [
                    { "internalType": "string", "name": "", "type": "string" }
                ],
            "stateMutability": "view", "type": "function"
        },
        {
            "inputs":
                [
                    { "internalType": "string", "name": "id", "type": "string" },
                    { "internalType": "string", "name": "name", "type": "string" },
                    { "internalType": "uint256", "name": "status_", "type": "uint256" }
                ], "name": "registration", "outputs":
                [
                    { "internalType": "bool", "name": "success_", "type": "bool" }
                ], "stateMutability": "nonpayable", "type": "function"
        },
        {
            "inputs":
                [
                    { "internalType": "address", "name": "", "type": "address" }
                ], "name": "us", "outputs":
                [
                    { "internalType": "string", "name": "ID", "type": "string" },
                    { "internalType": "string", "name": "name", "type": "string" },
                    { "internalType": "bool", "name": "voted", "type": "bool" },
                    { "internalType": "bool", "name": "verified", "type": "bool" },
                    { "internalType": "address", "name": "voted_to", "type": "address" }
                ],
            "stateMutability": "view", "type": "function"
        },
        {
            "inputs":
                [
                    { "internalType": "address", "name": "candidate_", "type": "address" }
                ],
            "name": "voted", "outputs": [], "stateMutability": "nonpayable", "type": "function"
        }
    ],
    ERC20Address: '0x9F22982ABA38c43253342632F7B9bd2E6989AD91',
}
