import json
import string

def tokenizer(sentence):
    if not isinstance(sentence, str):
        return []

    # Remove punctuation and convert to lowercase
    sentence = sentence.lower().translate(str.maketrans("", "", string.punctuation))

    # Split the sentence into words by spaces
    words = sentence.split()
    return words

def process_json_dataset(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)

    tokenized_data = []

    for entry in data:
        text = entry.get('Intent', '')  # Update 'text' to 'Intent' if that's the key in your JSON
        tokens = tokenizer(text)
        tokenized_data.append(tokens)

    return tokenized_data

# Example usage:
if __name__ == "__main__":
    json_file_path = "datas/flo.json"  # Update the file path accordingly
    data = process_json_dataset(json_file_path)

    # Print the tokenized data for the first few entries
    for i in range(min(5, len(data))):
        print(f"Entry {i + 1}: {data[i]}")

    # Print the content of the loaded JSON file
    print("\nContent of the loaded JSON file:")
    print(json.dumps(data, indent=2))
