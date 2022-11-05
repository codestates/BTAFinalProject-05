import {Box, Typography} from '@mui/material';

import type {FC} from "react";
import type {SvgIconComponent} from '@mui/icons-material';
import {useNavigate} from "react-router-dom";

export interface FakeTabItemProps {
    active: boolean;
    label: string;
    path: string;
    icon: SvgIconComponent;
    disabled?: boolean;
}

export const FakeTabItem: FC<FakeTabItemProps> = (props) => {
    const {active = false, label, path, icon: Icon, disabled = false} = props;
    const navigate = useNavigate();
    return (
        <Box
            onClick={() => {!disabled && navigate(path)}}
            mx={2}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: active ? 1 : 0.2,
                '&:hover': {
                    cursor: 'pointer',
                    opacity: 0.8,
                }
            }}
        >
            <Icon />
            <Typography variant="subtitle2">{label}</Typography>
        </Box>
    );
}
