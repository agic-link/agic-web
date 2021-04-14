import config from "./config";
import Web3 from "web3";

let web3;
let Agic;
let agicInstance;

export function checkMetamask() {
    if (!window.ethereum) {
        alert("Please install the latest version of metamask");
        return;
    }
    ethereum.autoRefreshOnNetworkChange = false;
    console.log("ethereum", ethereum)
    web3 = new Web3(ethereum);
    console.log("web3", web3)
    // Agic = new web3.eth.Contract(config.abi.agic);
    return true
}

export function getNetworkName(networkId) {
    return config.network_list[networkId];
}

export function createInstance(network) {
    if (network === '3') {
        agicInstance = new web3.eth.Contract(config.abi.agic, config.address.ropsten.agic).methods;
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
    agicInstance.totalPledgeEth().call(callback);
}

export function getBalanceOf(owner, callback) {
    agicInstance.balanceOf(owner).call(callback);
}

export function getPledgeEth(owner, callback) {
    agicInstance.pledgeEth(owner).call(callback);
}

export function getInterestAmount(owner, callback) {
    agicInstance.interestAmount(owner).call(callback);
}

export function transfer(recipient, amount, callback) {
    agicInstance.transfer(recipient, amount).call(callback);
}

//todo 结合返回的订单id进行记录
export function doDeposit(wallet, value, callback) {
    if (value > 0) {
        console.log(agicInstance)
        agicInstance.deposit().send({from: wallet, value: value * (1e18)}, callback);
    } else {
        alert("Please be greater than zero");
    }
}

export function redeem(agic, callback) {
    if (agic > 0) {
        agicInstance.redeem(agic * 1e18).call(callback);
    } else {
        alert("Please be greater than zero");
    }
}