# backend.py
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import yfinance as yf
import psycopg2
import json

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})


db_config = {
    
    'dbname':"Financeiur",
    'user':"adminTest",
    'password':"cat123",
    'host':"localhost",
    'port':"5432"
}

def retrieve_stock_data(symbol):
    stock=yf.Ticker(symbol)
    name = stock.info.get('shortName')
    current_price = stock.info.get('currentPrice')
    historical_data = stock.history(period='1y')
    industry=stock.info.get('industry')
    longBusinessSummary=stock.info.get('longBusinessSummary')
    beta=stock.info.get('beta')

    # Stock Price Information
    current_price = stock.info.get('currentPrice')
    previous_close = stock.info.get('previousClose')
    day_low = stock.info.get('dayLow')
    day_high = stock.info.get('dayHigh')
    fifty_two_week_low = stock.info.get('fiftyTwoWeekLow')
    fifty_two_week_high = stock.info.get('fiftyTwoWeekHigh')
    market_cap = stock.info.get('marketCap')
    volume = stock.info.get('regularMarketVolume')

    # Dividend and Payout Information
    dividend_rate = stock.info.get('dividendRate')
    dividend_yield = stock.info.get('dividendYield')
    payout_ratio = stock.info.get('payoutRatio')

    # Valuation Ratios
    trailing_pe = stock.info.get('trailingPE')
    forward_pe = stock.info.get('forwardPE')
    price_to_sales = stock.info.get('priceToSalesTrailing12Months')
    price_to_book = stock.info.get('priceToBook')

    # Financial Health and Performance
    revenue = stock.info.get('totalRevenue')
    net_income = stock.info.get('netIncomeToCommon')
    earnings_per_share = stock.info.get('trailingEps')
    operating_margin = stock.info.get('operatingMargins')
    return_on_equity = stock.info.get('returnOnEquity')
    free_cash_flow = stock.info.get('freeCashflow')

    # Other Information
    industry = stock.info.get('industry')
    sector = stock.info.get('sector')
    website = stock.info.get('website')


    # PEratio = 
    if not historical_data.empty:
        dates = historical_data.index.strftime('%Y-%m-%d').tolist()
        historical_prices = historical_data['Close'].tolist()
        latest_data = historical_data.iloc[-1]  # Get the latest data point
        stock_data = {
            'name': name,
            'symbol': symbol,
            'price': current_price,
            'open': latest_data['Open'],
            'high': latest_data['High'],
            'low': latest_data['Low'],
            'beta': beta,
            'dates': dates,
            'historical_prices': historical_prices,
            'industry': industry,
            'longBusinessSummary': longBusinessSummary,
            'beta': beta,
            'previous_close': previous_close,
            'day_low': day_low,
            'day_high': day_high,
            'fifty_two_week_low': fifty_two_week_low,
            'fifty_two_week_high': fifty_two_week_high,
            'market_cap': market_cap,
            'volume': volume,
            'dividend_rate': dividend_rate,
            'dividend_yield': dividend_yield,
            'payout_ratio': payout_ratio,
            'trailing_pe': trailing_pe,
            'forward_pe': forward_pe,
            'price_to_sales': price_to_sales,
            'price_to_book': price_to_book,
            'revenue': revenue,
            'net_income': net_income,
            'earnings_per_share': earnings_per_share,
            'operating_margin': operating_margin,
            'return_on_equity': return_on_equity,
            'free_cash_flow': free_cash_flow,
            'sector': sector,
            'website': website
        }
        print(stock_data)
        return stock_data
    

@app.route('/api/stock-data', methods=['GET'])
def get_stock_data():
    symbol = request.args.get('symbol', 'AAPL')  # Default to AAPL if symbol is not provided

    try:
        # Fetch stock data using yfinance
        stock_data=retrieve_stock_data(symbol)
        return jsonify(stock_data)
    except Exception as e:
        return jsonify({'error': str(e)})
    
@app.route('/api/database-update',methods=['POST'])
def update_database():
    
    try:
        
        data=request.data
        decodedPair = data.decode('utf-8')
        parsed_data = json.loads(decodedPair)
        print(parsed_data)
        symbol = parsed_data['postData']['sym']
        price = round(float(parsed_data['postData']['price']),2)
        price=float(price)
        chatId = parsed_data['postData']['chat_id']
        chatId=int(chatId)
        try:
            conn = psycopg2.connect(**db_config)
        except psycopg2.Error as e:
            print("Error connecting to PostgreSQL:", e)
        cur = conn.cursor()
        data_to_insert = (chatId,symbol,price,)
        insert_query = "INSERT INTO stock_data (chatId,symbol,price) VALUES (%s,%s,%s)"
        try:
            cur.execute(insert_query, data_to_insert)
        except Exception as e:
            print("Error:",e)
        
        conn.commit()
        
        # Close the cursor and database connection
        cur.close()
        conn.close()
        return jsonify({
            'message': 'Item added successfully'
        }), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

if __name__ == '__main__':

    app.run(debug=True)
