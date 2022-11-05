import {useEffect, useState} from "react";
import {useRecoilState} from "recoil";
import {ErgoState} from "../states";
import {
    Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import {
    Brightness4 as Brightness4Icon,
    Brightness7 as Brightness7Icon,
    Key as KeyIcon,
    Menu as MenuIcon
} from "@mui/icons-material";
import {InputDialog} from "../components";

import type {FC, PropsWithChildren} from "react";
import type {PaletteMode} from "@mui/material";

export interface ListsProps {
    colorMode: PaletteMode;
    onToggleColorMode: () => void;
    onToggleDialog: () => void;
}

const Lists = ({colorMode, onToggleColorMode, onToggleDialog}: ListsProps) => (
    <Box sx={{width: 'auto'}} role="presentation">
        <List>
            <ListItem disablePadding onClick={onToggleDialog}>
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

export interface InitializerProps {
    colorMode: PaletteMode;
    onToggleColorMode: () => void;
}

export const Initializer: FC<PropsWithChildren<InitializerProps>> = (props) => {
    const {children, colorMode, onToggleColorMode} = props;
    const [globalState, setGlobalState] = useRecoilState(ErgoState);
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const toggleDrawer = () => {
        setDrawerOpen(prev => !prev);
    };
    const toggleDialog = () => {
        setDialogOpen(prev => !prev);
    }
    /**
     * 1. localStorage에 api_key가 있고, store에 없는 경우
     * 2. localStorage에 api_key가 있고, store에도 있는 경우
     * 3. localStorage에 api_key가 없고, store에는 있는 경우
     * 4. 둘 다 없는 경우
     */
    useEffect(() => {
        const localStorageApiKey = localStorage.getItem('api_key');
        const recoilStateApiKey = globalState.api_key;

        if (localStorageApiKey) {
            if (recoilStateApiKey) {
                console.log('case1');
                // 1. localStorage에 api_key가 있고, store에 없는 경우
                setGlobalState(prev => ({...prev, api_key: localStorageApiKey}));
            } else {
                console.log('case2');
                // 2. localStorage에 api_key가 있고, store에도 있는 경우
                setGlobalState(prev => ({...prev, api_key: localStorageApiKey}));
                return;
            }
        } else {
            if (recoilStateApiKey) {
                console.log('case3');
                // 3. localStorage에 api_key가 없고, store에는 있는 경우
                localStorage.setItem('api_key', recoilStateApiKey);
            } else {
                console.log('case4');
                // 4. 둘 다 없는 경우
                setDialogOpen(true);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Box position="absolute" right={15} top={15}>
                <IconButton sx={{ml: 1}} onClick={toggleDrawer} color="inherit">
                    <MenuIcon />
                </IconButton>
            </Box>
            <Drawer anchor="bottom" open={drawerOpen} onClose={toggleDrawer}>
                <Lists
                    colorMode={colorMode}
                    onToggleColorMode={onToggleColorMode}
                    onToggleDialog={() => {
                        toggleDialog();
                        setDrawerOpen(false);
                    }}
                />
            </Drawer>
            <InputDialog open={dialogOpen} onClose={() => setDialogOpen(false)}/>
            {children}
        </>
    );
};
