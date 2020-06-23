import ABI from '../config/ABI.json';
import { AGRE_ADDRESS } from '@/config/index'

export const contractInstance = new web3.eth.Contract(ABI, AGRE_ADDRESS);