from flask import Flask, render_template, request, jsonify
from flask_cors import CORS  # Import CORS from flask_cors

import random
import json
import torch
import pandas as pd
from model import NeuralNet
from nltk_utils import bag_of_words, tokenize

app = Flask(__name__)
CORS(app)

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# Load dataset from CSV file
def load_dataset(file_path, input_column='Intent', response_column='Response'):
    dataset = pd.read_csv(file_path)
    patterns = []
    for index, row in dataset.iterrows():
        input_pattern = row[input_column]
        response = row[response_column]
        patterns.append((input_pattern, response))
    return patterns

# Load all datasets from the datas folder
def load_all_datasets():
    datasets = ['Fertility Dost Chatbot.csv', 'Flo.csv', 'General Mai.csv', 'Hello Clue.csv', 'Menstrual Hygeine.csv', 'New Periods Curriculum.csv', 'Real Data.csv', 'Real Person Data.csv', 'Sexually Transmitted Infections.csv']
    all_patterns = []
    for dataset in datasets:
        file_path = f'datas/{dataset}'
        patterns = load_dataset(file_path)
        tokenized_patterns = [(tokenize(intent), response) for intent, response in patterns]
        all_patterns.extend(tokenized_patterns)
    return all_patterns

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
    return render_template('index.html')

datasets = load_all_datasets()

@app.route('/api/send-message', methods=['POST'])
def send_message():
    user_message = request.json['message']

    print(f"Received user message: {user_message}")  # Debug line

    if user_message.lower() == 'bye girly':
        print("User wants to exit")  # Debug line
        return jsonify({'response': 'Goodbye!'})

    sentence = tokenize(user_message)
    print(f"Tokenized sentence: {sentence}")  # Debug line

    X = bag_of_words(sentence, all_words)
    X = X.reshape(1, X.shape[0])
    X = torch.from_numpy(X).to(device)

    output = model(X)
    _, predicted = torch.max(output, dim=1)

    predicted_intent = predicted.item()
    best_response = None
    best_similarity = -1

    for dataset_file in ['Fertility Dost Chatbot.csv', 'Flo.csv', 'General Mai.csv', 'Hello Clue.csv', 'Menstrual Hygeine.csv', 'New Periods Curriculum.csv', 'Real Data.csv', 'Real Person Data.csv', 'Sexually Transmitted Infections.csv']:
        responses = load_dataset(f'datas/{dataset_file}')

        for intent, resp in responses:
            tokenized_intent = tokenize(intent)
            similarity = sum(1 for word in sentence if word in tokenized_intent)
            if similarity > best_similarity:
                best_similarity = similarity
                best_response = resp

    print(f'Response: {bot_name}: {best_response}')  # Debug line
    return jsonify({'response': f'{bot_name}: {best_response}'})


if __name__ == '__main__':
    app.run(debug=True)
