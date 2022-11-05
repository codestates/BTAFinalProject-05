import {useMemo, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import {
    Box,
    createTheme,
    CssBaseline,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ThemeProvider
} from "@mui/material";
import {
    Brightness4 as Brightness4Icon,
    Brightness7 as Brightness7Icon,
    Key as KeyIcon,
    Menu as MenuIcon
} from '@mui/icons-material';
import {ColorModeContext} from './contexts';
import Routes from './Routes';

import type {PaletteMode} from '@mui/material';

export interface ListsProps {
    colorMode: PaletteMode;
    onToggleColorMode: () => void;
}

const Lists = ({colorMode, onToggleColorMode}: ListsProps) => (
    <Box
        sx={{width: 'auto'}}
        role="presentation"
    >
        <List>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <KeyIcon />
                    </ListItemIcon>
                    <ListItemText primary="API KEY 재설정" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={onToggleColorMode}>
                <ListItemButton>
                    <ListItemIcon>
                        {colorMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                    </ListItemIcon>
                    <ListItemText primary={`${colorMode === 'dark' ? '라이트' : '다크'}모드로 변경`} />
                </ListItemButton>
            </ListItem>
        </List>
    </Box>
);

function App() {
    const [mode, setMode] = useState<'light' | 'dark'>('light');
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const colorMode = useMemo(() => ({
        toggleColorMode: () => {
            setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        },
    }), []);

    const theme = useMemo(() => createTheme({palette: {mode}}), [mode]);
    const toggleDrawer = () => {
        setDrawerOpen(prev => !prev);
    };

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <Box position="absolute" right={15} top={15}>
                        <IconButton sx={{ml: 1}} onClick={toggleDrawer} color="inherit">
                            <MenuIcon />
                        </IconButton>
                    </Box>
                    <Drawer anchor="bottom" open={drawerOpen} onClose={toggleDrawer}>
                        <Lists
                            colorMode={theme.palette.mode}
                            onToggleColorMode={colorMode.toggleColorMode}
                        />
                    </Drawer>
                    <Routes />
                </BrowserRouter>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
