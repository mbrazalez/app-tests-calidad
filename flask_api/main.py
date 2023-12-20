from flask import Flask, jsonify
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": ["http://localhost:4200", "https://procesos-401516.ew.r.appspot.com", "*"]}},
     methods=["GET", "POST", "PUT", "DELETE"],
     supports_credentials=True,
     headers=["Content-Type", "Authorization"],
     expose_headers=["Content-Type", "Authorization"])



app.config['MONGO_URI'] = 'mongodb+srv://mbrazalez:chanchi@cluster0.bi8a5yc.mongodb.net/tests'
mongo = PyMongo(app)

@app.route('/api/tests/<id>', methods=['GET'])
def get_all_tests(id):
    pipeline = [
        {
            "$match": {
                "_id": ObjectId(id)
            }
        }
    ]
    preguntas = mongo.db.preguntas.aggregate(pipeline).next()
    preguntas.pop('_id', '')
    
    response = jsonify({'form': preguntas}) 
    return response

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
