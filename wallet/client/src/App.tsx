import {useMemo, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {ColorModeContext} from './contexts';
import Routes from './Routes';
import {Initializer} from "./containers";

function App() {
    const [mode, setMode] = useState<'light' | 'dark'>('light');
    const colorMode = useMemo(() => ({
        toggleColorMode: () => {
            setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        },
    }), []);

    const theme = useMemo(() => createTheme({palette: {mode}}), [mode]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Initializer colorMode={mode} onToggleColorMode={colorMode.toggleColorMode}>
                    <BrowserRouter>
                        <Routes />
                    </BrowserRouter>
                </Initializer>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
