import lightwallet from 'eth-lightwallet'
import * as bip39 from 'bip39';
import Web3 from 'web3';
import HDKey from 'hdkey';
import BlcokchainUtil from '../utility/BlockchainUtil';
import ApiResponse from '../utility/apiResponse';

let keyStoreInstance : any;

export default class WalletService {

    static async generateMnemonicCode() {    
        try {
            let mnemomic = lightwallet.keystore.generateRandomSeed();
            return mnemomic;    
        }   
        catch (err) {
            throw(err);
        } 
    }

    static async createWallet(password: string, mnemonicPhrase: string, res: any) {  
        try {

            lightwallet.keystore.createVault(
                {
                    password,
                    seedPhrase: mnemonicPhrase,
                    hdPathString: "m/0'/0'/0'",
                },
                function (err: any, ks: any) {
                    keyStoreInstance = ks;
                    keyStoreInstance.keyFromPassword(password, async (err: any, pwDerivedKey: any) => {
                        keyStoreInstance.generateNewAddress(pwDerivedKey, 1);
                        const walletAddress = keyStoreInstance.getAddresses().toString() as string;

                        return ApiResponse.result(res, { walletAddress: walletAddress }, 201);
                    });
                }
            );
        }      
        catch (err) {
            throw(err);
        }
    }

    // 잔고조회 OK
    static async balanceOf(walletAddress: string) {    
        try {
            let web3 = new Web3(new Web3.providers.HttpProvider('https://goerli.infura.io/v3/89a4af9bde694d9aafa9156e1fcbf899'));

            let result = await web3.eth.getBalance(walletAddress);
            let balance : any = Web3.utils.fromWei(result, 'ether');  
            return balance;
        }   
        catch (err) {
            throw(err);
        } 
    }

    // 개인키 반환
    static async getPrivatekey(password: string, res: any) {    
        try {
            keyStoreInstance.keyFromPassword(password, (err: any, pwDerivedKey: any) => {
                const walletAddress = keyStoreInstance.addresses[0];
                const privateKey = keyStoreInstance.exportPrivateKey(walletAddress, pwDerivedKey);

                return ApiResponse.result(res, { privateKey: privateKey }, 200);
            });
        }   
        catch (err) {
            throw(err);
        } 
    }

    // 개인키 반환
    static async getMyMnemonic(password: string, res: any) {    
        try {
            keyStoreInstance.keyFromPassword(password, async (err: any, pwDerivedKey: any) => {
                const mnemonic = keyStoreInstance.getSeed(pwDerivedKey)
                return ApiResponse.result(res, { mnemonic: mnemonic }, 200);
            })
        }   
        catch (err) {
            throw(err);
        } 
    }

    // 송신자의 privatekey 생성을 어떻게 해야될지 정해야됨!
    // 1. front에서 받을 것인지
    // 2. fromAddress를 전달받았을 때, back에서 privatekey를 찾을 것인지...  
    static async transfer(fromAddress: string, toAddress: string, amount: string, password: string, res: any) {        
        try {

            let web3 = new Web3(new Web3.providers.HttpProvider('https://goerli.infura.io/v3/89a4af9bde694d9aafa9156e1fcbf899'));
            const balance = await this.balanceOf(fromAddress);

            if(amount >= balance)
                throw new Error('insufficient balance');


            keyStoreInstance.keyFromPassword(password, async (err: any, pwDerivedKey: any) => {
                const walletAddress = keyStoreInstance.addresses[0];
                const privateKey = Buffer.from(keyStoreInstance.exportPrivateKey(walletAddress, pwDerivedKey), "hex");
                const nonce = await web3.eth.getTransactionCount(fromAddress as string, 'pending');

                const gasInfo = await BlcokchainUtil.getCurrentGasPrices();

                const params = {
                    nonce: nonce,
                    value: web3.utils.toHex(web3.utils.toWei(amount, "ether")),
                    gasPrice: web3.utils.toHex(gasInfo.fast * 10E7),
                    gasLimit: web3.utils.toHex(21000),
                    to: toAddress,
                };

                await BlcokchainUtil.sendSignedTransaction(params, privateKey, web3, res);
            });
        }   
        catch (err) {
            throw(err);
        } 
    }

}  