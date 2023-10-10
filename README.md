# Stock Market Alert System
![image](https://github.com/simonlim42/Stock-Tracker/assets/61169518/327d67d3-b821-4ca2-a7ad-38e79351146a)

## Introduction

This project consists of a web application for tracking stock prices and a background task that periodically checks the stock prices against user-defined alerts and sends Telegram notifications when the stock prices meet the specified conditions.

## Backend (`backend.py`)

The backend of the application is built using Flask, a Python web framework. It provides two main API endpoints:

## 1. `/api/stock-data` (GET)

This endpoint fetches detailed stock data based on the provided stock symbol using the Yahoo Finance API. It retrieves various information such as stock name, current price, historical data, financial metrics, and more.

## 2. `/api/database-update` (POST)

This endpoint receives data containing the stock symbol, price, and chat ID. It inserts this data into a PostgreSQL database. The database is used by the background task to track user-defined stock price alerts.

## Frontend (`StockTracker.js`)

The frontend is developed using React.js. It allows users to enter a stock symbol, fetch real-time stock data, view historical price charts, and set up price alerts. Users can specify a target price and a Telegram chat ID to receive notifications when the stock price reaches or exceeds the target.

## Background Task (`alert_service.py`)

A Python script running as an asynchronous task periodically checks the PostgreSQL database for stock price alerts. If the current stock price exceeds the user-defined target price, it sends a Telegram notification to the specified chat ID using the Telegram API.

### Getting Started

### 1. **Clone the Repository:**
      git clone https://github.com/your-username/stock-market-alert.git
      cd stock-market-alert
### 2. **Install Dependencies:**
      pip install flask flask-cors yfinance psycopg2
      npm install axios react-chartjs-2 chart.js react-bootstrap
### 3. Run the Application:
#### Start the Flask Backend:
      python backend.py
#### Start the React Frontend (inside the project directory):
     npm start
#### Run the Background Task:
     python alert_service.py
