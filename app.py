from flask import Flask, request, jsonify, render_template
from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig

app = Flask(__name__)

# Load the Hebrew-Mistral-7B model and tokenizer with 4-bit quantization
model_id = "yam-peleg/Hebrew-Mistral-7B"
quantization_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_compute_dtype="float16"  # Corrected dtype
)

tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(model_id, quantization_config=quantization_config)


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/summarize', methods=['POST'])
def summarize():
    data = request.get_json()
    text = data.get('text', '')
    max_new_tokens = data.get('max_new_tokens', 200)
    min_length = data.get('min_length', 100)
    temperature = data.get('temperature', 0.7)
    top_k = data.get('top_k', 50)
    top_p = data.get('top_p', 0.9)

    inputs = tokenizer(text, return_tensors='pt').to('cuda')

    output = model.generate(
        **inputs,
        max_new_tokens=max_new_tokens,
        min_length=min_length,
        temperature=temperature,
        top_k=top_k,
        top_p=top_p,
        do_sample=True,
        eos_token_id=tokenizer.eos_token_id,
    )
    summary = tokenizer.decode(output[0], skip_special_tokens=True)

    # Ensure the summary does not include the input text
    if text in summary:
        summary = summary.replace(text, '').strip()

    return jsonify(summary=summary)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
