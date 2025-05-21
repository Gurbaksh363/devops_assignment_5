from flask import Flask, request, jsonify
from pymongo import MongoClient
from dotenv import load_dotenv
import os

app = Flask(__name__)
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)

db = client['test']
collection = db['signup']


@app.route("/")
def home():
  return "backend running successfully"


@app.route("/register", methods=["POST"] )
def register():
  data = request.get_json()
  print(data)
  collection.insert_one(data)
  return jsonify({"msg": "Data received", "status": "success"})

if __name__ == "__main__":
  app.run(host="0.0.0.0", port=5000, debug=True)