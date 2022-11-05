import {useNavigate} from "react-router-dom";
import {Box, Typography} from "@mui/material";
import {DefaultLayout} from "../layouts";
import {ButtonPair, MnemonicInput, PasswordInput} from "../components";
import {useEffect, useState} from "react";
import {STRINGS} from "../constants";
import {useRestoreWallet} from "../hooks";

const {STATUS: {OK, WALLET_ALREADY_SET}} = STRINGS;
const MNEMONIC_LENGTH = 15;

const BringWallet = () => {
    const navigate = useNavigate();
    const [seedPhrase, setSeedPhrase] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');

    const seedPhraseError = seedPhrase.split(' ').length !== MNEMONIC_LENGTH;
    const passwordError = false;
    const passwordConfirmError = false;

    const {refetch: restore, error} = useRestoreWallet(seedPhrase, password);

    useEffect(() => {
        // TODO: 에러처리 리팩토링
        if (error?.response?.data?.detail === WALLET_ALREADY_SET) {
            navigate('/wallet');
        }
    }, [error, navigate]);

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
                            label={`seed phrase${seedPhraseError ? ' (' + seedPhrase.split(" ").length + '/15)' : ''}`}
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
                            // error={passwordError}
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
                            // error={passwordConfirmError}
                        />
                    </Box>
                </Box>
                <Box>
                    <ButtonPair
                        onPrevButtonClick={() => {
                            navigate(-1);
                        }}
                        onNextButtonClick={() => {
                            restore().then(({data}: any) => {
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
