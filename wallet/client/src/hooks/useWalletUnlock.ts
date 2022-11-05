import axios from "axios";
import {useQuery} from "react-query";
import {useEnv} from "./useEnv";
import {ERGO_ENDPOINTS} from "../constants";

import type {WalletUnlockErrorResponse, WalletUnlockSuccessResponse} from "../types/api";

export const useWalletUnlock = () => {
    const [api_key, pass] = useEnv(['API_KEY', 'PASSWORD']);

    const unlockWallet = async () => {
        const config = {headers: {'Content-Type': 'application/json;charset=UTF-8', api_key}}
        const {data} = await axios.post(ERGO_ENDPOINTS.WALLET.UNLOCK, {pass}, config);
        return data;
    };

    return useQuery<WalletUnlockSuccessResponse, WalletUnlockErrorResponse>(
        'getWalletStatus',
        unlockWallet,
        {
            refetchOnWindowFocus: false,
            staleTime: 3000,
            retry: 0,
            enabled: false,
        }
    );
}
