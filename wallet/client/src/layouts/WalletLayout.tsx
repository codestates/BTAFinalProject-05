import {useMemo} from "react";
import {useLocation} from "react-router-dom";
import {Box} from "@mui/material";
import {FakeTab} from "../components";

import type {FC, ReactNode} from "react";
import type {BoxProps} from "@mui/material";

export interface WalletLayoutProps extends BoxProps {
    logo?: boolean;
    topNode: ReactNode;
    middleNode: ReactNode;
}

const WalletLayout: FC<WalletLayoutProps> = (props) => {
    const {sx = {}, topNode, middleNode, ...rest} = props;
    const {pathname = '/'} = useLocation();

    const activeIndex = useMemo(() => {
        if (pathname?.includes('wallet')) {
            return 0;
        } else if(pathname?.includes('receipts')) {
            return 2;
        } else return 1;
    }, [pathname]);

    return (
        <Box
            id="layout"
            sx={{
                width: '100%',
                height: '100%',
                ...sx,
            }}
            {...rest}
        >
            <Box
                sx={{
                    height: '15%',
                    px: 5,
                    pt: 2,
                    bgcolor: 'action.disabledBackground'
                }}
            >
                {topNode}
            </Box>
            <Box
                sx={{
                    height: '73%',
                    px: 5,
                }}
            >
                {middleNode}
            </Box>
            <Box
                sx={{
                    height: '12%',
                    px: 5,
                    bgcolor: 'action.disabledBackground'
                }}
            >
                <Box
                    height="100%"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <FakeTab activeIndex={activeIndex} />
                </Box>
            </Box>
        </Box>
    )
}

export default WalletLayout;
