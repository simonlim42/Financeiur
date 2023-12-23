import { Box, useTheme, Typography } from "@mui/material"
import Header from "../components/Header";
import { Accordion } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../theme";

const FAQ = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return <Box m="30px">
        
        <Header title="FAQ" subtitle="If you have questions it might be answered below!" />
        <div style={{ marginTop: 20 }}>
        <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                <Typography color={colors.greenAccent[500]} variant="h5">
                    How do I use this app?
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    First start by searching a stock!...
                </Typography>
            </AccordionDetails>
        </Accordion>
        </div>
        <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography color={colors.greenAccent[500]} variant="h5">
                    Is the information up to date?
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    Yes!...
                </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography color={colors.greenAccent[500]} variant="h5">
                    Is my data protected?
                </Typography>

            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    Of course!...
                </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography color={colors.greenAccent[500]} variant="h5">
                    Where can I start investing?
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    There are several partnerships!...
                </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography color={colors.greenAccent[500]} variant="h5">
                    What time do the markets open?
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    For the NYSE it is at 0700!...
                </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography color={colors.greenAccent[500]} variant="h5">
                    Is investing into stocks gambling?
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    With the right resources it isn't!...
                </Typography>
            </AccordionDetails>
        </Accordion>
    </Box>
}

export default FAQ;