import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import React, { useRef, useState, useEffect, useMemo } from "react";
import fetchStockData from "../../utils/fetchStockData";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Boxes from "../../components/Boxes";
import Performance from "../../components/Performance";
import NewsFeed from "../../components/NewsFeed";
import { createChart, ColorType } from "lightweight-charts";

const Dashboard = ({ searchQuery }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [stockData, setStockData] = useState(null);
  const [priceSet, setPrice] = useState(null);
  const [stockName, setName] = useState("");
  const [oldestPrice, setOldestPrice] = useState(null);
  const [volume, setVolume] = useState(null);
  const [marketCap, setMarketCap] = useState(null);
  const [PE_ratio, setPERatio] = useState(null);
  const [sChart, setChart] = useState(null);
  const [chartPeriod, setChartPeriod] = useState(null);
  const [chartDates, setChartDates] = useState(null);
  const [performance1Y, setPerformance1Y] = useState(null);
  const [performance1MO, setPerformance1MO] = useState(null);
  const [performanceYTD, setPerformanceYTD] = useState(null);
  const [performance2Y, setPerformance2Y] = useState(null);
  const [performance3MO, setPerformance3MO] = useState(null);
  const [isPeriod1Y, setIsPeriod1Y] = useState(true);
  const [isPeriod1MO, setIsPeriod1MO] = useState(false);
  const [isPeriodYTD, setIsPeriodYTD] = useState(false);
  const [isPeriod2Y, setIsPeriod2Y] = useState(false);
  const [isPeriod1D, setIsPeriod1D] = useState(false);
  const [isPeriod3MO, setIsPeriod3MO] = useState(false);
  const [newsList, setNews] = useState(null);
  const [longBusinessSummary, setLongBusinessSummary] = useState("");
  const chartContainerRef = useRef();


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
      setPrice(stockData.price.toFixed(2));
      setName(stockData.name);
      setOldestPrice(stockData.oldest_price);
      setChartPeriod(stockData.historical_prices_1y);
      setChartDates(stockData.dates_1y);
      setVolume(stockData.volume.toLocaleString("en-US", { style: "decimal" }));
      setMarketCap(
        stockData.market_cap.toLocaleString("en-US", { style: "decimal" })
      );
      setPERatio(stockData.trailing_pe.toFixed(2));
      setPerformance1Y(
        `${stockData.performance_1y >= 0 ? "+" : "-"}$${Math.abs(
          stockData.performance_1y.toFixed(2)
        )}`
      );
      setPerformance1MO(
        `${stockData.performance_1mo >= 0 ? "+" : "-"}$${Math.abs(
          stockData.performance_1mo.toFixed(2)
        )}`
      );
      setPerformanceYTD(
        `${stockData.performance_ytd >= 0 ? "+" : "-"}$${Math.abs(
          stockData.performance_ytd.toFixed(2)
        )}`
      );
      setPerformance2Y(
        `${stockData.performance_2y >= 0 ? "+" : "-"}$${Math.abs(
          stockData.performance_2y.toFixed(2)
        )}`
      );
      setPerformance3MO(
        `${stockData.performance_3mo >= 0 ? "+" : "-"}$${Math.abs(
          stockData.performance_3mo.toFixed(2)
        )}`
      );
      setNews(stockData.news);
      setLongBusinessSummary(stockData.longBusinessSummary);
    }
  }, [stockData]);

  useEffect(() => {
    // Update the chart series data when chartPeriod or chartDates change
    if (stockData) {
      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 200,
        layout: {
          background: { color: colors.primary[400] },
          textColor: "#DDD",
        },
        grid: {
          vertLines: { color: "#444" },
          horzLines: { color: "#444" },
        },
      });

      const handleResize = () => {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      };

      chart.timeScale().fitContent();

      const areaSeries = chart.addAreaSeries();

      // Check if chartPeriod and chartDates are not null before mapping
      if (chartPeriod && chartDates) {
        areaSeries.setData(
          chartPeriod.map((price, index) => ({
            time: chartDates[index],
            value: price,
          }))
        );
      }

      window.addEventListener("resize", handleResize);

      // Save the chart reference
      setChart(chart);

      // Cleanup function to remove event listener and clear the chart on component unmount
      return () => {
        window.removeEventListener("resize", handleResize);

        if (chart) {
          // Dispose of the chart
          chart.remove();
          // Clear the references
          setChart(null);
        }
      };
    }
  }, [stockData, chartPeriod, chartDates]);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title={`${stockName} (${searchQuery})`}
          subtitle="“Someone's sitting in the shade today because someone planted a tree a long time ago” - Warren Buffett"
        />
        {/* <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fonSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box> */}
      </Box>
      {/*Grid*/}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12,1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Boxes
            title="Price"
            subtitle={`$${priceSet}` || ""}
            increase={`${priceSet - oldestPrice >= 0 ? "+" : ""}${(
              ((priceSet - oldestPrice) / oldestPrice) *
              100
            ).toFixed(2)}%`}
            dollarIncrease={`${priceSet - oldestPrice >= 0 ? "+" : ""}$${(
              priceSet - oldestPrice
            ).toFixed(2)}`}
            icon={
              <AttachMoneyOutlinedIcon
                sx={{
                  color: colors.greenAccent[600],
                  fontSize: "26px",
                  alignSelf: "center",
                }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Boxes
            title="Volume"
            subtitle={`$${volume}` || ""}
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Boxes
            title="Market Cap"
            subtitle={`$${marketCap}` || ""}
            // progress="0.75"
            // increase="14%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Boxes
            title="PE Ratio (TTM)"
            subtitle={`${PE_ratio}` || ""}
            // progress="0.75"
            // increase="14%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
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
          <Box
            mt="25px"
            p="0px 30px"
            display="flex"
            justifyContent="space-between"
            // alignItems="center"
          >
            <Box>
              <Box display="flex">
                <button
                  style={{
                    padding: "0px 40px 0px 0px",
                    color: isPeriod1MO
                      ? `${colors.greenAccent[500]}`
                      : `${colors.grey[100]}`,
                    height: "38px",
                    width: "30px",
                    borderRadius: "2px",
                    border: "none",
                    backgroundColor: colors.primary[400],
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setChartPeriod(stockData.historical_prices_1mo);
                    setChartDates(stockData.dates_1mo);
                    setIsPeriod1Y(false);
                    setIsPeriod1MO(true);
                    setIsPeriodYTD(false);
                    setIsPeriod1D(false);
                    setIsPeriod2Y(false);
                    setIsPeriod3MO(false);
                  }}
                >
                  1MO
                </button>
                <button
                  style={{
                    padding: "0px 2px 0px 0px",
                    color: isPeriod3MO
                      ? `${colors.greenAccent[500]}`
                      : `${colors.grey[100]}`,
                    height: "38px",
                    width: "30px",
                    border: "none",
                    backgroundColor: colors.primary[400],
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setChartPeriod(stockData.historical_prices_3mo);
                    setChartDates(stockData.dates_3mo);
                    setIsPeriod1Y(false);
                    setIsPeriod1MO(false);
                    setIsPeriodYTD(false);
                    setIsPeriod1D(false);
                    setIsPeriod2Y(false);
                    setIsPeriod3MO(true);
                  }}
                >
                  3MO
                </button>
                <button
                  style={{
                    padding: "0px 2px 0px 0px",
                    marginLeft: "3px",
                    color: isPeriod1Y
                      ? `${colors.greenAccent[500]}`
                      : `${colors.grey[100]}`,
                    height: "38px",
                    width: "30px",
                    borderRadius: "2px",
                    border: "none",
                    backgroundColor: colors.primary[400],
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setChartPeriod(stockData.historical_prices_1y);
                    setChartDates(stockData.dates_1y);
                    setIsPeriod1Y(true);
                    setIsPeriod1MO(false);
                    setIsPeriodYTD(false);
                    setIsPeriod1D(false);
                    setIsPeriod2Y(false);
                    setIsPeriod3MO(false);
                  }}
                >
                  1Y
                </button>
                {/* <button
                  style={{
                    padding: "0px 2px 0px 0px",
                    marginLeft:"3px",
                    color: isPeriod1D ? `${colors.greenAccent[500]}` : `${colors.grey[100]}`,
                    height: "38px",
                    width: "30px",
                    borderRadius: "2px",
                    border: "none",
                    backgroundColor: colors.primary[400],
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setChartPeriod(stockData.historical_prices_1day);
                    setChartDates(stockData.dates_1day);
                    setIsPeriod1Y(false);
                    setIsPeriod1MO(false);
                    setIsPeriodYTD(false);
                    setIsPeriod1D(true);
                    setIsPeriod2Y(false);
                    setIsPeriod3MO(false);
                  }}
                >
                  1d
                </button> */}
                <button
                  style={{
                    padding: "0px 2px 0px 0px",
                    marginLeft: "3px",
                    color: isPeriod2Y
                      ? `${colors.greenAccent[500]}`
                      : `${colors.grey[100]}`,
                    height: "38px",
                    width: "30px",
                    borderRadius: "2px",
                    border: "none",
                    backgroundColor: colors.primary[400],
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setChartPeriod(stockData.historical_prices_2y);
                    setChartDates(stockData.dates_2y);
                    setIsPeriod1Y(false);
                    setIsPeriod1MO(false);
                    setIsPeriodYTD(false);
                    setIsPeriod1D(false);
                    setIsPeriod2Y(true);
                    setIsPeriod3MO(false);
                  }}
                >
                  2Y
                </button>
                <button
                  style={{
                    padding: "0px 2px 0px 0px",
                    marginLeft: "3px",
                    color: isPeriodYTD
                      ? `${colors.greenAccent[500]}`
                      : `${colors.grey[100]}`,
                    height: "38px",
                    width: "30px",
                    borderRadius: "2px",
                    border: "none",
                    backgroundColor: colors.primary[400],
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setChartPeriod(stockData.historical_prices_ytd);
                    setChartDates(stockData.dates_ytd);
                    setIsPeriod1Y(false);
                    setIsPeriod1MO(false);
                    setIsPeriodYTD(true);
                    setIsPeriod1D(false);
                    setIsPeriod2Y(false);
                    setIsPeriod3MO(false);
                  }}
                >
                  YTD
                </button>
              </Box>
            </Box>
          </Box>

          <Box
            height="250px"
            m="-5px 0 10px 10px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            ref={chartContainerRef}
          >
            {/* Chart here */}
          </Box>
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
            <Typography variant="h5" fontWeight="600">
              Performance
            </Typography>
          </Box>
          <Performance period="1 Year" percentage={performance1Y}></Performance>
          <Performance
            period="1 Month"
            percentage={performance1MO}
          ></Performance>
          <Performance
            period="3 Months"
            percentage={performance3MO}
          ></Performance>
          <Performance period="YTD" percentage={performanceYTD}></Performance>
          <Performance period="2 Year" percentage={performance2Y}></Performance>
        </Box>
        {/* Row 3 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box borderBottom={`4px solid ${colors.primary[500]}`}>
            <Typography
              variant="h5"
              fontWeight="600"
              padding="10px 0px 10px 20px"
            >
              {stockName} News
            </Typography>
          </Box>

          <Box width="100" padding="20px">
            {/* {newsList} */}
            {newsList &&
              Object.keys(newsList).map((key, index) => {
                const newsItem = newsList[key];
                // Check if 'thumbnail' and 'resolutions' are defined
                if (newsItem.thumbnail && newsItem.thumbnail.resolutions) {
                  const imageUrl = newsItem.thumbnail.resolutions[0].url;
                  return (
                    <NewsFeed
                      key={key}
                      news={newsItem.title}
                      link={newsItem.link}
                      img_url={imageUrl}
                      date={newsItem.providerPublishTime}
                    ></NewsFeed>
                  );
                } else {
                  // Handle the case where 'thumbnail' or 'resolutions' is undefined
                  return (
                    <NewsFeed
                      key={key}
                      news={newsItem.title}
                      link={newsItem.link}
                      img_url="default_image_url"
                      date={newsItem.providerPublishTime}
                    ></NewsFeed>
                  );
                }
              })}
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box>
            <Box
              sx={{ padding: "10px 0px 10px 20px" }}
              borderBottom={`4px solid ${colors.primary[500]}`}
            >
              <Typography variant="h5" fontWeight="600">
                Company Description
              </Typography>
            </Box>

            <Box variant="h5" padding="20px 20px 20px 20px">
              {longBusinessSummary}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
