import {Link, useNavigate} from "react-router-dom";
import {DefaultLayout} from "../layouts";
import {Avatar, Box, Typography} from "@mui/material";
import {STRINGS} from "../constants";
import {FullButton, PasswordInput} from "../components";
import {useRecoilValue} from "recoil";
import {ErgoState} from "../states";
import {useEffect, useState} from "react";
import {useEnv, useWalletUnlock} from "../hooks";

const {STATUS: {OK, WALLET_ALREADY_UNLOCKED}} = STRINGS;

const WelcomeBack = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState<string>('');
    const [storedPassword] = useEnv(['PASSWORD']);
    const {address} = useRecoilValue(ErgoState);
    const {refetch: unlock, error} = useWalletUnlock();

    useEffect(() => {
        // TODO: 에러처리 리팩토링
        if(error?.response?.data?.detail === WALLET_ALREADY_UNLOCKED) {
            navigate('/wallet');
        }
        if(error?.response?.status === 504) {
            alert('proxy error: is docker running?');
        }
    }, [navigate, error]);

    return (
        <DefaultLayout>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Avatar
                    sx={{
                        width: 140,
                        height: 140,
                    }}
                    alt="ERGO"
                    src={`https://avatars.dicebear.com/api/bottts/${address}.svg`}
                />
                <Box>
                    <Box mt={2} display="flex" flexDirection="column" alignItems="center">
                        <Typography variant="h5">{STRINGS.WELCOME_BACK.DESCRIPTION}</Typography>
                    </Box>
                    <Box width="100%" display="flex" flexDirection="column" alignItems="center">
                        <Typography variant="body2">{STRINGS.WELCOME_BACK.WARNING}</Typography>
                    </Box>
                </Box>
                <Box width="100%">
                    <PasswordInput
                        label="비밀번호 입력"
                        variant="outlined"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        error={password.length > 0 && password !== storedPassword}
                        // helperText={password !== storedPassword ? 'password를 확인해 주세요.' : ''}
                    />
                </Box>
                <Box sx={{transform: 'translateY(35px)'}}>
                    <Link to="/first-time">
                        <Typography color="warning.light" variant="subtitle2">
                            처음부터 시작하고 싶다면 이 메세지 클릭
                        </Typography>
                    </Link>
                </Box>
                <Box width="100%">
                    <FullButton
                        onClick={() => {
                            unlock().then(({data}) => {
                                data === OK && navigate('/wallet');
                            });
                        }}
                        disabled={password !== storedPassword}
                    >
                        잠금 해제
                    </FullButton>
                </Box>
            </Box>
        </DefaultLayout>
    )
}

export default WelcomeBack;
