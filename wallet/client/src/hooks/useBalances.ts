import axios from "axios";
import {useQuery} from "react-query";
import {ENDPOINTS} from "../constants";
import {useRecoilValue} from "recoil";
import {ErgoState} from "../states";

import type {GetBalanceErrorResponse, GetBalanceSuccessResponse} from "../types/api";

export const useBalances = () => {
    const {api_key} = useRecoilValue(ErgoState);

    const getWalletStatus = async () => {
        const config = {headers: {api_key}};
        const {data} = await axios.get(ENDPOINTS.WALLET.BALANCE, config);
        return data;
    };

    return useQuery<GetBalanceSuccessResponse, GetBalanceErrorResponse>(
        'getWalletStatus',
        getWalletStatus,
        {
            refetchOnWindowFocus: false,
            staleTime: 3000,
            retry: 1,
        }
    );
}
