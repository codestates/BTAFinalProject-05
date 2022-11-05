import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {DefaultLayout} from "../layouts";
import {Avatar, Box, Typography} from "@mui/material";
import {STRINGS} from "../constants";
import {FullButton} from "../components";
import {useWalletStatus} from "../hooks";

const Start = () => {
    const navigate = useNavigate();
    const {data, isLoading, error} = useWalletStatus();

    useEffect(() => {
        data?.isInitialized && navigate('/welcome-back');
    }, [data]);

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
                    variant="square"
                    sx={{
                        width: 200,
                        height: 200,
                    }}
                    alt="ERGO"
                    src="/ergo_logo_192.png"
                />
                <Box>
                    <Box mt={2} display="flex" flexDirection="column" alignItems="center">
                        <Typography variant="h6">{`${STRINGS.GLOBAL.PROJECT_NAME} 방문을 환영합니다.`}</Typography>
                    </Box>
                    <Box width="100%" display="flex" flexDirection="column" alignItems="center">
                        <Typography variant="body2">{STRINGS.GLOBAL.PROJECT_DESCRIPTION}</Typography>
                    </Box>
                </Box>
                <Box width="100%">
                    <FullButton
                        onClick={() => {
                            navigate('/first-time')
                        }}
                    >
                        시작하기
                    </FullButton>
                </Box>
            </Box>
        </DefaultLayout>
    )
}

export default Start;
