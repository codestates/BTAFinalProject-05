import {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useRecoilState} from "recoil";
import {ErgoState} from "../../states";
import {useEffect, useRef} from "react";

export default function InputDialog() {
    const [open, setOpen] = useState(false);
    const [recoilState, setRecoilState] = useRecoilState(ErgoState);
    const inputRef = useRef<HTMLInputElement>();
    const handleClose = () => {
        setOpen(false);
    };

    const handleUpdateApiKey = () => {
        if (typeof inputRef.current?.value === 'string') {
            setRecoilState(prev => ({...prev, api_key: inputRef.current?.value || ''}));
            localStorage.setItem('api_key', inputRef.current?.value);
        }
    }

    useEffect(() => {
        const storedKey = localStorage.getItem('api_key');
        if (!storedKey) {
            setOpen(true);
        } else {

        }
        // if (recoilState.api_key === null) {
        //     if (!localStorage.getItem('api_key')) {
        //         setOpen(true);
        //     }
        // }
    }, [recoilState]);

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
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
                    <Button onClick={handleClose}>취소</Button>
                    <Button onClick={handleUpdateApiKey}>확인</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
