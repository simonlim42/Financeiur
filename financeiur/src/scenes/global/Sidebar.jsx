import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import 'react-pro-sidebar/dist/css/styles.css';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";


const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
    <MenuItem active={selected === title} 
    style={{ color: colors.grey[100] }} 
    onClick={() => setSelected(title)} 
    icon={icon}>
        <Typography>{title}</Typography>
        <Link to={to} />
    </MenuItem>)
}
const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    return (
    <Box
        sx={{
            
            "& .pro-sidebar-inner": {
                background: `${colors.primary[400]} !important`,
            },
            "& .pro-icon-wrapper": {
                backgroundColor: "transparent !important",
            },
            "& .pro-inner-item": {
                padding: "5px 35px 5px 18px !important",
            },
            "& .pro-inner-item:hover": {
                color: "#868dfb !important",
            },
            "& .pro-menu-item.active": {
                color: "#6870fa !important",
            },
        }}
        height="100%"
    >
        <ProSidebar collapsed={isCollapsed} >
            <Menu iconShape="square">
                {/* LOGO AND MENU ICON */}
                <MenuItem
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                    style={{
                        margin: "10px 0 20px 0",
                        color: colors.grey[100],
                    }}
                >
                    {!isCollapsed && (
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            ml="15px"
                        >
                            <Typography variant="h3" color={colors.grey[100]}>
                                StockPulse
                            </Typography>
                            <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                <MenuOutlinedIcon />
                            </IconButton>
                        </Box>
                    )}
                </MenuItem>

                {!isCollapsed && (
                    <Box mb="25px">
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <img alt="profile-user"
                                width="100px"
                                height="100px"
                                src={'../../assets/user.png'}
                                style={{ cursor: "pointer", borderRadius: "50%" }}
                            />
                        </Box>
                        <Box textAlign="center">
                            <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" sx={{ m: "10px 0 0 0" }}>Simon</Typography>
                            <Typography variant="h5" color={colors.greenAccent[500]}>Analyst</Typography>
                        </Box>
                    </Box>
                )}
                <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                    <Typography
                        variant="h6"
                        color={colors.grey[300]}
                        sx={{ m: "10px 0 10px 20px" }}>Hub</Typography>
                    <Item
                        title="Dashboard"
                        to="/"
                        icon={<HomeOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />

                    <Item
                        title="Company specifics"
                        to="/company_metrics"
                        icon={<NewspaperOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Typography
                        variant="h6"
                        color={colors.grey[300]}
                        sx={{ m: "15px 0 5px 20px" }}>Tracker</Typography>
                    <Item
                        title="Telegram"
                        to="/tracker"
                        icon={<SendOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Typography
                        variant="h6"
                        color={colors.grey[300]}
                        sx={{ m: "15px 0 5px 20px" }}>Help</Typography>
                    <Item
                        title="FAQ"
                        to="/faq"
                        icon={<HelpOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                </Box>
            </Menu>
        </ProSidebar>
    </Box>
    );
};

export default Sidebar;