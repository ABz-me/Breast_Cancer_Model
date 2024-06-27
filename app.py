from flask import Flask, render_template, request, send_from_directory
from implementation import randorm_forest_test, random_forest_train, random_forest_predict
from sklearn.preprocessing import StandardScaler
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from sklearn.metrics import accuracy_score
from time import time

app = Flask(__name__)
app.url_map.strict_slashes = False

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/data')
def get_data():
    return send_from_directory('static/asset', 'data.json')

@app.route('/about')
def get_about():
    return send_from_directory('static/asset', 'about.json')

@app.route('/presentation')
def get_presentation():
    return send_from_directory('static/asset', 'presentation.json')

@app.route('/form')
def form():
    return render_template('form.html')

@app.route('/predict', methods=['POST']) 
def predict():
    data_name = request.form['id'] 
    
    data_points = []
    data = []
    
    for i in range(1, 31):
        data.append(float(request.form['value' + str(i)]))
    
    data_points.extend(data)
    
    print(data_points)
    
    data_np = np.asarray(data, dtype=float).reshape(1, -1)
    out, acc, t = random_forest_predict(clf, data_np)
    
    if out == 1:
        output = 'Malignant'
    else:
        output = 'Benign'
    
    acc1 = max(acc[0])
    
    return render_template('result.html', output=output, accuracy=acc1, time=t, data_name=data_name)

if __name__ == '__main__':
    global clf 
    clf = random_forest_train()
    randorm_forest_test(clf)
    app.run(debug=True, host='0.0.0.0', port=3000)
