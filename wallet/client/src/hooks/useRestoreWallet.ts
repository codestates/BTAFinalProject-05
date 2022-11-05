import axios from "axios";
import {useQuery} from "react-query";
import {useRecoilValue} from "recoil";
import {ENDPOINTS} from "../constants";
import {ErgoState} from "../states";

import type {RestoreWalletSuccessResponse, RestoreWalletErrorResponse} from "../types/api";

export const useRestoreWallet = (mnemonic: string, pass: string) => {
    const {api_key} = useRecoilValue(ErgoState);

    const restoreWallet = async () => {
        const config = {headers: {'Content-Type': 'application/json;charset=UTF-8', api_key}}
        const {data} = await axios.post(ENDPOINTS.WALLET.RESTORE, {
            pass,
            mnemonicPass: pass,
            mnemonic,
            usePre1627KeyDerivation: true // <- ?
        }, config);
        return data;
    };

    return useQuery<RestoreWalletSuccessResponse, RestoreWalletErrorResponse>(
        'getWalletStatus',
        restoreWallet,
        {
            refetchOnWindowFocus: false,
            staleTime: 3000,
            retry: 0,
            enabled: false,
        }
    );
}
