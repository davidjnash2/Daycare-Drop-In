import React, { useEffect, useState } from "react";
import ListPageSearchBar from "../ListPageSearchBar/ListPageSearchBar";
import ProviderListCards from "../ListPageProviderCards/ListPageProviderCards";
import { useDispatch, useSelector } from "react-redux";
import { Container } from '@mui/material';

import {
    Box,
    Zoom,
    Fab,
} from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";
import useScrollTrigger from "@mui/material/useScrollTrigger";


function ScrollTop() {

    const [trigger, setTrigger] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 100) {
            setTrigger(true);
        } else {
            setTrigger(false);
        }
    };

    const scrollToTop = React.useCallback(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <Zoom in={trigger}>
            <Box
                role="presentation"
                sx={{
                    position: "fixed",
                    bottom: 30,
                    // right: 32,
                    right: 15,
                    zIndex: 999,
                }}
            >
                <Fab
                    onClick={scrollToTop}
                    color="secondary"
                    size="medium"
                    aria-label="scroll back to top"
                >
                    <KeyboardArrowUp />
                </Fab>
            </Box>
        </Zoom>
    )
}

export default ScrollTop;