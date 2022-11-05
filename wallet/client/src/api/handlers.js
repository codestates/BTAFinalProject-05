import { rest } from 'msw';
import {ENDPOINTS} from '../constants';

export const handlers = [
    rest.post(ENDPOINTS.WALLET.INIT, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({mnemonic: "noise donor humble write furnace dilemma auto quit glide divide frown federal siege used draft"})
        )
    }),
    rest.get(ENDPOINTS.WALLET.STATUS, (req, res, ctx) => {
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
    rest.post(ENDPOINTS.WALLET.UNLOCK, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json("OK"),
        );
    })
]
