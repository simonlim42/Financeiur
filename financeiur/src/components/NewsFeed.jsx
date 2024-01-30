import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const NewsFeed = ({ news, link, date, img_url, author }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'};


  return (
    <Box width="100%" display="flex" alignItems="center" marginTop="10px">
        <Box marginRight="10px">
            <img src={img_url} alt={"news"} width="150px" height="80px"/>
        </Box>
      <Box display="grid" padding="10px" >

        <Box display="flex" alignItems="center">
   
            <a href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: colors.grey[200], transition: 'text-decoration 0.3s ease-in-out' }}
        onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
        onMouseOut={(e) => e.target.style.textDecoration = 'none'}>
            <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ color: colors.grey[200]}}
          >
            {news}
          </Typography>
            </a>

        </Box>
        <Box>
          <Typography
            variant="h6"
            fontStyle="italic"
            sx={{ color: colors.greenAccent[500] }}
          >
            {Date(date * 1000).toLocaleString('en-UK',options)};
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default NewsFeed;
