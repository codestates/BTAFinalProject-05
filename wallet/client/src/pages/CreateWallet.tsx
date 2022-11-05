import {useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Box, Typography} from "@mui/material";
import {DefaultLayout} from "../layouts";
import {ButtonPair, PasswordInput} from "../components";
import {STRINGS} from "../constants";
import {useCreateWallet} from "../hooks";
import {useSetRecoilState} from "recoil";
import {ErgoState} from "../states";

const {STATUS: {WALLET_ALREADY_SET}} = STRINGS;

const CreateWallet = () => {
    const navigate = useNavigate();

    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const setErgoState = useSetRecoilState(ErgoState);
    const passwordError = useMemo(() => false, []);
    const passwordConfirmError = useMemo(() => false, []);
    const {refetch: createWallet, data, error} = useCreateWallet(password);

    useEffect(() => {
        // TODO: 에러처리 리팩토링
        if(error?.response?.data?.detail === WALLET_ALREADY_SET) {
            window.confirm('계정이 이미 있습니다. 기존 계정으로 로그인합니다.') && navigate('/wallet');
        }
    }, [error, navigate]);

    useEffect(() => {
        if (typeof data?.mnemonic === 'string') {
            setErgoState((prev) => {
                return {...prev, mnemonic: data.mnemonic};
            });
            navigate('/seed-reveal');
        }
    }, [data, navigate, setErgoState])

    return (
        <DefaultLayout logo>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    justifyContent: 'space-between'
                }}
            >
                <Box>
                    <Box width="100%" mb={6}>
                        <Typography variant="h4">비밀번호 만들기</Typography>
                    </Box>
                    <Box
                        width="100%"
                        gap={4}
                        display="flex"
                        flexDirection="column"
                    >
                        <PasswordInput
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            error={passwordError}
                            label="비밀번호(8자 이상)"
                            variant="outlined"
                        />
                        <PasswordInput
                            label={`비밀번호 확인${passwordConfirmError ? ' (비밀번호가 맞지 않습니다.)' : ''}`}
                            value={passwordConfirm}
                            onChange={(e) => {
                                setPasswordConfirm(e.target.value);
                            }}
                            variant="outlined"
                            error={passwordConfirmError}
                        />
                    </Box>
                </Box>
                <Box>
                    <ButtonPair
                        onPrevButtonClick={() => {
                            navigate(-1);
                        }}
                        onNextButtonClick={() => {
                            createWallet();
                        }}
                        disabled={password.length === 0 || passwordError || passwordConfirmError}
                    />
                </Box>
            </Box>
        </DefaultLayout>
    )
}

export default CreateWallet;
