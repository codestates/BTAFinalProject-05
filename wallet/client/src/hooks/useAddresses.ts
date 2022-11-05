import axios from "axios";
import {useQuery} from "react-query";
import {useEnv} from "./useEnv";
import {ERGO_ENDPOINTS} from "../constants";

import type {GetWalletAddressesErrorResponse, GetWalletAddressesSuccessResponse} from "../types/api";

export const useAddresses = () => {
    const [api_key] = useEnv(['API_KEY']);

    const getAddresses = async () => {
        const config = {headers: {api_key}};
        const {data} = await axios.get(ERGO_ENDPOINTS.WALLET.ADDRESSES, config);
        return data;
    };

    return useQuery<GetWalletAddressesSuccessResponse, GetWalletAddressesErrorResponse>(
        'getAddresses',
        getAddresses,
        {
            refetchOnWindowFocus: false,
            staleTime: 3000,
            retry: 1,
        }
    );
}
