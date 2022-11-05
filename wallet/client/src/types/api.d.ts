import type {AxiosError, HttpStatusCode} from "axios";
import type {IToken} from "./models";

type CommonErrorResponse = AxiosError<{
    error: HttpStatusCode;
    reason: string;
    detail: string;
}>

/**
 * success types
 */
type WalletStatusSuccessResponse = {
    isInitialized: boolean;
    isUnlocked: boolean;
    changeAddress: string;
    walletHeight: number;
    error: string;
}
type WalletUnlockSuccessResponse = string;
type GetBalanceSuccessResponse = {
    height: number;
    balance: number;
    assets: Array<IToken>;
};
type GetWalletAddressesSuccessResponse = string[];
type RestoreWalletSuccessResponse = 'OK';

/**
 * error types
 */
type WalletStatusErrorResponse = CommonErrorResponse;
type WalletUnlockErrorResponse = CommonErrorResponse;
type GetBalanceErrorResponse = CommonErrorResponse;
type GetWalletAddressesErrorResponse = CommonErrorResponse;
type RestoreWalletErrorResponse = CommonErrorResponse;

