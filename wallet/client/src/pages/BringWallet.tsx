import {useNavigate} from "react-router-dom";
import {Box, Typography} from "@mui/material";
import {DefaultLayout} from "../layouts";
import {ButtonPair, MnemonicInput, PasswordInput} from "../components";
import {useEffect, useMemo, useState} from "react";
import {ENDPOINTS, STRINGS} from "../constants";
import {useMutation} from "react-query";
import {useSetRecoilState} from "recoil";
import {GlobalState} from "../states";
import {useRestoreWallet, useWalletUnlock} from "../hooks";

const {STATUS: {OK, WALLET_ALREADY_SET}} = STRINGS;

const BringWallet = () => {
    const navigate = useNavigate();
    const [seedPhrase, setSeedPhrase] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');

    const setGlobalState = useSetRecoilState(GlobalState);

    // const seedPhraseError = useMemo(() => seedPhrase.length > 0 && seedPhrase.split(' ').length !== 12, [seedPhrase]);
    const seedPhraseError = useMemo(() => false, [seedPhrase]);
    const passwordError = useMemo(() => password.length > 0 && password.length < 8, [password]);
    const passwordConfirmError = useMemo(() => passwordError || password !== passwordConfirm, [passwordError, password, passwordConfirm]);
    const {refetch: restore, data, error} = useRestoreWallet(seedPhrase);

    useEffect(() => {
        // TODO: 에러처리 리팩토링
        if(error?.response?.data?.detail === WALLET_ALREADY_SET) {
            navigate('/wallet');
        }
    }, [error]);

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
                        <Typography variant="h4">지갑 가져오기</Typography>
                    </Box>
                    <Box
                        width="100%"
                        gap={4}
                        display="flex"
                        flexDirection="column"
                    >
                        <MnemonicInput
                            label={`seed phrase${seedPhraseError ? ' (' + seedPhrase.split(" ").length + '/12)' : ''}`}
                            value={seedPhrase}
                            onChange={(e) => {
                                setSeedPhrase(e.target.value);
                            }}
                            error={seedPhraseError}
                        />
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
                            restore().then(({data}) => {
                                data === OK && navigate('/wallet');
                            });
                        }}
                        disabled={password.length === 0 || passwordError || passwordConfirmError || seedPhraseError}
                    />
                </Box>
            </Box>
        </DefaultLayout>
    )
}

export default BringWallet;
