import axios from "axios";
import {useQuery} from "react-query";
import {useRecoilValue} from "recoil";
import {ENDPOINTS} from "../constants";
import {ErgoState} from "../states";

import type {CreateWalletSuccessResponse, CreateWalletErrorResponse} from "../types/api";

export const useCreateWallet = (pass: string) => {
    const {api_key} = useRecoilValue(ErgoState);
    const createWallet = async () => {
        const config = {headers: {'Content-Type': 'application/json;charset=UTF-8', api_key}}
        const {data} = await axios.post(ENDPOINTS.WALLET.INIT, {
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
