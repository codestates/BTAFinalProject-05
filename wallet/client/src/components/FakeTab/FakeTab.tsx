import {Box} from '@mui/material';
import {
    CurrencyBitcoin as CurrencyBitcoinIcon,
    IosShare as IosShareIcon,
    Receipt as ReceiptIcon
} from '@mui/icons-material';

import type {FC} from "react";
import {FakeTabItem} from "./FakeTabItem";

export interface FakeTabProps {
    activeIndex: number;
}

const TABS = [
    {
        label: '잔액 조회',
        path: '/wallet',
        icon: CurrencyBitcoinIcon,
    },
    {
        label: '송금하기',
        path: '/send',
        icon: IosShareIcon,
    },
    {
        label: '히스토리',
        path: '/wallet',
        icon: ReceiptIcon,
        disabled: true,
    }
]


export const FakeTab: FC<FakeTabProps> = (props) => {
    const {activeIndex} = props;

    return (
        <Box
            mx={2}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
                '&:hover': {
                    cursor: 'pointer',
                    opacity: 0.8,
                }
            }}
        >
            {TABS.map((tabInfo, index) => {
                return <FakeTabItem key={tabInfo.label} active={index === activeIndex} {...tabInfo} />
            })}
        </Box>
    );
}
