import axios from "axios";
import {useRecoilValue} from "recoil";
import {useQuery} from "react-query";
import {ENDPOINTS} from "../constants";
import {ErgoState} from "../states";

import type {TransferSuccessResponse, TransferErrorResponse} from "../types/api";

export const useTransfer = (toAddress: string | null, value: string | null) => {
    const {api_key} = useRecoilValue(ErgoState);

    const transfer = async () => {
        const config = {headers: {'Content-Type': 'application/json;charset=UTF-8', api_key}}
        const {data} = await axios.post(ENDPOINTS.TRANSACTION.SEND, {
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
        ['transfer', toAddress, value],
        transfer,
        {
            refetchOnWindowFocus: false,
            retry: 0,
            cacheTime: 0,
            staleTime: 0,
            enabled: false,
        }
    );
}
