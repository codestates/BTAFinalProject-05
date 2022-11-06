import {WalletLayout} from "../layouts";
import {Avatar, Box} from "@mui/material";
import {CopiableAddress, FakeTab, NetworkSelector, TxTable} from "../components";
import {useEffect, useState} from "react";
import {useAddresses} from "../hooks";
import {OBJECTS} from "../constants";

import type {Row} from "../components";

const {NETWORKS} = OBJECTS;

const Receipts = () => {
    const [network, setNetwork] = useState<string>(NETWORKS[0].value);
    const {data: myAddresses = []} = useAddresses();
    const [rows, setRows] = useState<Row[]>([]);

    useEffect(() => {
        if (chrome?.storage) {
            const addr = myAddresses[0];
            chrome.storage.local.get(addr).then(obj => {
                const list = obj[addr]
                console.log(list);
                if (Array.isArray(list)) {
                    setRows(list);
                }
            });
        }
    }, [myAddresses]);

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
                        width="110%"
                        height="100%"
                        marginX={-2}
                        mt={1}
                        sx={{overflowY: 'scroll'}}
                    >
                        <TxTable rows={rows} />
                    </Box>
                    <Box width="100%">
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
                    <FakeTab activeIndex={2} />
                </Box>
            }
        />
    )
}

export default Receipts;
