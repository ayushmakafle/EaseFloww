import nltk
import numpy as np
# nltk.download('punkt') #punkt has a pre trained tokenizer. use it when running for first rime
from nltk.stem.porter import PorterStemmer
stemmer = PorterStemmer()

def tokenize(sentence):
    if not isinstance(sentence, str):
        # If the input is not a string, return an empty list or handle it as needed
        return []

    return nltk.word_tokenize(sentence)

def stem(word):
    return stemmer.stem(word.lower()) #lowercase

def bag_of_words(tokenized_sentence,all_words):
    tokenized_sentence = [stem(w) for w in tokenized_sentence]
    
    bag = np.zeros(len(all_words),dtype=np.float32)
    for idx, w in enumerate(all_words):
        if w in tokenized_sentence:
            bag[idx] = 1.0
    
    return bag