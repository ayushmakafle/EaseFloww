import json
import re

from tokenizer import tokenizer

def porter_stemmer(word):
    # Check if the word is a string
    if not isinstance(word, str):
        return word

    # Define the Porter stemming rules and conditions
    step1a_suffixes = ['sses', 'ies', 'ss', 's']
    step1b_suffixes = ['eed', 'ed', 'ing']
    step1c_suffixes = ['y']
    step2_suffixes = ['ational', 'tional', 'enci', 'anci', 'izer', 'bli', 'alli', 'entli', 'eli', 'ousli', 'ization', 'ation', 'ator', 'alism', 'iveness', 'fulness', 'ousness', 'aliti', 'iviti', 'biliti']
    step3_suffixes = ['icate', 'ative', 'alize', 'iciti', 'ical', 'ful', 'ness']
    step4_suffixes = ['al', 'ance', 'ence', 'er', 'ic', 'able', 'ible', 'ant', 'ement', 'ment', 'ent', 'ion', 'ou', 'ism', 'ate', 'iti', 'ous', 'ive', 'ize']
    step5a_suffixes = ['e']
    step5b_suffixes = ['l']

    # Helper function to apply a rule
    def apply_rule(word, suffix, replacement):
        result = re.sub(f'{suffix}$', replacement, word)
        # Handle double consonants
        if len(result) >= 2 and result[-1] == result[-2] and result[-1] not in 'aeiou':
            result = result[:-1]
        return result

    # Apply Porter stemming rules
    for suffix in step1a_suffixes:
        if word.endswith(suffix):
            word = apply_rule(word, suffix, 'ss')

    for suffix in step1b_suffixes:
        if word.endswith(suffix):
            stem = re.sub(f'{suffix}$', '', word)
            if suffix == 'ed' and re.search('[aeiou]', stem):
                word = stem
                if stem.endswith('at'):
                    word += 'at'
            elif suffix == 'ing' and re.search('[aeiou]', stem):
                word = stem
                if stem.endswith('at'):
                    word += 'at'
            elif stem.endswith('eed'):
                word = apply_rule(word, suffix, 'ee')
            elif re.search('[aeiou]', stem[:len(stem) - 2]):
                word = stem
            elif re.search('[aeiou]', stem):
                word = apply_rule(word, suffix, '')
            break

    for suffix in step1c_suffixes:
        if word.endswith(suffix):
            stem = re.sub(f'{suffix}$', '', word)
            if re.search('[aeiou]', stem):
                word = apply_rule(word, suffix, 'i')
            break

    for suffix1 in step2_suffixes:
        if word.endswith(suffix1):
            stem = apply_rule(word, suffix1, '')
            for suffix2 in ['ational', 'tional', 'ization', 'iveness', 'fulness']:
                if stem.endswith(suffix2):
                    word = apply_rule(word, suffix1, suffix2[:len(suffix2)-4])
                    break
            if re.search('[aeiou]', stem):
                word = stem
            elif word.endswith(suffix1):
                word = apply_rule(word, suffix1, '')
            break

    for suffix in step3_suffixes:
        if word.endswith(suffix):
            stem = apply_rule(word, suffix, '')
            if re.search('[aeiou]', stem):
                word = stem
            break

    for suffix in step4_suffixes:
        if word.endswith(suffix):
            stem = apply_rule(word, suffix, '')
            if stem.endswith('al') and re.search('[aeiou]', stem[:len(stem) - 2]):
                word = stem
            break

    for suffix in step5a_suffixes:
        if word.endswith(suffix):
            stem = apply_rule(word, suffix, '')
            if re.search('[aeiou]', stem):
                word = stem
            break

    for suffix in step5b_suffixes:
        if word.endswith(suffix):
            stem = apply_rule(word, suffix, 'l')
            if len(stem) > 1 and re.search('[aeiou]', stem):
                word = stem
            break

    return word

# Example usage:
""" word1 = "caresses"
stemmed_word1 = porter_stemmer(word1)
print(f'Original: {word1}, Stemmed: {stemmed_word1}')

word2 = "agreed"
stemmed_word2 = porter_stemmer(word2)
print(f'Original: {word2}, Stemmed: {stemmed_word2}')

word3 = "happily"
stemmed_word3 = porter_stemmer(word3)
print(f'Original: {word3}, Stemmed: {stemmed_word3}')

word4 = "conditional"
stemmed_word4 = porter_stemmer(word4)
print(f'Original: {word4}, Stemmed: {stemmed_word4}')

word5 = "triplicate"
stemmed_word5 = porter_stemmer(word5)
print(f'Original: {word5}, Stemmed: {stemmed_word5}')

word6 = "revival"
stemmed_word6 = porter_stemmer(word6)
print(f'Original: {word6}, Stemmed: {stemmed_word6}')

word7 = "probate"
stemmed_word7 = porter_stemmer(word7)
print(f'Original: {word7}, Stemmed: {stemmed_word7}')

word8 = "controll"
stemmed_word8 = porter_stemmer(word8)
print(f'Original: {word8}, Stemmed: {stemmed_word8}') """

# Example usage:
""" if __name__ == "__main__":
    json_file_path = "datas/flo.json"  # Update the file path accordingly

    with open(json_file_path, 'r') as file:
        json_data = json.load(file)

    # Extracting 'Intent' values from the JSON data
    intents = [entry.get('Intent', '') for entry in json_data]

    # Tokenize and stem each intent
    for i, intent in enumerate(intents):
        words = tokenizer(intent)
        stemmed_words = [porter_stemmer(word) for word in words]
        print(f"Intent {i + 1}: Original - {words}, Stemmed - {stemmed_words}") """
