import random
import json
import torch
from bag_of_words import bag_of_words
from tokenizer import tokenizer
from porter_stemmer import porter_stemmer
from model import NeuralNet

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

with open('./datas/flo.json', 'r') as f:
    intents = json.load(f)

FILE = "data.pth"
data = torch.load(FILE)

input_size = data["input_size"]
hidden_size = data["hidden_size"]
output_size = data["output_size"]
all_words = data["all_words"]
tags = data["tags"]
model_state = data["model_state"]

model = NeuralNet(input_size, hidden_size, output_size).to(device)
model.load_state_dict(model_state)
model.eval()

bot_name = "EaseFlow girly"

def get_response(sentence):
    # Tokenize and stem the input sentence
    tokenized_and_stemmed = [porter_stemmer(word) for word in tokenizer(sentence)]

    # Bag of words representation
    X = bag_of_words(tokenized_and_stemmed, all_words)
    X = X.reshape(1, X.shape[0])
    X = torch.from_numpy(X).to(device)

    # Model prediction
    output = model(X)
    _, predicted = torch.max(output, dim=1)

    tag = tags[predicted.item()]

    # Softmax probabilities
    probs = torch.softmax(output, dim=1)
    prob = probs[0][predicted.item()]

    best_match_intent = None
    best_similarity = 0.0

    if prob.item() > 0.75:
        for intent in intents['intents']:
            for pattern in intent['patterns']:
                # Tokenize and stem the pattern
                pattern_words = [porter_stemmer(word) for word in tokenizer(pattern)]

                # Bag of words representation for the pattern
                pattern_words = torch.from_numpy(bag_of_words(pattern_words, all_words)).to(device)

                # Cosine similarity calculation
                similarity = torch.cosine_similarity(X, pattern_words.unsqueeze(0), dim=1).item()

                if similarity > best_similarity:
                    best_similarity = similarity
                    best_match_intent = intent

        if best_match_intent:
            return best_match_intent['Response'], tokenized_and_stemmed
        else:
            return "I can help with common menstrual health questions, but cycles vary. For personalized advice, consult a doctor. At EaseFlow, you can easily book appointments!", tokenized_and_stemmed
    else:
        return "I do not understand...", tokenized_and_stemmed

if __name__ == '__main__':
    print("Let's chat! (type 'bye girly' to exit)")
    while True:
        sentence = input("You: ")
        if sentence == "bye girly":
            break

        response, tokenized_and_stemmed = get_response(sentence)
        print(f"{bot_name}: {response}")
