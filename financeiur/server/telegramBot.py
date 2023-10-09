import asyncio
import yfinance as yf
import psycopg2
import telegram

db_config = {
    'dbname': "example db config",
    'user': "adminTest",
    'password': "-",
    'host': "localhost",
    'port': "5432"
}

def retrieve_stock_data(symbol):
    stock=yf.Ticker(symbol)
    price = stock.info.get('currentPrice')
    return price
        

async def check_database_and_send_alerts():
    try:
        conn = psycopg2.connect(**db_config)
        cursor = conn.cursor()
        cursor.execute("SELECT symbol,price,chatid FROM stock_data")
        for symbol, price, chat_id in cursor.fetchall():
            stock_data = retrieve_stock_data(symbol)
            current_price = stock_data
            if float(current_price) >= float(price) and float:
                message = f"Alert: {symbol} has reached the target price of ${price}!"
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
    while True:
        await check_database_and_send_alerts()
        await asyncio.sleep(10) 

async def main():
    await repeat_task()

if __name__ == '__main__':
    asyncio.run(main())
