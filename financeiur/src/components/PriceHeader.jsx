import { Typography,Box,useTheme } from "@mui/material";
import { tokens } from "../theme";

const PriceHeader = ({title,price}) =>{
    const theme=useTheme();
    const colors = tokens(theme.palette.mode);
    return <Box>
        <Typography variant ="h2" color = {colors.grey[100]} fontWeight="bold" sx={{ mb: "5px"}}>{title}</Typography>
        <Typography variant ="h3" color = {colors.greenAccent[400]}>{price}</Typography>
    </Box>
}

export default PriceHeader;