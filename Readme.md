# Rotating earth projection used to read solar time.


**Knowing your longitude, you can read the time !**

Demo and explanations:

**https://91.121.141.56/aziclock/**

It's a wsgi application. Serve it with:

    python simplewsgi.py

Or with any WSGI compliant server.

For debug and development launch with:

    python server.py

Then visit:

http://localhost:5005

Dependencies:

- Python
- Flask (pip install Flask)
- pixi.js (included)
- bootstrap.js (included)
- sylvester.js (included)

Tested browsers:

- Firefox 46
- Chromium 50

It should work on any modern html5 browsers with canvas support !
Works faster if webGL is enabled.

