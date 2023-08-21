# backend.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import yfinance as yf

app = Flask(__name__)
CORS(app)

@app.route('/api/stock-data', methods=['GET'])
def get_stock_data():
    symbol = request.args.get('symbol', 'AAPL')  # Default to AAPL if symbol is not provided

    try:
        # Fetch stock data using yfinance
        stock = yf.Ticker(symbol)
        data = stock.history(period='1d')  # Fetch today's data (you can adjust the period)
        if not data.empty:
            latest_data = data.iloc[-1]  # Get the latest data point
            stock_data = {
                'symbol': symbol,
                'price': latest_data['Close'],
                'open': latest_data['Open'],
                'high': latest_data['High'],
                'low': latest_data['Low'],
            }
            return jsonify(stock_data)
        else:
            return jsonify({'error': 'No data available for the symbol.'})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
