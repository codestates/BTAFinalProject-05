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
    WALLET: {
        /**
         * @description 새 지갑을 만들고 random seed를 return함.
         * @method POST
         * @example {
         *   "pass": "string",
         *   "mnemonicPass": "string"
         * }
         * @returns {"mnemonic": "string"}
         */
        INIT: `${HOST}/wallet/init`,

        /**
         * @description 새 지갑을 만들고 random seed를 return함.
         * @method POST
         * @example {
         *   "pass": "string",
         *   "mnemonic": "string"
         *   "mnemonicPass": "string"
         *   "usePre1627KeyDerivation": false
         * }
         * @returns {"mnemonic": "string"}
         */
        RESTORE: `${HOST}/wallet/init`,
        GET_ADDRESSES: `${HOST}/wallet/addresses`,
        LOCK: `${HOST}/wallet/lock`,
        UNLOCK: `${HOST}/wallet/unlock`,
    },
    TRANSACTION: {
        VALIDATE_ADDRESS: `${HOST}/address/`,
    }
};

export default ENDPOINTS;
