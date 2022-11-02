import IController from '../interface/IController';
import BaseController from './baseController';
import ApiResponse from '../utility/apiResponse';
import WalletService from '../service/walletService';
import Util from '../utility/util';

export default class WalletController extends BaseController {         

    static createWallet : IController = async (req, res) => {
        const { password, mnemonicPhrase } = req.body;
        try {     
            await WalletService.createWallet(password, mnemonicPhrase, res);
        }
        catch (err: any) {            
            err.source = "WalletController:createWallet";
            ApiResponse.error(res, err);
        }
    }

    static login : IController = async (req, res) => {
        const { password, mnemonicPhrase } = req.body;
        try {     
            await WalletService.createWallet(password, mnemonicPhrase, res);
        }
        catch (err: any) {            
            err.source = "WalletController:login";
            ApiResponse.error(res, err);
        }
    }


    static generateMnemonicCode : IController = async (req, res) => {
        try {     
            const mnemonicPhrase = await WalletService.generateMnemonicCode();
            ApiResponse.result(res, mnemonicPhrase, 200);
        }
        catch (err: any) {            
            err.source = "WalletController:generateMnemonicCode";
            ApiResponse.error(res, err);
        }
    }

    static balanceOf : IController = async (req, res) => {
        const walletAddress = Util.String(req.query.walletAddress);
        try {     
            let balance = await WalletService.balanceOf(walletAddress);
            ApiResponse.result(res, balance, 200);
        }
        catch (err: any) {            
            err.source = "WalletController:balanceOf";
            ApiResponse.error(res, err);
        }
    }

    static getPrivatekey : IController = async (req, res) => {
        const password = Util.String(req.query.password);
        try {     
            await WalletService.getPrivatekey(password, res);
        }
        catch (err: any) {            
            err.source = "WalletController:getPrivatekey";
            ApiResponse.error(res, err);
        }
    }

    static getMyMnemonic : IController = async (req, res) => {
        const password = Util.String(req.query.password);
        
        try {     
            await WalletService.getMyMnemonic(password, res);
        }
        catch (err: any) {            
            err.source = "WalletController:getMyMnemonic";
            ApiResponse.error(res, err);
        }
    }

    static transfer : IController = async (req, res) => {
        const { fromAddress, toAddress, amount, mnemonicPhrase, password } = req.body;
        try {     
            await WalletService.transfer(fromAddress, toAddress, amount, password, res);
            // ApiResponse.result(res, true, 201);
        }
        catch (err: any) {            
            err.source = "WalletController:transfer";

            const errMessage = err.message;

            if(errMessage === "insufficient balance"){
                err.status = 400;
                ApiResponse.error(res, err);
            }
            else 
                ApiResponse.error(res, err);
        }
    }

}