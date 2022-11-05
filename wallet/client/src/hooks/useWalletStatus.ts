import axios from "axios";
import {useQuery} from "react-query";
import {useEnv} from "./useEnv";
import {ERGO_ENDPOINTS} from "../constants";

import type {WalletStatusErrorResponse, WalletStatusSuccessResponse} from "../types/api";

export const useWalletStatus = () => {
    const [api_key] = useEnv(['API_KEY']);

    const getWalletStatus = async () => {
        const config = {headers: {api_key}};
        const {data} = await axios.get(ERGO_ENDPOINTS.WALLET.STATUS, config);
        return data;
    };

    return useQuery<WalletStatusSuccessResponse, WalletStatusErrorResponse>(
        'getWalletStatus',
        getWalletStatus,
        {
            refetchOnWindowFocus: false,
            staleTime: 3000,
            retry: 1,
        }
    );
}
