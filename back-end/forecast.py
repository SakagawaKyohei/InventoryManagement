import psycopg2
import pandas as pd
import numpy as np
from statsmodels.tsa.holtwinters import ExponentialSmoothing
from dotenv import load_dotenv
import os
from flask import Flask, jsonify

# Tải các biến môi trường từ file .env
load_dotenv()

# Lấy thông tin kết nối từ các biến môi trường
POSTGRES_HOST = os.getenv('POSTGRES_HOST')
POSTGRES_PORT = os.getenv('POSTGRES_PORT', 5432)  # Cổng mặc định PostgreSQL là 5432
POSTGRES_DATABASE = os.getenv('POSTGRES_DATABASE')
POSTGRES_USER = os.getenv('POSTGRES_USER')
POSTGRES_PASSWORD = os.getenv('POSTGRES_PASSWORD')

app = Flask(__name__)

# Hàm kết nối đến PostgreSQL
def get_db_connection():
    conn = psycopg2.connect(
        host=POSTGRES_HOST,
        port=POSTGRES_PORT,
        database=POSTGRES_DATABASE,
        user=POSTGRES_USER,
        password=POSTGRES_PASSWORD
    )
    return conn

# Hàm lấy dữ liệu từ PostgreSQL
def get_data_from_db():
    conn = get_db_connection()
    query = "SELECT year, month, revenue FROM doanhthu ORDER BY year, month"
    df = pd.read_sql(query, conn)
    conn.close()
    return df

# Hàm dự đoán và trả về dự đoán dưới dạng JSON
def forecast_data(data, future_steps=6):
    # Chuyển đổi dữ liệu thành chuỗi thời gian (DateTime)
    data['date'] = pd.to_datetime(data['year'].astype(str) + '-' + data['month'].astype(str), format='%Y-%m')
    data.set_index('date', inplace=True)

    # Đảm bảo dữ liệu có tần suất rõ ràng
    data = data['revenue'].asfreq('MS')  # 'MS' cho đầu mỗi tháng

    # Áp dụng mô hình Holt-Winters
    model_hw = ExponentialSmoothing(data, seasonal='multiplicative', seasonal_periods=12).fit()

    # Dự đoán trong tương lai
    forecast_hw = model_hw.forecast(steps=future_steps)

    # Chuyển kết quả dự đoán thành danh sách và trả về
    return forecast_hw.tolist()

# Route mặc định
@app.route('/')
def home():
    return "Flask API is running"

# Route để dự đoán dữ liệu
@app.route('/forecast', methods=['GET'])
def forecast():
    # Lấy dữ liệu từ PostgreSQL
    data = get_data_from_db()

    # Dự đoán doanh thu trong tương lai
    forecast_result = forecast_data(data)

    # Trả về kết quả dự đoán dưới dạng JSON
    return jsonify(forecast_result)

if __name__ == '__main__':
    app.run(debug=True)
