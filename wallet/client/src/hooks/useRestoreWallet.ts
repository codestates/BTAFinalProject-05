import axios from "axios";
import {useQuery} from "react-query";
import {useEnv} from "./useEnv";
import {ERGO_ENDPOINTS} from "../constants";

import type {RestoreWalletSuccessResponse, RestoreWalletErrorResponse} from "../types/api";

export const useRestoreWallet = (mnemonic: string) => {
    const [api_key, pass] = useEnv(['API_KEY', 'PASSWORD']);

    const restoreWallet = async () => {
        const config = {headers: {'Content-Type': 'application/json;charset=UTF-8', api_key}}
        const {data} = await axios.post(ERGO_ENDPOINTS.WALLET.RESTORE, {
            pass,
            mnemonicPass: pass,
            mnemonic,
            usePre1627KeyDerivation: true // <- ?
        }, config);
        return data;
    };

    return useQuery<RestoreWalletSuccessResponse, RestoreWalletErrorResponse>(
        'getWalletStatus',
        restoreWallet,
        {
            refetchOnWindowFocus: false,
            staleTime: 3000,
            retry: 0,
            enabled: false,
        }
    );
}
