import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import PriceHeader from "../../components/PriceHeader";
import { tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import fetchStockData from '../../utils/fetchStockData';

const Tracker = ({searchQuery})=>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [price,setPrice]=useState(null);
    const [priceInput, setPriceInput] = useState("");
    const [stockName, setName] = useState("");
    const [chatID, setChatID] = useState(null);
    const [stockData,setStockData]= useState(null);
    useEffect(() => {
        const fetchData = async () => {
          try {
            // Await the result of fetchStockData
            const data = await fetchStockData(searchQuery, setStockData);
    
            // Update the state with the fetched data
            setStockData(data);
          } catch (error) {
            // Handle errors if the fetchStockData function fails
            console.error("Error fetching stock data:", error);
          }
        };
    
        // Call the async function
        fetchData();
    
        // Cleanup function or any other code you want to run when the component unmounts or when the dependency changes
      }, [searchQuery]);
      useEffect(() => {
        if (stockData) {
          setPrice(stockData.price.toFixed(2));
          setName(stockData.name);
        }
      }, [stockData]);
    const addTracker = async () => {
        try {
            let directionCalc;

            if (stockData.price > priceInput) {
                directionCalc = 'below';
            } else if (stockData.price < priceInput) {
                directionCalc = 'above';
            } else {
                throw new Error('Invalid alert price. It should be above or below the current price.');
            }
            
          const postData = {
            chat_id: chatID,
            sym: searchQuery,
            price: priceInput,
            direction: directionCalc,
          };
          // Validate the chat ID and symbol
        if (!chatID || !searchQuery) {
          alert('Please enter a valid chat ID and symbol.');
          return;
        }
          const response = await axios.post('http://127.0.0.1:5000/api/database-update', { postData })
            .then(response => {
              console.log('Database updated successfully:', response.data);
            })
            .catch(error => {
              console.error('Error updating database:', error);
            });
    
    
    
        } catch (error) {
          // Handle errors if the request fails
          console.error('Error adding ticker to database:', error);
        }
      };
return(
    <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
        <PriceHeader title={`${stockName} (${searchQuery})`} price={`$${price}`}/>
      </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box padding="170px 0 30px 300px"> {/* Order: top right bottom left */}
            <Box>
                <Typography variant='h2' sx={{ color: colors.greenAccent[500] }}>
                    Set a price alert.
                </Typography>
                <InputBase sx={{ ml: 2, flex: 1, width: '200px', height:'100px',fontSize: '16px' }} placeholder="Target price" value={priceInput} onChange={(e)=>setPriceInput(e.target.value)} />
                <InputBase sx={{ ml: 2, flex: 1, width: '200px', height:'100px',fontSize: '16px' }} placeholder="Chat ID" value={chatID} onChange={(e)=>setChatID(e.target.value)} />
                <IconButton type="button" sx={{ p: 1 }} onClick={addTracker}>
          <AddCircleOutlinedIcon />
        </IconButton> 
            </Box>
        </Box>
        </Box>
    </Box>
)
};
export default Tracker;