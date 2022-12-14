import {DefaultLayout} from "../layouts";
import {Box, Typography} from "@mui/material";
import {STRINGS} from "../constants";
import {CopiableAddress, FullButton} from "../components";
import {useLocation, useNavigate} from "react-router-dom";
import {Verified as VerifiedIcon} from '@mui/icons-material';
import {useMemo} from "react";

const useQueryParams = () => {
    const {search} = useLocation();

    const searchParams = useMemo(() => new URLSearchParams(search), [search]);

    return {
        txId: searchParams.get('txId'),
    }
}

const AllSet = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {action} = location.state || {};
    const {txId} = useQueryParams();

    return (
        <DefaultLayout logo>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Box>
                    <VerifiedIcon sx={{fontSize: '14rem', fill: '#37a638'}} />
                </Box>
                <Box>
                    {action === 'transfer' ? (
                        <Box mt={2}>
                            <Typography variant="body1">{STRINGS.ALL_SET.TRANSFER}</Typography>
                            <CopiableAddress address={txId || ''} />
                        </Box>
                    ) : (
                        <Box mt={2}>
                            <Typography variant="body1">{STRINGS.ALL_SET.DESCRIPTION}</Typography>
                        </Box>
                    )}
                </Box>
                <Box width="100%">
                    <FullButton
                        onClick={() => {
                            navigate('/wallet')
                        }}
                    >
                        확인
                    </FullButton>
                </Box>
            </Box>
        </DefaultLayout>
    )
}

export default AllSet;
