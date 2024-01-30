# backend.py
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import yfinance as yf
import psycopg2
import json
import os
from dotenv import load_dotenv
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})


dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path)

db_config = {
    'dbname': os.getenv('DB_NAME'),
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD'),
    'host': os.getenv('DB_HOST'),
    'port': os.getenv('DB_PORT')
}

def retrieve_stock_data(symbol):
    
    stock=yf.Ticker(symbol)
    try:
        name = stock.info.get('shortName')
    except Exception as e:
        print(e)
    current_price = stock.info.get('currentPrice')
    historical_data_1y = stock.history(period='1y')
    historical_data_1mo = stock.history(period="1mo")
    historical_data_1day = stock.history(period="1d")
    historical_data_ytd = stock.history(period="ytd")
    historical_data_2y = stock.history(period="2y")
    historical_data_3mo = stock.history(period="3mo")
    # historical_data_1mo = stock.history(period="1mo")
    # oldest_date = historical_data_1mo.index.min()
    # oldest_price_row = historical_data_1mo.loc[oldest_date]
    # oldest_price = oldest_price_row['Close']
    # print(current_price-oldest_price)
    oldest_price_1y = historical_data_1y.loc[historical_data_1y.index.min()]['Close']
    oldest_price_1mo = historical_data_1mo.loc[historical_data_1mo.index.min()]['Close']
    oldest_price_ytd = historical_data_ytd.loc[historical_data_ytd.index.min()]['Close']
    oldest_price_2y = historical_data_2y.loc[historical_data_2y.index.min()]['Close']
    oldest_price_3mo = historical_data_3mo.loc[historical_data_3mo.index.min()]['Close']
    industry=stock.info.get('industry')
    shortBusinessSummary=stock.info.get('shortBusinessSummary')
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
    news = stock.get_news()

    if not historical_data_1y.empty:
        dates_1y = historical_data_1y.index.strftime('%Y-%m-%d').tolist()
        historical_prices_1y = historical_data_1y['Close'].tolist()
        
        dates_1mo = historical_data_1mo.index.strftime('%Y-%m-%d').tolist()
        historical_prices_1mo = historical_data_1mo['Close'].tolist()
        dates_3mo = historical_data_3mo.index.strftime('%Y-%m-%d').tolist()
        historical_prices_3mo = historical_data_3mo['Close'].tolist()
        dates_1day = historical_data_1day.index.strftime('%Y-%m-%d').tolist()
        historical_prices_1day = historical_data_1day['Close'].tolist()
        dates_ytd = historical_data_ytd.index.strftime('%Y-%m-%d').tolist()
        historical_prices_ytd = historical_data_ytd['Close'].tolist()
        dates_2y = historical_data_2y.index.strftime('%Y-%m-%d').tolist()
        historical_prices_2y = historical_data_2y['Close'].tolist()
        # print("hello")
        latest_data = historical_data_1y.iloc[-1]  # Get the latest data point
        stock_data = {
            'name': name,
            'symbol': symbol,
            'price': current_price,
            'open': latest_data['Open'],
            'high': latest_data['High'],
            'low': latest_data['Low'],
            'oldest_price': oldest_price_1y,
            'performance_1y': current_price-oldest_price_1y,
            'performance_2y': current_price-oldest_price_2y,
            'performance_ytd': current_price-oldest_price_ytd,
            'performance_1mo': current_price-oldest_price_1mo,
            'performance_3mo':current_price-oldest_price_3mo,
            'beta': beta,
            'dates_1y': dates_1y,
            'historical_prices_1y': historical_prices_1y,
            'dates_1mo': dates_1mo,
            'historical_prices_1mo': historical_prices_1mo,
            'dates_3mo': dates_3mo,
            'historical_prices_3mo': historical_prices_3mo,
            'dates_1day': dates_1day,
            'historical_prices_1day': historical_prices_1day,
            'dates_ytd': dates_ytd,
            'historical_prices_ytd': historical_prices_ytd,
            'dates_2y': dates_2y,
            'historical_prices_2y': historical_prices_2y,
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
            'website': website,
            'news':news,
            'longBusinessSummary':longBusinessSummary,
        }
        
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
        chatID=int(chatId)
        direction=parsed_data['postData']['direction']
        try:
            conn = psycopg2.connect(**db_config)
        except psycopg2.Error as e:
            print("Error connecting to PostgreSQL:", e)
        cur = conn.cursor()
        data_to_insert = (chatID,symbol,price,direction)
        insert_query = "INSERT INTO tracking_data (chatid,symbol,price,direction) VALUES (%s,%s,%s,%s)"
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
