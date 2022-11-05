import {useEffect, useState} from "react";
import axios from "axios";
import {ERGO_ENDPOINTS} from "../constants";

export const useProxyCheck = () => {
    const [proxyState, setProxyState] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            try {
                const result = await axios.get(ERGO_ENDPOINTS.PING);
                result && setProxyState(true);
            } catch (e) {
                setProxyState(false);
            }
        })();
    }, []);

    return {on: proxyState};
};
