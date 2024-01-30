import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import React, { useRef, useState, useEffect, useMemo } from "react";
import fetchStockData from "../../utils/fetchStockData";
import Metrics from "../../components/Metrics";;

const CompanyMetrics = ({ searchQuery }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [stockData, setStockData] = useState(null);
  const [stockName, setName] = useState("");
  const [dividendRate, setDividentRate] = useState(null);
  const [dividendYield, setDividentYield] = useState(null);
  const [payoutRatio, setPayoutRatio] = useState(null);
  const [trailingPe, setTrailingPe] = useState(null);
  const [forwardPe, setForwardPe] = useState(null);
  const [priceToSales, setPriceToSales] = useState(null);
  const [priceToBook, setPriceToBook] = useState(null);
  const [revenue, setRevenue] = useState(null);
  const [netIncome, setNetIncome] = useState(null);
  const [earningsPerShare, setEarningsPerShare] = useState(null);
  const [operatingMargin, setOperatingMargin] = useState(null);
  const [returnOnEquity, setReturnOnEquity] = useState(null);
  const [freeCashFlow, setFreeCashFlow] = useState(null);
  const [dayLow, setDayLow] = useState(null);
  const [dayHigh, setDayHigh] = useState(null);
  const [fiftyTwoWeekLow, setFiftyTwoWeekLow] = useState(null);
  const [fiftyTwoWeekHigh, setFiftyTwoWeekHigh] = useState(null);
  const [marketCap, setMarketCap] = useState(null);
  const [volume, setVolume] = useState(null);

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
    fetchData();
  }, [searchQuery]);

  useEffect(() => {
    if (stockData) {
      setName(stockData.name);
      setVolume(stockData.volume.toLocaleString("en-US", { style: "decimal" }));
      setMarketCap(
        stockData.market_cap.toLocaleString("en-US", { style: "decimal" })
      );
      setTrailingPe(stockData.trailing_pe.toFixed(2));
      setDayHigh(stockData.day_high.toLocaleString("en-US", { style: "currency", currency: "USD" }));
      setDayLow(stockData.day_low.toLocaleString("en-US", { style: "currency", currency: "USD" }));
      setFiftyTwoWeekLow(stockData.fifty_two_week_low.toLocaleString("en-US", { style: "currency", currency: "USD" }));
      setFiftyTwoWeekHigh(stockData.fifty_two_week_high.toLocaleString("en-US", { style: "currency", currency: "USD" }));
      setMarketCap(stockData.market_cap.toLocaleString("en-US", { style: "currency", currency: "USD" }));
      setVolume(stockData.volume.toLocaleString("en-US"));
      setDividentRate(stockData.dividend_rate.toFixed(2) + "%");
      setDividentYield(stockData.dividend_yield.toFixed(2) + "%");
      setPayoutRatio((stockData.payout_ratio * 100).toFixed(2) + "%");
      setForwardPe(stockData.forward_pe.toFixed(2));
      setPriceToSales(stockData.price_to_sales.toFixed(2));
      setPriceToBook(stockData.price_to_book.toFixed(2));
      setRevenue(stockData.revenue.toLocaleString("en-US", { style: "currency", currency: "USD" }));
      setNetIncome(stockData.net_income.toLocaleString("en-US", { style: "currency", currency: "USD" }));
      setEarningsPerShare(stockData.earnings_per_share.toFixed(2));
      setOperatingMargin((stockData.operating_margin * 100).toFixed(2) + "%");
      setReturnOnEquity((stockData.return_on_equity * 100).toFixed(2) + "%");
      setFreeCashFlow(stockData.free_cash_flow.toLocaleString("en-US", { style: "currency", currency: "USD" }));
      
    }
  }, [stockData]);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={`${stockName} (${searchQuery})`} />
      </Box>
      {/*Grid*/}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12,1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="10px"
          >
            Valuation Metrics
          </Box>
          <Metrics period="Market Cap" value={marketCap}></Metrics>
          <Metrics period="Price to Sales" value={priceToSales}></Metrics>
          <Metrics period="Price to Book" value={priceToBook}></Metrics>
          <Metrics period="Trailing PE" value={trailingPe}></Metrics>
          <Metrics period="Forward PE" value={forwardPe}></Metrics>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="10px"
          >
            Dividend Metrics
          </Box>
          <Metrics period="Dividend Rate" value={dividendRate}></Metrics>
          <Metrics period="Dividend Yield" value={dividendYield}></Metrics>
          <Metrics period="Payout Ratio" value={payoutRatio}></Metrics>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="10px"
          >
            Trading Metrics
          </Box>
          <Metrics period="Day Low" value={dayLow}></Metrics>
          <Metrics period="Day High" value={dayHigh}></Metrics>
          <Metrics period="52 Week Low" value={fiftyTwoWeekLow}></Metrics>
          <Metrics period="52 Week High" value={fiftyTwoWeekHigh}></Metrics>
          <Metrics period="Volume" value={volume}></Metrics>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="10px"
          >
            Financial Performance Metrics
          </Box>
          <Metrics period="Revenue" value={revenue}></Metrics>
          <Metrics period="Net Income" value={netIncome}></Metrics>
          <Metrics
            period="Earnings Per Share"
            value={earningsPerShare}
          ></Metrics>

          <Metrics period="Free Cash Flow" value={freeCashFlow}></Metrics>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="10px"
          >
            Operating and Profitability Metrics
          </Box>
          <Metrics period="Operating Margin" value={operatingMargin}></Metrics>
          <Metrics period="Return on Equity" value={returnOnEquity}></Metrics>
        </Box>
      </Box>
    </Box>
  );
};

export default CompanyMetrics;
