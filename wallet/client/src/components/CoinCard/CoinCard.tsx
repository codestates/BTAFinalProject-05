import {Avatar, Box, Typography} from '@mui/material';
import {noop} from "../../utils";

import type {FC} from "react";
import type {BoxProps} from '@mui/material';

export interface CoinCardProps {
    name: string;
    ticker: string;
    balance: number | string;
    onClick?: BoxProps['onClick'];
}

const convertUnit = (num: number | string) => {
    const parsed = typeof num === 'string' ? parseInt(num) : num || 0;
    return parsed / (10 ** 9);
};

export const CoinCard: FC<CoinCardProps> = (props) => {
    const {name, ticker, balance, onClick = noop} = props;

    return (
        <Box
            onClick={onClick}
            sx={{
                p: 2,
                mx: 1,
                display: 'flex',
                gap: 2,
                border: '1px solid',
                borderColor: 'grey.400',
                borderRadius: 1.5,
                '&:hover': {
                    cursor: 'pointer',
                    color: 'black',
                    bgcolor: 'grey.50',
                    opacity: 0.8,
                }
            }}
        >
            <Avatar
               alt="ergo"
               src="/ergo_logo_192.png"
            />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography variant="body2">{name}</Typography>
                <Typography variant="body2">{`${convertUnit(balance)} ${ticker}`}</Typography>
            </Box>
        </Box>
    );
}
