import axios from 'axios';

const fetchStockData = async (symbol) => {
  try {
    const response = await axios.get(`http://127.0.0.1:5000/api/stock-data?symbol=${symbol}`);
    const data = response.data;
    return data;
    // console.log(data.price);
    // console.log(data.dates);
  } catch (error) {
    console.error('Error fetching stock data:', error);
  }
};

export default fetchStockData;
