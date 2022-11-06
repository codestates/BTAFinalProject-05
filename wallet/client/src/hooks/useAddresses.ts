import axios from "axios";
import {useQuery} from "react-query";
import {ENDPOINTS} from "../constants";
import {useRecoilValue} from "recoil";
import {ErgoState} from "../states";

import type {GetWalletAddressesErrorResponse, GetWalletAddressesSuccessResponse} from "../types/api";

export const useAddresses = () => {
    const {api_key} = useRecoilValue(ErgoState);

    const getAddresses = async () => {
        const config = {headers: {api_key}};
        const {data} = await axios.get(ENDPOINTS.WALLET.ADDRESSES, config);
        return data;
    };

    return useQuery<GetWalletAddressesSuccessResponse, GetWalletAddressesErrorResponse>(
        ['getAddresses', api_key],
        getAddresses,
        {
            refetchOnWindowFocus: false,
            retry: 1,
        }
    );
}
