import numpy as np
import pandas as pd

from nltk_utils import tokenize, stem, bag_of_words
from model import NeuralNet

import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader

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
        
        # Tokenize all 'Intents' and add them to the patterns
        tokenized_patterns = [(tokenize(intent), response) for intent, response in patterns]  
        all_patterns.extend(tokenized_patterns)
    
    return all_patterns

# Test whether the datasets are being loaded and tokenized
tokenized_patterns = load_all_datasets()

# Ignore these words (stop words) during stemming
ignore_words = [',', '.', '?', '!']

# Stem all words from tokenizations except ignore_words
all_words = [stem(word) for intent, _ in tokenized_patterns for word in intent if word not in ignore_words]
all_words = sorted(set(all_words)) #unique words only
 
# Bag of words
X_train = []
for (tokenized_sentence, _) in tokenized_patterns:
    bag = bag_of_words(tokenized_sentence, all_words)
    X_train.append(bag)

X_train = np.array(X_train)

class ChatDataset(Dataset):
    def __init__(self):
        self.n_samples = len(X_train)
        self.x_data = torch.tensor(X_train, dtype=torch.float32)  # Convert to PyTorch tensor

    def __getitem__(self, index):
        # Modify this line to return both input and target
        return self.x_data[index], torch.tensor(index % output_size, dtype=torch.long)

    def __len__(self):
        return self.n_samples


# Find the number of unique classes in dataset
unique_classes = set(response for _, response in tokenized_patterns)

# Hyperparameters
input_size = len(all_words)
output_size = len(unique_classes)
batch_size = 8
hidden_size = 8
learning_rate = 0.001
num_epochs = 1000
    
dataset=ChatDataset()
train_loader = DataLoader(dataset=dataset, batch_size=batch_size, shuffle=True, num_workers=0)

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu') #This ensures that your model is placed on the appropriate device (CPU or GPU) during training. If you're using a GPU, this can significantly speed up the training process compared to running on a CPU.

model = NeuralNet(input_size,hidden_size,output_size).to(device)

#loss and optimizer
criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(),lr=learning_rate)

for epoch in range(num_epochs):
    for intents, responses in train_loader:
        intents, responses = intents.to(device), responses.to(device)
        
        # Forward pass
        outputs = model(intents)
        
        # Compute the loss
        loss = criterion(outputs, responses)
        
        # Backward pass and optimizer step
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

    if (epoch + 1) % 100 == 0:
        print(f'Epoch {epoch + 1}/{num_epochs}, Loss: {loss.item():.4f}')

print(f'Final loss: {loss.item():.4f}')

#save data in data dictionary
data = {
    "model_state" :model.state_dict(),
    "input_size": input_size,
    "output_size":output_size,
    "hidden_size":hidden_size,
    "all_words":all_words
}

FILE = "data.pth" #.pth for pytorch
torch.save(data,FILE)

print(f'Training complete. File saved to {FILE}')

