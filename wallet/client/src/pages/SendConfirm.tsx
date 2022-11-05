import {WalletLayout} from "../layouts";
import {Avatar, Box, Typography} from "@mui/material";
import {ButtonPair, CopiableAddress, FakeTab, NetworkSelector} from "../components";
import {useEffect, useMemo, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useAddresses} from "../hooks";
import {useTransfer} from "../hooks/useTransfer";
import {OBJECTS} from "../constants";

const {NETWORKS} = OBJECTS;
const useQueryParams = () => {
    const {search} = useLocation();

    const searchParams = useMemo(() => new URLSearchParams(search), [search]);

    return {
        address: searchParams.get('address'),
        amount: searchParams.get('amount'),
    }
}

const SendConfirm = () => {
    const [network, setNetwork] = useState<string>(NETWORKS[0].value);
    const {data: myAddresses = []} = useAddresses();
    const navigate = useNavigate();
    const {address, amount} = useQueryParams();
    const {ticker} = useParams();

    const {refetch: transfer, data, isRefetching, isLoading} = useTransfer(address, amount);

    useEffect(() => {
        console.log(data);
        if (Array.isArray(data) && data.length > 0) {
            navigate(`/all-set?txId=${data[0]}`, {state: {action: 'transfer'}});
        } else if (typeof data === 'string') {
            navigate(`/all-set?txId=${data}`, {state: {action: 'transfer'}});
        }
    }, [data, navigate]);

    return (
        <WalletLayout
            topNode={
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <CopiableAddress address={myAddresses[0] ?? ''} />
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
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="left"
                        gap={2}
                        mt={-20}
                        width="100%"
                    >
                        <Box>
                            <Typography variant="h5">Send Address</Typography>
                            <Typography color="text.secondary" variant="subtitle2" sx={{overflowWrap: 'break-word'}}>{address}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="h5">Amount</Typography>
                            <Typography color="text.secondary" variant="body1">{`${amount} ${ticker}`}</Typography>
                        </Box>
                    </Box>
                    <Box width="100%">
                        <ButtonPair
                            nextButtonLabel="확인 완료"
                            onPrevButtonClick={() => {
                                navigate(-1);
                            }}
                            onNextButtonClick={() => {
                                transfer();
                            }}
                            loading={isLoading || isRefetching}
                            disabled={false}
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

export default SendConfirm;
