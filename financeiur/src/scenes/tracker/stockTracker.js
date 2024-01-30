import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';
import 'bootstrap/dist/css/bootstrap.min.css';

function StockTracker() {
  // Define state variables using the useState hook
  const [symbol, setSymbol] = useState('AAPL');
  const [stockData, setStockData] = useState(null);
  const [priceSet, setPrice] = useState(null);
  const [chatIDSET, setChatID] = useState(null);
  const [showBubbles, setShowBubbles] = useState(true); // New state for toggle button
  // Define a function to fetch stock data from a server
  const fetchStockData = async () => {
    try {
      // Send an HTTP GET request to a server (http://localhost:5000/api/stock-data) with a symbol as a query parameter
      const response = await axios.get(`http://localhost:5000/api/stock-data?symbol=${symbol}`);

      // Extract the response data
      const data = response.data;

      // Update the state variable 'stockData' with the fetched data
      setStockData(data);
      console.log(data.dates)
        ;
    } catch (error) {
      // Handle errors if the request fails
      console.error('Error fetching stock data:', error);
    }
  };

  const addTracker = async () => {
    try {

      const postData = {
        chat_id: chatIDSET,
        sym: symbol,
        price: priceSet,

      };
      // Validate the chat ID and symbol
    if (!chatIDSET || !symbol) {
      alert('Please enter a valid chat ID and symbol.');
      return;
    }
    console.log("here");
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

  useEffect(() => {
    fetchStockData();
  }, []);


  return (
    <div>
      <header>
        <div className="stock-tracker">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
              <a className="navbar-brand" href="#">Stock Tracker</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <a className="nav-link" href="#">Home</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">About</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Contact</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <div className="stock-tracker container">
        <div className="row">
          <div className="col-md-6 search-section">
            <input
              type="text"
              placeholder="Enter Stock Symbol (e.g., AAPL)"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
            />
            <button onClick={fetchStockData}>Fetch Stock Price</button>
            {stockData && <p className="stock-price">{stockData.name}</p>}
            {stockData && <p className="stock-price">${stockData.price}</p>}
          </div>
          <div className="col-md-6 stock-data">
            {stockData && (
              <div>
                <h2>1 Year graph for {stockData.symbol}</h2>
                <Line
                  data={{
                    labels: stockData.dates,
                    datasets: [
                      {
                        label: 'Stock Prices',
                        data: stockData.historical_prices,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                        pointRadius: showBubbles ? 2 : 0,
                      },
                    ],
                  }}
                  options={{
                    scales: {
                      x: {
                        type: 'time',
                        time: {
                          unit: 'day',
                        },
                      },
                      y: {
                        beginAtZero: true,
                      },
                    },
                    elements: {
                      point: {
                        radius: 1,
                      },
                    },
                  }}
                />
              </div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 stock-details">
            {stockData && (
              <section className="stock-details">
                <h2>Stock Details</h2>
                <ul>
                  <li>Symbol: {stockData.symbol}</li>
                  <li>Name: {stockData.name}</li>
                  <li>Industry: {stockData.industry}</li>
                  <li>Sector: {stockData.sector}</li>
                  <li>Market Cap: ${stockData.market_cap}</li>
                  <li>Volume: {stockData.volume}</li>
                  <li>Dividend Rate: {stockData.dividend_rate}</li>
                  <li>Payout Ratio: {stockData.payout_ratio}</li>
                  <li>Trailing PE: {stockData.trailing_pe}</li>
                  <li>Forward PE: {stockData.forward_pe}</li>
                </ul>
              </section>
            )}
          </div>
          <div className="col-md-6 financial-metrics">
            {stockData && (
              <section className="financial-metrics">
                <h2>Financial Metrics</h2>
                <ul>
                  <li>Beta: {stockData.beta}</li>
                  <li>Revenue: ${stockData.revenue}</li>
                  <li>Net Income: ${stockData.net_income}</li>
                  <li>Earnings Per Share: ${stockData.earnings_per_share}</li>
                  <li>Operating Margin: {stockData.operating_margin}</li>
                  <li>Return on Equity: {stockData.return_on_equity}</li>
                  <li>Free Cash Flow: ${stockData.free_cash_flow}</li>
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>

      <section className="alert-section">
        <div className='container'>
          <h2>Add price alerts to your Telegram account!</h2>
          <p>Get alerts to secure profits and cut losses!</p>
          <input
            type="text"
            placeholder='0.0'
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="text"
            placeholder='Enter your telegram chat id (e.g., 1003256893)'
            onChange={(e) => setChatID(e.target.value)}
          />
          <button onClick={addTracker}>Add Tracker</button>
        </div>
      </section>
      <footer className='footer'>
        <div className="container">
          <ul>
            <li>About Us</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
          <div className="social-icons">
            {/* Social Media Icons Here */}
          </div>
        </div>
      </footer>

    </div>
  );
}

export default StockTracker;
