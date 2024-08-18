from flask import Flask, render_template, request, redirect, url_for, session, jsonify
import csv
import random

app = Flask(__name__)
app.secret_key = 'your_secret_key'

# Read phrases from the CSV file
def load_phrases():
    phrases = []
    with open('phrases.csv', newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            phrases.append({'phrase': row['phrase'], 'translation': row['translation']})
    return phrases

# Route for the login page
@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        # In a real app, you would verify the email and password
        if email == 'test@example.com' and password == 'password':
            session['logged_in'] = True
            return redirect(url_for('dashboard'))
        else:
            return render_template('login.html', error="Invalid credentials")
    return render_template('login.html')

# Route for the dashboard
@app.route('/dashboard')
def dashboard():
    if 'logged_in' not in session:
        return redirect(url_for('login'))
    return render_template('dashboard.html')

# Route to get 10 random phrases
@app.route('/get_phrases', methods=['GET'])
def get_phrases():
    phrases = load_phrases()
    random_phrases = random.sample(phrases, 10)
    return jsonify(random_phrases)

# Route for logging out
@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)
