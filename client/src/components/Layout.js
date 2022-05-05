import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

export default function Layout({ setMode, mode}) {

    return (
        <Box
            width='100%' 
            minHeight='100vh' 
            className='layout'
            bgcolor='appBackground'
            sx={{
                display: 'flex',
                flexDirection: { xs: "column", md: 'row' }
            }}
        >
            <Sidebar setMode={setMode} mode={mode} />
            <Outlet />
        </Box>
    )
}