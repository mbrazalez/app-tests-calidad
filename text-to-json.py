import re
import json

def parse_questions(file_content):
    questions = re.split(r'#\s+', file_content)[1:]  # Split by '#' and ignore the first empty string
    parsed_questions = {}

    for i, question in enumerate(questions, start=1):
        parts = question.strip().split('\n')
        prompt = parts[0]
        options = {chr(97 + j): re.sub(r'^[a-zA-Z]\)\s*', '', option.strip()) for j, option in enumerate(parts[1:], start=1)}

        parsed_questions[i] = {'p': prompt, **options}

    return parsed_questions

def convert_to_json(input_file, output_file):
    with open(input_file, 'r') as file:
        file_content = file.read()

    total_questions = len(re.findall(r'#\s+', file_content))

    data = {
        'total': total_questions,
        'items': parse_questions(file_content)
    }

    with open(output_file, 'w', encoding='utf-8') as output:
        json.dump(data, output, ensure_ascii=False, indent=2)

input_filename = 'preguntas.txt'
output_filename = 'preguntas?output.json'

convert_to_json(input_filename, output_filename)
print(f'Se ha generado el archivo JSON: {output_filename}')
