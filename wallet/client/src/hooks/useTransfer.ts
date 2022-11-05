import axios from "axios";
import {useQuery} from "react-query";
import {useEnv} from "./useEnv";
import {ERGO_ENDPOINTS} from "../constants";

import type {TransferSuccessResponse, TransferErrorResponse} from "../types/api";

export const useTransfer = (toAddress: string | null, value: string | null) => {
    const [api_key] = useEnv(['API_KEY', 'PASSWORD']);

    const transfer = async () => {
        const config = {headers: {'Content-Type': 'application/json;charset=UTF-8', api_key}}
        const {data} = await axios.post(ERGO_ENDPOINTS.TRANSACTION.SEND, {
            fee: 1000000000,
            requests: [{
                address: toAddress,
                assets: [],
                value: (parseInt(value ?? '0') * 10 ** 9)
            }]
        }, config);
        return data;
    };

    return useQuery<TransferSuccessResponse, TransferErrorResponse>(
        'getWalletStatus',
        transfer,
        {
            refetchOnWindowFocus: false,
            retry: 0,
            enabled: false,
        }
    );
}
