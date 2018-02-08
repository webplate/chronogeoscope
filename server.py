#!/usr/bin/python3

# std lib
import os
# modules
from flask import Flask, render_template, request
# i18n
from flask_babel import Babel

app = Flask(__name__)
app.secret_key = 'ENQG8h47Lk7q546q8q4q7522qTD7Fjvjvqhjlvqjl5465465qvqv5q56v42Ac543ttZE69C3m23xVhE6'
babel = Babel(app)

app_folder = os.path.split(os.path.abspath(__file__))[0]


LANGUAGES = {
    'en': 'English',
    'fr': 'French',
    'it': 'Italian'
}

# send translation according to browser header
@babel.localeselector
def get_locale():
    return request.accept_languages.best_match(LANGUAGES.keys())

    app.run(host='0.0.0.0', port=5005)

if __name__ == '__main__':
    app.debug = True
@
if __name__ == '__main__':
    app.debug = True
