from flask import Flask, render_template, request, jsonify
from flask_cors import CORS  

from chat import get_response

import json
import torch
import pandas as pd
from model import NeuralNet
from tokenizer import tokenizer
from bag_of_words import bag_of_words
from porter_stemmer import porter_stemmer

app = Flask(__name__)
CORS(app)

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

with open('./datas/flo.json', 'r') as f:
    intents = json.load(f)


FILE = "data.pth"
data = torch.load(FILE)

input_size = data["input_size"]
hidden_size = data["hidden_size"]
output_size = data["output_size"]
all_words = data['all_words']
model_state = data["model_state"]

model = NeuralNet(input_size, hidden_size, output_size).to(device)
model.load_state_dict(model_state)
model.eval()

bot_name = "EaseFlow girly"

@app.route('/')
def home():
    return render_template('base.html')


@app.route('/api/send-message', methods=['POST'])
def send_message():
    user_message = request.json['message']

    print(f"Received user message: {user_message}")  

    if user_message.lower() == 'bye girly':
        print("User wants to exit")  
        return jsonify({'response': 'Goodbye!'})

    sentence = tokenizer(user_message)
    print(f"Tokenized sentence: {sentence}")  
    stemmed_sentence = []
    for word in sentence:
        stemmed_word = porter_stemmer(word)
        stemmed_sentence.append((word, stemmed_word))
    print(f"Stemmed into: {stemmed_sentence}")  
    
    X = bag_of_words(sentence, all_words)
    X = X.reshape(1, X.shape[0])
    X = torch.from_numpy(X).to(device)

    response, _ = get_response(user_message)

    print(f'Response: {response}')
    return jsonify({'response': f'{response}'})



if __name__ == '__main__':
    app.run(debug=True)
