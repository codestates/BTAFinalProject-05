import {WalletLayout} from "../layouts";
import {Avatar, Box, Typography} from "@mui/material";
import {ButtonPair, CopiableAddress, FakeTab, NetworkSelector} from "../components";
import {useMemo, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {SendCoinInput} from "../components";
import {addPrefixToAddress} from "../utils";
import {useRecoilValue} from "recoil";
import {ErgoState} from "../states";
import {useBalances} from "../hooks";
import {OBJECTS} from "../constants";

const {NETWORKS} = OBJECTS;

const SendInput = () => {
    const [network, setNetwork] = useState<string>(NETWORKS[0].value);
    const location = useLocation();
    const {ticker} = location.state || {};
    const navigate = useNavigate();
    const {address: myAddress} = useRecoilValue(ErgoState);

    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState('')

    const {data} = useBalances();

    // const addressError = useMemo(() => {
    //     return false;
    //     // const addr = /0x/.test(address) ? address : `0x${address}`;
    //     // return address.length > 0 && addr.length !== 42;
    // }, [address]);
    //
    const amountError = useMemo(() => {
        const parsedAmount = parseFloat(amount);
        const parsedBalance = (data?.balance || 0) / 10 ** 9;

        return (
            (amount.length > 0 && (isNaN(parsedAmount) || parsedAmount <=0))
            || (parsedBalance < parsedAmount)
        );
    }, [amount, data]);

    const addressError = false;
    // const amountError = false;

    return (
        <WalletLayout
            topNode={
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <CopiableAddress address={myAddress} />
                    <Avatar
                        sx={{
                            width: 25,
                            height: 25,
                        }}
                        alt="ERGO"
                        src={`https://avatars.dicebear.com/api/bottts/${myAddress}.svg`}
                    />
                </Box>
            }
            middleNode={
                <Box
                    height="100%"
                    id="box"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{transform: 'translateY(-20px)'}}
                >
                    <Box>
                        <NetworkSelector
                            options={NETWORKS}
                            value={network}
                            onChange={(e) => {
                                setNetwork(e.target.value as string);
                            }}
                        />
                    </Box>
                    <Box display="flex" flexDirection="column" alignItems="center" gap={3} mt={-10} width="100%">
                        <Box display="flex" flexDirection="column" alignItems="center" gap={0.5}>
                            <Box mt={3}>
                                <Typography fontWeight={700} variant="h6">{`$${ticker} 송금하기`}</Typography>
                            </Box>
                            <Avatar
                                sx={{
                                    width: 40,
                                    height: 40,
                                }}
                                alt="ERGO"
                                src={`https://avatars.dicebear.com/api/bottts/${address}.svg`}
                            />
                        </Box>
                        <Box width="100%" display="flex" flexDirection="column" gap={2}>
                            <SendCoinInput
                                inputType="address"
                                label="보내는 주소"
                                variant="outlined"
                                value={address}
                                onChange={(e) => {
                                    setAddress(e.target.value)
                                }}
                                error={addressError}
                            />
                            <SendCoinInput
                                inputType="amount"
                                label={`금액 (잔액: ${(data?.balance || 0) / 10 ** 9})`}
                                placeholder="0"
                                variant="outlined"
                                value={amount}
                                onChange={(e) => {
                                    setAmount(e.target.value)
                                }}
                                error={amountError}
                                unit={ticker}
                            />
                        </Box>
                    </Box>
                    <Box width="100%">
                        <ButtonPair
                            onPrevButtonClick={() => {
                                navigate('/send');
                            }}
                            onNextButtonClick={() => {
                                navigate(`confirm?address=${addPrefixToAddress(address)}&amount=${amount}`);
                            }}
                            disabled={address.length === 0 || amount.length === 0 || addressError || amountError}
                        />
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

export default SendInput;
