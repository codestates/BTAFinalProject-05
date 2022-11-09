import {WalletLayout} from "../layouts";
import {Avatar, Box, Typography} from "@mui/material";
import {ButtonPair, CopiableAddress, NetworkSelector} from "../components";
import {useEffect, useMemo, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useAddresses} from "../hooks";
import {useTransfer} from "../hooks/useTransfer";
import {OBJECTS} from "../constants";
import dayjs from "dayjs";

const {NETWORKS} = OBJECTS;
const useQueryParams = () => {
    const {search} = useLocation();

    const searchParams = useMemo(() => new URLSearchParams(search), [search]);

    return {
        address: searchParams.get('address'),
        amount: searchParams.get('amount'),
        fee: searchParams.get('fee'),
    }
}

const SendConfirm = () => {
    const [network, setNetwork] = useState<string>(NETWORKS[0].value);
    const {data: myAddresses = []} = useAddresses();
    const navigate = useNavigate();
    const {address, amount, fee} = useQueryParams();
    const {ticker} = useParams();

    const {refetch: transfer, data, isRefetching, isLoading} = useTransfer(address, amount, fee);

    useEffect(() => {
        console.log(data);
        // TODO: transaction들 storage 저장
        if (myAddresses?.length > 0 && typeof data === 'string') {
            const addr = myAddresses[0];
            if (chrome?.storage) {
                chrome.storage.local.get(addr).then((obj) => {
                    console.log({obj});
                    const previousList = (obj[addr] ?? []) as string[];
                    chrome.storage.local.set({
                        [addr]: [
                            {
                                address,
                                amount,
                                fee,
                                txId: data,
                                date: dayjs().format('YYYY년 MM월 DD일 HH시 mm분 ss초')
                            },
                            ...previousList,
                        ]
                    });
                });
            }
            navigate(`/all-set?txId=${data}`, {state: {action: 'transfer'}});
        }
    }, [myAddresses, data, navigate, amount, fee, address]);

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
                        src={`https://avatars.dicebear.com/api/bottts/${myAddresses[0]}.svg`}
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
                            <Typography variant="h5">보내는 주소</Typography>
                            <Typography color="text.secondary" variant="subtitle2"
                                        sx={{overflowWrap: 'break-word'}}>{address}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="h5">금액</Typography>
                            <Typography color="text.secondary" variant="body1">{`${amount} ${ticker}`}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="h5">수수료</Typography>
                            <Typography color="text.secondary" variant="body1">{`${fee} ${ticker}`}</Typography>
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
        />
    )
}

export default SendConfirm;
