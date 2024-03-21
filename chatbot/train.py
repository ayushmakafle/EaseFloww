import json
import numpy as np
import pandas as pd

import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader

from bag_of_words import bag_of_words
from porter_stemmer import porter_stemmer
from tokenizer import tokenizer
from model import NeuralNet

import matplotlib.pyplot as plt  # Import the matplotlib library

with open('./datas/flo.json','r') as f:
    intents = json.load(f)
    
all_words = []
tags = []
xy = []

for intent in intents['intents']:
    tag = intent['Tag']
    tags.append(tag)
    for pattern in intent['patterns']:
        w = tokenizer(pattern)
        all_words.extend(w)
        xy.append((w, tag))
        
ignore_words = ['?','!','.',',','the','a','an']
all_words = [porter_stemmer(w) for w in all_words if w not in ignore_words]
all_words = sorted(set(all_words)) #set to remove duplicate
tags = sorted(set(tags))

# create training data
X_train = []
y_train = []
for (pattern_sentence, tag) in xy:
    # X: bag of words for each pattern_sentence
    bag = bag_of_words(pattern_sentence, all_words)
    X_train.append(bag)
    # y: PyTorch CrossEntropyLoss needs only class labels, not one-hot
    label = tags.index(tag)
    y_train.append(label)

X_train = np.array(X_train)
y_train = np.array(y_train)

# Hyper-parameters 
num_epochs = 1000
batch_size = 8
learning_rate = 0.001
input_size = len(X_train[0])
hidden_size = 8
output_size = len(tags)
print(input_size, output_size)

class ChatDataset(Dataset):
    def __init__(self, x_data=None, y_data=None):
        self.n_samples = len(x_data) if x_data is not None else 0
        self.x_data = x_data
        self.y_data = y_data

    def __getitem__(self, index):
        return self.x_data[index], self.y_data[index]

    def __len__(self):
        return self.n_samples

dataset = ChatDataset(X_train, y_train)  # Pass training data to ChatDataset constructor
train_loader = DataLoader(dataset=dataset,
                          batch_size=batch_size,
                          shuffle=True,
                          num_workers=0)


device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

model = NeuralNet(input_size, hidden_size, output_size).to(device)

# Loss and optimizer
criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=learning_rate)

# Train the model
loss_values = []  # List to store the loss values
accuracy_values = []  # List to store the accuracy values

for epoch in range(num_epochs):
    correct_predictions = 0
    total_predictions = 0
    epoch_losses = []  # List to store the loss at each iteration
    
    for (words, labels) in train_loader:
        words = words.to(device)
        labels = labels.to(dtype=torch.long).to(device)
        
        # Forward pass
        outputs = model(words)
        loss = criterion(outputs, labels)
        
        # Calculate accuracy
        _, predicted = torch.max(outputs.data, 1)
        total_predictions += labels.size(0)
        correct_predictions += (predicted == labels).sum().item()

        # Backward and optimize
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
        
        epoch_losses.append(loss.item())  # Store the loss value for the current iteration

    mean_epoch_loss = np.mean(epoch_losses)
    loss_values.append(mean_epoch_loss)  # Store the mean loss value for the epoch

    # Calculate accuracy for the epoch
    epoch_accuracy = correct_predictions / total_predictions
    accuracy_values.append(epoch_accuracy)

    if (epoch+1) % 10 == 0:
        print(f'Epoch [{epoch+1}/{num_epochs}], Loss: {mean_epoch_loss:.4f}, Accuracy: {epoch_accuracy:.4f}')

# Plotting the loss values
plt.subplot(2, 1, 1)
plt.plot(range(1, num_epochs + 1), loss_values, label='Training Loss')
plt.xlabel('Epoch')
plt.ylabel('Loss')
plt.title('Training Loss Over Time')
plt.legend()

# Plotting the accuracy values
plt.subplot(2, 1, 2)
plt.plot(range(1, num_epochs + 1), accuracy_values, label='Training Accuracy')
plt.xlabel('Epoch')
plt.ylabel('Accuracy')
plt.title('Training Accuracy Over Time')
plt.legend()

plt.tight_layout()
plt.show()

final_accuracy = accuracy_values[-1]
print(f'Final Accuracy on Training Data: {final_accuracy:.4f}')
print(f'final loss: {loss.item():.4f}')

data = {
"model_state": model.state_dict(),
"input_size": input_size,
"hidden_size": hidden_size,
"output_size": output_size,
"all_words": all_words,
"tags": tags
}

FILE = "data.pth"
torch.save(data, FILE)

print(f'training complete. file saved to {FILE}')

# Load the trained model
loaded_data = torch.load(FILE)
loaded_model = NeuralNet(loaded_data["input_size"], loaded_data["hidden_size"], loaded_data["output_size"])
loaded_model.load_state_dict(loaded_data["model_state"])
loaded_model.eval()

# Test the model
# Load test data from testdata.json
with open('./datas/testdata.json', 'r') as file:
    test_data = json.load(file)

# Preprocess the test data
test_X = []
test_y = []

for intent in test_data['intents']:
    tag = intent['Tag']
    for pattern in intent['patterns']:
        tokenized_pattern = tokenizer(pattern)
        stemmed_pattern = [porter_stemmer(word) for word in tokenized_pattern if word not in ignore_words]
        bag = bag_of_words(stemmed_pattern, all_words)
        test_X.append(bag)
        test_y.append(tags.index(tag))

test_X = np.array(test_X)
test_y = np.array(test_y)

# Test the model
test_dataset = ChatDataset(test_X, test_y)
test_loader = DataLoader(dataset=test_dataset, batch_size=batch_size, shuffle=False, num_workers=0)

correct_predictions_test = 0
total_predictions_test = 0

# Initialize a list to store test accuracy values
test_accuracy_values = []

# Test the model
with torch.no_grad():
    for (test_words, test_labels) in test_loader:
        test_words = test_words.to(device)
        test_labels = test_labels.to(dtype=torch.long).to(device)

        # Forward pass
        test_outputs = model(test_words)

        # Calculate accuracy
        _, test_predicted = torch.max(test_outputs.data, 1)
        correct_predictions_test += (test_predicted == test_labels).sum().item()
        total_predictions_test += test_labels.size(0)
        test_accuracy = correct_predictions_test / total_predictions_test

        # Store the accuracy value
        test_accuracy_values.append(test_accuracy)

# Plotting the test accuracy values
plt.figure()
plt.plot(range(1, len(test_accuracy_values) + 1), test_accuracy_values, label='Test Accuracy')
plt.xlabel('Batch')
plt.ylabel('Accuracy')
plt.title('Test Accuracy Over Batches')
plt.legend()
plt.show()

# Calculate overall accuracy on test data
overall_accuracy_test = correct_predictions_test / total_predictions_test
print(f'Overall Accuracy on Test Data: {overall_accuracy_test:.4f}')
