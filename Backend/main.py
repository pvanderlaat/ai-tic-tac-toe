from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS

def getNextMove(data):
    df = np.ndarray(shape=(1,9), dtype=int)
    for i in range(len(df[0])):
        df[0][i] = data[i]

    modelNames = ["SVM.pkl", "KNN.pkl", "MP.pkl"]
    res = {}
    for modelName in modelNames:
        model = joblib.load(modelName)
        predictions = model.predict(df)
        # print("Prediction for " + modelName + " :", predictions[0])
        res[modelName] = predictions[0]
    return res

app = Flask(__name__)
CORS(app)


@app.route('/api', methods=['GET'])
def get_items():
    state = request.args.get('state')
    data = [int(x) for x in state.split(",")]
    return jsonify(getNextMove(data)), 200

# Health check
@app.route('/', methods=['GET'])
def health():
    return "It is working"

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=3002)

