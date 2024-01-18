import numpy as np

from porter_stemmer import porter_stemmer
from tokenizer import tokenizer

def bag_of_words(tokenized_sentence, all_words):
    tokenized_sentence = [porter_stemmer(w) for w in tokenized_sentence]

    bag = np.zeros(len(all_words), dtype=np.float32)
    for idx, w in enumerate(all_words):
        if w in tokenized_sentence:
            bag[idx] = 1.0

    return bag

""" if __name__ == "__main__":
    sentence = "hello, how are you?"
    words = ["hi", "hello", "i", "you", "bye", "thank", "cool"]
    
    tokenized_sentence = tokenizer(sentence)
    stemmed_sentence = [porter_stemmer(w) for w in tokenized_sentence]

    bag = bag_of_words(stemmed_sentence, words)
    print(bag) """
