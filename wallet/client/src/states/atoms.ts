import {atom} from "recoil";

export interface ErgoStateType {
    address: string;
    mnemonic: string;
    api_key: string | null;
}
export const ErgoState = atom<ErgoStateType>({
    key: 'ergoState',
    default: {
        address: '',
        mnemonic: '',
        api_key: null,
    }
})
