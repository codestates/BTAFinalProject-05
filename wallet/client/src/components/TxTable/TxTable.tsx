import {useState} from "react";
import {
    Box,
    Collapse,
    IconButton,
    Paper,
    styled,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import {CopiableAddress} from "../CopiableAddress";

import type {FC, PropsWithChildren} from "react";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export interface Row {
    address: string;
    amount: number;
    txId: string;
    date: string;
}

export interface TxTableProps {
    rows: Row[];
}

const RowComponent = ({row, idx}: { row: Row, idx: number }) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <StyledTableRow
                key={row.txId}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <StyledTableCell component="th" scope="row">
                    {idx + 1}
                </StyledTableCell>
                <StyledTableCell align="center">
                    <CopiableAddress noMargin address={row.txId} />
                </StyledTableCell>
            </StyledTableRow>
            <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{margin: 1}}>
                        {(Object.keys(row) as Array<keyof Row>)
                            .filter((key) => row[key])
                            .map((key) => (
                                    <>
                                        <Typography fontWeight="bold" variant="h6" component="div">
                                            {key}
                                        </Typography>
                                        {key === 'txId' || key === 'address' ? (
                                            <CopiableAddress noMargin align="left" address={row[key]} />
                                        ) : (
                                            <Typography variant="subtitle2" gutterBottom>
                                                {row[key]}
                                            </Typography>
                                        )}
                                    </>
                                )
                            )
                        }
                    </Box>
                </Collapse>
            </TableCell>
        </>
    )
}

export const TxTable: FC<PropsWithChildren<TxTableProps>> = (props) => {
    const {rows} = props;

    return rows.length > 0 ? (
        <TableContainer component={Paper} sx={{maxHeight: '100%'}}>
            <Table stickyHeader aria-label="simple table">
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell align="center" width={5}></StyledTableCell>
                        <StyledTableCell align="center" width={5}>#</StyledTableCell>
                        <StyledTableCell align="center">txId</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, idx) => (
                        <RowComponent key={row.txId} row={row} idx={idx} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    ) : (
        <Box textAlign="center" paddingTop={15}>
            <NewReleasesIcon sx={{fontSize: 100}} />
            <Typography variant="h5">거래 내역이 없습니다.</Typography>
        </Box>
    );
}
