import {WalletLayout} from "../layouts";
import {Avatar, Box, Typography} from "@mui/material";
import {CoinCard, CopiableAddress, FakeTab, NetworkSelector} from "../components";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {GlobalState} from "../states";
import {useBalance} from "../hooks";

const NETWORKS = [
    {
        label: 'palm (testnet)',
        value: 'palm',
        disabled: false,
    },
    {
        label: 'palm (Mainnet)',
        value: 'palm Main',
        disabled: true,
    },
];

const BALANCES = [
    {
        name: 'palm',
        ticker: 'PALM',
        balance: '0.050000',
    }
]

const Send = () => {
    const [network, setNetwork] = useState<string>(NETWORKS[0].value);
    const navigate = useNavigate();
    const {address} = useRecoilValue(GlobalState);
    const {data, isLoading} = useBalance(address);

    return (
        <WalletLayout
            topNode={
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <CopiableAddress address={address} />
                    <Avatar
                        sx={{
                            width: 25,
                            height: 25,
                        }}
                        alt="ERGO"
                        src={`https://avatars.dicebear.com/api/bottts/${address}.svg`}
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
                    <Box mt={3}>
                        <Typography fontWeight={700} variant="h6">송금할 코인을 선택하세요</Typography>
                    </Box>
                    <Box width="100%" pt={3}>
                        {BALANCES.map((balance) => {
                            return (
                                <CoinCard
                                    key={balance.ticker}
                                    onClick={() => {
                                        navigate(balance.ticker, {state: balance});
                                    }}
                                    {...balance}
                                    balance={data}
                                />
                            );
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
                    <FakeTab activeIndex={1} />
                </Box>
            }
        />
    )
}

export default Send;
