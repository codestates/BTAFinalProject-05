const PORT = 3200;
const HOST = `http://localhost:${PORT}`;

const ENDPOINTS = {
    NEW_MNEMONIC: `${HOST}/mnemonic`,
    NEW_WALLET: `${HOST}/create`,
    BALANCE: `${HOST}/balance`,
    TRANSFER: `${HOST}/transfer`,
    LOGIN: `${HOST}/login`,
};

export const ERGO_ENDPOINTS = {
    PING: `${HOST}/ping`,
    WALLET: {
        /**
         * @description 새 지갑을 만들고 random seed를 return함.
         * @method POST
         * @param {
         *   "pass": "string",
         *   "mnemonicPass": "string"
         * }
         * @returns {"mnemonic": "string"}
         */
        INIT: `${HOST}/wallet/init`,

        /**
         * @description 새 지갑을 만들고 random seed를 return함.
         * @method POST
         * @param {
         *   "pass": "string",
         *   "mnemonic": "string"
         *   "mnemonicPass": "string"
         *   "usePre1627KeyDerivation": false
         * }
         * @returns {"mnemonic": "string"}
         */
        RESTORE: `${HOST}/wallet/restore`,

        /**
         * @description 지갑 주소를 return한다.
         * @method GET
         * @param none
         * @returns ["5tG8PwiWK6    y9tYDCZDDjQufE7QJmoU9n2uMtc7y3QF8hSKsoPwcw"]
         */
        ADDRESSES: `${HOST}/wallet/addresses`,

        /**
         * @description 지갑을 잠금상태로 변경한다.
         * @method GET
         * @param none
         * @returns "OK"
         */
        LOCK: `${HOST}/wallet/lock`,

        /**
         * @description 지갑의 잠금 상태를 해제한다.
         * @method POST
         * @param {
         *   "pass": "비밀번호"
         * }
         * @returns {}
         */
        UNLOCK: `${HOST}/wallet/unlock`,

        /**
         * @description 지갑 상태(잠금이 해제되었는지 등) 확인하는 api
         * @method GET
         * @param none
         * @returns {
         *   "isInitialized": true, 지갑 데이터가 있으나 잠겨있는 경우.
         *   "isUnlocked": false,
         *   "changeAddress": "",
         *   "walletHeight": 667,
         *   "error": ""
         * }
         *
         * @returns {
         *   "isInitialized": false, // created or restored된 지갑 데이터가 없을 경우!
         *   "isUnlocked": false,
         *   "changeAddress": "",
         *   "walletHeight": 0,
         *   "error": ""
         * }
         */
        STATUS: `${HOST}/wallet/status`,

        /**
         * @description 지갑의 잔고를 조회한다.(assets - token, height - block hight, balance - $ERG)
         * @method GET
         * @param none
         * @returns {
         *   "height": 674,
         *   "balance": 0,
         *   "assets": {}
         * }
         */
        BALANCE: `${HOST}/wallet/balances`,
    },
    UTIL: {
        /**
         * @description 지갑 주소가 유효한 값인지 확인한다.
         * @method POST
         * @param "5tCwNZ7PixWjogyuh78SFEmV8cDdNAtPqRsPhPo98CM6Ti3e5Bry"
         * @returns {
         *   "error": "32 (of class java.lang.Byte)",
         *   "address": "5tCwNZ7PixWjogyuh78SFEmV8cDdNAtPqRsPhPo98CM6Ti3e5Bry",
         *   "isValid": false
         * }
         */
        VALIDATE_ADDRESS: `${HOST}/utils/address`,
    },
    TRANSACTION: {
        /**
         * @description transaction을 전송한다.
         * @method POST
         * @param ?
         * @returns "7c5a44f9b643bbb0157d6ae8e19d74e28c1486c4c45c75130417dffd8dcef0fc"
         */
        SEND: `${HOST}/wallet/payment/send`,
    }
};

export default ENDPOINTS;
