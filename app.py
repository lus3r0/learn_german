from flask import Flask, render_template, request, redirect, url_for, session
import csv
import random

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Replace with a secure key

# Dummy user data
users = {
    'test@example.com': 'password123'
}

# Route for login page
@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        if email in users and users[email] == password:
            session['user'] = email
            return redirect(url_for('dashboard'))
        else:
            return "Invalid credentials, please try again."
    return render_template('login.html')

# Route for dashboard page
@app.route('/dashboard')
def dashboard():
    if 'user' not in session:
        return redirect(url_for('login'))
    return render_template('dashboard.html')

# Route to get random phrases
@app.route('/get_phrases', methods=['POST'])
def get_phrases():
    if 'user' not in session:
        return redirect(url_for('login'))
    
    with open('phrases.csv', newline='', encoding='utf-8') as csvfile:
        reader = list(csv.reader(csvfile))
        phrases = random.sample(reader, 10)
    
    return {'phrases': phrases}

# Route to logout
@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('login'))

if __name__ == "__main__":
    app.run()
