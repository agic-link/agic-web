import config from "./config";
import Web3 from "web3";

let web3;
let agicInstance;

export function checkMetamask() {
    if (!window.ethereum) {
        alert("Please install the latest version of metamask");
        return;
    }
    ethereum.autoRefreshOnNetworkChange = false;
    web3 = new Web3(ethereum);
    return true;
}

export function getNetworkName(networkId) {
    let networkName = config.network_list[networkId];
    return networkName === undefined ? "unkown" : networkName;
}

export function createInstance(network) {
    if (network === '42') {
        agicInstance = new web3.eth.Contract(config.abi.agic, config.address.kovan.agic).methods;
    } else {
        agicInstance = undefined;
    }
    return agicInstance;
}

export function getAddress(callback) {
    ethereum.sendAsync({method: 'eth_requestAccounts'}, callback);
}

export function getWalletBalance(wallet, callback) {
    ethereum.sendAsync({method: 'eth_getBalance', params: [wallet, "latest"]}, callback);
}

export function getNetwork(callback) {
    ethereum.sendAsync({method: 'net_version'}, callback);
}

export function totalSupply(callback) {
    agicInstance.totalSupply().call(callback);
}

export function totalPledgeEth(callback) {
    agicInstance.getTotalPledgeEth().call(callback);
}

export function getBalanceOf(owner, callback) {
    agicInstance.balanceOf(owner).call(callback);
}

export function getPledgeEth(owner, callback) {
    agicInstance.getPledgeEth(owner).call(callback);
}

export function transfer(recipient, amount, callback) {
    agicInstance.transfer(recipient, amount).call(callback);
}

export function doDeposit(wallet, value, callback) {
    if (value > 0) {
        agicInstance.deposit().send({from: wallet, value: value * (1e18)}, callback);
    } else {
        alert("Please be greater than zero");
    }
}

export function withdraw(wallet, agic, callback) {
    if (agic > 0) {
        agicInstance.withdraw(agic).send({from: wallet}, callback);
    } else {
        alert("Please be greater than zero");
    }
}
