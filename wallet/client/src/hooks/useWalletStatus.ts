import axios from "axios";
import {useRecoilValue} from "recoil";
import {useQuery} from "react-query";
import {ENDPOINTS} from "../constants";
import {ErgoState} from "../states";

import type {WalletStatusErrorResponse, WalletStatusSuccessResponse} from "../types/api";

export const useWalletStatus = () => {
    const {api_key} = useRecoilValue(ErgoState);
    const getWalletStatus = async () => {
        const config = {headers: {api_key}};
        const {data} = await axios.get(ENDPOINTS.WALLET.STATUS, config);
        return data;
    };

    return useQuery<WalletStatusSuccessResponse, WalletStatusErrorResponse>(
        ['getWalletStatus', api_key],
        getWalletStatus,
        {
            refetchOnWindowFocus: false,
            staleTime: 3000,
            retry: 1,
        }
    );
}
