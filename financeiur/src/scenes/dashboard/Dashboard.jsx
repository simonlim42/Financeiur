import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Boxes from "../../components/Boxes"

const Dashboard = ({searchQuery}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);;
    const [stockData, setStockData] = useState(null);
    const [priceSet, setPrice] = useState(null);
    const [stockName,setName] = useState('');
    const [chatIDSET, setChatID] = useState(null);
    const [oldestPrice,setOldestPrice]=useState(null);
    const [volume,setVolume]=useState(null);
    const [marketCap,setMarketCap]=useState(null);
    const [PE_ratio,setPERatio]=useState(null);
    const fetchStockData = async () => {
        try {
          // Send an HTTP GET request to a server (http://localhost:5000/api/stock-data) with a symbol as a query parameter
          const response = await axios.get(`http://localhost:5000/api/stock-data?symbol=${searchQuery}`);
    
          // Extract the response data
          const data = response.data;
    
          // Update the state variable 'stockData' with the fetched data
          setStockData(data);
          console.log(data.dates);
        } catch (error) {
          // Handle errors if the request fails
          console.error('Error fetching stock data:', error);
        }
      };
      const addTracker = async () => {
        try {
    
          const postData = {
            chat_id: chatIDSET,
            sym: searchQuery,
            price: priceSet,
    
          };
          // Validate the chat ID and symbol
        if (!chatIDSET || !searchQuery) {
          alert('Please enter a valid chat ID and symbol.');
          return;
        }
          const response = await axios.post('http://localhost:5000/api/database-update', { postData })
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

      useEffect(() => {
        // Fetch stock data when the searchQuery changes
        fetchStockData();
    }, [searchQuery]);

      useEffect(()=>{
        if(stockData){
            console.log(stockData);
            console.log(stockData.historical_prices);
            setPrice(stockData.price.toFixed(2));
            setName(stockData.name);
            setOldestPrice(stockData.oldest_price);
            setVolume(stockData.volume.toLocaleString('en-US', { style: 'decimal' }));
            setMarketCap(stockData.market_cap.toLocaleString('en-US', { style: 'decimal' }));
            setPERatio(stockData.trailing_pe.toFixed(2));
        }
      })

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title={`${stockName} (${searchQuery})`} subtitle="“Someone's sitting in the shade today because someone planted a tree a long time ago” - Warren Buffett" />
                <Box>
                    <Button sx={{ backgroundColor: colors.blueAccent[700], color: colors.grey[100], fonSize: "14px", fontWeight: "bold", padding: "10px 20px" }}>
                        <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                        Download Reports
                    </Button>
                </Box>
            </Box>
            {/*Grid*/}
            <Box
                display="grid"
                gridTemplateColumns="repeat(12,1fr)"
                gridAutoRows="140px"
                gap="20px">
                <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">

                    <Boxes
                        title="Price"
                        subtitle={`$${priceSet}`||''} 
                        increase={`${(priceSet - oldestPrice >= 0 ? '+' : '')}${((priceSet - oldestPrice) / oldestPrice * 100).toFixed(2)}%`}
                        dollarIncrease={`${(priceSet - oldestPrice >= 0 ? '+' : '')}$${(priceSet - oldestPrice).toFixed(2)}`}
                        
                        icon={<AttachMoneyOutlinedIcon sx={{ color: colors.greenAccent[600], fontSize: "26px", alignSelf: 'center'}}
                        />
                        }
                        
                    />
                </Box>
                <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">

                    <Boxes
                        title="Volume"
                        subtitle={`${volume}`||''} 
                        progress="0.75"
                        increase="14%"
                        icon={<TrafficIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                        />
                        }
                    />
                </Box>
                <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">

                    <Boxes
                        title="Market Cap"
                        subtitle={`$${marketCap}`||''} 
                        // progress="0.75"
                        // increase="14%"
                        icon={<PointOfSaleIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                        />
                        }
                    />
                </Box>
                <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">

                    <Boxes
                        title="PE Ratio (TTM)"
                        subtitle={`${PE_ratio}`||''} 
                        // progress="0.75"
                        // increase="14%"
                        icon={<PersonAddIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                        />
                        }
                    />
                </Box>
                {/*Row 2*/}
                <Box
                    gridColumn="span 8"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                >
                    <Box mt="25px" p="0 30px" display="flex"
                        justifyContent="space-between"
                        alignItems="center">
                        <Box>
                            <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
                                Revenue Generated
                            </Typography>
                            <Typography variant="h3" fontWeight="bold" color={colors.greenAccent[500]}>
                                $59,342,32
                            </Typography>
                        </Box>
                        <Box>
                            <IconButton>
                                <DownloadOutlinedIcon
                                    sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                                />
                            </IconButton>
                        </Box>
                    </Box>
                    <Box>

                        <Box height="250px" mt="-20px">
                            {/* <LineChart isDashboard={true}/> */}
                        </Box>
                    </Box>
                </Box>
                {/* Transactions */}
                <Box gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    overflow="auto">
                    <Box display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        borderBottom={'4px solid ${colors.primary[500]}'}
                        colors={colors.grey[100]} p="15px">
                        <Typography color={colors.grey[100]}
                            variant="h5"
                            fontWeight="600">
                            Recent Transactions
                        </Typography>
                    </Box>
                </Box>
                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    p="30px"
                >
                    <Typography variant="h5" fontWeight="600">
                        Campaign
                    </Typography>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        mt="25px"
                    >
                        {/* <ProgressCircle size="125" /> */}
                        <Typography
                            variant="h5"
                            color={colors.greenAccent[500]}
                            sx={{ mt: "15px" }}
                        >
                            $48,352 revenue generated
                        </Typography>
                        <Typography>Includes extra misc expenditures and costs</Typography>
                    </Box>
                </Box>
                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                >
                    <Typography
                        variant="h5"
                        fontWeight="600"
                        sx={{ padding: "30px 30px 0 30px" }}
                    >
                        Sales Quantity
                    </Typography>
                    <Box height="250px" mt="-20px">
                        {/* <BarChart isDashboard={true} /> */}
                    </Box>
                </Box>
                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    padding="30px"
                >
                    <Typography
                        variant="h5"
                        fontWeight="600"
                        sx={{ marginBottom: "15px" }}
                    >
                        Geography Based Traffic
                    </Typography>
                    <Box height="200px">
                        {/* <GeographyChart isDashboard={true} /> */}
                    </Box>
                </Box>
            </Box>


        </Box>
    );
}

export default Dashboard;