const express = require('express');
const router = express.Router();

import WalletController from "../controller/walletController";

// Wallet (지갑)
router.post("/wallet/create", WalletController.createWallet);
router.post("/wallet/login", WalletController.login);
router.post("/wallet/transfer", WalletController.transfer);
router.get("/wallet/mnemonic", WalletController.generateMnemonicCode);
router.get("/wallet/balance", WalletController.balanceOf);
router.get("/wallet/privatekey", WalletController.getPrivatekey);
router.get("/wallet/mymnemonic", WalletController.getMyMnemonic);

export default router;
