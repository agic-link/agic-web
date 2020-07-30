import config from "./config";

let web3;
let Agic;
export let agicInstance;

export function checkMetamask() {
    if (!window.ethereum) {
        alert("Please install the latest version of metamask");
        return;
    }
    web3 = new Web3(ethereum);
    Agic = web3.eth.contract(config.abi);
    getNetwork((error, result) => {
        createInstance(result.result);
    });
}

export function getNetworkName(networkId) {
    return config.network_list[networkId];
}

export function createInstance(network) {
    if (network === '3') {
        agicInstance = Agic.at(config.ropsten_address);
    } else {
        agicInstance = undefined;
    }
}

export async function getAddress(callback) {
    ethereum.sendAsync({method: 'eth_requestAccounts'}, callback);
}

export function getWalletBalance(wallet, callback) {
    ethereum.sendAsync({method: 'eth_getBalance', params: [wallet, "latest"]}, callback);
}

export function getNetwork(callback) {
    ethereum.sendAsync({method: 'net_version'}, callback);
}

export function totalSupply(callback) {
    agicInstance.totalSupply(callback);
}

export function totalPledgeEth(callback) {
    agicInstance.totalPledgeEth(callback);
}

export function getBalanceOf(owner, callback) {
    agicInstance.balanceOf(owner, callback);
}

export function getPledgeEth(owner, callback) {
    agicInstance.pledgeEth(owner, callback);
}

export function getInterestAmount(callback) {
    agicInstance.interestAmount(callback);
}

//todo 结合返回的订单id进行记录
export function doDeposit(value, callback) {
    if (value > 0) {
        agicInstance.deposit({value: value * (1e18)}, callback)
    } else {
        alert("Please be greater than zero");
    }
}

export function redeem(callback) {
    agicInstance.redeem(callback);
}