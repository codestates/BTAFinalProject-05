import {DefaultLayout} from "../layouts";
import {Box, Button} from "@mui/material";
import {ERGO_ENDPOINTS} from "../constants";
import axios from "axios";

const {
    REACT_APP_ERGO_API_KEY: API_KEY = '',
    REACT_APP_ERGO_PASSWORD: PASSWORD = ''
} = process.env

const Test = () => {
    const initWallet = async () => {
        const data = {pass: PASSWORD, mnemonicPass: PASSWORD};
        const config = {headers: {'Content-Type': 'application/json;charset=UTF-8', api_key: API_KEY}}
        const result = axios.post(ERGO_ENDPOINTS.WALLET.INIT, data, config);
        console.log(result);
    };

    const getAddresses = async () => {
        const config = {headers: {api_key: API_KEY}};
        const result = await axios.get(ERGO_ENDPOINTS.WALLET.GET_ADDRESSES, config);
        console.log(result);
    };

    const lockWallet = async () => {
        const config = {headers: {api_key: API_KEY}};
        const result = await axios.get(ERGO_ENDPOINTS.WALLET.LOCK, config);
        console.log(result);
    };

    const unlockWallet = async () => {
        const data = {pass: PASSWORD};
        const config = {headers: {'Content-Type': 'application/json;charset=UTF-8', api_key: API_KEY}}
        const result = await axios.post(ERGO_ENDPOINTS.WALLET.UNLOCK, data, config);
        console.log(result);
    };

    return (
        <DefaultLayout>
            <Box display="flex" gap={1} flexWrap="wrap">
                <Box>
                    <Button onClick={initWallet} variant="contained">init Wallet</Button>
                </Box>
                <Box>
                    <Button onClick={getAddresses} variant="contained">get addresses</Button>
                </Box>
                <Box>
                    <Button onClick={lockWallet} variant="contained">lock wallet</Button>
                </Box>
                <Box>
                    <Button onClick={unlockWallet} variant="contained">unlock wallet</Button>
                </Box>
            </Box>
        </DefaultLayout>
    )
}

export default Test;
