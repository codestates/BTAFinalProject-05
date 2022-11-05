import { rest } from 'msw';
import {ERGO_ENDPOINTS} from '../constants';

export const handlers = [
    rest.post(ERGO_ENDPOINTS.WALLET.INIT, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({mnemonic: "noise donor humble write furnace dilemma auto quit glide divide frown federal siege used draft"})
        )
    }),
    rest.get(ERGO_ENDPOINTS.WALLET.STATUS, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                isInitialized: false,
                isUnlocked: false,
                changeAddress: "",
                walletHeight: 0,
                error: ""
            }),
        );
    }),
    rest.post(ERGO_ENDPOINTS.WALLET.UNLOCK, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json("OK"),
        );
    })
]
