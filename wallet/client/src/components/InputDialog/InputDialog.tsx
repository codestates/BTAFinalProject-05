import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useSetRecoilState} from "recoil";
import {ErgoState} from "../../states";
import {useRef} from "react";

import type {FC, PropsWithChildren} from 'react';

export interface InputDialogProps {
    open: boolean;
    onClose: () => void;
}

export const InputDialog: FC<PropsWithChildren<InputDialogProps>> = (props) => {
    const {open, onClose} = props;
    const setGlobalState = useSetRecoilState(ErgoState);
    const inputRef = useRef<HTMLInputElement>();

    const handleUpdateApiKey = () => {
        const api_key = inputRef.current?.value;
        if (typeof api_key === 'string' && api_key.length > 0) {
            setGlobalState(prev => ({...prev, api_key}));
            localStorage.setItem('api_key', api_key);
            onClose();
        }
    }

    return (
        <div>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>API Key입력</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        원활한 지갑 이용을 위해 API KEY를 입력해 주세요.
                    </DialogContentText>
                    <TextField
                        inputRef={inputRef}
                        autoFocus
                        margin="dense"
                        id="api key"
                        label="api key"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>취소</Button>
                    <Button autoFocus onClick={handleUpdateApiKey}>확인</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
