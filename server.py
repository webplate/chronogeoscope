#!/usr/bin/python3
# -*- coding: utf-8 -*-
# std lib
import os
# modules
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify

app = Flask(__name__)
app.secret_key = 'ENQG8h47Lk7q546q8q4q7522qTD7Fjvjvqhjlvqjl5465465qvqv5q56v42Ac543ttZE69C3m23xVhE6'

app_folder = os.path.split(os.path.abspath(__file__))[0]


@app.route('/')
def main_page():
    return render_template('main.html')

if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=5005)
