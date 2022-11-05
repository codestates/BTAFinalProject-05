import type {AxiosError, HttpStatusCode} from "axios";

type CommonErrorResponse = AxiosError<{
    error: HttpStatusCode;
    reason: string;
    detail: string;
}>
type WalletStatusSuccessResponse = {
    isInitialized: boolean;
    isUnlocked: boolean;
    changeAddress: string;
    walletHeight: number;
    error: string;
}

type WalletStatusErrorResponse = CommonErrorResponse;

type WalletUnlockSuccessResponse = string;

type WalletUnlockErrorResponse = CommonErrorResponse;

