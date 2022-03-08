import supportedChains from "./chain";

export function getChainData(chainId) {
    const chainData = supportedChains.filter(
        (chain) => chain.chain_id === chainId
    )[0];

    if (!chainData) {
        return { isChainValid: false };
    }
    chainData.isChainValid = true;
    return chainData;
}
