import axios from "axios";
import {useQuery} from "react-query";
import {useRecoilValue} from "recoil";
import {useEnv} from "./useEnv";
import {ENDPOINTS} from "../constants";
import {ErgoState} from "../states";

import type {WalletUnlockErrorResponse, WalletUnlockSuccessResponse} from "../types/api";

export const useWalletUnlock = () => {
    const [pass] = useEnv(['PASSWORD']);
    const {api_key} = useRecoilValue(ErgoState);
    const unlockWallet = async () => {
        const config = {headers: {'Content-Type': 'application/json;charset=UTF-8', api_key}}
        const {data} = await axios.post(ENDPOINTS.WALLET.UNLOCK, {pass}, {...config});

        return data;
    };

    return useQuery<WalletUnlockSuccessResponse, WalletUnlockErrorResponse>(
        ['unlockWallet', pass, api_key],
        unlockWallet,
        {
            refetchOnWindowFocus: false,
            staleTime: 3000,
            retry: 0,
            enabled: false,
        }
    );
}
