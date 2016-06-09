# Rotating earth projection used as an international clock


Knowing your longitude, you can read the time !

Demo:

**https://91.121.141.56/aziclock/**

It's a wsgi application. Serve it with:

    python simplewsgi.py

or for debug:

    python server.py

Then visit :

    http://localhost:5005

Dependencies :

     - Python
     - Flask (pip install Flask)
     - pixi.js (included)
     - bootstrap.js (included)


Tested browsers :

    - Firefox 46
    - Chromium 50

It should work on any modern html5 browsers with canvas support !
Works faster if webGL is enabled.
