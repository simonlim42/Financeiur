import os
import asyncio
import yfinance as yf
import psycopg2
import telegram
from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path)

db_config = {
    'dbname': os.getenv('DB_NAME'),
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD'),
    'host': os.getenv('DB_HOST'),
    'port': os.getenv('DB_PORT')
}

def retrieve_stock_price(symbol):
    stock = yf.Ticker(symbol).history(interval="1m", period = "1d")
    print(stock)
    price=stock['Close'][-1]

    return price
        

async def check_database_and_send_alerts():
    try:
        conn = psycopg2.connect(**db_config)
        cursor = conn.cursor()
        cursor.execute("SELECT symbol,price,chatid,direction FROM tracking_data")
        
        for symbol, alertPrice, chat_id, direction in cursor.fetchall():
            print(symbol, alertPrice, chat_id, direction)
            stock_price = retrieve_stock_price(symbol)
            print(stock_price)
            current_price = stock_price
            tolerance=0.02*alertPrice
            upper_limit = alertPrice * (1 + tolerance)
            lower_limit = alertPrice * (1 - tolerance)
            if direction == "above":
                if float(current_price)>=float(upper_limit):
                    message = f"Alert: {symbol} has reached the passed price of ${alertPrice}!"
                    await send_telegram_message(chat_id, message)
            elif direction == "below":
                if float(current_price)<=float(lower_limit):
                    message = f"Alert: {symbol} has reached the passed price of ${alertPrice}!"
                    await send_telegram_message(chat_id, message)

        cursor.close()
        conn.close()
    except Exception as e:
        print("Error checking alerts:", e)

async def send_telegram_message(chat_id, message):
    bot_token = '6103742136:AAHb5076-0M6lC9shuO0FG5PKBhzbavl1Vg'
    bot = telegram.Bot(bot_token)
    try:
        await bot.send_message(int(chat_id), message)
    except Exception as e:
        print("Error sending Telegram message:", e)

async def repeat_task():
    print("Bot running!")
    while True:
        await check_database_and_send_alerts()
        await asyncio.sleep(10) 

async def main():
    await repeat_task()

if __name__ == '__main__':
    asyncio.run(main())
