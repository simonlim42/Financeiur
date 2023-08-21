import React, { useState } from 'react';
import axios from 'axios';

function StockTracker() {
  const [symbol, setSymbol] = useState('');
  const [stockData, setStockData] = useState(null);

  const fetchStockData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/stock-data?symbol=${symbol}`);
      const data = response.data;
      setStockData(data);
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  return (
    <div>
      <h1>Stock Tracker</h1>
      <input
        type="text"
        placeholder="Enter Stock Symbol (e.g., AAPL)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />
      <button onClick={fetchStockData}>Fetch Stock Data</button>

      {stockData && (
        <div>
          <h2>Stock Data for {stockData.symbol}</h2>
          <p>Price: {stockData.price}</p>
          <p>Change Percent: {stockData.change_percent}%</p>
        </div>
      )}
    </div>
  );
}

export default StockTracker;
