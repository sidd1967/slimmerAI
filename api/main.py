import time
from flask import Flask, request
from flask_cors import CORS
from flask_mysqldb import MySQL
import json

import spacy
from typing import Tuple, List
app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'sid'
app.config['MYSQL_PASSWORD'] = '1967'
app.config['MYSQL_DB'] = 'feedback'

mysql = MySQL(app)

nlp = spacy.load("en_core_web_sm")


@app.route('/feedback', methods = ["POST", "GET"])
def get_feedback():
      if request.method == "POST":
            req_data = request.get_json()
            fb1 = req_data['fb']
            cur = mysql.connection.cursor()
            cur.execute("INSERT INTO myfeedback1 (Value) VALUES (%s)", [fb1] )
            mysql.connection.commit()
            cur.close()
            return {'success': "success"}

@app.route('/text', methods = ["POST", "GET"])
def get_data():
      if request.method == "POST":
            req_data = request.get_json()
            txt = req_data['txt']

            processed_text = process_text(txt)

            return {"final_data": processed_text}


def process_text(text: str) -> List[Tuple[str, str]]:
	"""Processes the text and reslimmturns the recognized entities
	
	:param text: The input for the model
	:return: returns a list with a tuple for each word in the text containing
			 the text itself, and the entity type if found, or empty string
			 if not
	"""

	doc = nlp(text)

	result = []
	for word in doc:
		result.append((str(word), word.ent_type_))

	return result