import {WalletLayout} from "../layouts";
import {Avatar, Box} from "@mui/material";
import {CoinCard, CopiableAddress, FakeTab, NetworkSelector} from "../components";
import {useEffect, useState} from "react";
import {useSetRecoilState} from "recoil";
import {ErgoState} from "../states";
import {useAddresses, useBalances, useWalletUnlock} from "../hooks";
import {OBJECTS} from "../constants";

const {NETWORKS} = OBJECTS;
const BALANCES = [
    {
        name: 'ergo',
        ticker: 'ERG',
        balance: '0.050000',
    }
]

const Wallet = () => {
    const [network, setNetwork] = useState<string>(NETWORKS[0].value);
    const setErgoState = useSetRecoilState(ErgoState);
    const {refetch: unlock, data} = useWalletUnlock();
    const {refetch: getAddresses, data: firstAddress = []} = useAddresses();
    const {refetch: getBalance, data: DATA} = useBalances();

    useEffect(() => {
        unlock().then(() => {
            console.log('unlock 성공');
            getAddresses();
            getBalance();
        });
    }, [data, unlock, getAddresses, getBalance]);

    useEffect(() => {
        if (typeof firstAddress?.[0] === 'string') {
            setErgoState(prev => ({...prev, address: firstAddress[0]}))
        }
    }, [firstAddress, setErgoState]);

    return (
        <WalletLayout
            topNode={
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <CopiableAddress address={firstAddress[0]} />
                    <Avatar
                        sx={{
                            width: 25,
                            height: 25,
                        }}
                        alt="ERGO"
                        src={`https://avatars.dicebear.com/api/bottts/${firstAddress[0]}.svg`}
                    />
                </Box>
            }
            middleNode={
                <Box
                    height="100%"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    sx={{transform: 'translateY(-20px)'}}
                >
                    <NetworkSelector
                        options={NETWORKS}
                        value={network}
                        onChange={(e) => {
                            setNetwork(e.target.value as string);
                        }}
                    />
                    <Box width="100%" pt={3}>
                        {BALANCES.map((balance) => {
                            return <CoinCard key={balance.ticker} {...balance} balance={DATA?.balance || 0} />
                        })}
                    </Box>
                </Box>
            }
            bottomNode={
                <Box
                    height="100%"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <FakeTab activeIndex={0} />
                </Box>
            }
        />
    )
}

export default Wallet;
