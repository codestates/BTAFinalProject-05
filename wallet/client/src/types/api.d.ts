import type {HttpStatusCode} from "axios";

type WalletStatusSuccessResponse = {
    isInitialized: boolean;
    isUnlocked: boolean;
    changeAddress: string;
    walletHeight: number;
    error: string;
}

type WalletStatusErrorResponse = {
    error: HttpStatusCode;
    reason: string;
    detail: string;
}
