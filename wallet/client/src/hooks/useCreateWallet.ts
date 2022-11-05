import axios from "axios";
import {useQuery} from "react-query";
import {useEnv} from "./useEnv";
import {ERGO_ENDPOINTS} from "../constants";

import type {CreateWalletSuccessResponse, CreateWalletErrorResponse} from "../types/api";

export const useCreateWallet = (pass: string) => {
    const [api_key] = useEnv(['API_KEY', 'PASSWORD']);

    const createWallet = async () => {
        const config = {headers: {'Content-Type': 'application/json;charset=UTF-8', api_key}}
        const {data} = await axios.post(ERGO_ENDPOINTS.WALLET.INIT, {
            pass,
            mnemonicPass: pass,
        }, config);
        return data;
    };

    return useQuery<CreateWalletSuccessResponse, CreateWalletErrorResponse>(
        'getWalletStatus',
        createWallet,
        {
            refetchOnWindowFocus: false,
            staleTime: 3000,
            retry: 0,
            enabled: false,
        }
    );
}
